import axios from '@/main';
import headerAuth from '@/services/headerAuth';

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
  },
  actions: {
    getUser({ commit }, id) {
      return axios.get(`/auth/user/${id}`, { headers: headerAuth() })
        .then((response) => {
          commit('setUser', response.data[0]);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    updateUser({ commit }, { id, data }) {
      return axios.put(`auth/user/${id}`, data, { headers: headerAuth() })
        .then((response) => {
          commit('setUser', response.data[0]);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    deleteUser(id) {
      return axios.delete(`/auth/${id}`, { headers: headerAuth() })
        .then((response) => { Promise.resolve(response) })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  }
};
