<template>
  <div id="cy">
  </div>
</template>

<script>
import Mindmap from "@/mixins/Mindmap";

export default {
  name: "Mindmap",
  mixins: [Mindmap],
  components: {},
  created: function() {},
  data: function() {
    return {
      input: "",
      output: "",
      msg: "vue to cytoscape",
      count: 0
    };
  },
  async mounted() {
    const data = await this.getInitialData();
    this.cy_def(data);
    this.view_init();
    this.cxtmenu_def();
    // this.bfs_Event();
  },
  methods: {
    getInitialData: function() {
      const userID = this.$store.state.auth.user.user_id;
      return this.$store.dispatch("mindmap/getMindmapData", { userID }).then(
        res => {
          return res;
        },
        error => {
          alert("알 수 없는 에러가 발생했습니다.1");
          console.log(error);
        }
      );
    },
    popupEvent: function(id) {
      this.$emit("popupEvent", true, id);
    },
    showArticleView(id) {
      this.$emit("generalViewEvent", true, id);
    }
    //cytoscape mindmap style feature
    //cxtmenu feature
    // bfs_Event:function(){
    //   //bfs 탐색 시작점
    //   let startPoint = 0;
    //   //Node ID로 시작점 지정 가능
    //   startPoint = "#-1"
    //   let bfs = cy.elements().bfs(startPoint, function(){}, true);
    //   let result = new Array();
    //   let i = 0;
    //   //BFS 탐색 배열 저장 및 제공 함수
    //   // let j = 0;
    //   // let printResult = function(j){
    //   //   console.log("result"+result[j]);
    //   //   const set = Array.from(new Set(result));
    //   //   var jsonString = JSON.stringify(set);

    //   //   var jsonData = JSON.parse(jsonString);

    //   //   console.log(jsonData.toString())
    //   // }
    //   // BFS 탐색 함수
    //   let highlightNextEle = function(){
    //     if( i < bfs.path.length ){
    //       bfs.path[i].addClass('highlighted');
    //       let temp =Number(bfs.path[i].data().id);
    //       if(temp<0){
    //         result.push(Number(bfs.path[i].data().id));
    //         // printResult(j);
    //         // j++;
    //       };
    //       i++;
    //       setTimeout(highlightNextEle, 5);
    //     }
    //   };
    //   highlightNextEle();
    // }
  }
};
</script>
<style scoped lang="scss">
#cy {
  height: calc(100% - 64px);
  margin-top: 64px;
  button {
    position: absolute;
    width: 100px;
    height: 40px;
    top: 30px;
    left: 50%;
    margin-left: -50px;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
