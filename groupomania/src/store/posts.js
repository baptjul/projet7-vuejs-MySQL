import axios from '@/main';
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
    ADD_LIKES(state, likes) {
      state.likes = likes
    },
    LIKE(state, newLikes) {
      state.likes.push(newLikes)
    },
    ERROR_MESSAGE(state, message) {
      state.error = message
    },
    /*SHOW_MORE(state) {
      state.listLength += 5
    },*/
    REMOVE_POST(state, postId) {
      let oldPostIndex = '';
      state.posts.forEach((item, index) => {
        if (item.id === postId) {
          oldPostIndex = index;
        }
      });
      state.posts.splice(oldPostIndex, 1);
    },
    CREATE_POST(state, newPost) {
      state.posts.push(newPost)
    },
  },
  actions: {
    getAllPosts({ commit }) {
      return axios.get('/posts/', { headers: headerAuth() })
        .then(response => {
          commit('ADD_POST', response.data[0])
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          const message = error;
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
          const message = error;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    },
    getUserPost({ commit }, iduser) {
      return axios.get(`/posts/${iduser}`, { headers: headerAuth() })
        .then(response => {
          commit('ADD_USERPOST', response.data[0])
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          const message = error;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        })
    },
    addPost({ commit }, data) {
      return axios.post('/posts/', data, { headers: headerAuth() })
        .then((res) => {
          commit('CREATE_POST', res.data);
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          const message = error;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    },
    getLikes({ commit }, iduser) {
      return axios.get(`/posts/${iduser}/likePost`, { headers: headerAuth() })
        .then((res) => {
          commit('ADD_LIKES', res.data);
        })
        .catch((error) => {
          const message = error;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    },
    likeDislikePost({ commit }, idpost, data) {
      return axios.post(`/posts/${idpost}/likePost`, data, { headers: headerAuth() })
        .then((res) => {
          commit('LIKE', res.data);
        })
        .catch((error) => {
          const message = error;
          commit('ERROR_MESSAGE', message)
          return Promise.reject(message);
        });
    }
  }
}