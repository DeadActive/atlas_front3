import ProjectAPI from '../../api/project'
import GroupAPI from '../../api/group'

import Vue from 'vue'

import { GeoJsonLayer } from '@deck.gl/layers'

export default {
    namespaced: true,
    name: 'project',
    state: {
        currentProject: {},
        projects: [],
        groups: {},
    },
    getters: {
        currentProject: (state) => state.currentProject,
        projects: (state) => state.projects,
        groups: (state) => state.groups,
    },
    mutations: {
        SET_PROJECTS: (state, payload) => (state.projects = payload),
        SET_CURRENT_PROJECT: (state, payload) =>
            (state.currentProject = payload),
        SET_GROUPS: (state, payload) => (state.groups = payload),
        GROUP_LAYERS_SET: (state, { group, layers }) => {
            const g = state.groups.find((x) => x == group)

            Vue.set(g, 'layers', layers)
        },
    },
    actions: {
        async loadProjects({ commit }) {
            const { data } = await ProjectAPI.getProjects()
            commit('SET_PROJECTS', data)
        },
        async loadProject({ commit }, { id }) {
            const { data } = await ProjectAPI.getProject(id)
            commit('SET_CURRENT_PROJECT', data)
        },
        async loadGroups({ commit }, { id }) {
            const { data } = await GroupAPI.getGroups(id)
            commit('SET_GROUPS', data.list)
        },
        async loadLayer({ commit }, layer) {
            if (layer.layerType === 'VECTOR') {
                const deckLayer = new GeoJsonLayer({
                    id: layer.id,
                })
            }
        },
        setGroups({ commit }, payload) {
            commit('SET_GROUPS', payload)
        },
        updateGroupLayers({ commit }, payload) {
            commit('GROUP_LAYERS_SET', payload)
        },
    },
}
