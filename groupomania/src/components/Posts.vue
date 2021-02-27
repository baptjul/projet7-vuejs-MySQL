<template>
  <!-- Post -->
  <div class="card mb-4 posts">
    <div class="card-header secondary text-light">
      <div class="d-flex align-items-center">
        <img
          :src="post.profile_picture"
          alt="profil picture"
          width="45"
          class="mr-3 rounded-circle img-thumbnail shadow-sm"
        />
        <router-link
          :to="`/profile/${post.user_iduser}`"
          v-if="post.user_iduser !== this.iduser"
        >
          <h3 class="profil_link mt-1">{{ post.username }}</h3></router-link
        >
        <router-link to="/profile" v-if="post.user_iduser === this.iduser"
          ><h3 class="profil_link mt-1">{{ post.username }}</h3></router-link
        >
        <div class="ml-3 blockquote-footer">{{ timeSincePost }}</div>
        <!-- delete button -->
        <div class="dropdown delete" v-if="canDelete(post.user_iduser)">
          <button
            role="button"
            type="button"
            class="btn bg-transparent"
            data-toggle="dropdown"
          >
            <i class="fas fa-ellipsis-v white"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" v-on:click.prevent="delPost()"
              >supprimer</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <img
        :src="post.image_content"
        alt="post picture"
        width="45"
        class="ml-auto shadow-sm picturePost"
        v-if="post.image_content"
      />
      <p class="content">
        {{ post.text_content }}
      </p>
      <div class="d-flex vues">
        <div class="mr-2">
          <a v-on:click.prevent="likes(1)"
            ><i class="fas fa-heart" v-bind:class="filterLike"></i
          ></a>
          <span class="mx-2">{{ post.Likes }}</span>
        </div>
        <div class="mr-2">
          <a v-on:click.prevent="likes(-1)"
            ><i class="fas fa-heart-broken" v-bind:class="filterDislike"></i
          ></a>
          <span class="mx-2">{{ post.Dislikes }}</span>
        </div>
        <div class="vues__comments ml-auto">
          <i class="fas fa-comment"></i>
          <span class="mx-2">{{ post.Comments }}</span>
        </div>
      </div>
    </div>
    <hr />
    <!-- Commentaire -->
    <div class="card">
      <div class="card-header secondary">
        <label for="comment" class="font-weight-bold comment-title"
          ><p class="text-light">Un commentaire ?</p></label
        >
        <textarea
          @input="autoResize"
          class="form-control textarea"
          id="comment"
          rows="1"
          placeholder="Poster un commentaire"
          required
          v-model="content"
        ></textarea>
        <button
          type="submit"
          class="btn btn--light float-right mt-2"
          v-on:click.prevent="createCom()"
        >
          répondre
        </button>
      </div>
      <hr />
      <div class="comArea">
        <Comment
          v-for="comment in filterCom"
          :key="comment.idcomments"
          :comment="comment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import { mapGetters, mapActions } from "vuex";
import tokenInfo from "@/services/tokenInfo";

export default {
  name: "Posts",
  components: {
    Comment,
  },
  props: ["post"],
  data() {
    return {
      show: false,
      content: "",
    };
  },
  computed: {
    ...mapGetters({
      Comments: "Comments/Comment",
      iduser: "Auth/Iduser",
      Likes: "Posts/Likes",
    }),
    filterCom() {
      return this.Comments.filter(
        (com) => com.posts_idposts === this.post.idposts
      );
    },
    filterLike() {
      const call = this.Likes.filter(
        (like) => like.posts_idposts === this.post.idposts
      );
      if (call[0] !== undefined && call[0].likes) {
        return "active";
      }
      return "inactive";
    },
    filterDislike() {
      const call = this.Likes.filter(
        (like) => like.posts_idposts === this.post.idposts
      );
      if (call[0] !== undefined && call[0].dislikes) {
        return "active";
      }
      return "inactive";
    },
    timeSincePost() {
      const date = new Date();
      let postDate = new Date(this.post.time_post);

      let seconds = Math.floor((date - postDate) / 1000);

      let interval = seconds / 31536000;

      if (interval > 1) {
        return "il y a " + Math.floor(interval) + " ans";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return "il y a " + Math.floor(interval) + " mois";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return "il y a " + Math.floor(interval) + " jours";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return "il y a " + Math.floor(interval) + " heures";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return "il y a " + Math.floor(interval) + " minutes";
      }
      return "il y a " + Math.floor(seconds) + " secondes";
    },
  },
  methods: {
    ...mapActions({
      deletePost: "Posts/deletePost",
      likeDislikePost: "Posts/likeDislikePost",
      getLikes: "Posts/getLikes",
      getUserPost: "Posts/getUserPost",
      addCom: "Comments/addCom",
      getCom: "Comments/getCom",
      getAllPosts: "Posts/getAllPosts",
    }),
    canDelete(iduser) {
      let isAdmin = tokenInfo().role;
      const user = this.iduser;
      if (user === iduser || isAdmin === "admin") {
        return true;
      }
      return false;
    },
    // resize des zones de textes
    autoResize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
    delPost() {
      this.deletePost(this.post.idposts);
    },
    createCom() {
      let content = this.content;
      let idposts = this.post.idposts;
      let iduser = this.iduser;
      const fullPost = { content, idposts, iduser };
      this.addCom(fullPost)
        .then(() => this.getCom(this.post.idposts))
        .then(() => (this.content = ""))
        .then(() => this.getAllPosts())
        .catch((error) => console.log(error));
    },
    likes(value) {
      let idpost = this.post.idposts;
      let iduser = this.iduser;
      let likes = value;
      const body = { iduser, likes };
      const data = [idpost, body];
      this.likeDislikePost(data)
        .then(() => this.getAllPosts())
        .then(() => this.getUserPost(this.iduser))
        .then(() => this.likesFetch());
    },
    likesFetch() {
      const idpost = this.post.idposts;
      const iduser = this.iduser;
      const data = { iduser, idpost };
      this.getLikes(data).catch((error) => console.log(error));
    },
    getComment() {
      this.getCom(this.post.idposts).catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getComment();
    this.likesFetch();
  },
};
</script>

<style lang="scss">
.posts {
  button {
    background-color: white;
    border: none;
    .btn--light {
      color: black;
    }
  }
  .delete {
    margin-left: auto;
    .dropdown button {
      color: white;
      &:hover {
        color: white;
      }
    }
  }
  .blockquote-footer {
    color: rgb(207, 207, 207);
  }
  .content {
    font-size: 1.15rem;
    font-weight: bold;
    color: #2c3e50;
  }
  .picturePost {
    min-width: 100%;
    height: auto;
  }
}
.vues {
  font-size: 1.3rem;
  a {
    :hover {
      transform: rotate(360deg);
      transition: all 0.2s;
    }
  }
  .inactive {
    text-decoration: none;
    color: grey; //#be2635c7
    &:hover {
      color: #be2635c7;
    }
  }
  .active {
    text-decoration: none;
    color: #be2635c7;
  }
}
.comment-title p {
  font-size: 0.9rem;
  color: white;
}
.comArea {
  scrollbar-width: thin;
  max-height: 280px;
  overflow-y: scroll;
}
</style>
