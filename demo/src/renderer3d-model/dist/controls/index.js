import React, { PureComponent } from "react"
import { BottomEndOverlay, SliderWrapper } from "../components/containers"
import { CircleButton } from "../components/button"
import Config from "../config"

class Controls extends PureComponent {
  state = {
    options: [
      {
        title: (
          <svg width="30px" height="30px" viewBox="0 0 511.626 511.626">
            <g>
              <path d="M506.199,242.968l-73.09-73.089c-3.614-3.617-7.898-5.424-12.848-5.424c-4.948,0-9.229,1.807-12.847,5.424   c-3.613,3.619-5.424,7.902-5.424,12.85v36.547H292.355V109.641h36.549c4.948,0,9.232-1.809,12.847-5.424   c3.614-3.617,5.421-7.896,5.421-12.847c0-4.952-1.807-9.235-5.421-12.851L268.66,5.429c-3.613-3.616-7.895-5.424-12.847-5.424   c-4.952,0-9.232,1.809-12.85,5.424l-73.088,73.09c-3.618,3.619-5.424,7.902-5.424,12.851c0,4.946,1.807,9.229,5.424,12.847   c3.619,3.615,7.898,5.424,12.85,5.424h36.545v109.636H109.636v-36.547c0-4.952-1.809-9.234-5.426-12.85   c-3.619-3.617-7.902-5.424-12.85-5.424c-4.947,0-9.23,1.807-12.847,5.424L5.424,242.968C1.809,246.585,0,250.866,0,255.815   s1.809,9.233,5.424,12.847l73.089,73.087c3.617,3.613,7.897,5.431,12.847,5.431c4.952,0,9.234-1.817,12.85-5.431   c3.617-3.61,5.426-7.898,5.426-12.847v-36.549H219.27v109.636h-36.542c-4.952,0-9.235,1.811-12.851,5.424   c-3.617,3.617-5.424,7.898-5.424,12.847s1.807,9.233,5.424,12.854l73.089,73.084c3.621,3.614,7.902,5.424,12.851,5.424   c4.948,0,9.236-1.81,12.847-5.424l73.087-73.084c3.621-3.62,5.428-7.905,5.428-12.854s-1.807-9.229-5.428-12.847   c-3.614-3.613-7.898-5.424-12.847-5.424h-36.542V292.356h109.633v36.553c0,4.948,1.807,9.232,5.42,12.847   c3.621,3.613,7.905,5.428,12.854,5.428c4.944,0,9.226-1.814,12.847-5.428l73.087-73.091c3.617-3.617,5.424-7.901,5.424-12.85   S509.82,246.585,506.199,242.968z" />
            </g>
          </svg>
        ),
        onClick: () => {
          Config.object.onMouseMove = "move"
        },
      },
      {
        title: (
          <svg width="30px" height="30px" viewBox="0 0 97.994 97.994">
            <g>
              <g>
                <path d="M97.155,9.939c-0.582-0.416-1.341-0.49-1.991-0.193l-10.848,4.935C74.08,5.29,60.815,0.118,46.966,0.118    c-15.632,0-30.602,6.666-41.07,18.289c-0.359,0.399-0.543,0.926-0.51,1.461c0.033,0.536,0.28,1.036,0.686,1.388l11.301,9.801    c0.818,0.711,2.055,0.639,2.787-0.162c6.866-7.512,16.636-11.821,26.806-11.821c6.135,0,12.229,1.584,17.622,4.583l-7.826,3.561    c-0.65,0.296-1.095,0.916-1.163,1.627c-0.069,0.711,0.247,1.405,0.828,1.82l34.329,24.52c0.346,0.246,0.753,0.373,1.163,0.373    c0.281,0,0.563-0.06,0.828-0.181c0.65-0.296,1.095-0.916,1.163-1.627l4.075-41.989C98.053,11.049,97.737,10.355,97.155,9.939z" />
                <path d="M80.619,66.937c-0.819-0.709-2.055-0.639-2.787,0.162c-6.866,7.514-16.638,11.822-26.806,11.822    c-6.135,0-12.229-1.584-17.622-4.583l7.827-3.561c0.65-0.296,1.094-0.916,1.163-1.628c0.069-0.711-0.247-1.404-0.828-1.819    L7.237,42.811c-0.583-0.416-1.341-0.49-1.991-0.193c-0.65,0.296-1.094,0.916-1.163,1.627L0.009,86.233    c-0.069,0.712,0.247,1.406,0.828,1.822c0.583,0.416,1.341,0.488,1.991,0.192l10.848-4.935    c10.237,9.391,23.502,14.562,37.351,14.562c15.632,0,30.602-6.666,41.07-18.289c0.358-0.398,0.543-0.926,0.51-1.461    c-0.033-0.536-0.28-1.036-0.687-1.388L80.619,66.937z" />
              </g>
            </g>
          </svg>
        ),
        onClick: () => {
          Config.object.onMouseMove = "rotate"
        },
        selected: true,
      },
    ],
    addLock: {
      title: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 361.118 361.118"
        >
          <path d="M274.765,141.3V94.205C274.765,42.172,232.583,0,180.559,0c-52.032,0-94.205,42.172-94.205,94.205V141.3     c-17.34,0-31.4,14.06-31.4,31.4v157.016c0,17.344,14.06,31.402,31.4,31.402h188.411c17.341,0,31.398-14.059,31.398-31.402V172.7     C306.164,155.36,292.106,141.3,274.765,141.3z M117.756,94.205c0-34.69,28.12-62.803,62.803-62.803     c34.685,0,62.805,28.112,62.805,62.803V141.3H117.756V94.205z M274.765,329.715H86.354V172.708h188.411V329.715z      M164.858,262.558v20.054c0,8.664,7.035,15.701,15.701,15.701c8.664,0,15.701-7.037,15.701-15.701v-20.054     c9.337-5.441,15.701-15.456,15.701-27.046c0-17.348-14.062-31.41-31.402-31.41c-17.34,0-31.4,14.062-31.4,31.41     C149.159,247.102,155.517,257.117,164.858,262.558z" />
        </svg>
      ),
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
      title: (
        <svg viewBox="0 0 512 512" width="30px" height="30px">
          <g>
            <path d="M448,286.681V106.667C448,83.135,428.865,64,405.333,64h-44.5c-2.802,0-5.552-1.135-7.542-3.125l-30.167-30.167     c-6.042-6.042-14.083-9.375-22.625-9.375h-89c-8.542,0-16.583,3.333-22.625,9.375l-30.167,30.167     c-1.99,1.99-4.74,3.125-7.542,3.125h-44.5C83.135,64,64,83.135,64,106.667v179.848C22.253,304.03,0,326.547,0,352     c0,57.96,109.22,91.07,220.126,95.457l-25.001,25.001c-4.167,4.167-4.167,10.917,0,15.083c2.083,2.083,4.813,3.125,7.542,3.125     c2.729,0,5.458-1.042,7.542-3.125l42.667-42.667c4.167-4.167,4.167-10.917,0-15.083l-42.667-42.667     c-4.167-4.167-10.917-4.167-15.083,0c-4.167,4.167-4.167,10.917,0,15.083l23.893,23.893     C101.281,421.301,21.333,384.911,21.333,352c0-14.655,15.891-29.983,44.086-42.974c4.659,18.512,21.307,32.307,41.247,32.307     h298.667c19.884,0,36.487-13.721,41.201-32.155c27.961,12.905,44.133,28.174,44.133,42.822     c0,26.573-56.729,60.656-161.094,71.458c-5.865,0.615-10.125,5.854-9.521,11.708c0.573,5.49,5.208,9.573,10.604,9.573     c0.365,0,0.74-0.021,1.104-0.052C441,433.375,512,396.99,512,352C512,326.546,489.478,304.091,448,286.681z M426.667,298.667     c0,11.76-9.573,21.333-21.333,21.333H106.667c-11.76,0-21.333-9.573-21.333-21.333v-192c0-11.76,9.573-21.333,21.333-21.333h44.5     c8.542,0,16.583-3.333,22.625-9.375l30.167-30.167c1.99-1.99,4.74-3.125,7.542-3.125h89c2.802,0,5.552,1.135,7.542,3.125     l30.167,30.167c6.042,6.042,14.083,9.375,22.625,9.375h44.5c11.76,0,21.333,9.573,21.333,21.333V298.667z" />
            <circle cx="384" cy="128" r="21.333" />
            <path d="M256,106.667c-47.052,0-85.333,38.281-85.333,85.333s38.281,85.333,85.333,85.333s85.333-38.281,85.333-85.333     S303.052,106.667,256,106.667z M256,256c-35.292,0-64-28.708-64-64s28.708-64,64-64s64,28.708,64,64S291.292,256,256,256z" />
          </g>
        </svg>
      ),
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
    const { options, addLock, resetOrbit, changeInitial, fullScreen } = this.state
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