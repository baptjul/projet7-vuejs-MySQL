import axios from '@/instanceHttp';
import headerAuth from '@/services/headerAuth';
import router from '@/router/index';

export default {
  stateFactory: true,
  namespaced: true,
  state: {
    user: [],
  },
  getters: {
    User: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    REMOVE_USER(state) {
      state.user = []
    }
  },
  actions: {
    getUser({ commit }, iduser) {
      return axios.get(`/auth/user/${iduser}`, { headers: headerAuth() })
        .then((response) => {
          commit('setUser', response.data[0]);
          Promise.resolve(response)
        })
        .catch((error) => {
          return Promise.reject(error.response.data);
        });
    },
    updateUser({ commit }, object) {
      return axios.put(`/auth/user/${object.iduser}`, object.body, { headers: headerAuth() })
        .then((response) => {
          commit('setUser', response.data[0]);
          Promise.resolve(response)
        })
        .catch((error) => {
          return Promise.reject(error.response.data);
        });
    },
    updatePicture({ commit }, data) {
      return axios.put(`/auth/user/${data.iduser}/picture`, data.body, { headers: headerAuth() })
        .then((response) => {
          commit('setUser', response.data[0]);
          Promise.resolve(response)
        })
        .catch((error) => {
          return Promise.reject(error.response.data);
        });
    },
    deleteUser({ commit }, iduser) {
      return axios.delete(`/auth/${iduser}`, { headers: headerAuth() })
        .then((response) => {
          commit('REMOVE_USER')
          router.push({ path: "/" });
          Promise.resolve(response)
        })
        .catch((error) => {
          return Promise.reject(error.response.data);
        });
    },
  }
};
