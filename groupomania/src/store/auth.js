import axios from '@/instanceHttp';

function logged() {
  const sessionInfo = JSON.parse(sessionStorage.getItem('token'))
  if (sessionInfo) {

    return { logged: true, userid: sessionInfo.user }
  }
  return { logged: false, userid: null }
}


export default {
  stateFactory: true,
  namespaced: true,
  state: {
    logged: logged().logged,
    token: null,
    user: logged().userid
  },
  getters: {
    loggedUser: state => {
      return state.logged
    },
    iduser: (state) => state.user
  },
  mutations: {
    SET_TOKEN(state, token, user) {
      state.logged = true;
      state.user = user;
      state.token = token;
    },
    LOGOUT(state) {
      state.logged = false;
      state.token = null;
      state.user = null;
    }
  },
  actions: {
    login({ dispatch }, credentials) {
      return axios.post('/auth/login', credentials)
        .then((res) => {
          if (res.data.token) {
            sessionStorage.setItem('token', JSON.stringify(res.data));
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
            sessionStorage.setItem('token', JSON.stringify(res.data));
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
      sessionStorage.removeItem('token');
      commit('LOGOUT');
      document.location.reload();
    }
  }
};
