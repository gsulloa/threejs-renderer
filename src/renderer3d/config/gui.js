import { GUI } from "dat.gui"
import Config from "./"

class ConfigGui {
  constructor(controllers) {
    this.controllers = controllers
    this.gui = new GUI()
    this.addAttachmentConfig()
  }

  addAttachmentConfig() {
    const { attachmentsController } = this.controllers
    const attachmentsConfig = this.gui.addFolder("Attachments")
    attachmentsConfig
      .addColor(Config.attachment, "defaultColor")
      .name("Default")
      .listen()
      .onChange(attachmentsController.updateMaterials)
    attachmentsConfig
      .addColor(Config.attachment, "hoveredColor")
      .name("Hovered")
      .listen()
    attachmentsConfig
      .addColor(Config.attachment, "selectedColor")
      .name("Selected")
      .listen()
    attachmentsConfig
      .add(Config.attachment, "scale", 1, 10, 1)
      .name("Radius")
      .listen()
      .onChange(attachmentsController.updateScale)
    attachmentsConfig
      .add(Config.attachment, "visibility")
      .name("Visible")
      .listen()
      .onChange(attachmentsController.updateVisible)
    attachmentsConfig.open()
  }
}
export default ConfigGui
