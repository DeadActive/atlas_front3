import client from '.'

export default {
    getVectorLayer(id) {
        return client.get(`public/layer/vector/${id}`)
    },
}
