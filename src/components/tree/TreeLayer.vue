<template>
    <div class="tree__layer">
        <div class="tree__layer__content" :class="layerTypeClass">
            <v-icon size="18" @click="toggleShow"> mdi-eye </v-icon>
            <!-- <v-icon
                :icon="layerTypeClass"
                width="24"
                height="24"
                color="#fff"
                class="tree__layer__type"
            ></v-icon> -->
            <div class="tree__layer__name">
                {{ layer.name }}
            </div>
            <div class="icons-group">
                <v-icon size="20" class="icon-hover">mdi-pencil</v-icon>
                <v-icon icon="location" size="20" @click="flyToHandler">
                    mdi-crosshairs-gps
                </v-icon>
                <v-icon size="20" class="icon-hover">
                    mdi-information-outline</v-icon
                >
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

const layerTypesClasses = {
    VECTOR: 'vector',
    RASTER: 'raster',
    MODEL: 'model',
}

export default {
    props: {
        layer: {
            type: Object,
            required: true,
        },
    },
    methods: {
        ...mapActions('deck', ['loadLayer']),
        toggleShow() {
            if (this.layer.imageryLayer) {
                this.layer.imageryLayer.show = !this.layer.imageryLayer.show
                return
            }

            this.prepareLayer()
        },
        async flyToHandler() {
            if (this.layer.imageryLayer) {
                this.$cesium.flyToLayer(this.layer.imageryLayer)
                return
            }

            await this.loadLayer(this.layer)
            this.$cesium.flyToLayer(this.layer.imageryLayer)
        },
        prepareLayer() {
            this.loadLayer(this.layer)
        },
    },
    computed: {
        layerTypeClass() {
            return layerTypesClasses[this.layer.layerType]
        },
        iconEye() {
            return this.layer.imageryLayer?.show ? 'eye' : 'eyeClosed'
        },
    },
}
</script>

<style lang="scss" scoped>
.tree__layer {
    max-width: 100%;
    font-size: 14px;

    &__content {
        background-color: #333347;
        margin: 0 0 0 1.5rem;
        min-height: 42px;
        border-radius: 6px;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: grab;
        margin-bottom: 0.5rem;
    }

    &__name {
        margin-left: 4px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-flex;
    }

    &__eye {
        margin-left: 0.5rem;
        cursor: pointer;
        min-width: 18px;
    }

    &__type {
        margin-left: 4px;
        min-width: 24px;
    }
}

.icon-hover {
    color: rgba(255, 255, 255, 0.3);
    transition: 0.2s all ease;
    cursor: pointer;
    margin-left: 4px;
    &:hover {
        color: #fff;
    }
}

.icons-group {
    margin-left: auto;
    margin-right: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.raster {
    border-left: 3px solid #1bd138;
}
.vector {
    border-left: 3px solid #d17d1b;
}
.model {
    border-left: 3px solid #d11b25;
}
</style>
