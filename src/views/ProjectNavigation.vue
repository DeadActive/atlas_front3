<template>
    <v-container fluid class="fill-height">
        <v-flex
            xs5
            md5
            lg4
            class="fill-height project-nav"
            style="z-index: 10; overflow-y: scroll; max-height: 97vh"
        >
            <v-card class="fill-height" elevation="10">
                <v-toolbar elevation="0">
                    <v-img src="/img/logo.svg"></v-img>
                    <v-spacer></v-spacer>
                    <div>
                        <v-icon class="px-2 toolbar-icon"> mdi-apps </v-icon>
                        <v-icon class="px-2 toolbar-icon">
                            mdi-cog-outline
                        </v-icon>
                        <v-icon class="px-2 toolbar-icon">
                            mdi-account-outline
                        </v-icon>
                        <v-icon class="px-2 toolbar-icon"> mdi-logout </v-icon>
                    </div>
                </v-toolbar>
                <router-view></router-view>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
export default {}
</script>

<style>
.project-nav {
    max-width: 350px !important;
}

.toolbar-icon {
    cursor: pointer;
}
</style>
