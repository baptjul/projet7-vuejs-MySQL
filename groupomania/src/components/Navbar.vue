<template>
  <nav class="navbar navbar-expand-lg bg-light mb-2 py-4">
    <router-link to="/"
      ><a class="navbar-brand" href="#"
        ><img class="logo" src="@/assets/icon-left-font-monochrome-red.png"
      /></a>
    </router-link>
    <button
      class="navbar-toggler custom-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav links">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <div class="links__root"><i class="fas fa-home"></i>Home</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">
            <div class="links__root">
              <i class="fas fa-user-circle"></i>Profil
            </div>
          </router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search User"
          aria-label="Search"
        />
        <button class="btn btn-danger mr-4 my-md-0" type="submit">
          Search
        </button>
      </form>
      <button class="disconnect mt-sm-2-" @click.prevent="Disconnect">
        Déconnexion
      </button>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Nav",
  methods: {
    ...mapActions({
      logout: "Auth/logout",
    }),
    Disconnect() {
      this.logout();
    },
  },
};
</script>

<style lang="scss">
.navbar {
  a {
    color: #2c3e50e0;
    font-weight: bold;
    text-decoration: none;
    &.router-link-exact-active {
      color: #fd2d01;
    }
    &:hover {
      color: #fd2d01;
    }
  }
  i {
    margin-right: 5px;
    font-size: 1.5rem;
  }
}

.custom-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='black' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.custom-toggler.navbar-toggler {
  border-color: black;
}

.logo {
  margin-right: 25px;
  min-width: 180px;
  max-width: 250px;
  max-height: 250px;
}

.links {
  margin-right: auto;
  &__root {
    padding-right: 15px;
  }
}

.disconnect {
  border-radius: 20px;
  background-color: #fd2d01;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  border: 1px solid #fd2d01;
  padding: 8px 20px;
  margin-left: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-in;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    background-color: #c92100;
  }
}
</style>
