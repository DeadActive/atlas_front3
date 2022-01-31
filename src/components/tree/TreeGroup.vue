<template>
    <div class="tree__group__wrapper">
        <div class="tree__group__header">
            <v-icon
                icon="handle"
                width="20"
                height="20"
                color="rgba(255,255,255,0.3)"
                class="tree__group__handle"
            >
            </v-icon>
            <div class="tree__group__name" v-if="value.type === 'ROOT'">
                Без группы
            </div>
            <div>{{ value.name }}</div>

            <div class="icons-group">
                <v-icon @click="removeGroup(value)" class="icon-hover"
                    >mdi-delete</v-icon
                >
                <v-icon size="20" class="icon-hover">mdi-eye</v-icon>
                <v-icon
                    size="20"
                    class="icon-hover"
                    :spin="isOpen"
                    @click="toggleLayers"
                >
                    mdi-chevron-down
                </v-icon>
            </div>
        </div>

        <draggable
            :list="layers"
            v-bind="dragOptions"
            v-if="isOpen"
            :class="{ empty: isEmpty }"
            @change="update"
        >
            <!-- <transition-group type="transition" name="flip-list"> -->
            <tree-layer
                class="item-group"
                v-for="layer in layers"
                :key="layer.id"
                :layer="layer"
            >
            </tree-layer>
            <!-- </transition-group> -->
        </draggable>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import draggable from 'vuedraggable'
import TreeLayer from './TreeLayer.vue'

export default {
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isOpen: false,
        }
    },
    components: {
        draggable,
        TreeLayer,
    },
    computed: {
        group() {
            return this.value
        },
        layers() {
            return this.value.layers
        },
        dragOptions() {
            return {
                animation: 0,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            }
        },
        isEmpty() {
            return this.layers?.length < 1
        },
    },
    methods: {
        ...mapActions('project', ['updateGroupLayers']),
        toggleLayers() {
            this.isOpen = !this.isOpen
        },
        handleRename() {
            this.renameGroup({ name: this.value.name, groupId: this.value.id })
        },
        update() {
            this.updateGroupLayers({ group: this.group, layers: this.layers })
        },
    },
}
</script>

<style lang="scss" scoped>
.tree__group {
    &__name {
        margin-left: 0.5rem;
    }

    &__handle {
        margin-left: 0.5rem;
        cursor: grab;
    }
    &__header {
        background-color: #333347;
        height: 54px;
        border-radius: 6px;
        border-left: 3px solid #1565c0;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 0.5rem;
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

    &.red:hover {
        color: #ec3731;
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

.flip-list-move {
    transition: transform 0.3s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
}

.group {
    width: 100%;
}

.empty {
    min-height: 50px;
}
</style>
