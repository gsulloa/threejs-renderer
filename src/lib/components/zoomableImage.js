import React from "react"
import L from "leaflet"
import { Map, TileLayer } from "react-leaflet"
import MiniMap from "leaflet-minimap"

import "leaflet-minimap/dist/Control.MiniMap.min.css"
// "http://localhost:5000/upload/new/{z}/{y}/{x}.jpg"
// const url = "https://tile.openstreetmap.org/{z}/{y}/{x}.png"
const completeWithImageSuffix = (path = "") => `${path}/{z}/{y}/{x}.jpg`
class ZoomableImage extends React.Component {
  map = React.createRef()
  layer = React.createRef()
  loadMinimap = () => {
    const { url } = this.props
    const map = this.map.current.leafletElement
    const layer = new L.TileLayer(completeWithImageSuffix(url), {
      minZoom: 0,
      maxZoom: 9,
    })
    new MiniMap(layer, { zoomLevelFixed: 0 }).addTo(map)
  }
  render() {
    const position = [0, 0]
    const { mapHeight = "80vh", url } = this.props
    return (
      <div>
        <Map
          ref={this.map}
          center={position}
          zoom={2}
          style={{ height: mapHeight }}
          onlayeradd={() => this.loadMinimap()}
        >
          <TileLayer
            ref={this.layer}
            attribution="&amp;copy MedicineHub"
            url={completeWithImageSuffix(url)}
            minZoom={0}
            maxZoom={9}
          />
        </Map>
      </div>
    )
  }
}

export default ZoomableImage
