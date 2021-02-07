<template>
  <div class="card-body border-light shadow mb-2">
    <div class="d-flex com">
      <img
        :src="comment.profile_picture"
        alt="..."
        width="40"
        class="rounded-circle img-thumbnail mr-2"
      />
      <router-link to="/profile"
        ><h5 class="mr-2 text-danger">{{ comment.username }} :</h5>
      </router-link>
      <p>
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
      <!--<div class="d-flex vues">
        <div class="vues__likes mr-2">
          <a href="#"><i class="fas fa-heart"></i></a>
          <span class="mx-2">{{ comment.Likes }}</span>
        </div>
        <div class="vues__dislikes mr-2">
          <a href="#"><i class="fas fa-heart-broken"></i></a>
          <span class="mx-2">{{ comment.Dislikes }}</span>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import tokenInfo from "@/services/tokenInfo";

export default {
  name: "Comments",
  props: ["comment"],
  methods: {
    ...mapActions({
      deleteCom: "Comments/deleteCom",
    }),
    canDelete(iduser) {
      let isAdmin = tokenInfo().role;
      const user = JSON.parse(sessionStorage.getItem("token")).user;
      if (user === iduser || isAdmin === "admin") {
        return true;
      }
      return false;
    },
    deleteOption() {
      this.deleteCom(this.comment.idcomments);
    },
  },
};
</script>

<style lang="scss">
.com {
  align-items: center;
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
