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
                <tr v-for="(item, i) in filTopics" :key="i">
                    <td>
                        {{ item.guid }}
                    </td>
                    <td>
                        <p class="text-primary m-0 item-name">{{ item.name }}</p>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-primary me-3"
                        @click="$store.commit('todo/SHOW_TOPIC', item.guid)">
                            Edit
                        </button>
                        <button class="btn btn-danger" @click="deleteTopic(item.guid)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="row mt-5 pagination-wrapper">
            <nav class="d-flex justify-content-center">
                <ul class="pagination">
                    <li :class="['page-item', (pagination.activePage == 1) ? 'disabled' : '']">
                        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getLinks(Number(pagination.activePage) - 1)">
                            <span aria-hidden="true">Prev</span>
                        </a>
                    </li>
                    <li :class="['page-item', (n == pagination.activePage) ? 'active' : '']" :key="i"
                    v-for="(n, i) in getPageNumbers(pagination.startPage, pagination.endPage)">
                        <a class="page-link" href="#" @click.prevent="getLinks(n)">{{ n }}</a>
                    </li>
                    <li :class="['page-item', (pagination.activePage == pagination.lastPage) ? 'disabled' : '']">
                        <a class="page-link" href="#" aria-label="Next" @click.prevent="getLinks(Number(pagination.activePage) + 1)">
                            <span aria-hidden="true">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
                
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: 'TodoList',
    data() {
        return {
            allTopics: [],
            filTopics: [],
            pagination: {
                lastPage: '',
                activePage: 1,
                startPage: 0,
                endPage: 0
            },
        }
    },
    methods: {
        getTodos(){
            this.$store.dispatch('todo/getTodos')
        },
        deleteTopic(guid) {
            this.$store.commit('todo/DELETE_TOPIC', guid)
        },
        getPageNumbers: function(start,end){
            end = end + 1;
            return new Array(end - start).fill(start).map((n,i)=>n+i);
        },
        getLinks(page){
            let length = this.allTopics.length
            let countPerPage = 10;
            let activePage = page;
            let lastPage = Math.ceil(length / countPerPage);
            let startPage, endPage;
            if(lastPage <= 7){ // less or eqaul to 7 pages
                startPage = 1;
                endPage = lastPage
            }else if((Number(activePage) + 3) > lastPage){ // if activepage is near the last page
                startPage = Number(lastPage) - 6
                endPage = lastPage;
            }else{ // get the active link in between
                startPage = Number(activePage) - 3;
                endPage = Number(activePage) + 3;
                if(startPage < 1){
                    startPage = 1;
                    endPage = 7
                }
            }
            this.pagination = {
                lastPage: lastPage,
                activePage: activePage,
                startPage: startPage,
                endPage: endPage
            }
            let startSlice = (activePage * 10) - 10;
            let endSlice = startSlice + 10;
            const filteredTopics = this.allTopics.slice(startSlice, endSlice)
            this.filTopics = filteredTopics;
        }

    },
    computed: {
        ...mapState(['todo']),
        getTopics(){
            return this.$store.state.todo.todoList.topics
        }
    },
    watch:{
        getTopics(val){
            this.allTopics = val
            this.getLinks(this.pagination.activePage)
        }
    },
    created() {
        this.getTodos()
    }
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