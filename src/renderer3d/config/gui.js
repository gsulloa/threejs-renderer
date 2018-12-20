import React, { Component, createRef } from "react"
import { GUI } from "dat.gui"
import Config from "./"
import { EndOverlay } from "../components/containers"

class ConfigGui extends Component {
  constructor(props) {
    super(props)
    this.container = createRef()
    this.gui = new GUI({ autoPlace: false })
    this.configs = {
      attachments: this.gui.addFolder("Attachments"),
    }
    this.state = {
      gui: this.gui.domElement,
    }
  }

  componentDidMount() {
    this.container.current.appendChild(this.state.gui)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.gui) return true
    return false
  }

  addAttachmentConfig({ attachmentsController }) {
    const { attachments } = this.configs
    if (!attachmentsController || !attachments) return
    attachments
      .addColor(Config.attachment, "defaultColor")
      .name("Default")
      .listen()
      .onChange(attachmentsController.updateMaterials)
    attachments
      .addColor(Config.attachment, "hoveredColor")
      .name("Hovered")
      .listen()
      .onChange(attachmentsController.updateMaterials)
    attachments
      .addColor(Config.attachment, "selectedColor")
      .name("Selected")
      .listen()
      .onChange(attachmentsController.updateMaterials)
    attachments
      .add(Config.attachment, "scale", 1, 10, 1)
      .name("Radius")
      .listen()
      .onChange(attachmentsController.updateScale)
    attachments
      .add(Config.attachment, "visibility")
      .name("Visible")
      .listen()
      .onChange(attachmentsController.updateVisible)
    attachments.open()
  }

  render() {
    return <EndOverlay ref={this.container} />
  }
}
export default ConfigGui
