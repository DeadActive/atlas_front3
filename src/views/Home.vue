<template>
    <div class="fill-height">
        <deck></deck>
        <project-nav></project-nav>
    </div>
</template>

<script>
import Deck from '../components/Deck.vue'
import ProjectNav from '../views/ProjectNavigation.vue'

export default {
    name: 'Home',
    components: {
        ProjectNav,
        Deck,
    },
    mounted() {
        if (this.$router.currentRoute.fullPath === '/') {
            this.$router.push('/projects')
        }
    },
}
</script>
