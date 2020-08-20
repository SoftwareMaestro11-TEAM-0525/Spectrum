<template>
  <div class="container">
    <nav-bar :isMainpage="true"></nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: "input.vue",
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>
