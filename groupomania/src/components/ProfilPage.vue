<template>
  <div class="container emp-profile">
    <form method="post">
      <div class="row">
        <div class="col-md-5">
          <div class="profile-img">
            <img src="@/assets/user-3331257_960_720.png" alt="profil picture" />
            <div class="file btn btn-lg btn-primary">
              Modifier Photo
              <input type="file" name="file" />
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="profile-head">
            <h4>John Doe</h4>
            <h5>Web Developer</h5>
            <h6>
              Retrouver ici votre descriptiton : porttitor, sodales enim ac,
              cursus velit. Suspendisse porttitor at odio congue blandit. Ut
              tincidunt mi a orci tincidunt euismod. Aliquam ac varius elit.
              Morbi dapibus semper
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
        <div class="col-md-9">
          <div class="tab-content profile-tab" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <!-- ____________________________________________________________ -->
              <div class="card mb-4">
                <div class="card-header secondary text-light">
                  <div class="d-flex align-items-center">
                    <img
                      src="@/assets/icon.png"
                      alt="..."
                      width="40"
                      class="mr-3 rounded-circle img-thumbnail shadow-sm"
                    />
                    <a href="#"><h3 class="profil_link">John Doe</h3></a>
                  </div>
                </div>
                <div class="card-body">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam semper sapien quis finibus fringilla. Nulla sit amet
                    magna lacus. Mauris nec venenatis erat, id malesuada mauris.
                    Aliquam dapibus lorem dolor, et ultricies nulla varius
                    maximus. Nullam vel libero porttitor, sodales enim ac,
                    cursus velit. Suspendisse porttitor at odio congue blandit.
                    Ut tincidunt mi a orci tincidunt euismod. Aliquam ac varius
                    elit. Morbi dapibus semper turpis vitae elementum. Vivamus
                    eget tellus turpis. Nulla facilisi. Nam facilisis eu nibh et
                    porta. Ut scelerisque nibh eu nisl porta imperdiet. Interdum
                    et malesuada fames ac ante ipsum primis in faucibus. Etiam
                    rutrum eleifend leo, in fermentum metus porta vitae. Nullam
                    fermentum aliquam orci, in dapibus arcu tristique quis.
                    Aenean molestie aliquet tincidunt. Aenean libero nulla,
                    euismod quis aliquet eget, porttitor vel diam. Suspendisse
                    ultrices elit velit. Quisque condimentum elementum sapien at
                    blandit. Maecenas ornare orci non mi imperdiet, vitae
                    maximus turpis facilisis. Donec aliquam bibendum urna, vel
                    semper mauris maximus quis. Praesent ac tincidunt erat.
                    Integer ornare neque ut magna interdum maximus. Pellentesque
                    quis feugiat lacus, non sodales mi. Praesent consequat
                    sollicitudin tortor non congue. Vivamus sed ex mauris.
                  </p>
                  <div class="d-flex vues">
                    <div class="vues__likes mr-2">
                      <a href="#"><i class="fas fa-heart"></i></a>
                      <span class="mx-2">2</span>
                    </div>
                    <div class="vues__dislikes mr-2">
                      <a href="#"><i class="fas fa-heart-broken"></i></a>
                      <span class="mx-2">1</span>
                    </div>
                    <div class="vues__comments ml-auto">
                      <i class="fas fa-comment"></i>
                      <span class="mx-2">2</span>
                    </div>
                  </div>
                </div>
                <hr />
                <!-- Commentaire -->
                <div class="card">
                  <div class="card-body secondary text-light">
                    <label for="comment" class="font-weight-bold"
                      ><p>Un commentaire ?</p></label
                    >
                    <textarea
                      class="form-control textarea"
                      id="comment"
                      rows="1"
                      placeholder="Poster un commentaire"
                    ></textarea>
                    <button
                      type="submit"
                      class="btn primary text-light float-right mt-2"
                    >
                      répondre
                    </button>
                  </div>
                  <hr />
                  <!-- affichage des commentaires -->
                  <div class="card border-light shadow">
                    <div class="card-header secondary text-light">
                      <div class="d-flex align-items-center shado">
                        <img
                          src="@/assets/icon.png"
                          alt="..."
                          width="40"
                          class="mr-3 rounded-circle img-thumbnail"
                        />
                        <a href="#"><h5 class="profil_link">John Dupont</h5></a>
                      </div>
                    </div>
                    <div class="card-body">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam semper sapien quis finibus fringilla.
                      </p>
                    </div>
                  </div>
                  <div class="card border-light shadow">
                    <div class="card-header secondary text-light">
                      <div class="d-flex align-items-center shado">
                        <img
                          src="@/assets/icon.png"
                          alt="..."
                          width="40"
                          class="mr-3 rounded-circle img-thumbnail"
                        />
                        <a href="#"><h5 class="profil_link">John Dupont</h5></a>
                      </div>
                    </div>
                    <div class="card-body">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam semper sapien quis finibus fringilla.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
export default {
  name: "Profile",
};
</script>

<style lang="scss">
.emp-profile {
  padding: 30px;
  margin-top: 50px;
  margin-bottom: 20px;
  border-radius: 1rem;
  background-image: linear-gradient(to bottom, #efefef, #ccc);
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