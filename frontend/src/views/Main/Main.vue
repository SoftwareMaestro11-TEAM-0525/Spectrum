<template>
  <div class="container">
    <input-popup></input-popup>
    <nav-bar :isMain="true"></nav-bar>
    <mindmap></mindmap>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import mindmap from "@/views/Main/Mindmap.vue";
import InputPopup from "@/components/InputPopup"

export default {
  name: "Main",
  components: {
    NavBar,
    mindmap,
    InputPopup
  }
}
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  overflow: hidden;
}
</style>
