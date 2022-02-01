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
    longitude: -122.45,
    latitude: 37.8,
    zoom: 15,
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
            layers: [],
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
