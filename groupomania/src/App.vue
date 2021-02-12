<template>
  <div class="page-container">
    <div id="app">
      <Navbar v-if="logged" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters({
      log: "Auth/loggedUser",
    }),
    logged() {
      if (this.log) {
        return true;
      }
      return false;
    },
  },
};
</script>


<style lang="scss">
@import url("https://use.fontawesome.com/releases/v5.9.0/css/all.css");

html {
  height: 100%;
}

body {
  box-sizing: border-box;
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-color: #2c3e50; //be2635bb
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.card {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.377);
  .card-header {
    border-radius: 8px;
  }
  h2 {
    font-size: 1.5rem;
  }
  a {
    .profil_link {
      text-decoration: underline;
      color: white;
    }
  }
  textarea {
    resize: none;
  }
}

.jumbotron {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.377);
  .card {
    background-color: rgb(255, 255, 255);
  }
}

.primary {
  background-color: #2c3e50e0; //#be2635c7
}

.secondary {
  background-image: linear-gradient(
    to bottom right,
    #2c3e50,
    #fd2d01
  ); //2c3e50e0
}

.btn-danger {
  background-color: #fd2d01;
  &:hover {
    background-color: #c92100; //#be2635c7
  }
}
</style>
