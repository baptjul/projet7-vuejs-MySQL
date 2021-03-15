<template>
  <div class="container emp-profile">
    <form method="post">
      <div class="row">
        <div class="col-md-5">
          <div class="profile-img">
            <img :src="this.User.profile_picture" alt="profil picture" />
          </div>
        </div>
        <div class="col-md-7">
          <div class="profile-head">
            <h4>
              {{ this.User.username }}
            </h4>
            <h5 class="mt-1" v-show="this.User.position">
              {{ this.User.position }}
            </h5>
            <h6 class="mt-1" v-show="this.User.description">
              {{ this.User.description }}
            </h6>
            <h6
              class="mt-1 font-weight-light font-italic"
              v-show="!this.User.description"
            >
              {{ defaultDescription }}
            </h6>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 mt-3">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                >Posts</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                >Profil</a
              >
            </li>
          </ul>
        </div>
        <div class="col-lg-10">
          <hr />
          <div class="tab-content profile-tab" id="myTabContent">
            <div
              class="tab-pane fade show active mt-2"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <Posts
                v-for="post in userPosts"
                :key="post.idposts"
                :post="post"
              />
              <div v-if="userPosts.length === 0" class="mt-4">
                <p>L'utilisateur pas encore de post</p>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div class="row justify-content-center">
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-md-4"><label>Pseudo:</label></div>
                    <div class="col-md-8">
                      <p>{{ this.User.username }}</p>
                    </div>
                  </div>
                  <div class="row" v-if="this.User.lastname">
                    <div class="col-md-4"><label>Nom:</label></div>
                    <div class="col-md-8">
                      <p>{{ this.User.lastname }}</p>
                    </div>
                  </div>
                  <div class="row" v-if="this.User.firstname">
                    <div class="col-md-4"><label>Prenom:</label></div>
                    <div class="col-md-8">
                      <p>{{ this.User.firstname }}</p>
                    </div>
                  </div>
                  <div class="row" v-if="this.User.position">
                    <div class="col-md-4"><label>Post:</label></div>
                    <div class="col-md-8">
                      <p>{{ this.User.position }}</p>
                    </div>
                  </div>
                  <div class="row" v-if="this.User.birthday">
                    <div class="col-md-4"><label>Anniversaire:</label></div>
                    <div class="col-md-8">
                      <p>{{ splitDate()[0] }}</p>
                    </div>
                  </div>
                  <div class="row" v-if="this.User.description">
                    <div class="col-md-4"><label>Description:</label></div>
                    <div class="col-md-8">
                      <p>
                        {{ this.User.description }}
                      </p>
                    </div>
                  </div>
                  <input
                    type="submit"
                    class="profile-edit-btn mt-4 mr-1"
                    name="btnAddMore"
                    value="supprimer compte"
                    v-on:click="del = !del"
                    v-if="isAdmin() && !del"
                  />
                  <div class="d-flex align-items-center">
                    <p v-if="del" class="mt-2">
                      Etes-vous sur de vouloir supprimer le compte
                    </p>
                    <button
                      type="submit"
                      class="profile-edit-btn mr-1"
                      v-on:click="del = !del"
                      v-if="del"
                    >
                      retour
                    </button>
                    <button
                      type="submit"
                      class="profile-edit-btn ml-1"
                      v-if="del"
                      v-on:click.prevent="delUser()"
                    >
                      supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Posts from "@/components/Posts.vue";
import tokenInfo from "@/services/tokenInfo";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",
  components: {
    Posts,
  },
  data() {
    return {
      del: false,
      defaultDescription: "L'utilisateur n'a pas encore de description",
    };
  },
  computed: {
    ...mapGetters({
      User: "Users/User",
      userPosts: "Posts/UserPosts",
      iduser: "Auth/Iduser",
    }),
  },
  methods: {
    ...mapActions({
      deleteUser: "Users/deleteUser",
    }),
    isAdmin() {
      const isAdmin = tokenInfo().role;
      if (isAdmin === "admin") {
        return true;
      }
      return false;
    },
    delUser() {
      this.deleteUser(this.User.iduser)
        .then(() => this.$router.push({ path: "/" }))
        .catch((error) => console.log(error));
    },
    splitDate() {
      let customDate = this.User.birthday.split("T");
      return customDate;
    },
  },
};
</script>

<style lang="scss">
.emp-profile {
  padding: 30px;
  margin-top: 50px;
  margin-bottom: 20px;
  border-radius: 1rem;
  background-image: linear-gradient(to bottom, #efefef, #ccc);
  h4 {
    font-size: 2rem;
  }
  .nav-item {
    width: 50%;
  }
  .nav-link {
    color: #2c3e50;
  }
  .nav-link.active {
    background-color: #aa222f; //linear-gradient(to bottom right, #be2635, #2c3e50)
    color: white;
    border: none;
    border-bottom: 2px solid white;
  }
}
.profile-img {
  text-align: center;
}
.profile-img img {
  width: 70%;
  height: 100%;
}
.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20%;
  width: 70%;
  border: none;
  border-radius: 0;
  font-size: 15px;
  background: #212529b8;
}
.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}
.profile-head h5 {
  color: #333;
}
.profile-head h6 {
  color: #2c3e50;
}
.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  width: 100%;
  padding: 8px;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}
.profile-head .nav-tabs {
  margin-bottom: 5%;
}
.profile-head .nav-tabs .nav-link {
  font-weight: 600;
  border: none;
}
.profile-tab label {
  text-decoration: underline;
  margin-right: 60px;
  padding-right: 10px;
  font-weight: 600;
}
.profile-tab p {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 20px;
}
</style>