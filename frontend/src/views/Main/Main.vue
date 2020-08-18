<template>
  <div class="container">
    <nav-bar></nav-bar>
    <mindmap></mindmap>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import mindmap from "@/views/Main/Mindmap.vue";

export default {
  name: "Main",
  components: {
    NavBar,
    mindmap
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  overflow: hidden;
}
</style>
