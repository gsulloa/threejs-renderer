import {
  Box3,
  Object3D,
  Mesh,
  PlaneGeometry,
  TextureLoader,
  MeshLambertMaterial,
} from "three"

class ModelLoader {
  constructor({ loading }) {
    this.loading = loading
  }

  async load({ url }) {
    const material = await this.loadMTL({ url })
    const object = await this.loadOBJ({ material })
    const pivotObject = this.createPivot({ object })
    this.loading.onLoad()
    return pivotObject
  }

  loadMTL = ({ url }) => {
    const loader = new TextureLoader()
    const texture = loader.load(url)

    const material = new MeshLambertMaterial({
      color: 0xffffff,
      map: texture,
    })
    return material
  }
  loadOBJ = ({ material }) => {
    const cube = new Mesh(new PlaneGeometry(300, 300, 1, 1), material)
    return cube
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
