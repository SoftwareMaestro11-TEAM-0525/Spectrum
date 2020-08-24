<template>
  <div id="cy"></div>
</template>

<script>
var cytoscape = require("cytoscape");
var cxtmenu = require("cytoscape-cxtmenu");
var eh = require("cytoscape-edgehandles");
var cola = require('cytoscape-cola');

cytoscape.use( cola );

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
      let cy = cytoscape({
        // 기본 cytoscape 설정
        container: document.getElementById("cy"),
        boxSelectionEnabled: false,
        autounselectify: true,
        // cytoscape style 코드
        //cytoscape 마인드맵에서 사용하는 데이터 구조
        elements: {
          nodes: [
            { data: { id: "0", name: "김현우"} },
            { data: { id: "-1", name: "멋쟁이 사자처럼"} },
            { data: { id: "-2", name: "컨트리뷰톤"} },
            { data: { id: "-3", name: "교내"} },
            { data: { id: "-4", name: "소프트웨어마에스트로"} },
            { data: { id: "-5", name: "어학"} },
            { data: { id: "-6", name: "7기"} },
            { data: { id: "-7", name: "8기"} },
            { data: { id: "-8", name: "HSK 2급"} },
            { data: { id: "-9", name: "TOEIC"} },
            { data: { id: "-10", name: "개인블로그"} },
            { data: { id: "-11", name: "여기거기"} },
            { data: { id: "-12", name: "빌리언즈"} },
            { data: { id: "-13", name: "제페토"} },
            { data: { id: "-14", name: "똑똑"} },
            { data: { id: "-15", name: "디지스트 아이디어톤"} },
            { data: { id: "-16", name: "sPetcial"} },
            { data: { id: "-17", name: "운영진"} },
            { data: { id: "-18", name: "영상녹화"} },
            { data: { id: "-19", name: "django"} },
            { data: { id: "-20", name: "대경권프로그래밍대회"} },
            { data: { id: "-21", name: "미국 연수"} },
            { data: { id: "-22", name: "산호세대학"} },
            { data: { id: "-23", name: "CES2018"} },
          ],
          edges: [
            { data: { id: "1", source:"0", target:"-1"}},
            { data: { id: "2", source:"0", target:"-3"}},
            { data: { id: "3", source:"0", target:"-2"}},
            { data: { id: "4", source:"0", target:"-4"}},
            { data: { id: "5", source:"-3", target:"-21"}},
            { data: { id: "6", source:"-21", target:"-22"}},
            { data: { id: "7", source:"-21", target:"-23"}},
            { data: { id: "8", source:"-3", target:"-20"}},
            { data: { id: "9", source:"-5", target:"-8"}},
            { data: { id: "10", source:"-5", target:"-9"}},
            { data: { id: "11", source:"0", target:"-5"}},
            { data: { id: "12", source:"-1", target:"-6"}},
            { data: { id: "13", source:"-1", target:"-7"}},
            { data: { id: "14", source:"-7", target:"-16"}},
            { data: { id: "15", source:"-14", target:"-15"}},
            { data: { id: "16", source:"-6", target:"-10"}},
            { data: { id: "17", source:"-6", target:"-11"}},
            { data: { id: "18", source:"-6", target:"-12"}},
            { data: { id: "19", source:"-6", target:"-13"}},
            { data: { id: "20", source:"-10", target:"-19"}},
            { data: { id: "21", source:"-11", target:"-19"}},
            { data: { id: "22", source:"-12", target:"-19"}},
            { data: { id: "23", source:"-13", target:"-19"}},
            { data: { id: "24", source:"-7", target:"-18"}},
            { data: { id: "25", source:"-7", target:"-17"}},
            { data: { id: "26", source:"-7", target:"-14"}},
            
          ]
        },
        //cytoscape 레이아웃 설정(circle, cola, cose, grid 등등)
        layout: {
          name: "breadthfirst",
          padding: 100,
        }
      });
      //edgehandles 선언
      eh = cy.edgehandles();
      eh.enabled=false;

      //mind map 자동 크기 조절 코드(아마 나중에 바꿔야 될 수도?)
      let resizeTimer;
      window.addEventListener("resize", function() {
        this.clearTimeout(resizeTimer);
        resizeTimer = this.setTimeout(function() {
          cy.fit();
        }, 200);
      });

      //mouseOn, mouseOut 등등의 관련 상수들
      const nodeMaxSize = 50;
      const nodeMinSize = 5;
      const nodeActiveSize = 28;
      const fontMaxSize = 8;
      const fontMinSize = 5;
      const fontActiveSize = 7;

      //엣지, 화살표 크기 값
      const edgeWidth = '2px';
      const edgeActiveWidth = '4px';
      const arrowScale = 0.8;
      const arrowActiveScale = 1.2;


      const dimColor = '#dfe4ea';
      const edgeColor = '#ced6e0';
      const nodeColor = '#57606f';
      const nodeActiveColor = '#ffa502';

      //상위 노드, 엣지 색
      const successorColor = '#ff6348';
      //하위 노드, 엣지 색
      const predecessorsColor = '#1e90ff';

      //width,height,font-size 설정 하는데 cytoscape 선언부 안에서
      //cy를 꺼내 쓸 수가 없어서 페이지가 열릴 때마다 스타일 적용하는 방식으로 해결
      window.addEventListener("load",function(){
        cy.json({
          style: [
          {
            selector: 'node',
            style: {
                content: "data(name)",
                "text-valign": "center",
                color: "#57606f",
                "text-outline-width": 2,
                "text-outline-color": "white",
                "background-color": "#57606f",
                "text-wrap": "wrap",

                "label": "data(name)",

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
              "background-color": "red",
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
              "border-color": "green"
            }
          },
          {
            selector:".eh-target",
            style : {
              "border-width": 2,
              "border-color": "purple"
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
      //여기서 부터는 mouseOn, mouseOut에 관련된 함수들
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
            //하위 엣지와 노드
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
            //이웃한 엣지와 노드
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

      //cxtmenu 1) 꾹 누르거나 2) 오른쪽 버튼으로 꾹 눌렀을 때
      //-> 설정 버튼 나오게 해주는 라이브러리 관련 function
      cy.cxtmenu({
        selector: "node",
        commands: [
          {
            content: "Add",
            select: function(ele) {
              let min=1;
              let max=0;
              cy.nodes().forEach(function(target){
                console.log("노드 아이디 값:"+target.id());
                if(target.id()<min){
                  min = Number(target.id());
                  console.log("id, min : "+target.id()+" "+min);
                }
              })
              cy.edges().forEach(function(target){
                if(target.id()>max){
                  max = Number(target.id());
                }
              })
              min = Number(min)-1;
              max = Number(max)+1;
              console.log(min);
              let x = cy.$('#'+ ele.id()).position('x')-100;
              let y = cy.$('#'+ ele.id()).position('y')-100;
              cy.add([
                {
                  group: "nodes",
                  data: { 
                    id: min, 
                    name : min+"node",
                  },
                  position:{
                      x,
                      y
                    }
                },
                {
                  group: "edges",
                  data: {
                    id: max,
                    source: ele.id(),
                    target: min
                  }
                }
              ]);
              cy.fit();
            }
          },

          {
            content: "start",

            select: function() {
              if(cy.json().elements.nodes.length>1){
                eh.enabled = true;
                cy.on('tapdragout', 'edge', function() {
                  eh.enabled = false;
                })
              }
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
              let x = 1000;
              let y = 500; 
              let min=0;
              cy.nodes().forEach(function(target){
                console.log("노드 아이디 값:"+target.id());
                if(target.id()<min){
                  min = Number(target.id());
                  console.log("id, min : "+target.id()+" "+min);
                }
              })
              min = Number(min)-1;
              cy.add([
                {
                  group: "nodes",
                  data: { id: min},
                  position:{
                      x,
                      y
                    }
                }
              ]);
              cy.fit();
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
  height: calc(100% - 64px);
  margin-top: 64px;
}
body {
  font: 14px helvetica neue, helvetica, arial, sans-serif;
}
</style>
