<template>
    <v-container fluid>
        <v-tabs v-model="tab">
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#projects"><v-icon>mdi-layers-triple</v-icon> </v-tab>
            <v-tab href="#baselayers"><v-icon>mdi-map</v-icon> </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item id="projects">
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
            </v-tab-item>
            <v-tab-item id="baselayers">
                <v-container>
                    <v-row>
                        <v-col xs6>
                            <v-flex xs12 align="center">
                                <h2>Карта</h2>
                            </v-flex>
                        </v-col>
                        <v-col xs6>
                            <v-btn color="primary" block>
                                <v-icon>mdi-plus</v-icon>
                                Новая карта
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-list class="col-12" ref="list">
                            <v-list-item
                                v-for="baselayer in baselayers"
                                :key="baselayer.title"
                                class="py-2"
                            >
                                <baselayer :baselayer="baselayer"></baselayer>
                            </v-list-item>
                        </v-list>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import GroupTree from '../components/tree/Tree.vue'
import Baselayer from '../components/Baselayer.vue'

export default {
    components: {
        GroupTree,
        Baselayer,
    },
    data() {
        return {
            tab: 'projects',
        }
    },
    mounted() {
        const id = this.$router.currentRoute.params.id

        this.loadProject({ id })
    },
    computed: {
        ...mapGetters('project', ['currentProject']),
        ...mapGetters('deck', ['baselayers']),
    },
    methods: {
        ...mapActions('project', ['loadProject']),
    },
}
</script>

<style></style>
