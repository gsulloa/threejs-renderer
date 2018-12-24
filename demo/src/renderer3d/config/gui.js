import React, { Component, createRef } from "react"
import { GUI } from "dat.gui"
import Config from "./"
import { EndOverlay } from "../components/containers"
import config from "./";

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

  addAttachmentConfig() {
    const { attachmentsController } = config.controllers
    const { attachments } = this.configs
    const COLORS = {
      Red: "#d94545",
      Pink: "#fae",
      Blue: "#33f",
      White: "#fff",
    }
    if (!attachmentsController || !attachments) return
    attachments
      .add(Config.attachment, "defaultColor", { ...COLORS })
      .name("Default")
      .listen()
    attachments
      .add(Config.attachment, "hoveredColor", { ...COLORS })
      .name("Hovered")
      .listen()
    attachments
      .add(Config.attachment, "selectedColor", { ...COLORS })
      .name("Selected")
      .listen()
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
