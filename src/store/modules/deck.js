import Vue from 'vue'
import { MVTLayer } from '@deck.gl/geo-layers'
import { TMSLayer } from '../../deck/baselayers'
import LayerAPI from '../../api/layer'

export default {
    namespaced: true,
    name: 'deck',
    state: {
        baselayers: [],
        baselayer: {},
        layers: [],
    },
    getters: {
        baselayer: (state) => state.baselayer,
        baselayers: (state) => state.baselayers,
        layers: (state) => state.layers,
    },
    mutations: {
        SET_BASELAYER: (state, payload) => {
            Vue.set(state.layers, 0, payload.baselayer)

            state.baselayer = payload
        },
        SET_BASELAYERS: (state, payload) => (state.baselayers = payload),
        SET_LAYERS: (state, payload) => (state.layers = payload),
        ADD_LAYER: (state, payload) => state.layers.push(payload),
    },
    actions: {
        updateBaselayers: ({ commit }, payload) =>
            commit('SET_BASELAYERS', payload),
        updateBaselayer: ({ commit }, payload) =>
            commit('SET_BASELAYER', payload),
        updateLayers: ({ commit }, payload) => {
            commit('SET_LAYERS', payload)
        },
        async loadLayer({ commit }, layer) {
            if (layer.layerType === 'VECTOR') {
                const data = `/api/public/MVT/${layer.id}/{z}/{y}/{x}.pbf`
                commit(
                    'ADD_LAYER',
                    new MVTLayer({
                        id: layer.id,
                        data,
                        pickable: true,
                        getFillColor: [22, 180, 247, 180],
                        pointType: 'circle',
                        getPointRadius: 100,
                    })
                )
            }
            if (layer.layerType === 'RASTER') {
                const { data: metadata } = await LayerAPI.getRasterMetadata(
                    layer.id
                )
                const data = `/api/public/TMS/${layer.id}/{z}/{-y}/{x}.png`

                commit(
                    'ADD_LAYER',
                    new TMSLayer({
                        id: layer.id,
                        data,
                        maxZoom: metadata.maxzoom,
                        minZoom: metadata.minzoom,
                        extent: metadata.bounds,
                    })
                )
            }
        },
    },
}
