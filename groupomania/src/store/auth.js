import axios from '@/instanceHttp';
import jwt_decode from "jwt-decode";
import router from '@/router/index';

function logged() {
  const sessionInfo = sessionStorage.getItem('token')
  if (sessionInfo) {
    const tokenInfo = jwt_decode(sessionInfo)
    if (tokenInfo.iduser && tokenInfo.role) {
      return { logged: true, userid: tokenInfo.iduser }
    }
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
    LoggedUser: state => {
      return state.logged
    },
    Iduser: (state) => state.user
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
    login({ commit }, credentials) {
      return axios.post('/auth/login', credentials)
        .then((res) => {
          sessionStorage.setItem('token', JSON.stringify(res.data));
          let tokenInfo = jwt_decode(sessionStorage.getItem('token')).iduser
          commit('SET_TOKEN', res.data.token, tokenInfo);
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          const message = error.response.data;
          return Promise.reject(message);
        });
    },
    signup({ commit }, credentials) {
      return axios.post('/auth/signup', credentials)
        .then((res) => {
          sessionStorage.setItem('token', JSON.stringify(res.data));
          let tokenId = jwt_decode(sessionStorage.getItem('token')).iduser
          commit('SET_TOKEN', res.data.token, tokenId);
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          const message = error.response.data;
          return Promise.reject(message);
        });
    },
    logout({ commit }) {
      sessionStorage.removeItem('token');
      commit('LOGOUT');
      router.push({ path: "/connexion" });
    }
  }
};
