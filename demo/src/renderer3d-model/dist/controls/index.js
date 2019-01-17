import React, { PureComponent } from "react"
import { BottomEndOverlay, SliderWrapper } from "../components/containers"
import { CircleButton } from "../components/button"
import Config from "../config"
import {
  AddPin,
  NewTarget,
  MoveUpDown,
  Move360,
  SavePosition,
} from "../assets/icons"

class Controls extends PureComponent {
  state = {
    options: [
      {
        title: <MoveUpDown width={30} height={30} />,
        onClick: () => {
          Config.object.onMouseMove = "move"
        },
      },
      {
        title: <Move360 width={30} height={30} />,
        onClick: () => {
          Config.object.onMouseMove = "rotate"
        },
        selected: true,
      },
    ],
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
    resetOrbit: {
      title: (
        <svg viewBox="0 0 14.155 14.155" width="30px" height="30px">
          <g>
            <path d="M12.083,1.887c-0.795-0.794-1.73-1.359-2.727-1.697v2.135c0.48,0.239,0.935,0.55,1.334,0.95   c1.993,1.994,1.993,5.236,0,7.229c-1.993,1.99-5.233,1.99-7.229,0c-1.991-1.995-1.991-5.235,0-7.229   C3.466,3.269,3.482,3.259,3.489,3.25h0.002l1.181,1.179L4.665,0.685L0.923,0.68l1.176,1.176C2.092,1.868,2.081,1.88,2.072,1.887   c-2.763,2.762-2.763,7.243,0,10.005c2.767,2.765,7.245,2.765,10.011,0C14.844,9.13,14.847,4.649,12.083,1.887z" />
          </g>
        </svg>
      ),
      onClick: () => {
        Config.controllers.objectController.resetControls()
      },
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
    const {
      options,
      addLock,
      resetOrbit,
      changeInitial,
      fullScreen,
    } = this.state
    return (
      <BottomEndOverlay>
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
        <CircleButton onClick={resetOrbit.onClick}>
          {resetOrbit.title}
        </CircleButton>
        {options.map((option, i) => (
          <CircleButton
            key={i}
            onClick={() => this.handleClick(option)}
            selected={option.selected}
          >
            {option.title}
          </CircleButton>
        ))}
        <CircleButton onClick={fullScreen.onClick}>
          {fullScreen.title}
        </CircleButton>
        <SliderWrapper>
          <input
            type="range"
            value={this.state.zoom}
            onChange={({ target: { valueAsNumber: value } }) =>
              this.changeZoom(value)
            }
            step={20}
            min={100}
            max={800}
          />
        </SliderWrapper>
      </BottomEndOverlay>
    )
  }
}

export default Controls
