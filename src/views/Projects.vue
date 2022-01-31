<template>
    <v-container>
        <v-row>
            <v-col xs6>
                <v-flex xs12 align="center">
                    <h2>Проекты</h2>
                </v-flex>
            </v-col>
            <v-col xs6>
                <v-btn color="primary" block>
                    <v-icon>mdi-plus</v-icon>
                    Новый
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-list class="col-12" ref="list">
                <v-list-item
                    v-for="project in projects"
                    :key="project.id"
                    class="py-2"
                >
                    <project :project="project"></project>
                </v-list-item>
            </v-list>
        </v-row>
    </v-container>
</template>

<script>
import Project from '../components/Project.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        Project,
    },
    mounted() {
        this.loadProjects()
    },
    computed: {
        ...mapGetters('project', ['projects']),
    },
    methods: {
        ...mapActions('project', ['loadProjects']),
    },
}
</script>

<style></style>
