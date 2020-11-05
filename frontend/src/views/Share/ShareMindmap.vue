<template>
  <div class="container">
    <share-nav-bar></share-nav-bar>
    <mindmap />
  </div>
</template>

<script>
import ShareNavBar from "@/components/ShareNavBar";
import Mindmap from "@/views/Main/Mindmap";

export default {
  name: "ShareMindmap",
  components: {
    ShareNavBar,
    Mindmap
  }
};
</script>

<style scoped></style>
