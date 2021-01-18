import axios from '@/main';
import headerAuth from '@/services/headerAuth';

export default {
  stateFactory: true,
  namespaced: true,
  state: {
    error: '',
    posts: [],
    //listLength = 5,
  },
  getters: {
    Posts: (state) => state.posts,
    ErrorMessage: (state) => state.error,
  },
  mutations: {
    ADD_POST(state, posts) {
      state.posts = posts
    },
    ERROR_MESSAGE(state, message) {
      state.error = message
    },
    /*SHOW_MORE(state) {
      state.listLength += 5
    },*/
    REMOVE_POST(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId)
    },
    CREATE_POST(state, newPost) {
      state.posts.unshift(newPost)
      state.posts = [...state.posts]
    },
  },
  actions: {
    getAllPosts({ commit }) {
      return axios.get('/posts/', { headers: headerAuth() })
        .then(response => {
          console.log(response.data[0])
          commit('ADD_POST', response.data[0])
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          const message = error.response.data;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        })
    },
    deletePost({ commit }, idpost) {
      return axios.delete(`/posts/${idpost}`, { headers: headerAuth() })
        .then((response) => {
          commit('REMOVE_POST', idpost);
          return Promise.resolve(response.data);
        })
        .catch((err) => {
          const message = err.response.data;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    },
    addPost({ commit }, data) {
      return axios.post('/posts/', data, { headers: headerAuth() })
        .then((res) => {
          commit('CREATE_POST', res.data);
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          const message = err.response.data;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    },
    likeDislikePost({ commit }, idpost) {
      return axios.post(`/posts/${idpost}/likePost`, {}, { headers: headerAuth() })
        .then((res) => {
          commit('LIKE', res.data);
        })
        .catch((err) => {
          const message = err.response.data;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    }
  }
}