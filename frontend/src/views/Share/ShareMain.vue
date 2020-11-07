<template>
  <div class="container">
    <share-nav-bar />
    <share-mindmap :shareKey="shareKey" />
  </div>
</template>

<script>
import ShareNavBar from "@/components/ShareNavBar";
import ShareMindmap from "@/views/Share/ShareMindmap";

export default {
  name: "ShareMain",
  components: {
    ShareNavBar,
    ShareMindmap
  },
  data() {
    return {
      shareKey: this.$route.params.share_key
    };
  }
};
</script>

<style scoped></style>
