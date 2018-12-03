import * as THREE  from "three"

class AttachmentsController {

  constructor({ model, attachments, initialAttachments = [] } = {}) {
    this.model = model
    this.attachments = attachments
    initialAttachments.forEach(attachment => {
      this.addSphere(attachment.position)
    })
  }

  addAttachment = ({ position, model }) => {
    if (position && model) {
      const transparentModel = new THREE.Mesh()
      transparentModel.visible = false
      transparentModel.position.copy(position)
      this.model.add(transparentModel)
      
      const worldPosition = new THREE.Vector3()
        .add(this.model.localToWorld(position))
      model.position.copy(worldPosition)
      model.reference = transparentModel
      this.attachments.add(model)
    }
  }
  addSphere = position => {
    const radius = 5
    const segments = 32
    const material =  new THREE.MeshBasicMaterial({ color: "#fae" })
    const geometry = new THREE.CircleGeometry(radius, segments, segments);
    const sphere = new THREE.Mesh( geometry, material )
    this.addAttachment({ position, model: sphere })
  }
}

export default AttachmentsController
