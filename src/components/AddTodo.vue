<template>

<div class="modal" tabindex="-1" id="addTopicModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ (todo.editingIndex != null) ? 'Update' : 'Add' }} Topic</h5>
        <button type="button" class="btn-close" @click="$store.state.todo.showModal = false"></button>
      </div>
      <div class="modal-body">
        
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="todo.topic.name" />
        </div>
        <div class="mb-3">
            <label for="guid" class="form-label">Guid</label>
            <input type="text" class="form-control" id="guid" v-model="todo.topic.guid" />
        </div>
        <div class="mb-3">
            <label for="comment" class="form-label">Add Comment</label>
            <input type="text" class="form-control" id="comment" v-model="commentText" @keyup.enter="addComment" />
        </div>
        <div class="mb-3">
            <label for="guid" :class="['form-label', (todo.topic.comments.length) ? '' : 'text-danger']">
                {{ (todo.topic.comments.length) ? 'Comment List' : 'No comments to be displayed' }}
            </label>
            <ul>
                <li v-for="(item, i) in todo.topic.comments" :key="i">
                    <span>{{ item.comment }}</span>
                    <small class="text-primary ms-3" @click="editComment(i)">Edit</small>
                    <small class="text-danger ms-2" @click="deleteComment(i)">Delete</small>
                </li>
            </ul>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="$store.state.todo.showModal = false">Close</button>
        <button type="button" class="btn btn-primary" @click="saveTodo">Submit</button>
      </div>
    </div>
  </div>
</div>
    
 <button class="btn btn-primary mt-5 mb-5" @click="$store.state.todo.showModal = true">
    Add Topic
 </button>

</template>
<script>
import { Modal } from 'bootstrap'
import { mapState } from 'vuex'
// import todos from '@/store/modules/todos'

export default {
    name: 'AddTodo',
    data() {
        return {
            addTopicModal: null,
            editIndex: null,
            commentText: ''
        }
    },
    methods: {
        addComment(){
            if(this.editIndex != null){
                this.updateComment()
            }else{
                const newComment = {
                    by: '',
                    comment:  this.commentText,
                    date: ''
                }
                this.todo.topic.comments = [
                    ...this.todo.topic.comments,
                    newComment
                ]
            }
            this.commentText = '';
        },
        editComment(index) {
            this.editIndex = index;
            this.commentText = this.todo.topic.comments[index].comment;
        },
        deleteComment(index) {
            const comments = this.todo.topic.comments;
            comments.splice(index, 1)
            this.todo.topic.comments = comments;
        },
        updateComment(){
            const comments = this.todo.topic.comments;
            comments[this.editIndex] = {
                by: '',
                comment:  this.commentText,
                date: ''
            }
            this.todo.topic.comments = comments
            this.editIndex = null
        },
        saveTodo(){
            if(this.todo.editingIndex != null){
                this.$store.commit('todo/UPDATE_TOPIC', this.todo.topic)
            }else{
                this.$store.commit('todo/ADD_TODOS', this.todo.topic)
            }
        }
    },
    computed: {
        ...mapState(['todo']),
        getModalStatus(){
            return this.$store.state.todo.showModal
        }
    },
    watch:{
        getModalStatus(val){
            if(val){
                this.addTopicModal.show()
            }else{
                this.$store.commit('todo/REVERT_TOPIC');
                this.addTopicModal.hide()
            }
        }
    },
    mounted() {
        this.addTopicModal = new Modal(document.getElementById('addTopicModal'))
    }
}
</script>
<style scoped>
    ul li small:hover{
        cursor: pointer;
    }
</style>