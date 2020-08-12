<template>
  <div>
    <div>
      MindMap-Vue
    </div>
    <div id="cy"></div>
  </div>
</template>

<script>
var cytoscape = require("cytoscape");
var cxtmenu = require("cytoscape-cxtmenu");
var eh = require("cytoscape-edgehandles");
cytoscape.use(cxtmenu);
cytoscape.use(eh);
export default {
  name: "Mindmap",
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
  methods: {
    view_init: function() {
      var cy = cytoscape({
        //기본 cytoscape 설정
        container: document.getElementById("cy"),
        boxSelectionEnabled: false,
        autounselectify: true,
        style: cytoscape
          .stylesheet()
          //node css 
          .selector("node")
          .css({
            content: "data(id)",
            "text-valign": "center",
            color: "white",
            "text-outline-width": 2,
            "text-outline-color": "#888",
            "background-color": "#888"
          })
          //선택된 node css 설정
          .selector(":selected")
          .css({
            "background-color": "black",
            "line-color": "black",
            "target-arrow-color": "black",
            "source-arrow-color": "black",
            "text-outline-color": "black"
          })
          .css({
            opacity: 0
          }),
        //cytoscape 마인드맵에서 사용하는 데이터 구조
        elements: {
          nodes: [
            { data: { id: "cat", name: "test1" } },
            { data: { id: "bird", name: "test2" } },
            { data: { id: "ladybug", name: "test1" } },
            { data: { id: "aphid", name: "test1" } },
            { data: { id: "rose", name: "test1" } },
            { data: { id: "grasshopper", name: "test1" } },
            { data: { id: "plant", name: "test1" } },
            { data: { id: "wheat", name: "test1" } }
          ],
          edges: [
            { data: { source: "cat", target: "bird" } },
            { data: { source: "bird", target: "ladybug" } },
            { data: { source: "bird", target: "grasshopper" } },
            { data: { source: "grasshopper", target: "plant" } },
            { data: { source: "grasshopper", target: "wheat" } },
            { data: { source: "ladybug", target: "aphid" } },
            { data: { source: "aphid", target: "rose" } }
          ]
        },
        layout: {
          name: "circle",
          padding: 10
        }
      });
      eh = cy.edgehandles();
      eh.enabled=false;
      cy.cxtmenu({
        selector: "node",
        commands: [
          {
            content: "Add",
            select: function(ele) {
              console.log(ele);
              console.log(eh);
              console.log("add_node");
              cy.add([
                {
                  group: "nodes",
                  data: { id: 'asdfjksdfakljfsdajksdfa' }
                },
                {
                  group: "edges",
                  data: {
                    id: this.count,
                    source: ele.id(),
                    target: 'asdfjksdfakljfsdajksdfa'
                  }
                }
              ]);
            }
          },
				
         {
            content: "stop",
            select: function(ele) {
              console.log(ele.id());
              console.log(eh);
              console.log("stop_draw_edge");
              eh.active =  false;
              eh.enabled = false;
            }
          },

          {
            content: "start",
            
            select: function(ele) {
              console.log(ele);
              console.log(eh)
              console.log("start_draw_edge");
              eh.enabled = true;
            }
          },
          {
            content: "Delete",
            select: function(ele) {
              console.log(ele.id());
              console.log("delete_node");
              cy.remove('#'+ ele.id());
            }
          }
        ]
      });
      cy.cxtmenu({
        selector: "edge",

        commands: [
          {
            content: "Delete",
            select: function(ele) {
              console.log(ele.position());
              console.log("delete_edge");
              cy.remove('#'+ ele.id());
            }
          }
        ]
      });

      cy.cxtmenu({
        selector: "core",

        commands: [
          {
            content: "Add",
            select: function() {
              console.log("add_node");
              cy.add([
                {
                  group: "nodes",
                  data: { id: 'asdfjksdfakljfsdajksdfa' }
                },
              ]);
            }
          },

          {
            content: "기타",
            select: function() {
              console.log("옵션");
            }
          }
        ]
      });
    }
  },
  computed: {},
  mounted: function() {
    this.view_init();
  }
}; 
</script>
<style scoped>
#cy {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 60px;
  left: 0px;
  text-align: left;
}
body {
  font: 14px helvetica neue, helvetica, arial, sans-serif;
}
</style>
