import { MeshBasicMaterial } from "three"

export default {
  attachment: {
    material: {
      default: new MeshBasicMaterial({ color: "#fae" }),
      hovered: new MeshBasicMaterial({ color: "#33f" }),
      selected: new MeshBasicMaterial({ color: "#fff" }),
    },
  },
  set attachmentMaterial({ type, color }) {
    this.attachment.material[type] = new MeshBasicMaterial({ color })
  },
}
