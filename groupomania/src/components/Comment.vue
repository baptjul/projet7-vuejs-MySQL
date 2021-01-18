<template>
  <div class="card border-light shadow">
    <div class="card-header secondary text-light">
      <div class="d-flex align-items-center shado">
        <img
          :src="comment.profile_picture"
          alt="..."
          width="40"
          class="mr-3 rounded-circle img-thumbnail"
        />
        <router-link class="d-flex" to="/profile"
          ><h5 class="profil_link">{{ comment.username }}</h5>
          <div class="ml-3 blockquote-footer">il y a 18h</div>
        </router-link>
        <!-- delete button -->
        <div class="dropdown delete" v-if="canDel(comment.user_iduser)">
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
        {{ comment.content }}
      </p>
      <div class="d-flex vues">
        <div class="vues__likes mr-2">
          <a href="#"><i class="fas fa-heart"></i></a>
          <span class="mx-2">{{ comment.Likes }}</span>
        </div>
        <div class="vues__dislikes mr-2">
          <a href="#"><i class="fas fa-heart-broken"></i></a>
          <span class="mx-2">{{ comment.Dislikes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Comments",
  props: ["comment"],
  methods: {
    ...mapActions({
      candelete: "Users/canDelete",
      deleteCom: "Comments/deleteCom",
    }),
    canDel(iduser) {
      this.candelete(iduser);
    },
    deleteOption() {
      this.deleteComment(this.comment.idcomments).then(() => {
        this.$emit("getCom");
      });
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
    color: #2c3e50;
  }
}
.vues {
  font-size: 1.5rem;
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
