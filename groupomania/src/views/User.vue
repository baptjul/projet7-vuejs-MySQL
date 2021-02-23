<template>
  <div class="container">
    <UserProfile />
  </div>
</template>

<script>
import UserProfile from "@/components/UserPage.vue";
import { mapActions } from "vuex";

export default {
  name: "User",
  components: {
    UserProfile,
  },
  methods: {
    ...mapActions({
      getUserPost: "Posts/getUserPost",
      getUser: "Users/getUser",
    }),
  },
  mounted() {
    this.getUserPost(this.$route.params.id);
    this.getUser(this.$route.params.id);
  },
};
</script>

<style lang="scss">
</style>