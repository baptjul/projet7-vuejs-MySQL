import axios from '@/instanceHttp';
import headerAuth from '@/services/headerAuth';

export default {
  stateFactory: true,
  namespaced: true,
  state: {
    error: '',
    posts: [],
    userPosts: [],
    likes: [],
  },
  getters: {
    Posts: (state) => state.posts,
    UserPosts: (state) => state.userPosts,
    Likes: (state) => state.likes,
    ErrorMessage: (state) => state.error,
  },
  mutations: {
    ADD_POST(state, posts) {
      state.posts = posts
    },
    ADD_USERPOST(state, posts) {
      state.userPosts = posts
    },
    LIKE(state, likes) {
      if (!state.likes.find((like) => like.idlikes === likes.idlikes)) {
        state.likes.unshift(likes);
      }
    },
    ADD_LIKES(state, newLikes) {
      state.likes = state.likes.filter(like => like.posts_idposts !== newLikes.posts_idposts)
      state.likes.push(newLikes)
    },
    REMOVE_LIKE(state, idpost) {
      state.likes = state.likes.filter(like => like.posts_idposts !== idpost)
    },
    ERROR_MESSAGE(state, message) {
      state.error = message
    },
    REMOVE_POST(state, postId) {
      state.posts = state.posts.filter(post => post.idposts !== postId)
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
          commit('ADD_POST', response.data)
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          const message = error.response;
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
        .catch((error) => {
          const message = error.response;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    },
    getUserPost({ commit }, iduser) {
      return axios.get(`/posts/${iduser}`, { headers: headerAuth() })
        .then(response => {
          commit('ADD_USERPOST', response.data)
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          const message = error.response;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        })
    },
    addPost({ commit }, data) {
      const user = JSON.parse(localStorage.getItem('token'))
      return axios.post('/posts/', data, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${user.token}` } })
        .then((response) => {
          commit('CREATE_POST', response.data);
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          const message = error.response;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    },
    getLikes({ commit }, data) {
      return axios.get(`/posts/${data.iduser}/${data.idpost}/likePost`)
        .then((response) => {
          if (response.data[0]) {
            commit('LIKE', response.data[0]);
            return Promise.resolve(response);
          }
        })
        .catch((error) => {
          const message = error.response;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(error);
        });
    },
    likeDislikePost({ commit, }, data) {
      return axios.post(`/posts/${data[0]}/likePost`, data[1], { headers: headerAuth() })
        .then((response) => {
          if (response.data[0][0] !== undefined) {
            commit('ADD_LIKES', response.data[0][0]);
          } else {
            commit('REMOVE_LIKE', data[0]);
          }
          return Promise.resolve(response.data)
        })
        .catch((error) => {
          const message = error.response;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(error);
        });
    }
  }
}