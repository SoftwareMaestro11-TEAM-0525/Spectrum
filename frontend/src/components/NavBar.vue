<template>
  <nav class="navbar">
    <router-link to="/main">
      <div class="top_logo">
        <img src="@/assets/logo.png" alt="logo">
        Spectrum
      </div>
    </router-link>
    <div class="item">내 정보</div>
    <div class="item">공유하기</div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
}
</script>

<style scoped lang="scss">
.navbar {
  position: absolute;
  width: 100%;
  height: 64px;
  padding: 0 120px 0 120px;
  background-color: white;
  line-height: 64px;
  box-sizing: border-box;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  .top_logo {
    height: 100%;
    display: inline-block;
    font-size: 24px;
    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
  }
  .item {
    width: 115px;
    float: right;
    text-align: center;
    font-size: 18px;
    cursor: pointer;  
  }
}
</style>
