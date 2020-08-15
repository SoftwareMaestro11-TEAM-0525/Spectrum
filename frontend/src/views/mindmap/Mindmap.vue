<template>
  <div>
    <div>
      MindMap-Vue

      <div id="cy"></div>
    </div>
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
          // padding: 10,
        }
      });
      eh = cy.edgehandles();
      eh.enabled=false;

      let resizeTimer;
      window.addEventListener("resize", function() {
        this.clearTimeout(resizeTimer);
        resizeTimer = this.setTimeout(function() {
          cy.fit();
        }, 200);
      });

      const nodeMaxSize = 50;
      const nodeMinSize = 5;
      const nodeActiveSize = 28;
      const fontMaxSize = 8;
      const fontMinSize = 5;
      const fontActiveSize = 7;

      // // edge & arrow 크기값
      const edgeWidth = '2px';
      const edgeActiveWidth = '4px';
      const arrowScale = 0.8;
      const arrowActiveScale = 1.2;
      

      const dimColor = '#dfe4ea';
      const edgeColor = '#ced6e0';
      const nodeColor = '#57606f';
      const nodeActiveColor = '#ffa502';

      // 상위 node & edge color
      const successorColor = '#ff6348';
      // 하위 node & edge color
      const predecessorsColor = '#1e90ff';
      window.addEventListener("load",function(){
        cy.json({
          style: [ // the stylesheet for the graph
          {
            selector: 'node',
            style: {
                content: "data(id)",
                "text-valign": "center",
                color: "#57606f",
                "text-outline-width": 2,
                "text-outline-color": "white",
                "background-color": "#57606f",
                "text-wrap": "wrap",
                
                "label": "data(id)",
                
                "width": function (ele) {
                    if(cy.elements().pageRank().rank('#'+ ele.id())!=undefined){
                      return nodeMaxSize * (0.1/ cy.elements().pageRank().rank('#'+ ele.id()))  + nodeMinSize;
                    }
                },
                'height': function (ele) {
                    return nodeMaxSize * (0.1/cy.elements().pageRank().rank('#'+ ele.id())) + nodeMinSize;
                },
                'font-size': function (ele) {
                    return fontMaxSize * (0.1/cy.elements().pageRank().rank('#'+ ele.id())) + fontMinSize;
                }
            }
          },
          {
            selector: 'edge',
            style: {
              'width': edgeWidth,
              'curve-style': 'bezier',
              'line-color': edgeColor,
              'target-arrow-color': edgeColor,
              'target-arrow-shape': 'vee',
              'arrow-scale': arrowScale
            }
          },
          {
            selector:":selected",
            style : {
              "background-color": "black",
              "line-color": "black",
              "target-arrow-color": "black",
              "source-arrow-color": "black",
              "text-outline-color": "black"
            } 
          },
          {
            selector:".eh-handle",
            style : {
              "background-color": "blue",
              width: 12,
              height: 12,
              shape: "ellipse",
              "overlay-opacity": 0,
              "border-width": 12,
              "border-opacity": 0
            } 
          },
          {
            selector:".eh-hover",
            style : {
             "background-color": "blue"
            }
          },
          {
            selector:".eh-source",
            style : {
             "border-width": 2,
              "border-color": "blue"
            }
          },
          {
            selector:".eh-target",
            style : {
              "border-width": 2,
              "border-color": "blue"
            }
          },
          {
            selector:".eh-preview, .eh-ghost-edge",
            style : {
              "background-color": "blue",
              "line-color": "blue",
              "target-arrow-color": "blue",
              "source-arrow-color": "blue"
            }
          },
          {
            selector:".eh-ghost-edge.eh-preview-active",
            style : {
              opacity: 0
            }
          },
        ]});
      });
      function setDimStyle(target_cy, style) {
        target_cy.nodes().forEach(function (target) {
            target.style(style);
        });
        target_cy.edges().forEach(function (target) {
            target.style(style);
        });
      }

      function setFocus(target_element, successorColor, predecessorsColor, edgeWidth, arrowScale) {
          target_element.style('background-color', nodeActiveColor);
          target_element.style('color', nodeColor);
          target_element.successors().each(function (e) {
              // 상위  엣지와 노드
              if (e.isEdge()) {
                  e.style('width', edgeWidth);
                  e.style('arrow-scale', arrowScale);
              }
              e.style('color', nodeColor);
              e.style('background-color', successorColor);
              e.style('line-color', successorColor);
              e.style('target-arrow-color', successorColor);
              setOpacityElement(e, 0.5);
          }
          );
          target_element.predecessors().each(function (ele) {
              // 하위 엣지와 노드
              if (ele.isEdge()) {
                  ele.style('width', edgeWidth);
                  ele.style('arrow-scale', arrowScale);
              }
              ele.style('color', nodeColor);
              ele.style('background-color', predecessorsColor);
              ele.style('line-color', predecessorsColor);
              ele.style('target-arrow-color', predecessorsColor);
              setOpacityElement(ele, 0.5);
          });
          target_element.neighborhood().each(function (e) {
              // 이웃한 엣지와 노드
              setOpacityElement(e, 1);
          }
          );
          target_element.style('width', Math.max(parseFloat(target_element.style('width')), nodeActiveSize));
          target_element.style('height', Math.max(parseFloat(target_element.style('height')), nodeActiveSize));
          target_element.style('font-size', Math.max(parseFloat(target_element.style('font-size')), fontActiveSize));
      }

      function setOpacityElement(target_element, degree) {
          target_element.style('opacity', degree);
      }

      function setResetFocus(target_cy) {
          target_cy.nodes().forEach(function (target) {
              target.style('background-color', nodeColor);
              // var rank = pageRank.rank(target);
              target.style('width', nodeMaxSize * (0.1/cy.elements().pageRank().rank('#'+ target.id())) + nodeMinSize);
              target.style('height', nodeMaxSize * (0.1/cy.elements().pageRank().rank('#'+ target.id())) + nodeMinSize);
              target.style('font-size', fontMaxSize * (0.1/cy.elements().pageRank().rank('#'+ target.id()))+ fontMinSize);
              target.style('color', nodeColor);
              target.style('opacity', 1);
          });
          target_cy.edges().forEach(function (target) {
              target.style('line-color', edgeColor);
              target.style('target-arrow-color', edgeColor);
              target.style('width', edgeWidth);
              target.style('arrow-scale', arrowScale);
              target.style('opacity', 1);
          });
      }
      cy.on('tapstart mouseover', 'node', function (ele) {
        setDimStyle(cy, {
            'background-color': dimColor,
            'line-color': dimColor,
            'target-arrow-color': dimColor,
            'color': dimColor
        });
        setFocus(ele.target, successorColor, predecessorsColor, edgeActiveWidth, arrowActiveScale);
      });

      cy.on('tapend mouseout', 'node', function (ele) {
        setResetFocus(ele.cy);
      });
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
  width: 90%;
  height: 90%;
  position: absolute;
  top: 60px;
  left: 0px;
  text-align: left;
}
body {
  font: 14px helvetica neue, helvetica, arial, sans-serif;
}
</style>
