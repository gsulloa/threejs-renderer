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
          Config.object.onMouseMove = "moveCamera"
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
          Config.object.onMouseMove = "rotateObject"
        },
        selected: true,
      },
    ],
    zoom: 500,
  }
  constructor(props) {
    super(props)
    Config.orbit.position.suscribe(({ z }) => this.changeZoom(z))
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
    if (zoom === this.state.zoom) return
    this.setState({ zoom }, () => {
      Config.orbit.changePosition = {
        z: zoom,
      }
    })
  }
  render() {
    const { options } = this.state
    return (
      <BottomEndOverlay>
        {options.map((option, i) => (
          <CircleButton
            key={i}
            onClick={() => this.handleClick(option)}
            selected={option.selected}
          >
            {option.title}
          </CircleButton>
        ))}
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
