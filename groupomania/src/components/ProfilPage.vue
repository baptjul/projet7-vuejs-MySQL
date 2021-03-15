<template>
  <div class="container emp-profile">
    <div class="row">
      <div class="col-md-5">
        <div class="profile-img">
          <div>
            <img
              :src="this.User.profile_picture"
              alt="profil picture"
              v-if="!preview"
            />
            <img id="preview" v-if="preview" :src="preview" />
            <div class="col-lg-6 col-sm-6 col-12 mb-4 mt-2 ml-auto mr-auto">
              <div class="btn-group">
                <label class="mr-2 mt-2" for="inputFile">
                  <i class="fas fa-upload"></i>
                </label>
                <input
                  type="file"
                  ref="myFiles"
                  id="inputFile"
                  accept=".jpg, .jpeg, .png, .gif"
                  @change="handleFileUpload($event)"
                />
                <button
                  class="btn btn-danger btn-file"
                  v-on:click="submitFile()"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7 mt-2">
        <div class="profile-head">
          <h2>
            {{ this.User.username }}
          </h2>
          <h3 class="mt-1" v-show="this.User.position !== ''">
            {{ this.User.position }}
          </h3>
          <h5 class="mt-1" v-show="this.User.description !== ''">
            {{ this.User.description }}
          </h5>
          <h5
            class="mt-1 font-weight-light font-italic"
            v-show="!this.User.description"
          >
            {{ defaultDescription }}
          </h5>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
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
            <Posts v-for="post in userPosts" :key="post.idposts" :post="post" />
            <div v-if="userPosts.length === 0" class="mt-4">
              <p>Vous n'avez pas encore de post</p>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="row justify-content-center userInfo">
              <div class="col-md-8">
                <div class="row ml-5 align-middle">
                  <div class="col-md-4"><label>Pseudo:</label></div>
                  <div class="col-md-8" v-if="!modify">
                    <div>
                      <p>{{ this.User.username }}</p>
                    </div>
                  </div>
                  <div class="d-flex col-md-8" v-if="modify">
                    <input
                      type="text"
                      class="input"
                      name="username"
                      v-model="update.username"
                      required
                    />
                  </div>
                </div>
                <div class="row mt-1 ml-5">
                  <div class="col-md-4"><label>Email:</label></div>
                  <div class="col-md-4" v-if="!modify">
                    <div>
                      <p>{{ this.User.email }}</p>
                    </div>
                  </div>
                  <div class="col-md-4" v-if="modify">
                    <input
                      type="email"
                      class="input"
                      name="email"
                      placeholder="email*"
                      v-if="modify"
                      v-model="update.email"
                      required
                    />
                  </div>
                </div>
                <div class="row mt-1 ml-5">
                  <div class="col-md-4"><label>Nom:</label></div>
                  <div class="col-md-8" v-if="!modify">
                    <div v-if="this.User.lastname">
                      <p>{{ this.User.lastname }}</p>
                    </div>
                    <div v-if="!this.User.lastname">
                      <p class="font-weight-light font-italic text-muted">
                        {{ placeHolder }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-8" v-if="modify">
                    <input
                      type="text"
                      class="input"
                      name="lastname"
                      placeholder="nom"
                      v-if="modify"
                      v-model="update.lastname"
                    />
                  </div>
                </div>
                <div class="row mt-1 ml-5">
                  <div class="col-md-4"><label>Prenom:</label></div>
                  <div class="col-md-8" v-if="!modify">
                    <div v-if="this.User.firstname">
                      <p>{{ this.User.firstname }}</p>
                    </div>
                    <div v-if="!this.User.firstname">
                      <p class="font-weight-light font-italic text-muted test">
                        {{ placeHolder }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-4" v-if="modify">
                    <input
                      type="text"
                      class="input"
                      name="firstname"
                      placeholder="prenom"
                      v-if="modify"
                      v-model="update.firstname"
                    />
                  </div>
                </div>
                <div class="row mt-1 ml-5">
                  <div class="col-md-4"><label>Post:</label></div>
                  <div class="col-md-8" v-if="!modify">
                    <div v-if="this.User.position">
                      <p>{{ this.User.position }}</p>
                    </div>
                    <div v-if="!this.User.position">
                      <p class="font-weight-light font-italic text-muted">
                        {{ placeHolder }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-8" v-if="modify">
                    <input
                      type="text"
                      class="input"
                      name="position"
                      placeholder="post"
                      v-if="modify"
                      v-model="update.position"
                    />
                  </div>
                </div>
                <div class="row mt-1 ml-5">
                  <div class="col-md-4"><label>Anniversaire:</label></div>
                  <div class="col-md-8" v-if="!modify">
                    <div v-if="this.User.birthday">
                      <p>{{ splitDate()[0] }}</p>
                    </div>
                    <div v-if="!this.User.birthday">
                      <p class="font-weight-light font-italic text-muted">
                        {{ placeHolder }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-8" v-if="modify">
                    <input
                      type="date"
                      class="input"
                      name="birthday"
                      placeholder="birthday"
                      v-if="modify"
                      v-model="update.birthday"
                    />
                  </div>
                </div>
                <div class="row mt-1 ml-5">
                  <div class="col-md-4">
                    <label>Description:</label>
                  </div>
                  <div class="col-md-8" v-if="!modify">
                    <div v-if="this.User.description">
                      <p>{{ this.User.description }}</p>
                    </div>
                    <div v-if="!this.User.description">
                      <p class="font-weight-light font-italic text-muted">
                        {{ placeHolder }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-8" v-if="modify">
                    <textarea
                      @input="autoResize"
                      class="form-control textarea input"
                      id="description"
                      rows="3"
                      placeholder="ajoutez une description"
                      v-model="update.description"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  class="profile-edit-btn mt-4 mr-1"
                  v-on:click="modify = !modify"
                  v-if="!modify && !del"
                >
                  modifier
                </button>
                <button
                  type="submit"
                  class="profile-edit-btn mt-4 mr-1"
                  v-if="!modify && !del"
                  v-on:click="del = !del"
                >
                  supprimer compte
                </button>
                <div class="d-flex">
                  <button
                    type="submit"
                    class="profile-edit-btn mt-4 mr-1"
                    v-on:click="modify = !modify"
                    v-if="modify"
                  >
                    retour
                  </button>
                  <button
                    type="submit"
                    class="profile-edit-btn mt-4 ml-1"
                    v-if="modify"
                    v-on:click.prevent="postUpdate()"
                  >
                    valider
                  </button>
                </div>
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
                    v-on:click="delUser()"
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
  </div>
</template>

<script>
import Posts from "@/components/Posts.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",
  components: {
    Posts,
  },
  data() {
    return {
      update: {
        username: "",
        email: "",
        lastname: "",
        firstname: "",
        position: "",
        birthday: "",
        description: "",
      },
      preview: "",
      file: "",
      del: false,
      modify: false,
      defaultDescription:
        "Ajoutez une description à votre profil et retrouver la ici",
      placeHolder: "dites-nous en plus",
    };
  },
  computed: {
    ...mapGetters({
      User: "Users/User",
      userPosts: "Posts/UserPosts",
      Iduser: "Auth/Iduser",
    }),
  },
  methods: {
    ...mapActions({
      updateUser: "Users/updateUser",
      updatePicture: "Users/updatePicture",
      getUser: "Users/getUser",
      getUserPost: "Posts/getUserPost",
      deleteUser: "Users/deleteUser",
      logout: "Auth/logout",
    }),
    splitDate() {
      if (this.User.birthday) {
        let customDate = this.User.birthday.split("T");
        return customDate;
      }
      return [];
    },
    autoResize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
    postUpdate() {
      const iduser = this.Iduser;
      const body = {
        email: this.update.email,
        username: this.update.username,
        firstname: this.update.firstname,
        lastname: this.update.lastname,
        description: this.update.description,
        position: this.update.position,
        birthday: this.update.birthday,
      };
      this.updateUser({ iduser, body })
        .then(() => (this.modify = false))
        .then(() => this.getUser(iduser))
        .catch((error) => console.log(error));
    },
    handleFileUpload(event) {
      this.file = this.$refs.myFiles.files[0];
      const target = event.target.files[0];
      this.preview = URL.createObjectURL(target);
    },
    submitFile() {
      let form = new FormData();
      form.append("image", this.file);
      const data = { iduser: this.Iduser, body: form };
      this.updatePicture(data)
        .then(() => (this.file = ""))
        .then(() => this.getUser(this.Iduser))
        .then(() => this.getUserPost(this.Iduser))
        .catch((error) => console.log(error));
    },
    delUser() {
      this.deleteUser(this.User.iduser)
        .then(() => this.logout())
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getUser(this.Iduser).then(() => {
      this.update = {
        ...this.User,
        birthday: this.splitDate()[0],
      };
    });
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
    background-color: rgba(0, 0, 0, 0.1);
    color: #2c3e50;
  }
  .nav-link.active {
    background-color: #aa222f; //linear-gradient(to bottom right, #be2635, #2c3e50)
    color: white;
    border: none;
    border-bottom: 2px solid white;
  }
  .input {
    font-weight: bold;
    scrollbar-width: none;
    background: none;
    text-align: center;
    border: 3px solid #2c3e50;
    padding: 10px 10px;
    outline: none;
    color: #2c3e50;
    border-radius: 24px;
    transition: 0.25s;
    &:focus {
      border-color: #aa222f;
    }
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
.profile-head h5 {
  color: #333;
}
.profile-head h6 {
  color: #2c3e50;
}
.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  border: 2px solid #2c3e50;
  width: 100%;
  padding: 8px;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  &:hover {
    background-color: #2c3e50;
    color: white;
  }
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
.btn-group {
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
</style>