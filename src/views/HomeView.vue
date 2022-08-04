<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <HeaderView />
        <AddTodo />
        <TodoList />
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderView from './HeaderView.vue'
import TodoList from '@/components/TodoList.vue'
import AddTodo from '@/components/AddTodo.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderView,
    TodoList,
    AddTodo
  },
  methods: {
  },
}
</script>
