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
        <div class="type">{{ type }}</div>
        <div class="title">{{ title }}</div>
        <div class="info">
          <span class="isPublic">{{ isSecret }}</span>
          <div class="vDivider"></div>
          <span class="date">{{ date.start }} ~ {{ date.end }}</span>
        </div>
        <div class="keywords">
          <div v-for="keyword in keywords" :key="keyword.text" class="keyword">
            {{ keyword.text }}
          </div>
        </div>
        <div class="copy" v-on:click="generateShareLink">
          <img src="~@/assets/image/copy.png" alt="공유 링크 복사" />
          <span>공유 링크 복사</span>
        </div>

        <div class="hDivider"></div>

        <!--본문-->
        <template v-if="isDataReady">
          <general-type :content="content"></general-type>
          <link-type v-if="false"></link-type>
          <file-type v-if="false"></file-type>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleService from "@/services/article.service";
import ArticleShareService from "@/services/share.article.service";
import GeneralType from "./GeneralType";
import LinkType from "@/views/Article/LinkType";
import FileType from "@/views/Article/FileType";

export default {
  name: "ArticleView",
  props: ["nodeID"],
  components: {
    FileType,
    GeneralType,
    LinkType
  },
  methods: {
    closeView() {
      this.$emit("closeArticleView", false);
    },
    generateShareLink() {
      ArticleShareService.makeArticleShareLink(
        this.$store.state.auth.user.user_id,
        this.nodeID
      ).then(res => {
        this.shareURL = `http://localhost/share/article/${res.share_key}`;
        navigator.clipboard.writeText(this.shareURL).then(() => {
        alert("복사 완료!");
      });
        console.log(this.shareURL);
      });
    },
  },
  data() {
    return {
      keywords: [],
      type: "",
      title: "",
      date: {
        start: "",
        end: ""
      },
      content: null,
      url: null,
      file: null,
      isSecret: null,
      isDataReady: false,
      shareURL: null
    };
  },
  mounted() {
    ArticleService.getArticles({
      userID: this.$store.state.auth.user.user_id,
      nodeID: this.nodeID
    }).then(
      res => {
        this.keywords = res.keyword;
        console.log(this.keywords);
        switch (res.type) {
          case "experience":
            this.type = "일반";
            break;
          case "file":
            this.type = "파일";
            break;
          case "link":
            this.type = "링크";
            break;
        }
        this.title = res.title;
        this.date.start = res.start_date.toString().substring(0, 10);
        this.date.end = res.end_date.toString().substring(0, 10);
        this.url = res.web_url;
        this.file = res.file_url;
        this.isSecret = res.secret ? "비공개" : "공개";
        this.content = res.content;

        this.isDataReady = true;
      },
      err => {
        alert("에러!");
        console.log(err);
      }
    );
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
  margin-bottom: 30px;
}
</style>
