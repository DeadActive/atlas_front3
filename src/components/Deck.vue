<template>
    <div class="deck-wrapper">
        <canvas ref="deck"></canvas>
    </div>
</template>

<script>
import { Deck } from '@deck.gl/core'
import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers'
import { TileLayer } from '@deck.gl/geo-layers'
import { mapActions, mapGetters } from 'vuex'
import { baseLayers } from '../deck/baselayers'

const initialViewState = {
    latitude: 55.764094,
    longitude: 37.617617,
    zoom: 10,
}

var deck = {}

export default {
    data() {
        return {
            deck: {},
        }
    },
    created() {
        this.updateBaselayers(baseLayers)
        this.updateBaselayer(baseLayers[0])
    },
    mounted() {
        deck = new Deck({
            canvas: this.$refs.deck,
            initialViewState,
            controller: true,
            useDevicePixels: false,
            layers: [],
            getTooltip: ({ object }) =>
                object && {
                    html: `<div><h3>${
                        object.properties.name
                    }</h3><p>${JSON.stringify(
                        object.properties,
                        null,
                        2
                    )}</p></div>`,
                    style: {
                        backgroundColor: '#fff',
                        maxWidth: '300px',
                    },
                },
        })
    },
    computed: {
        ...mapGetters('deck', ['layers']),
    },
    watch: {
        layers(newVal) {
            deck.setProps({ layers: [...newVal] })
        },
    },
    methods: {
        ...mapActions('deck', [
            'updateBaselayers',
            'updateBaselayer',
            'updateLayers',
        ]),
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
