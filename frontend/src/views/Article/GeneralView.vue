<template>
  <div class="blurPage" @click="closeView">
    <div class="container">
      <div class="header">
        <!--전체화면 버튼-->
        <div class="toggleWide">

        </div>
        <!--창 닫기 버튼-->
        <div class="close">

        </div>
      </div>
      <div class="content">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneralView",
  methods: {
    closeView() {
      this.$emit("closeGeneralView", false);
    }
  }
}
</script>

<style scoped lang="scss">
.blurPage {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
}
.container {
  padding: 16px;
  width: 960px;
  height: 800px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  .content {
    margin: 64px 90px 0 90px;
  }
}
</style>
