<template>
  <div class="container">
    <Profile />
  </div>
</template>

<script>
import Profile from "@/components/ProfilPage.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "User",
  components: {
    Profile,
  },
  computed: {
    ...mapGetters({
      iduser: "Auth/iduser",
    }),
  },
  methods: {
    ...mapActions({
      getUserPost: "Posts/getUserPost",
      getUser: "Users/getUser",
    }),
  },
  mounted() {
    this.getUserPost(this.iduser);
    this.getUser(this.iduser);
  },
};
</script>

<style lang="scss">
</style>