<template>
  <div class="blurPage" @click.self="closeView">
    <div class="container">
      <div class="header">
        <!--전체화면 버튼-->
        <div class="toggleWide">
          <img src="~@/assets/image/fullscreen.png" alt="전체화면" />
          <div class="tooltip">전체화면</div>
        </div>
        <!--창 닫기 버튼-->
        <img src="~@/assets/image/close.png" alt="창 닫기" @click="closeView" />
      </div>
      <div class="content">
        <div class="type">일반</div>
        <div class="title">첫 번째 게시글</div>
        <div class="info">
          <span class="isPublic">비공개</span>
          <div class="vDivider"></div>
          <span class="date">2018. 07. 06 ~ 2018. 07. 20</span>
        </div>
        <div class="keywords">
          <div class="keyword">키워드</div>
        </div>
        <div class="copy">
          <img src="~@/assets/image/copy.png" alt="글 복사" />
          <span>글 복사</span>
        </div>

        <div class="hDivider"></div>

        <!--본문-->
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
};
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
    display: flex;
    flex-direction: column;

    .type {
      color: #808080;
      font-size: 15px;
      margin-bottom: 8px;
    }

    .title {
      font-size: 30px;
      font-weight: bold;
      color: #363636;
      margin-bottom: 10px;
    }

    .info {
      display: flex;
      align-items: center;
      color: #808080;
      font-size: 15px;
      margin-bottom: 16px;
    }

    .keywords {
      display: flex;
      margin: 4px;

      .keyword {
        height: 30px;
        line-height: 30px;
        padding: 0 16px 0 16px;
        border: 1px solid #ededed;
        border-radius: 6px;
        font-size: 13px;
        font-weight: bold;
        color: #a3a3a3;
        margin-right: 8px;
      }
    }

    .copy {
      cursor: pointer;
      margin-bottom: 8px;
      align-self: flex-end;

      span {
        font-size: 13px;
        color: #a3a3a3;
        margin-right: 8px;
      }

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tooltip {
    display: inline-block;
    vertical-align: middle;
    margin-left: 4px;
    color: #a3a3a3;
  }

  img {
    vertical-align: middle;
    width: 24px;
    height: 24px;
    object-fit: contain;
    cursor: pointer;
  }
}

.vDivider {
  display: inline-block;
  width: 1px;
  height: 14px;
  background-color: #e8e8e8;
  margin: 0 16px 0 16px;
}

.hDivider {
  width: 100%;
  height: 1px;
  background-color: #ededed;
}
</style>
