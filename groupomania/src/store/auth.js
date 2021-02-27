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
    Token: (state) => state.token,
    Iduser: (state) => state.user
  },
  mutations: {
    SET_TOKEN(state, object) {
      state.logged = true;
      state.token = object.token;
      state.user = object.user;
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
          let user = jwt_decode(sessionStorage.getItem('token')).iduser
          let token = res.data.token
          let userInfo = { token, user }
          commit('SET_TOKEN', userInfo);
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
      commit('LOGOUT');
      router.push({ path: "/connexion" });
      sessionStorage.removeItem('token');
    }
  }
};
