import { Box3, Object3D } from "three"
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
        const { max, min } = new Box3().setFromObject(object)
        const middleY = (max.y - min.y) / 2
        const middleZ = (max.z - min.z) / 2
        const pivot = new Object3D();
        object.position.y = middleY
        object.position.z = -middleZ
        pivot.add( object );
        resolve(pivot)
      }, function ( xhr ) {
        if ( xhr.lengthComputable ) {
          const percentComplete = xhr.loaded / xhr.total * 100
          console.log( Math.round( percentComplete, 2 ) + '% downloaded' )
        }
      }, () => reject("An error occurred loading de model") )
  })
}

export default ModelLoader