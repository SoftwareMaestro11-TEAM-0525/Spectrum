<template>
  <div class="container">
    <router-link to="/login" v-show="!isLoginPage">
      <div class="top_logo">
        <img src="@/assets/logo.png" alt="Logo image" />
        Spectrum
      </div>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "auth",
  data() {
    return {
      isLoginPage: true
    };
  },
  watch: {
    "$route.name": function(newVal) {
      if (newVal === "Join" || newVal === "Password") {
        this.isLoginPage = false;
      } else if (newVal === "Login") {
        this.isLoginPage = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  position: relative;
}
.top_logo {
  position: absolute;
  margin: 28px 0 0 32px;
  font-size: 24px;
  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}
</style>
