<template>
  <div class="card text-light mb-5 userHomme">
    <div class="card-header">
      <div class="py-3 px-3 text-center">
        <div>
          <img
            :src="this.User.profile_picture"
            alt="..."
            width="110"
            class="mb-3 rounded-circle img-thumbnail shadow"
          />
        </div>
        <div class="media-body">
          <h3 class="m-0">{{ this.User.username }}</h3>
          <p class="font-weight-light mb-0" v-if="this.User.position !== null">
            {{ this.User.position }}
          </p>
        </div>
      </div>
      <!-- <button v-on:click="hidden = !hidden">Toggle hide and show</button> -->
    </div>
    <div class="card-body" v-if="!hidden">
      <p class="card-text" v-if="description !== '' || null || undefined">
        {{ description }}
      </p>
      <p class="card-text" v-if="description === '' || null || undefined">
        {{ defaultDescription }}
      </p>
      <hr />
      <router-link class="nav-link" to="/profile"
        ><a href="#"><p class="profil_link">modifier</p></a></router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "userHome",
  data() {
    return {
      hidden: false,
      description: this.User.description,
      defaultDescription: "Ajoutez une description et retrouver la ici",
    };
  },
  computed: {
    ...mapGetters({
      User: "Users/User",
    }),
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
