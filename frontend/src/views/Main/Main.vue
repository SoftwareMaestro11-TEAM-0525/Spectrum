<template>
  <div class="container">
    <input-popup
      v-if="isPopup"
      v-bind:nodeID="curNodeId"
      @cancelPopup="showPopup"
    ></input-popup>
    <nav-bar :isMain="true"></nav-bar>
    <mindmap @popupEvent="showPopup"></mindmap>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import mindmap from "@/views/Main/Mindmap.vue";
import InputPopup from "@/components/InputPopup";

export default {
  name: "Main",
  components: {
    NavBar,
    mindmap,
    InputPopup
  },
  data() {
    return {
      isPopup: false,
      curNodeId: ""
    };
  },
  methods: {
    showPopup(isShow, id) {
      this.curNodeId = id;
      this.isPopup = isShow;
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
