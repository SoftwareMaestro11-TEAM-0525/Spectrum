<template>
  <nav class="shareNavbar">
    <router-link to="/main">
      <div class="top_logo">
        <img src="@/assets/headerLogo.png" alt="logo" />
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
name: "ShareNavBar"
}
</script>

<style scoped lang="scss">
.shareNavbar {
  position: absolute;
  width: 100%;
  height: 64px;
  padding: 0 120px 0 120px;
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
}

.top_logo {
  height: 100%;
  display: inline-flex;
  align-items: center;
  img {
    height: 32px;
  }
}
</style>
