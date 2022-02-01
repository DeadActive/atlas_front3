import { BitmapLayer } from '@deck.gl/layers'
import { TileLayer } from '@deck.gl/geo-layers'

export class TMSLayer extends TileLayer {
    constructor(options) {
        const _options = {
            ...options,
            tileSize: 256,
            renderSubLayers: (props) => {
                const {
                    bbox: { west, south, east, north },
                } = props.tile

                return new BitmapLayer(props, {
                    data: null,
                    image: props.data,
                    bounds: [west, south, east, north],
                })
            },
        }

        super(_options)
    }
}

export const OSM = {
    Map: {
        title: 'Open Street Map',
        baselayer: new TMSLayer({
            data: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            maxZoom: 19,
        }),
    },
}

const bingKey =
    'ArbAYrqJd-JOWsjsrnEsdFJSMrgRuh4J3-Gmi_MTsSr0d6oWrerywY6ZIu5j0L6H'

export const Bing = {
    Aerial: {
        title: 'Bing Aerial',
        baselayer: new TMSLayer({
            data: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            maxZoom: 19,
        }),
    },
}

export const Google = {
    Sattelite: {
        title: 'Google Sattelite',
        baselayer: new TMSLayer({
            data: [
                'https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                'https://mt2.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                'https://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            ],
            maxZoom: 19,
        }),
    },
    Hybrid: {
        title: 'Google Hybrid',
        baselayer: new TMSLayer({
            data: [
                'https://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
                'https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
                'https://mt2.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
                'https://mt3.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
            ],
            maxZoom: 19,
        }),
    },
    Streets: {
        title: 'Google Streets',
        baselayer: new TMSLayer({
            data: [
                'https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                'https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                'https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            ],
            maxZoom: 19,
        }),
    },
    Terrain: {
        title: 'Google Terrain',
        baselayer: new TMSLayer({
            data: [
                'https://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
                'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
                'https://mt2.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
                'https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            ],
            maxZoom: 19,
        }),
    },
}

export const baseLayers = [
    OSM.Map,
    Google.Sattelite,
    Google.Hybrid,
    Google.Streets,
    Google.Terrain,
]
