<template>
    <v-container>
        <v-row>
            <v-col xs6>
                <v-flex xs12 align="center">
                    <h2>{{ currentProject.name }}</h2>
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
            <group-tree></group-tree>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import GroupTree from '../components/tree/Tree.vue'

export default {
    components: {
        GroupTree,
    },
    mounted() {
        const id = this.$router.currentRoute.params.id

        this.loadProject({ id })
    },
    computed: {
        ...mapGetters('project', ['currentProject']),
    },
    methods: {
        ...mapActions('project', ['loadProject']),
    },
}
</script>

<style></style>
