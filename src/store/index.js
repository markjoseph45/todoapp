import { createStore } from 'vuex'
import TodoModule from './modules/todos.js'

export default createStore({
  modules: {
    todo: TodoModule
  }
})
