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
                  v-model="content"
                ></textarea>
                <img
                  id="preview"
                  class="w-50 mt-2"
                  v-if="preview"
                  :src="preview"
                />
              </div>
              <div class="under-form mt-2">
                <div class="image-upload mt-2 ml-3">
                  <label for="file-input">
                    <i class="fas fa-upload"></i>
                  </label>
                  <input
                    id="file-input"
                    ref="myFiles"
                    type="file"
                    @change="previewFiles($event)"
                  />
                </div>
                <div class="mt-2" v-if="files">
                  <i class="fas fa-check"></i>
                </div>
                <button
                  role="button"
                  type="button"
                  class="btn bg-transparent mt-2"
                  data-toggle="dropdown"
                  v-if="files"
                >
                  <i class="fas fa-times" v-on:click.prevent="removeFile()"
                    ><p class="ml-2">retirer l'image</p></i
                  >
                </button>

                <button
                  type="submit"
                  class="btn btn--light ml-auto"
                  @click="publishPost()"
                  v-if="files || content !== ''"
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
      files: null,
      preview: null,
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
    previewFiles(e) {
      this.files = this.$refs.myFiles.files[0];
      const target = e.target.files[0];
      this.preview = URL.createObjectURL(target);
      console.log(this.files);
    },
    removeFile() {
      this.files = null;
      this.preview = null;
    },
    publishPost() {
      let post = this.content;
      let iduser = this.iduser;
      let file = "";
      if (this.files) {
        file = this.files;
      }
      let body = { post, iduser, file };
      this.addPost(body)
        .then(() => this.getAllPosts())
        .then(() => (document.getElementById("post").value = ""))
        .catch((error) => console.log(error));
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
.image-upload {
  i {
    font-size: 1.8rem;
    &:hover {
      cursor: pointer;
    }
  }
  input {
    display: none;
  }
}
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
  align-items: center;
  .fa-check {
    font-size: 1.5rem;
    color: green;
  }
}
</style>
