import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './auth';
import Posts from './posts';
import Comments from './comment';
import Users from './users';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Posts,
    Comments,
    Users
  }
})
