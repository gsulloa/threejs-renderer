import { OBJLoader, MTLLoader } from "three-obj-mtl-loader"

class ModelLoader {
  async load() {
    const materials = await this.loadMTL()
    const object = await this.loadOBJ({ materials })
    return object
  }
  loadMTL = () => new Promise((resolve, reject) => {
    new MTLLoader()
      .setPath( 'models/obj/abdomen/' )
      .load( 'ToraxAbdomen2.mtl', ( materials ) => {
        materials.preload()
        resolve(materials)
      }, () => {}, reject)
    })
  loadOBJ = ({ materials }) => new Promise((resolve, reject) => {
    new OBJLoader()
      .setMaterials(materials)
      .setPath('models/obj/abdomen/')
      .load('ToraxAbdomen2.obj', (object) => {
        resolve(object)
      }, function ( xhr ) {
        if ( xhr.lengthComputable ) {
          const percentComplete = xhr.loaded / xhr.total * 100
          console.log( Math.round( percentComplete, 2 ) + '% downloaded' )
        }
      }, () => reject("An error occurred loading de model") )
  })
}

export default ModelLoader