import axios from '@/main';

const store = JSON.parse(localStorage.getItem('token'));

export default {
  stateFactory: true,
  namespaced: true,
  state: {
    token: store,
    user: null
  },
  getters: {
    loggedUser: state => {
      return state.token
    }
  },
  mutations: {
    SET_TOKEN(state, token, user) {
      state.user = user;
      state.token = token;
    },
    LOGOUT(state) {
      state.token = null;
      state.user = null;
    }
  },
  actions: {
    login({ dispatch }, credentials) {
      return axios.post('/auth/login', credentials)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem('token', JSON.stringify(res.data));
          }
          dispatch('attempt', res.data.token, res.data.user);
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          const message = error.response.data;
          return Promise.reject(message);
        });
    },
    signup({ dispatch }, credentials) {
      return axios.post('/auth/signup', credentials)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem('token', JSON.stringify(res.data));
          }
          dispatch('attempt', res.data.token, res.data.user);
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          const message = error.response.data;
          return Promise.reject(message);
        });
    },
    attempt({ commit }, token, user) {
      commit('SET_TOKEN', token, user)
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('LOGOUT');
      document.location.reload();
    }
  }
};
