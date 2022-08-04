import axios from 'axios'

export default {
    namespaced: true,
    state: {
        todoList: [],
        topic: {
            name: '',
            guid: '',
            comments: []
        },
        showModal: false,
        editingIndex: null
      },
      getters: {
        getShowModal: state => state.showModal
      },
      mutations: {
    
        GET_TODOS(state, payload){
          state.todoList = payload
        },

        ADD_TODOS(state, payload){
            state.todoList.topics = [payload, ...state.todoList.topics]
            state.todoList = {...state.todoList}
            state.showModal = false;
        },

        UPDATE_TOPIC(state, payload){
          const topics = state.todoList.topics;
          topics[state.editingIndex] = payload;
          state.todoList.topics = topics;
          state.editingIndex = null;
          state.showModal = false;
        },

        SHOW_TOPIC(state, payload){
            state.showModal = true;
            state.editingIndex = payload;
            state.topic = Object.assign({}, state.todoList.topics[payload])
        },

        REVERT_TOPIC(state, payload){
          state.editingIndex = null;
          state.topic = {
              name: '',
              guid: '',
              comments: []
          }
        }
    
      },
      actions: {

        getTodos({ commit }){
          axios({
            url: 'https://atillc.blob.core.windows.net/data-collector/icode/test-data/topics.json',
            method: 'get'
          })
          .then(res => {
            console.log(res)
            commit('GET_TODOS', res.data)
          })
          .catch(error => {
            console.log(`Error ${error}`)
          })
        }

      },
}