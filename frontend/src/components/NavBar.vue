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
        <div class="wrap_rect">
          <div></div>
        </div>
        <div class="options">
          <div class="status">
            <div class><b>{{ userName }}</b> 님</div>
            <div class>등록된 경험 <b>{{ expCount }}</b></div>
          </div>
          <div class="menu">
            <div>마이페이지</div>
            <div>설정</div>
          </div>
          <div class="logout">로그아웃</div>
        </div>
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
  data() {
    return {
      userName: "최현석",
      expCount: -100,
    }
  }
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
  z-index: 1;
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
    line-height: normal;
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
    button:hover+div {
      display: block;
    }
    .dropdown {
      display: none;
      &:hover {
        display: block;
      }
      .options {
        width: 232px;
        background-color: white;
        margin: 0 0 0 -116px;
        border-radius: 6px;
        box-shadow: 0 0 12px 0 rgba(134, 134, 134, 0.15);
        overflow: auto;
        div {
          text-align: center;
          line-height: normal;
          position: static;
        }
        .status {
          overflow: auto;
          border-bottom: 1px solid #f0f0f0;
          div:first-child {
            margin: 28px 0 12px 0;
            font-size: 20px;
          }
          div:last-child {
            margin: 0 0 27px 0;
            font-size: 15px;
          }
        }
        .menu {
          border-bottom: 1px solid #f0f0f0;
          div {
            height: 52.5px;
            font-size: 15px;
            line-height: 52.5px;
            cursor: pointer;
            &:hover {
              background-color: #f6f6f6;
            }
          }
        }
        .logout {
          line-height: 52.5px;
          font-size: 13px;
          cursor: pointer;
          color: #969696;
          &:hover {
            background-color: #f6f6f6;
          }
        }
      }
    }
  }
  .wrap_rect {
    width: 232px;
    margin: 0 0 0 -116px;
    div {
      position: relative;
      width: 0;
      height: 0;
      margin: 1px 0 0 168px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 12px solid white;
      box-sizing: border-box;
      z-index: 1;
    }
  }
}
</style>
