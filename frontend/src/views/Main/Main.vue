<template>
  <div class="container">
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"

export default {
  name: "Main",
  components: {
    NavBar
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  position: relative;
}
</style>
