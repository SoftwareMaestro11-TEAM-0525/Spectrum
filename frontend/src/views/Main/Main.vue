<template>
  <div class="container">
    <input-popup
      v-if="showPopup"
      @cancelPopup="showPopup = false"
    ></input-popup>
    <nav-bar :isMain="true"></nav-bar>
    <mindmap @popupEvent="showPopup = true"></mindmap>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import mindmap from "@/views/Main/Mindmap.vue";
import InputPopup from "@/components/InputPopup";
import axios from "axios";

export default {
  name: "Main",
  components: {
    NavBar,
    mindmap,
    InputPopup
  },
  created() {
    axios({
      method: "get",
      url: "http://localhost:3000/api/auth/check",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).catch(err => {
      this.$router.push("Login");
      console.log(err.response.data);
      console.log(err.response.headers);
      console.log(err.response.status);
    });
  },
  data() {
    return {
      showPopup: false
    };
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
