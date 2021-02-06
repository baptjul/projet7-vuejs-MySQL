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
        <router-link to="`/profile`"
          ><h3 class="profil_link">{{ post.username }}</h3></router-link
        >
        <div class="ml-3 blockquote-footer">{{ getTodayDate }}</div>
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
      <div class="picturePost">
        {{ post.image_content }}
      </div>
      <p class="content">
        {{ post.text_content }}
      </p>
      <div class="d-flex vues">
        <div class="vues__likes mr-2">
          <a href="#"><i class="fas fa-heart"></i></a>
          <span class="mx-2">{{ post.Likes }}</span>
        </div>
        <div class="vues__dislikes mr-2">
          <a href="#"><i class="fas fa-heart-broken"></i></a>
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
          v-for="comment in Comments"
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
      Comments: "Comments/comment",
      iduser: "Auth/iduser",
    }),
    comments() {
      console.log(
        this.Comments.filter((item) => item.post_idpost === this.post.idposts)
      );
      return this.Comments.filter(
        (item) => item.post_idpost === this.post.idposts
      );
    },
    getTodayDate() {
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
      addCom: "Comments/addCom",
      getCom: "Comments/getCom",
    }),

    canDelete(iduser) {
      let isAdmin = tokenInfo().role;
      const user = JSON.parse(sessionStorage.getItem("token")).user;
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
      this.addCom(fullPost).then(() => this.getCom());
    },
    likes() {
      this.likeDislikePost(this.post.idposts);
    },
    getComment() {
      this.getCom(this.post.idposts);
    },
  },
  created() {
    this.getComment();
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
        cursor: pointer;
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
    max-height: 300px;
    width: auto;
  }
}
.vues {
  font-size: 1.3rem;
  i {
    text-decoration: none;
    color: #be2635c7;
  }
  a {
    :hover {
      transform: rotate(360deg);
      transition: all 0.2s;
    }
  }
}
.comment-title p {
  font-size: 0.9rem;
  color: white;
}
.comArea {
  scrollbar-width: thin;
  max-height: 275px;
  overflow-y: scroll;
}
</style>
