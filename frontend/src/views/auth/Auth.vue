<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "auth"
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  position: relative;
}
</style>
