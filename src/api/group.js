import client from './index'

export default {
    getGroups(id) {
        return client.get(`public/layer_group/all/${id}`)
    },
}
