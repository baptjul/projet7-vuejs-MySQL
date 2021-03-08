<template>
  <div class="row pb-5 pt-5 log justify-content-center">
    <div class="col-12 col-md-9 col-lg-7 card shadow-lg">
      <div class="card-header text-center">
        <img src="@/assets/icon-left-font-monochrome-red.png" />
      </div>
      <div class="card-body">
        <ul class="nav nav-tabs text-center" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active font-weight-bold"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              >Connexion</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link font-weight-bold"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              >Inscription</a
            >
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <form @submit.prevent="Login" class="box py-5 h-100">
              <h3>Connexion</h3>
              <p>Utiliser votre email pour vous connecter !</p>
              <div class="align-middle">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  required
                  v-model="log.email"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  required
                  v-model="log.password"
                />
                <div class="error mb-3" role="alert" v-if="log.errors">
                  {{ log.errors }}
                </div>
                <input
                  class="mt-auto font-weight-bold"
                  type="submit"
                  name="submit"
                  value="Connexion"
                  href="#"
                />
              </div>
            </form>
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <form @submit.prevent="Signup" class="box pt-5 h-100">
              <h3>Inscrivez-vous</h3>
              <p>
                Pas encore de compte ?<br />
                Entrez vos informations pour créer un compte !
              </p>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                v-model="sign.username"
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                v-model="sign.email"
              />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                required
                v-model="sign.password"
              />
              <input
                type="password"
                name="password"
                placeholder="Confirmez mot de passe"
                required
                v-model="sign.confirmedPass"
              />
              <div class="error mb-3" role="alert" v-if="sign.errors">
                {{ sign.errors }}
              </div>
              <input
                class="mt-auto"
                type="submit"
                name="submit"
                value="Inscription"
                href="#"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Connexion",
  data() {
    return {
      log: {
        email: "",
        password: "",
        errors: "",
      },
      sign: {
        username: "",
        email: "",
        password: "",
        confirmedPass: "",
        errors: "",
      },
      error: {},
    };
  },
  methods: {
    ...mapActions({
      login: "Auth/login",
      signup: "Auth/signup",
    }),
    Login() {
      const user = { ...this.log };
      this.login(user)
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.log.errors = error;
        });
    },
    Signup() {
      if (this.sign.password === this.sign.confirmedPass) {
        const user = {
          username: this.sign.username,
          email: this.sign.email,
          password: this.sign.password,
        };
        this.signup(user)
          .then(() => {
            this.$router.push({ path: "/" });
          })
          .catch((error) => {
            if (error.code === "ER_DUP_ENTRY") {
              this.sign.errors = "Ce pseudo existe déjà";
            } else {
              this.sign.errors = error;
            }
          });
      } else {
        this.sign.errors = "Confirmation incorrect";
      }
    },
  },
};
</script>

<style lang="scss">
.log {
  .card {
    background-image: linear-gradient(to bottom, #efefef, #ccc);
  }
  .card,
  .card-header {
    color: #2c3e50;
    opacity: 1;
  }
  img {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }
  h3 {
    font-size: 2rem;
  }
  .card-header {
    background-color: transparent;
  }
  .card-body {
    p {
      font-size: 1rem;
    }
  }
  .nav-tabs {
    a {
      color: #2c3e50;
      font-size: 1.3rem;
    }
    .nav-item {
      width: 50%;
    }
    .nav-link.active {
      background-color: #fd2d01; //linear-gradient(to bottom right, #be2635, #2c3e50)
      color: white;
    }
  }
}

.box {
  text-align: center;
  transition: 0.25s;
  margin-bottom: 15px;
  h2,
  p {
    color: #2c3e50;
  }
}

.box input[type="email"],
.box input[type="text"],
.box input[type="password"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 3px solid #2c3e50;
  padding: 10px 10px;
  width: 250px;
  outline: none;
  color: #2c3e50;
  border-radius: 24px;
  transition: 0.25s;
}

.box h1 {
  color: black;
  text-transform: uppercase;
  font-weight: 500;
}

.box input[type="email"]:focus,
.box input[type="text"]:focus,
.box input[type="password"]:focus {
  width: 300px;
  border-color: #fd2d01;
}

.box input[type="submit"] {
  font-weight: bold;
  border: 0;
  background: #fd2d01;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2c3e50;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}

.box input[type="submit"]:hover {
  background: #c92100;
  color: white;
}

.error {
  font-size: 1.2rem;
  color: red;
}
</style>
