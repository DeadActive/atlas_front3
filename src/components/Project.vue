<template>
    <v-card
        class="flex-grow-1"
        color="secondary"
        elevation="0"
        @click="openProject"
    >
        <div class="d-flex align-items-center">
            <v-avatar tile>
                <v-img src="https://via.placeholder.com/150"></v-img>
            </v-avatar>

            <div class="d-flex align-center px-4">
                <h4>{{ project.name }}</h4>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    methods: {
        openProject() {
            this.$router.push(`project/${this.project.id}`)
        },
    },
}
</script>

<style></style>
