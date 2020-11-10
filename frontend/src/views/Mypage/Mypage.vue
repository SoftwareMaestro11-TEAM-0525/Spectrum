<template>
  <div class="container">
    <nav-bar :isMain="false"></nav-bar>
    <div class="wrapper">
      <div class="timeline">
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
              </div>
            </div>
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

export default {
  name: "Mypage.vue",
  components: { NavBar },
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
      timelineData: null
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
  margin: 64px auto;
  height: calc(100% - 64px);
  padding-top: 50px;
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
}
</style>
