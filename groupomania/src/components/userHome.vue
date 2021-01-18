<template>
  <div class="card text-light mb-5 userHomme">
    <div class="card-header">
      <div class="py-3 px-3 text-center">
        <div>
          <img
            src="@/assets/icon.png"
            alt="..."
            width="110"
            class="mb-3 rounded-circle img-thumbnail shadow"
          />
        </div>
        <div class="media-body">
          <h3 class="m-0">John Doe</h3>
          <p class="font-weight-light mb-0">Web developer</p>
        </div>
      </div>
      <!-- <button v-on:click="hidden = !hidden">Toggle hide and show</button> -->
    </div>
    <div class="card-body" v-if="!hidden">
      <p class="card-text">Retrouver ici ma descriptiton</p>
      <hr />
      <router-link class="nav-link" to="/profile"
        ><a href="#"><p class="profil_link">modifier</p></a></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "userHome",
  data() {
    return {
      hidden: false,
    };
  },
};
</script>

<style lang="scss">
.userHomme {
  p {
    color: white;
  }
}
</style>
