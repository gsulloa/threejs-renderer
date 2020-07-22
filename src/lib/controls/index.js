import React, { PureComponent } from "react"
import t from "prop-types"
import { BottomEndOverlay, Col, Tooltip } from "../components/containers"
import { CircleButton } from "../components/button"
import { VerticalSlider } from "../components/form"
import Config from "../config"
import {
  AddPin,
  Move360,
  SavePosition,
  ViewPin,
  NoViewPin,
  NewTarget,
  NewTargetNumber,
  Opacity,
} from "../assets/icons"
import "fullscreen-api-polyfill"

class Controls extends PureComponent {
  static propTypes = {
    showFullscreen: t.bool,
  }
  static defaultProps = {
    showFullscreen: true,
  }
  state = {
    rotate: {
      title: <Move360 width={30} height={30} />,
      onClick: () => {
        Config.object.onMouseMove = ["rotate", "move"].filter(
          option => option !== Config.object.onMouseMove,
        )[0]
        this.setState({
          rotate: {
            ...this.state.rotate,
            selected: !this.state.rotate.selected,
          },
        })
      },
      selected: Config.object.onMouseMove === "rotate",
    },
    adding: {
      title: <AddPin width={30} height={30} />,
      onClick: () => {
        Config.object.add = !Config.object.add
        this.setState({
          adding: {
            ...this.state.adding,
            selected: Config.object.add,
          },
        })
      },
      selected: Config.object.add,
    },
    visible: {
      title: <ViewPin width={30} height={30} />,
      onClick: () => {
        Config.attachment.visibility = (Config.attachment.visibility + 1) % 4
      },
    },

    opacity: {
      number: [100, 70, 90][Config.object.opacityMode],
    },
    changeInitial: {
      title: <SavePosition width={30} height={30} />,
      onClick: () => {
        Config.controllers.objectController.updateInitial({
          position: Config.orbit.position,
          rotation: Config.orbit.rotation,
        })
      },
    },
    fullScreen: {
      title: (
        <svg width="30px" height="30px" viewBox="0 0 438.543 438.543">
          <path d="M407.42,159.029c3.62,3.616,7.898,5.428,12.847,5.428c2.282,0,4.668-0.476,7.139-1.429   c7.426-3.235,11.136-8.853,11.136-16.846V18.276c0-4.949-1.807-9.231-5.428-12.847c-3.61-3.617-7.898-5.424-12.847-5.424H292.36   c-7.991,0-13.607,3.805-16.848,11.419c-3.23,7.423-1.902,13.99,4,19.698l41.111,41.112L219.271,173.589L117.917,72.231   l41.112-41.112c5.901-5.708,7.232-12.275,3.999-19.698C159.789,3.807,154.175,0,146.182,0H18.276C13.324,0,9.041,1.809,5.425,5.426   c-3.617,3.616-5.424,7.898-5.424,12.847v127.907c0,7.996,3.809,13.61,11.419,16.846c2.285,0.948,4.57,1.429,6.855,1.429   c4.948,0,9.229-1.812,12.847-5.427l41.112-41.109l101.354,101.354L72.234,320.622l-41.112-41.113   c-5.711-5.903-12.275-7.231-19.702-4.001c-7.614,3.241-11.419,8.856-11.419,16.854v127.906c0,4.948,1.807,9.229,5.424,12.847   c3.619,3.614,7.902,5.421,12.851,5.421h127.906c7.996,0,13.61-3.806,16.846-11.416c3.234-7.427,1.903-13.99-3.999-19.705   l-41.112-41.106L219.271,264.95l101.353,101.361l-41.114,41.11c-5.899,5.708-7.228,12.279-3.997,19.698   c3.237,7.617,8.856,11.423,16.851,11.423h127.907c4.948,0,9.232-1.813,12.847-5.428c3.613-3.613,5.42-7.898,5.42-12.847V292.362   c0-7.994-3.709-13.613-11.136-16.851c-7.802-3.23-14.462-1.903-19.985,4.004l-41.106,41.106L264.952,219.271L366.31,117.917   L407.42,159.029z" />
        </svg>
      ),
      onClick: () => this.toggleFullscreen(),
    },
    zoom: 500,
    showImages: true,
  }

  toggleFullscreen = () => {
    const element = document.querySelector("canvas").parentNode
    if (element.requestFullscreen) {
      if (document.fullscreen) {
        document.exitFullscreen()
      } else {
        element.requestFullscreen()
      }
    }
  }
  componentDidMount() {
    Config.orbit._position.subscribe(({ z: zoom }) => {
      this.setState({ zoom })
    })
    Config.attachment._visibility.subscribe(visibility => {
      const Component = [NoViewPin, ViewPin, NewTargetNumber, NewTarget][
        visibility
      ]
      this.setState({
        visible: {
          ...this.state.visible,
          title: <Component width={30} height={30} />,
        },
      })
    })
    Config.attachment._showImages.subscribe(show => {
      this.setState({
        showImages: show,
      })
    })
  }
  handleClick = ({ title: optionTitle, onClick }) => {
    const index = this.state.options.findIndex(
      ({ title }) => title === optionTitle,
    )
    this.deselectAll()
    onClick()
    this.setState(state => ({
      options: [
        ...state.options.slice(0, index),
        { ...state.options[index], selected: true },
        ...state.options.slice(index + 1),
      ],
    }))
  }
  deselectAll = () => {
    this.setState(state => ({
      options: state.options.map(option => ({ ...option, selected: false })),
    }))
  }
  changeZoom = zoom => {
    Config.orbit.position = {
      z: zoom,
    }
  }
  render() {
    const {
      visible,
      adding,
      changeInitial,
      fullScreen,
      rotate,
      opacity,
      showImages,
    } = this.state
    const { showFullscreen } = this.props
    return (
      <BottomEndOverlay>
        <VerticalSlider
          value={this.state.zoom}
          onChange={({ target: { valueAsNumber: value } }) =>
            this.changeZoom(value)
          }
          step={20}
          min={100}
          max={800}
        />
        <Col wrap>
          {Config.object.editing && (
            <>
              <Tooltip text={"Agregar marcador"}>
                <CircleButton
                  onClick={adding.onClick}
                  selected={adding.selected}
                >
                  {adding.title}
                </CircleButton>
              </Tooltip>
              <Tooltip text="Guardar posición inicial">
                <CircleButton onClick={changeInitial.onClick}>
                  {changeInitial.title}
                </CircleButton>
              </Tooltip>
            </>
          )}
          <Tooltip
            text={
              Config.object.onMouseMove === "rotate"
                ? "Desactivar modo rotación"
                : "Activar modo rotación"
            }
          >
            <CircleButton
              onClick={rotate.onClick}
              selected={Config.object.onMouseMove === "rotate"}
            >
              {rotate.title}
            </CircleButton>
          </Tooltip>
          <Tooltip text="Cambiar tipo de visión de marcadores">
            <CircleButton onClick={visible.onClick}>
              {visible.title}
            </CircleButton>
          </Tooltip>
          <Tooltip text="Cambiar opacidad del modelo" selected={opacity.active}>
            <CircleButton
              onClick={() => {
                Config.object.opacityMode = [Config.object.opacityMode + 1] % 3
                this.setState({
                  opacity: { number: [100, 70, 90][Config.object.opacityMode] },
                })
              }}
            >
              <Opacity width="30" height="30" />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "1000",
                }}
              >
                <span>{this.state.opacity.number}</span>
              </div>
            </CircleButton>
          </Tooltip>

          <Tooltip text={showImages ? "Ocultar imagenes" : "Mostrar Imagenes"}>
            <CircleButton
              onClick={() => {
                Config.attachment.showImages = !this.state.showImages
              }}
            >
              <img
                src={
                  showImages
                    ? require("../assets/icons/camera.png")
                    : require("../assets/icons/no_camera.png")
                }
                alt="show-camera-text"
                style={{ width: 30 }}
              />
            </CircleButton>
          </Tooltip>
          {showFullscreen && !navigator.userAgent.match(/(ipad|iphone)/i) && (
            <Tooltip text="Modo pantalla completa">
              <CircleButton onClick={fullScreen.onClick}>
                {fullScreen.title}
              </CircleButton>
            </Tooltip>
          )}
        </Col>
      </BottomEndOverlay>
    )
  }
}

export default Controls
