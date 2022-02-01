<template>
    <v-card
        class="flex-grow-1"
        color="secondary"
        elevation="0"
        @click="setBaselayer"
    >
        <div class="d-flex align-items-center">
            <v-avatar tile>
                <v-img src="https://via.placeholder.com/150"></v-img>
            </v-avatar>

            <div class="d-flex align-center px-4">
                <h4>{{ baselayer.title }}</h4>
            </div>

            <v-icon v-if="isCurrent" color="green" class="ml-auto px-4">
                mdi-check
            </v-icon>
        </div>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        baselayer: {
            type: Object,
            required: true,
        },
    },
    methods: {
        ...mapActions('deck', ['updateBaselayer']),
        setBaselayer() {
            this.updateBaselayer(this.baselayer)
        },
    },
    computed: {
        ...mapGetters('deck', {
            selectedBaseLayer: 'baselayer',
        }),
        isCurrent() {
            return this.selectedBaseLayer.title === this.baselayer.title
        },
    },
}
</script>

<style></style>
