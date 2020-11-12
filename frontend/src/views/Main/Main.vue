<template>
  <div class="container">
    <input-popup
      v-if="showPopup"
      v-bind:nodeID="curNodeId"
      @closePopup="handlePopup"
    />
    <article-view
      v-if="showArticleView"
      v-bind:nodeID="curNodeId"
      @closeArticleView="handleArticleView"
    />
    <nav-bar :isMain="true"></nav-bar>
    <mindmap
      @popupEvent="handlePopup"
      @articleViewEvent="handleArticleView"
    ></mindmap>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import mindmap from "@/views/Main/Mindmap.vue";
import InputPopup from "@/views/Input/InputPopup";
import ArticleView from "@/views/Article/ArticleView";

export default {
  name: "Main",
  components: {
    NavBar,
    mindmap,
    InputPopup,
    ArticleView
  },
  data() {
    return {
      showPopup: false,
      showArticleView: false,
      curNodeId: ""
    };
  },
  methods: {
    handlePopup(value, id) {
      this.curNodeId = id;
      this.showPopup = value;
    },
    handleArticleView(value, id) {
      this.curNodeId = id;
      this.showArticleView = value;
    }
  }
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  overflow: hidden;
}
</style>
