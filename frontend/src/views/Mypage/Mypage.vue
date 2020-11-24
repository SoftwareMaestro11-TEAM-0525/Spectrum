<template>
  <div class="container">
    <nav-bar :isMain="false"></nav-bar>
    <div class="wrapper">
      <vue-word-cloud
          class="wordCloud"
          style=" height: 480px; width: 640px; "
          :words="words"
          font-family="Apple SD Gothic"
          font-size-ratio="3"
          spacingValueIndex="4"
          spacing="0.5"
          :color="
          ([, weight]) =>
            weight > 5 ? '#ec524b' : weight > 2 ? '#389393' : 'darkgray'
        "
      />
      <div class="timelineWrapper">
        <div class="timeline" v-if="true">
          <div class="timeline__wrap">
            <div class="timeline__items">
              <div
                  class="timeline__item"
                  v-for="item in timelineData"
                  :key="item.title"
              >
                <div class="timeline__content">
                  <div class="title">{{ item.title }}</div>
                  <div class="date">{{ item.start_date.substring(0, 10) }}</div>
                  <div class="content" v-html="item.content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sentenceWrapper">
        <div class="sentence">
          <div class="sItem">
            <div class="sTitle">소프트웨어 마에스트로</div>
            <p>컨트리뷰톤을 진행하면서 소프트웨어 마에스트로에 대해서 이야기를 좀 더 듣게 되었습니다.</p>
          </div>
          <div class="sItem">
            <div class="sTitle">컴퓨터 구조 수강 후기</div>
            <p>지난 2019년 2학기 컴퓨터 구조라는 수업을 듣고 이런 수업이 있구나 하고 있을 때 쯤 중간고사를 쳤고, 중간고사를 치고 기말이 다가올 때 쯤 도저히 안되겠다는 생각을 하게 되었습니다.</p>
          </div>
          <div class="sItem">
            <div class="sTitle">운암중학교 봉사단</div>
            <p>경북대 컴공_과동아리 중 하나인 L&C 소속으로 지난 2019년 1학기에 운암중 대학생 봉사단에 참가하게 되었습니다.</p>
          </div>
          <div class="sItem">
            <div class="sTitle">멋쟁이 사자처럼</div>
            <p>2학년 때 전국 단위 프로그래밍 동아리인 "멋쟁이 사자처럼"에서 경북대학교 7기로 활동을 하였으며, 현재도 8기 운영진으로 활동 중에 있습니다.</p>
          </div>
          <div class="sItem">
            <div class="sTitle">오픈소스 컨트리뷰톤</div>
            <p>지난 7월 부터 9월까지 약 2개월 동안 자바스크립트 한글화 팀으로 공개 SW 컨트리뷰톤에 참가를 하였습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MypageService from "@/services/mypage.service";
import NavBar from "@/components/NavBar";
import timeline from "@/module/timeline";
import "@/module/timeline.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import VueWordCloud from "vuewordcloud";

export default {
  name: "Mypage.vue",
  components: {
    NavBar,
    [VueWordCloud.name]: VueWordCloud
  },
  async mounted() {
    await MypageService.getTimelineData(
      this.$store.state.auth.user.user_id
    ).then(
      res => {
        console.log(res);
        res.sort((a, b) => {
          const timeA = new Date(a.start_date);
          const timeB = new Date(b.start_date);
          return timeA.getTime() - timeB.getTime();
        });

        res.map(item => {
          const converter = new QuillDeltaToHtmlConverter(
            JSON.parse(item.content).ops,
            {}
          );

          item.content = converter.convert();
          return item;
        });

        this.timelineData = res;
      },
      err => {
        console.log(err);
      }
    );

    timeline(document.querySelectorAll(".timeline"), {
      forceVerticalMode: 700,
      mode: "horizontal",
      verticalStartPosition: "left",
      visibleItems: 3
    });
  },
  data() {
    return {
      timelineData: null,
      words: [
        ["소프트웨어 마에스트로", 10],
        ["개발", 1],
        ["백엔드", 3],
        ["프론트엔드", 3],
        ["머신러닝", 3],
        ["동아리", 1],
        ["알고리즘", 7],
        ["AWS", 5],
        ["DOCKER", 2],
        ["PYTHON", 1],
        ["VUE.JS", 1],
        ["NODE.JS", 1],
        ["해커톤", 1]
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.container {
  height: auto;
  min-height: 100vh;
}

.wrapper {
  width: 986px;
  margin: 0 auto;
  padding-top: 64px;

  .wordCloud {
    width: 100% !important;
    margin: 0 auto;
    margin-top: 15px;
    background-color: white;
    border-radius: 4px;
    border: 1px solid lightgray;
  }

  .timelineWrapper {
    border-radius: 4px;
    margin-top: 15px;
    padding: 20px;
    background-color: white;
    border: 1px solid lightgray;
    box-sizing: border-box;
  }
}

.sentenceWrapper {
  border-radius: 4px;
  padding: 20px;
  background-color: white;
  border: 1px solid lightgray;
  box-sizing: border-box;
  margin-top: 16px;
}

.sentence {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  .sItem {
    box-sizing: border-box;
    padding: 20px;
    height: 150px;
    border: 1px solid lightgray;
    border-radius: 4px;
    color: #363636;
    background-color: white;
    .sTitle {
      font-weight: bold;
      font-size: 22px;
    }
  }
}

.timeline__content {
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .date {
    font-size: 16px;
    color: dimgray;
    margin-bottom: 8px;
  }

  .content {
    max-height: 100px;
    overflow: hidden;
  }
}
</style>
