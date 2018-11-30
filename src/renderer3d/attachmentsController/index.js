import * as THREE  from "three"

class AttachmentsController {

  constructor({ model, attachments = [] } = {}) {
    this.model = model
    this.attachments = []
    attachments.forEach(attachment => {
      this.addSphere(attachment.position)
    })
  }

  addAttachment = ({ position, model }) => {
    if (position && model) {
      model.position.copy(position)
      this.model.add(model)
      this.attachments.push(model)
      console.log(this.model.children)
    }
  }
  addSphere = position => {
    const radius = 5
    const segments = 32
    const material =  new THREE.MeshBasicMaterial({ color: "#fae" })
    const geometry = new THREE.CircleGeometry(radius, segments, segments);
    const sphere = new THREE.Mesh( geometry, material )
    sphere.name = "attachment"
    this.addAttachment({ position, model: sphere })
  }
}

export default AttachmentsController
