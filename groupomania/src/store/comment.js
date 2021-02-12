import axios from '@/instanceHttp';
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
          commit('ERROR_MESSAGE', error.response.data)
          return Promise.reject(error.response.data);
        })
    },
    deleteCom({ commit }, idcom) {
      return axios.delete(`/comments/${idcom}`, { headers: headerAuth() })
        .then((response) => {
          commit('REMOVE_COM', idcom);
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          commit('ERROR_MESSAGE', error.response.data)
          return Promise.reject(error.response.data);
        });
    },
    addCom({ commit }, body) {
      return axios.post('/comments/', body, { headers: headerAuth() })
        .then((res) => {
          commit('CREATE_COM', res.data);
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          commit('ERROR_MESSAGE', error.response.data)
          return Promise.reject(error.response.data);
        });
    },
    likeDislikeCom({ commit }, idcom) {
      return axios.post(`/comments/${idcom}/likeCom`, {}, { headers: headerAuth() })
        .then((res) => {
          commit('LIKE', res.data);
        })
        .catch((error) => {
          commit('ERROR_MESSAGE', error.response.data)
          return Promise.reject(error.response.data);
        });
    }
  }
}