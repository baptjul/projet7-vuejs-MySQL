import axios from '@/main';
import headerAuth from '@/services/headerAuth';
import tokenInfo from "@/services/tokenInfo";

export default {
  stateFactory: true,
  namespaced: true,
  state: {
    user: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    canDelete(iduser) {
      let isAdmin = tokenInfo().role;
      const user = JSON.parse(localStorage.getItem("token")).user;
      if (user === iduser || isAdmin === "admin") {
        return true;
      }
      return false;
    },
    getUser({ commit, dispatch }, id) {
      return axios.get(`/users/${id}`, { headers: headerAuth() })
        .then((resp) => {
          console.log(resp)
          commit('setUser', resp.data);
        })
        .catch((error) => {
          if (error.response.data === 'Please login') dispatch('logout');
          return Promise.reject(error.response.data);
        });
    },
    updateUser({ commit, dispatch }, { id, data }) {
      return axios.put(`/users/${id}`, data, { headers: headerAuth() })
        .then((resp) => {
          commit('setUser', resp.data);
        })
        .catch((error) => {
          if (error.response.data === 'Please login') dispatch('logout');
          return Promise.reject(error.response.data);
        });
    },
    deleteUser({ dispatch }, id) {
      return axios.delete(`/users/${id}`, { headers: headerAuth() })
        .then((resp) => Promise.resolve(resp))
        .catch((error) => {
          if (error.response.data === 'Please login') dispatch('logout');
          return Promise.reject(error.response.data);
        });
    },
  }
};
