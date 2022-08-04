<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>GUID</th>
                    <th>Name</th>
                    <th width="30%" class="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in todo.todoList.topics" :key="i">
                    <td>
                        {{ item.guid }}
                    </td>
                    <td>
                        <p class="text-primary m-0 item-name">{{ item.name }}</p>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-primary me-3"
                        @click="$store.commit('todo/SHOW_TOPIC', i)">
                            Edit
                        </button>
                        <button class="btn btn-danger" @click="deleteTopic(i)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: 'TodoList',
    data() {
        return {
            // todoList: this.$store.state.todoList.topics
        }
    },
    methods: {
        getTodos(){
            this.$store.dispatch('todo/getTodos')
        },
        deleteTopic(index) {
            const topics = this.todo.todoList.topics;
            topics.splice(index, 1)
            this.todo.todoList.topics = topics;
        },
    },
    computed: {
        ...mapState(['todo'])
    },
    created() {
        this.getTodos()
    },
}
</script>

<style scoped>
    tbody{
        vertical-align: middle !important;
    }
    /* .item-name{
        text-decoration: underline;
    }
    .item-name:hover{
        cursor: pointer;
        font-weight: bold;
    } */
</style>