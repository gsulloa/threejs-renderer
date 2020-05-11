import { Box3, Object3D, LoadingManager } from "three"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import JSZip from "jszip"
import axios from "axios"
import config from "../config"

class ModelLoader {
  constructor({ loading }) {
    this.loading = loading
    config.object._opacityMode.subscribe(opacityMode => {
      if (this.materials)
        this.materials.forEach(
          material => (material.opacity = [1, 0.7, 0.9][opacityMode]),
        )
    })
  }

  async load({ url }) {
    this.loading.onStart({ title: "Cargando..." })
    const files = await this.getFiles({ url })
    const groupedFiles = files.reduce((all, file) => {
      if (file.ext !== "mtl" && file.ext !== "obj") {
        all.textureFiles = { ...all.textureFiles, [file.name]: file.content }
      } else {
        all[file.ext] = file.content
      }
      return all
    }, {})
    const materials = await this.loadMTL(groupedFiles)
    const object = await this.loadOBJ({ materials, ...groupedFiles })
    const pivotObject = this.createPivot({ object })
    this.loading.onLoad()
    return pivotObject
  }

  async getFiles({ url }) {
    const file = await axios(url, {
      responseType: "blob",
      onDownloadProgress: this.loading.onProgress,
    })
    const { data: blob } = file
    const { files } = await new JSZip().loadAsync(blob, { type: "blob" })

    const readedFiles = await Promise.all(
      Object.entries(files).map(([name, zipObject]) =>
        this.readContent(name, zipObject),
      ),
    )

    return readedFiles
  }
  readContent = async (name, file) => {
    const doti = name.lastIndexOf(".")
    if (doti === -1) throw new Error(`file ${name} without extension`)
    const ext = name.substring(doti + 1)
    return {
      name,
      ext,
      content: await file.async(
        ext === "mtl" || ext === "obj" ? "text" : "uint8array",
      ),
    }
  }

  loadMTL = ({ textureFiles, mtl }) => {
    const loadingManager = new LoadingManager()
    loadingManager.setURLModifier(url => {
      const blob = new Blob([textureFiles[url].buffer])
      const NewUrl = URL.createObjectURL(blob)
      return NewUrl
    })
    const mtlLoader = new MTLLoader(loadingManager)

    const materials = mtlLoader.parse(mtl)
    materials.preload()
    this.materials = Object.values(materials.materials)
    this.materials.forEach(material => {
      material.opacity = config.object.opacityMode ? 0.7 : 1
      material.transparent = true
    })
    return materials
  }
  loadOBJ = ({ materials, obj }) => {
    const objLoader = new OBJLoader()
    objLoader.setMaterials(materials)
    return objLoader.parse(obj)
  }

  createPivot({ object }) {
    const { max, min } = new Box3().setFromObject(object)
    const middleY = (max.y - min.y) / 2
    const middleZ = (max.z - min.z) / 2
    const pivot = new Object3D()
    object.position.y = middleY
    object.position.z = -middleZ
    pivot.add(object)
    return pivot
  }
}

export default ModelLoader
