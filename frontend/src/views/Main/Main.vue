<template>
  <div class="container">
    <input-popup
      v-if="showPopup"
      v-bind:nodeID="curNodeId"
      @closePopup="handlePopup"
    />
    <general-view
      v-if="showGeneralView"
      @closeGeneralView="handleGeneralView"
    />
    <nav-bar :isMain="true"></nav-bar>
    <mindmap @popupEvent="handlePopup" @generalViewEvent="handleGeneralView"></mindmap>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import mindmap from "@/views/Main/Mindmap.vue";
import InputPopup from "@/views/Input/InputPopup";
import GeneralView from "@/views/Article/GeneralView";

export default {
  name: "Main",
  components: {
    NavBar,
    mindmap,
    InputPopup,
    GeneralView
  },
  data() {
    return {
      showPopup: false,
      showGeneralView: false,
      curNodeId: ""
    };
  },
  methods: {
    handlePopup(value, id) {
      this.curNodeId = id;
      this.showPopup = value;
    },
    handleGeneralView(value, id) {
      this.curNodeId = id;
      this.showGeneralView = value;
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
