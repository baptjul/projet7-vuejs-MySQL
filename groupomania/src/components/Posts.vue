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
        <router-link class="" to="/profile"
          ><h3 class="profil_link">{{ post.username }}</h3></router-link
        >
        <div class="ml-3 blockquote-footer">il y a 18h</div>
        <!-- delete button -->
        <div class="dropdown delete" v-if="canDel(post.user_iduser)">
          <button
            role="button"
            type="button"
            class="btn bg-transparent"
            data-toggle="dropdown"
          >
            <i class="fas fa-ellipsis-v white"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">supprimer</a>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <p>
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
      <div class="card-body secondary">
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
        ></textarea>
        <button type="submit" class="btn btn--light float-right mt-2">
          répondre
        </button>
      </div>
      <hr />
      <Comment />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import { mapActions } from "vuex";

export default {
  name: "Posts",
  components: {
    Comment,
  },
  props: ["post"],
  methods: {
    ...mapActions({
      candelete: "Users/canDelete",
    }),
    canDel(iduser) {
      this.candelete(iduser);
    },
    // resize des zones de textes
    autoResize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
    check() {
      return this.posts;
    },
  },
};
</script>

<style lang="scss">
.posts {
  button {
    background-color: white;
    .btn--light {
      color: black;
    }
  }
  .delete {
    margin-left: auto;
  }
  .blockquote-footer {
    color: rgb(207, 207, 207);
  }
  p {
    font-weight: bold;
    color: #2c3e50;
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
  color: white;
}
.dropdown button {
  color: white;
  &:hover {
    color: white;
  }
}
</style>
