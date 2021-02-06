<template>
  <div class="container emp-profile">
    <form method="post">
      <div class="row">
        <div class="col-md-5">
          <div class="profile-img">
            <img :src="this.User.profile_picture" alt="profil picture" />
            <div class="file btn btn-lg btn-primary">
              Modifier Photo
              <input type="file" name="file" />
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="profile-head">
            <h4>
              {{ this.User.username }}
            </h4>
            <h5 class="mt-1" v-show="this.User.position !== ''">
              {{ this.User.position }}
            </h5>
            <h6 class="mt-1" v-show="this.User.username !== ''">
              {{ this.User.description }}
            </h6>
            <ul class="nav nav-tabs mt-5" id="myTab" role="tablist">
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
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <hr />
          <div class="tab-content profile-tab" id="myTabContent">
            <div
              class="tab-pane fade show active mt-2"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <!-- ____________________________________________________________ -->
              <Posts
                v-for="post in userPosts"
                :key="post.idposts"
                :post="post"
              />

              <!-- ____________________________________________________________ -->
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
                    <div class="col-md-8"><p>jDoe</p></div>
                  </div>
                  <div class="row">
                    <div class="col-md-4"><label>Email:</label></div>
                    <div class="col-md-8"><p>john.doe@email.com</p></div>
                  </div>
                  <div class="row">
                    <div class="col-md-4"><label>Nom:</label></div>
                    <div class="col-md-8"><p>Doe</p></div>
                  </div>
                  <div class="row">
                    <div class="col-md-4"><label>Prenom:</label></div>
                    <div class="col-md-8"><p>John</p></div>
                  </div>
                  <div class="row">
                    <div class="col-md-4"><label>Post:</label></div>
                    <div class="col-md-8"><p>Web Developer</p></div>
                  </div>
                  <div class="row">
                    <div class="col-md-4"><label>Anniversaire:</label></div>
                    <div class="col-md-8"><p>16-04-1990</p></div>
                  </div>
                  <div class="row">
                    <div class="col-md-4"><label>Description:</label></div>
                    <div class="col-md-8">
                      <p>
                        Retrouver ici votre descriptiton : porttitor, sodales
                        enim ac, cursus velit. Suspendisse porttitor at odio
                        congue blandit. Ut tincidunt mi a orci tincidunt
                        euismod. Aliquam ac varius elit. Morbi dapibus semper
                      </p>
                    </div>
                  </div>
                  <input
                    type="submit"
                    class="profile-edit-btn"
                    name="btnAddMore"
                    value="modifier"
                  />
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
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  components: {
    Posts,
  },
  computed: {
    ...mapGetters({
      User: "Users/User",
      userPosts: "Posts/UserPosts",
      iduser: "Auth/iduser",
    }),
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
    background-color: #fd2d01; //linear-gradient(to bottom right, #be2635, #2c3e50)
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