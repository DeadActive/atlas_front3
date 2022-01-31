import client from '.'

export default {
    getProjects() {
        return client.get('public/project/all')
    },
    getProject(id) {
        return client.get(`public/project/${id}`)
    },
}
