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
          .selector(".eh-handle")
          .css({
            "background-color": "blue",
            width: 12,
            height: 12,
            shape: "ellipse",
            "overlay-opacity": 0,
            "border-width": 12, 
            "border-opacity": 0
          })
          .selector(".eh-hover")
          .css({
            "background-color": "blue"
          })

          .selector(".eh-source")
          .css({
            "border-width": 2,
            "border-color": "blue"
          })
          .selector(".eh-target")
          .css({
            "border-width": 2,
            "border-color": "blue"
          })

          .selector(".eh-preview, .eh-ghost-edge")
          .css({
            "background-color": "blue",
            "line-color": "blue",
            "target-arrow-color": "blue",
            "source-arrow-color": "blue"
          })
          .selector(".eh-ghost-edge.eh-preview-active")
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
          padding: 10,
          animate: false,
          gravityRangeCompound: 1.5,
          fit: true,
          tile: true  
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
              cy.add([
                {
                  group: "nodes",
                  data: { id: cy.json().elements.nodes.length + 1 + "node" }
                },
                {
                  group: "edges",
                  data: {
                    id: cy.json().elements.edges.length + 1 + "edge",
                    source: ele.id(),
                    target: cy.json().elements.nodes.length + 1 + "node"
                  }
                }
              ]);
            }
          },
			
          {
            content: "start",
            
            select: function() {
              eh.enabled = true;
              cy.on('tapdragout', 'edge', function() {
                eh.enabled = false;
              })
            }
          },
          {
            content: "Delete",
            select: function(ele) {
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
              cy.add([
                {
                  group: "nodes",
                  data: { id: cy.json().elements.nodes.length + 1 + "node" }
                }
              ]);
            }
          },

          {
            content: "기타",
            select: function() {
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
