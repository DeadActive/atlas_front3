export default {
    state: {
        layers: [],
    },
    getters: {
        value: (state) => {
            return state.value
        },
    },
    mutations: {
        updateValue(state, payload) {
            state.value = payload
        },
    },
    actions: {
        updateValue({ commit }, payload) {
            commit('updateValue', payload)
        },
    },
}
