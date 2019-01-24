import React, { PureComponent } from "react"
import { BottomEndOverlay } from "../components/containers"
import { CircleButton } from "../components/button"
import { VerticalSlider } from "../components/form"
import Config from "../config"
import { AddPin, Move360, SavePosition } from "../assets/icons"

class Controls extends PureComponent {
  state = {
    rotate: {
      title: <Move360 width={30} height={30} />,
      onClick: () => {
        Config.object.onMouseMove = ["rotate", "move"].filter(
          option => option !== Config.object.onMouseMove
        )[0]
        this.setState({ rotate: { ...this.state.rotate, selected: !this.state.rotate.selected }})
      },
      selected: Config.object.onMouseMove === "rotate",
    },
    addLock: {
      title: <AddPin width={30} height={30} />,
      onClick: () => {
        const state = Config.object.add
        Config.object.add = !state
        this.setState({
          addLock: {
            ...this.state.addLock,
            selected: state,
          },
        })
      },
      selected: !Config.object.add,
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
      onClick: () => {
        const element = document.querySelector("canvas").parentNode
        if (element.requestFullscreen) {
          if (document.fullscreen) {
            document.exitFullscreen()
          } else {
            element.requestFullscreen()
          }
        }
      },
    },
    zoom: 500,
  }
  componentDidMount() {
    Config.orbit._position.subscribe(({ z: zoom }) => {
      this.setState({ zoom })
    })
  }
  handleClick = ({ title: optionTitle, onClick }) => {
    const index = this.state.options.findIndex(
      ({ title }) => title === optionTitle
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
    const { options, addLock, changeInitial, fullScreen, rotate } = this.state
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
        {Config.object.editing && [
          <CircleButton
            key="add-lock"
            onClick={addLock.onClick}
            selected={addLock.selected}
          >
            {addLock.title}
          </CircleButton>,
          <CircleButton key="reset-initial" onClick={changeInitial.onClick}>
            {changeInitial.title}
          </CircleButton>,
        ]}
        <CircleButton
          onClick={rotate.onClick}
          selected={Config.object.onMouseMove === "rotate"}
        >
          {rotate.title}
        </CircleButton>
        <CircleButton onClick={fullScreen.onClick}>
          {fullScreen.title}
        </CircleButton>
      </BottomEndOverlay>
    )
  }
}

export default Controls
