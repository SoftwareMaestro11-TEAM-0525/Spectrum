<template>
  <nav class="navbar">
    <router-link to="/main">
      <div class="top_logo">
        <img src="@/assets/headerLogo.png" alt="logo" />
      </div>
    </router-link>
    <div class="item" v-if="isMain">
      <button>내 정보</button>
      <div class="dropdown">
        <div class="wrap_rect short">
          <div></div>
        </div>
        <div class="options">
          <div class="status">
            <div class>
              <b>{{ currentUserName }}</b> 님
            </div>
            <div class>
              등록된 경험 <b>{{ expCount }}</b>
            </div>
          </div>
          <div class="menu">
            <div @click="setSample">마이페이지</div>
            <div @click="setEmpty">설정</div>
          </div>
          <div class="logout" @click="handleLogout">로그아웃</div>
        </div>
      </div>
    </div>
    <div class="item" v-if="isMain">
      <button>공유하기</button>
      <div class="dropdown">
        <div class="wrap_rect long">
          <div></div>
        </div>
        <div class="share">
          <input type="text" :value="shareURL" readonly />
          <button v-on:click="copyShareLink">복사</button>
          <button v-on:click="generateShareLink">링크 생성</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ShareMindmapService from "@/services/share.mindmap.service";

export default {
  name: "NavBar",
  data() {
    return {
      expCount: this.$store.state.mindmap.elements.nodes.length,
      shareURL: ""
    };
  },
  computed: {
    currentUserName: function() {
      return this.$store.state.auth.user.name;
    }
  },
  props: {
    isMain: Boolean
  },
  async mounted() {
    const shareKey = localStorage.getItem("shareKey");
    if (!shareKey) {
      this.shareURL = "공유 링크를 생성해주세요.";
    } else {
      this.shareURL = `http://localhost:8080/share/${shareKey}`;
    }
  },
  methods: {
    copyShareLink() {
      navigator.clipboard.writeText(this.shareURL).then(() => {
        alert("복사 완료!");
      });
    },
    async generateShareLink() {
      const userId = this.$store.state.auth.user.user_id;
      const ShareKey = await ShareMindmapService.makeShareLink(userId).then(
        res => res.share_key
      );
      this.shareURL = `http://localhost:8080/share/${ShareKey}`;
      localStorage.setItem("shareKey", ShareKey);
    },
    popupEvent: function() {
      this.$emit("popupEvent");
    },
    handleLogout: function() {
      this.$store.dispatch("auth/logout");
      alert("로그아웃 되었습니다.");
      this.$router.push({ name: "Login" });
    },
    setSample() {
      const userID = this.$store.state.auth.user.user_id;
      this.$store.dispatch("mindmap/patchSampleMindmapData", { userID }).then(
        () => {
          console.log("patch sample data Success!");
        },
        error => {
          alert("patch sample data Error!");
          console.log(error);
        }
      );
    },
    setEmpty() {
      const userID = this.$store.state.auth.user.user_id;
      this.$store.dispatch("mindmap/patchEmptyMindmapData", { userID }).then(
        () => {
          console.log("patch empty data Success!");
        },
        error => {
          alert("patch empty data Error!");
          console.log(error);
        }
      );
    }
  }
};
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
    display: inline-flex;
    align-items: center;

    img {
      height: 32px;
    }
  }

  .item {
    width: 115px;
    float: right;
    line-height: normal;

    > button {
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

    button:hover + div {
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

      .share {
        width: 460px;
        height: 80px;
        box-sizing: border-box;
        margin: 0 0 0 -232px;
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 0 12px 0 rgba(134, 134, 134, 0.15);
        padding: 18px 14px;

        input {
          width: 244px;
          height: 44px;
          box-sizing: border-box;
          margin-right: 12px;
          background-color: #f6f6f6;
          border: none;
          border-radius: 8px;
          outline: none;
          padding-left: 8px;
          color: #363636;
          font-size: 14px;
        }

        button {
          width: 76px;
          height: 44px;
          box-sizing: border-box;
          vertical-align: middle;
          border: none;
          border-radius: 8px;
          outline: none;
          background-color: #524fff;
          cursor: pointer;
          color: white;
          font-size: 15px;
          margin-right: 12px;
        }

        button:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .wrap_rect {
    &.short {
      width: 232px;
      margin-left: -116px;

      div {
        margin: 1px 0 0 168px;
      }
    }

    &.long {
      width: 360px;
      margin-left: -232.5px;

      div {
        margin: 1px 0 0 280px;
      }
    }

    div {
      position: relative;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 12px solid white;
      box-sizing: border-box;
      z-index: 1;
    }
  }
}
</style>
