<template>
    <div class="deck-wrapper">
        <canvas ref="deck"></canvas>
    </div>
</template>

<script>
import { Deck } from '@deck.gl/core'
import { BitmapLayer } from '@deck.gl/layers'
import { TileLayer } from '@deck.gl/geo-layers'

const initialViewState = {
    longitude: -122.45,
    latitude: 37.8,
    zoom: 15,
}

export default {
    data() {
        return {
            deck: {},
        }
    },
    mounted() {
        this.deck = new Deck({
            canvas: this.$refs.deck,
            initialViewState,
            controller: true,
            layers: [
                new TileLayer({
                    data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',

                    minZoom: 0,
                    maxZoom: 19,
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
                }),
            ],
        })
    },
}
</script>

<style>
.deck-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}

.deck-wrapper canvas {
    width: 100%;
    height: 100%;
}
</style>
