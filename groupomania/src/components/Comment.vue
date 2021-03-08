<template>
  <div class="card-body border-light shadow mb-2">
    <div class="d-flex com">
      <img
        :src="comment.profile_picture"
        alt="profile picture"
        width="40"
        class="rounded-circle img-thumbnail mr-2 align-self-start"
      />
      <router-link
        :to="`/profile/${comment.user_iduser}`"
        v-if="comment.user_iduser !== this.iduser"
      >
        <h5 class="mr-2 pr-2 mt-2 text-danger align-self-center">
          {{ comment.username }}
        </h5></router-link
      >
      <router-link to="/profile" v-if="comment.user_iduser === this.iduser"
        ><h5 class="mr-2 pr-2 mt-2 text-danger align-self-center">
          {{ comment.username }}
        </h5></router-link
      >
      <p class="mt-2">
        {{ comment.content }}
      </p>
      <div class="dropdown delete" v-if="canDelete(comment.user_iduser)">
        <button
          role="button"
          type="button"
          class="btn bg-transparent"
          data-toggle="dropdown"
        >
          <i class="fas fa-ellipsis-v white"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" v-on:click.prevent="deleteOption()"
            >supprimer</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tokenInfo from "@/services/tokenInfo";

export default {
  name: "Comments",
  props: ["comment"],
  computed: {
    ...mapGetters({
      iduser: "Auth/Iduser",
    }),
  },
  methods: {
    ...mapActions({
      deleteCom: "Comments/deleteCom",
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
    deleteOption() {
      this.deleteCom(this.comment.idcomments).then(() => this.getAllPosts());
    },
  },
};
</script>

<style lang="scss">
.com {
  button {
    background-color: white;
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
  p {
    color: #2c3e50;
  }
  a {
    text-decoration: none;
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
</style>
