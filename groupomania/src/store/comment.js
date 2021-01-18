import axios from '@/main';
import headerAuth from '@/services/headerAuth';

export default {
  stateFactory: true,
  namespaced: true,
  state: {
    error: '',
    comment: [],
    //listLength = 5,
  },
  getters: {
    comment: (state) => state.comment,
    ErrorMessage: (state) => state.error,
  },
  mutations: {
    ADD_COM(state, posts) {
      state.comment = posts
    },
    ERROR_MESSAGE(state, message) {
      state.error = message
    },
    /*SHOW_MORE(state) {
      state.listLength += 5
    },*/
    REMOVE_COM(state, idcom) {
      state.comment = state.comment.filter(com => com.id !== idcom)
    },
    CREATE_COM(state, newPost) {
      state.comment.unshift(newPost)
      state.comment = [...state.comment]
    },
  },
  actions: {
    getCom({ commit }) {
      return axios.get('/comments/', { headers: headerAuth() })
        .then(response => {
          console.log(response.data[0])
          if (response.data[0]) {
            commit('ADD_COM', response.data[0])
            return Promise.resolve(response.data);
          }
        })
        .catch((err) => {
          const message = err.response.data;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        })
    },
    deleteCom({ commit }, idcom) {
      return axios.delete(`/comments/${idcom}`, { headers: headerAuth() })
        .then((response) => {
          commit('REMOVE_COM', idcom);
          return Promise.resolve(response.data);
        })
        .catch((err) => {
          const message = err.response.data;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    },
    addCom({ commit }, data) {
      return axios.post('/posts/', data, { headers: headerAuth() })
        .then((res) => {
          commit('CREATE_COM', res.data);
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          const message = err.response.data;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    },
    likeDislikeCom({ commit }, idcom) {
      return axios.post(`/comments/${idcom}/likeCom`, {}, { headers: headerAuth() })
        .then((res) => {
          commit('LIKE', res.data);
        })
        .catch((err) => {
          const message = err.response.data;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    }
  }
}