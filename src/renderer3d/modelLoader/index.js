import { Box3, Object3D } from "three"
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader"
import JSZip from "jszip"
import axios from "axios"
import initLoadingManager from "./loadingManager";

class ModelLoader {
  constructor({ loadingContainers }) {
    this.loadingManager = initLoadingManager(loadingContainers)
  }
  async load() {
    this.loadingManager.onStart()
    const file = await axios('https://s3.us-east-2.amazonaws.com/idea-files-s3/1507768649217', {
      responseType: "blob",
      onDownloadProgress: ({ loaded, total}) => {
        this.loadingManager.onProgress(null, loaded, total)
      },
    })
    const { data: blob } = file
    const { files } = await new JSZip().loadAsync(blob, { type: "blob" })
    const readContent = (name, file)  =>{
      const doti = name.lastIndexOf(".")
      if (doti === -1) throw new Error(`file ${name} without extension`)
      const ext = name.substring(doti + 1)
  
      if (ext === "mtl" || ext === "obj") {
        return file.async("text").then(content => ({
          name,
          blob: new Blob([content], { type: "text/plain" }),
          ext,
        }))
      } else {
        return file
          .async("uint8array")
          .then(content => ({ name, blob: new Blob([content]), ext }))
      }
    }
    const promiseReadeableFiles = await Promise.all(
      Object.entries(files).map(([name, zipObject]) => readContent(name, zipObject)
    ))
    const readableFiles = promiseReadeableFiles.reduce((all, file) => {
      if (file.ext !== "mtl" && file.ext !== "obj") {
        all.textureFiles = { ...all.textureFiles, [file.name]: file.blob}
        all.texturePaths = { ...all.texturePaths, [file.name]: URL.createObjectURL(file.blob)}
      } else {
        all[file.ext] = URL.createObjectURL(file.blob)
      }
      return all
    }, {})

    console.log(readableFiles)

    const materials = await this.loadMTL(readableFiles.mtl)
    const object = await this.loadOBJ({ materials })

    this.loadingManager.onLoad()
    return object
  }
  loadMTL = (mtl) => new Promise((resolve, reject) => {
    new MTLLoader()
      .setPath( 'models/obj/abdomen/' )
      .load( 'ToraxAbdomen2.mtl', ( materials ) => {
        // .load(mtl, materials => {
        materials.preload()
        resolve(materials)
      }, () => {}, reject)
    })
  loadOBJ = ({ materials }) => new Promise((resolve, reject) => {
    new OBJLoader()
      .setMaterials(materials)
      .setPath('models/obj/abdomen/')
      .load('ToraxAbdomen2.obj', (object) => {
        const { max, min } = new Box3().setFromObject(object)
        const middleY = (max.y - min.y) / 2
        const middleZ = (max.z - min.z) / 2
        const pivot = new Object3D();
        object.position.y = middleY
        object.position.z = -middleZ
        pivot.add( object );
        resolve(pivot)
      }, () => {}, () => reject("An error occurred loading de model") )
  })
}

export default ModelLoader