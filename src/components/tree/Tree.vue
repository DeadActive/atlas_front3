<template>
    <div class="tree__wrapper">
        <draggable
            :value="groups"
            v-bind="dragOptions"
            @input="setGroups"
            handle=".tree__group__handle"
        >
            <!-- <transition-group type="transition" name="flip-list"> -->
            <tree-group
                v-for="group in groups"
                :key="group.id"
                :value="group"
            ></tree-group>
            <!-- </transition-group> -->
        </draggable>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import TreeGroup from './TreeGroup'

export default {
    methods: {
        ...mapActions('Project', ['setGroups']),
    },
    computed: {
        ...mapGetters('project', ['groups']),
        dragOptions() {
            return {
                animation: 0,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            }
        },
    },
    watch: {
        groups(value) {
            this.$log.debug('Groups watch', value)
        },
    },
    components: {
        draggable,
        TreeGroup,
    },
}
</script>

<style lang="scss" scoped>
.tree__wrapper {
    display: flex;
    flex-direction: column;
    max-width: 90%;
    width: 100%;
    //align-self: start;
    margin-left: 12px;
}
</style>
