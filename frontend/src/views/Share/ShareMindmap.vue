<template>
  <div id="cy"></div>
</template>

<script>
import MindmapShare from "@/mixins/MindmapShare";
import ShareMindmapService from "@/services/share.mindmap.service";

export default {
  name: "ShareMindmap",
  mixins: [MindmapShare],
  async mounted() {
    const userId = await this.getOwnerInfo().then(res => res.user_id);
    const data = await this.getMindmapInfo(userId);
    this.cy_def(data);
    this.view_init();
    this.cxtmenu_def();
    this.increaseHits();
    // this.bfs_Event();
  },
  props: ["shareKey"],
  methods: {
    getOwnerInfo: function() {
      return ShareMindmapService.getMindmap(this.shareKey).then(res => {
        console.log(res);
        return res;
      });
    },
    getMindmapInfo(userId) {
      return ShareMindmapService.getMindmapInfo(userId).then(res => {
        console.log(res);
        return res;
      });
    },
    increaseHits() {
      ShareMindmapService.patchHits(this.shareKey);
    },
    showArticleView(id) {
      this.$emit("articleViewEvent", true, id);
    }
  }
};
</script>

<style scoped lang="scss">
#cy {
  height: calc(100% - 64px);
  margin-top: 64px;
}
</style>
