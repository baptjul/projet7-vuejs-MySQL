import axios from '@/main';
import headerAuth from '@/services/headerAuth';

export default {
  stateFactory: true,
  namespaced: true,
  state: {
    error: '',
    comments: [],
  },
  getters: {
    comment: (state) => state.comments,
    ErrorMessage: (state) => state.error,
  },
  mutations: {
    ADD_COM(state, comments) {
      comments.forEach((item) => {
        if (!state.comments.find((comment) => comment.idcomments === item.idcomments)) {
          state.comments.unshift(item);
        }
      });
    },
    ERROR_MESSAGE(state, message) {
      state.error = message
    },
    REMOVE_COM(state, idcomments) {
      state.comments = state.comments.filter(comment => comment.idcomments !== idcomments)
    },
    CREATE_COM(state, newCom) {
      state.comments.unshift(newCom)
      state.comments = [...state.comments]
    },
  },
  actions: {
    getCom({ commit }, idpost) {
      return axios.get(`/comments/${idpost}`, { headers: headerAuth() })
        .then(response => {
          commit('ADD_COM', response.data)
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          commit('ERROR_MESSAGE', error)
          return Promise.reject(error);
        })
    },
    deleteCom({ commit }, idcom) {
      return axios.delete(`/comments/${idcom}`, { headers: headerAuth() })
        .then((response) => {
          commit('REMOVE_COM', idcom);
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          commit('ERROR_MESSAGE', error)
          return Promise.reject(error);
        });
    },
    addCom({ commit }, data) {
      return axios.post('/comments/', data, { headers: headerAuth() })
        .then((res) => {
          commit('CREATE_COM', res.data);
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          commit('ERROR_MESSAGE', error)
          return Promise.reject(error);
        });
    },
    likeDislikeCom({ commit }, idcom) {
      return axios.post(`/comments/${idcom}/likeCom`, {}, { headers: headerAuth() })
        .then((res) => {
          commit('LIKE', res.data);
        })
        .catch((error) => {
          commit('ERROR_MESSAGE', error)
          return Promise.reject(error);
        });
    }
  }
}