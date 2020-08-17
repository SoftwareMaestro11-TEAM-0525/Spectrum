<template>
  <nav class="navbar">
    <router-link to="/main">
      <div class="top_logo">
        <img src="@/assets/logo.png" alt="logo">
        Spectrum
      </div>
    </router-link>
    <div class="item">
      <button>내 정보</button>
      <div class="dropdown">

      </div>
    </div>
    <div class="item">
      <button>공유하기</button>
    </div>
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
  border-bottom: 1px solid #e5e5e5;
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
    button {
      width: 100%;
      height: 63px;
      text-align: center;
      font-size: 18px;
      border: none;
      background-color: white;
      outline: none;
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
  }
}
</style>
