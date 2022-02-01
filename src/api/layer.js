import client from '.'

export default {
    getVectorLayer(id) {
        return client.get(`public/layer/vector/${id}`)
    },
    getRasterMetadata(id) {
        return client.get(`public/TMS/${id}/metadata`)
    },
}
