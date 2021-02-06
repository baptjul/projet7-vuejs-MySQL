<template>
  <div class="container">
    <div class="row mt-4 justify-content-center">
      <!-- Profil utilisateur -->
      <div class="col-md-12 col-lg-4">
        <UserHome />
      </div>
      <!-- interface d'utilisation -->
      <div class="col-md-12 feed col-lg-8">
        <!-- Poste de massage -->
        <div class="card mb-2 text-light">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="post"><h2>Quelque chose à dire ?</h2></label>
                <textarea
                  @input="autoResize"
                  class="form-control"
                  id="post"
                  rows="3"
                  placeholder="Ecrivez-quelque chose !"
                  required
                  v-model="content"
                ></textarea>
              </div>
              <div class="under-form">
                <input
                  type="file"
                  class="form-control-file pt-1"
                  id="post_picture"
                />

                <button
                  type="submit"
                  class="btn btn--light float-right"
                  @click="publishPost()"
                >
                  Poster
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- Affichage des posts -->
        <div class="jumbotron">
          <Posts v-for="post in Posts" :key="post.idposts" :post="post" />
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Posts from "@/components/Posts.vue";
import UserHome from "@/components/userHome";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    Posts,
    UserHome,
  },
  data() {
    return {
      content: "",
    };
  },
  computed: {
    ...mapGetters({
      Posts: "Posts/Posts",
      iduser: "Auth/iduser",
    }),
  },
  methods: {
    ...mapActions({
      getAllPosts: "Posts/getAllPosts",
      addPost: "Posts/addPost",
      getUser: "Users/getUser",
    }),
    // resize des zones de textes
    autoResize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
    publishPost() {
      let post = this.content;
      let iduser = this.iduser;
      let body = { post, iduser };
      this.addPost(body);
    },
    async fetchPost() {
      await this.getAllPosts();
    },
  },
  created() {
    this.getAllPosts();
    this.getUser(JSON.parse(sessionStorage.getItem("token")).user);
    this.$nextTick(() => {
      this.$el.setAttribute("style", "height", `${this.$el.scrollHeight}px`);
    });
  },
};
</script>

<style lang="scss">
.feed {
  button {
    background-color: white;
    .btn--light {
      color: black;
    }
  }
  p {
    color: #2c3e50;
  }
}
.under-form {
  display: flex;
}
</style>
