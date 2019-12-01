import React from "react"
import L from "leaflet"
import { Map, TileLayer } from "react-leaflet"
import MiniMap from "leaflet-minimap"
import "../../../node_modules/leaflet-minimap/dist/Control.MiniMap.min.css"
// import "../../node_modules/leaflet-minimap/dist/Control.MiniMap.min.css"
const url =
  "https://idea-files-s3.s3.us-east-2.amazonaws.com/new/{z}/{y}/{x}.jpg"
// "http://localhost:5000/upload/new/{z}/{y}/{x}.jpg"
// const url = "https://tile.openstreetmap.org/{z}/{y}/{x}.png"
class ZoomableImage extends React.Component {
  map = React.createRef()
  layer = React.createRef()
  loadMinimap = () => {
    const map = this.map.current.leafletElement
    const layer = new L.TileLayer(url, { minZoom: 0, maxZoom: 9 })
    const miniMap = new MiniMap(layer, { zoomLevelFixed: 0 }).addTo(map)
  }
  componentDidMount() {
    // this.load()
  }
  load = () => {
    var map = L.map("map", {
      center: [0, 0],
      zoom: 2,
    })
    const data = {
      minZoom: 0,
      maxZoom: 9,
      attribution: "&amp;copy MedicineHub",
    }
    const layer = L.tileLayer(url, data)
    layer.addTo(map)
    const layerMiniMap = new L.TileLayer(url, data)
    new MiniMap(layerMiniMap, { zoomLevelFixed: 0 }).addTo(map)
  }
  render() {
    const position = [0, 0]
    return (
      <div>
        <Map
          ref={this.map}
          center={position}
          zoom={2}
          style={{ height: 500 }}
          onlayeradd={() => this.loadMinimap()}
        >
          <TileLayer
            ref={this.layer}
            attribution="&amp;copy MedicineHub"
            // url="https://idea-files-s3.s3.us-east-2.amazonaws.com/test/{z}/{x}/{y}.png"
            url={url}
            minZoom={0}
            maxZoom={9}
          />
        </Map>
      </div>
    )
  }
}

export default ZoomableImage
