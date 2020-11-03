import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import eh from "cytoscape-edgehandles";
import coseBilkent from "cytoscape-cose-bilkent";

cytoscape.use(coseBilkent);
cytoscape.use(cxtmenu);
cytoscape.use(eh);

let cy;

let Mindmap = {
  methods: {
    cy_def: function(data) {
      const edgeColor = "#ced6e0";
      const edgeWidth = "2px";
      const arrowScale = 1.2;
      cy = cytoscape({
        // 기본 cytoscape 설정
        container: document.getElementById("cy"),
        boxSelectionEnabled: false,
        autounselectify: true,
        // cytoscape style 코드
        style: [
          {
            selector: "node",
            style: {
              content: "data(name)",
              "text-valign": "center",
              color: "#57606f",
              "text-outline-width": 2,
              "text-outline-color": "white",
              "background-color": "#57606f",
              "text-wrap": "wrap",

              label: "data(name)"
            }
          },
          {
            selector: "edge",
            style: {
              width: edgeWidth,
              "curve-style": "bezier",
              "line-color": edgeColor,
              "target-arrow-color": edgeColor,
              "target-arrow-shape": "vee",
              "arrow-scale": arrowScale
            }
          },
          {
            selector: ":selected",
            style: {
              "background-color": "black",
              "line-color": "black",
              "target-arrow-color": "black",
              "source-arrow-color": "black",
              "text-outline-color": "black"
            }
          },
          {
            selector: ".eh-handle",
            style: {
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
            selector: ".eh-hover",
            style: {
              "background-color": "blue"
            }
          },
          {
            selector: ".eh-source",
            style: {
              "border-width": 2,
              "border-color": "green"
            }
          },
          {
            selector: ".eh-target",
            style: {
              "border-width": 2,
              "border-color": "purple"
            }
          },
          {
            selector: ".eh-preview, .eh-ghost-edge",
            style: {
              "background-color": "blue",
              "line-color": "blue",
              "target-arrow-color": "blue",
              "source-arrow-color": "blue"
            }
          },
          {
            selector: ".eh-ghost-edge.eh-preview-active",
            style: {
              opacity: 0
            }
          }
          // {
          //   selector: "node.highlighted",
          //   style: {
          //     "border-width": "6px",
          //     "border-color": "#8FDC97"
          //   }
          // },
        ],
        //cytoscape 마인드맵에서 사용하는 데이터 구조
        elements: data,
        //cytoscape 레이아웃 설정(circle, cola, cose, grid 등등)
        layout: {
          name: "cose-bilkent",
          roots: "#0",
          padding: 50,
          animate: false
        }
      });
    },
    view_init: function() {
      //edgehandles 선언
      let eh = cy.edgehandles();
      eh.enabled = false;

      //mind map 자동 크기 조절 코드
      let resizeTimer;
      window.addEventListener("resize", function() {
        this.clearTimeout(resizeTimer);
        resizeTimer = this.setTimeout(function() {
          cy.fit();
        }, 200);
      });

      //mouseOn, mouseOut 등등의 관련 상수들
      // const nodeMaxSize = 50;
      const nodeMaxSize = 15;
      // // const nodeMinSize = 5;
      const nodeMinSize = 1;
      const nodeActiveSize = 22;
      // const fontMaxSize = 8;
      const fontMaxSize = 3;
      // // const fontMinSize = 5;
      const fontMinSize = 1;
      const fontActiveSize = 7;

      // //엣지, 화살표 크기 값
      const edgeWidth = "2px";
      const edgeActiveWidth = "4px";
      // // const arrowScale = 0.8;
      const arrowScale = 1.2;
      // // const arrowActiveScale = 1.2;
      const arrowActiveScale = 1.4;

      const dimColor = "#dfe4ea";
      const edgeColor = "#ced6e0";
      const nodeColor = "#57606f";
      const nodeActiveColor = "#ffa502";

      // //상위 노드, 엣지 색
      const successorColor = "#ff6348";
      // //하위 노드, 엣지 색
      const predecessorsColor = "#1e90ff";

      cy.on("render", function(ele) {
        setResetFocus(ele.cy);
      });

      //여기서 부터는 mouseOn, mouseOut에 관련된 함수들
      function setDimStyle(target_cy, style) {
        target_cy.nodes().forEach(function(target) {
          target.style(style);
        });
        target_cy.edges().forEach(function(target) {
          target.style(style);
        });
      }

      function setFocus(
        target_element,
        successorColor,
        predecessorsColor,
        edgeWidth,
        arrowScale
      ) {
        target_element.style("background-color", nodeActiveColor);
        target_element.style("color", nodeColor);
        target_element.successors().each(function(e) {
          if (e.isEdge()) {
            e.style("width", edgeWidth);
            e.style("arrow-scale", arrowScale);
          }
          e.style("color", nodeColor);
          e.style("background-color", successorColor);
          e.style("line-color", successorColor);
          e.style("target-arrow-color", successorColor);
          setOpacityElement(e, 0.5);
        });
        target_element.predecessors().each(function(ele) {
          //하위 엣지와 노드
          if (ele.isEdge()) {
            ele.style("width", edgeWidth);
            ele.style("arrow-scale", arrowScale);
          }
          ele.style("color", nodeColor);
          ele.style("background-color", predecessorsColor);
          ele.style("line-color", predecessorsColor);
          ele.style("target-arrow-color", predecessorsColor);
          setOpacityElement(ele, 0.5);
        });
        target_element.neighborhood().each(function(e) {
          //이웃한 엣지와 노드
          setOpacityElement(e, 1);
        });
        target_element.style(
          "width",
          Math.max(parseFloat(target_element.style("width")), nodeActiveSize)
        );
        target_element.style(
          "height",
          Math.max(parseFloat(target_element.style("height")), nodeActiveSize)
        );
        target_element.style(
          "font-size",
          Math.max(
            parseFloat(target_element.style("font-size")),
            fontActiveSize
          )
        );
      }

      function setOpacityElement(target_element, degree) {
        target_element.style("opacity", degree);
      }

      function setResetFocus(target_cy) {
        target_cy.nodes().forEach(function(target) {
          target.style("background-color", nodeColor);
          target.style(
            "width",
            nodeMaxSize *
              (0.1 /
                cy
                  .elements()
                  .pageRank()
                  .rank("#" + target.id())) +
              nodeMinSize
          );
          target.style(
            "height",
            nodeMaxSize *
              (0.1 /
                cy
                  .elements()
                  .pageRank()
                  .rank("#" + target.id())) +
              nodeMinSize
          );
          target.style(
            "font-size",
            fontMaxSize *
              (0.1 /
                cy
                  .elements()
                  .pageRank()
                  .rank("#" + target.id())) +
              fontMinSize
          );
          target.style("color", nodeColor);
          target.style("opacity", 1);
        });
        target_cy.edges().forEach(function(target) {
          target.style("line-color", edgeColor);
          target.style("target-arrow-color", edgeColor);
          target.style("width", edgeWidth);
          target.style("arrow-scale", arrowScale);
          target.style("opacity", 1);
        });
      }

      cy.on("tapstart mouseover", "node", function(ele) {
        setDimStyle(cy, {
          "background-color": dimColor,
          "line-color": dimColor,
          "target-arrow-color": dimColor,
          color: dimColor
        });
        setFocus(
          ele.target,
          successorColor,
          predecessorsColor,
          edgeActiveWidth,
          arrowActiveScale
        );
      });

      cy.on("tapend mouseout", "node", function(ele) {
        setResetFocus(ele.cy);
      });

      cy.on("load", "node", function(ele) {
        setResetFocus(ele.cy);
      });
    },
    cxtmenu_def: function() {
      const popupEvent = this.popupEvent;
      const showArticleView = this.showArticleView;
      const store = this.$store;
      const nodeCommand = [
        {
          content: "Add",
          select: function(element) {
            popupEvent(element.id());
          }
        },
        {
          content: "Start",
          select: function() {
            if (cy.json().elements.nodes.length > 1) {
              eh.enabled = true;
              cy.on("tapdragout", "edge", () => {
                eh.enabled = false;
              });
            }
          }
        },
        {
          content: "Delete",
          select: function(element) {
            if (window.confirm("노드를 삭제하시겠습니까?")) {
              const targetID = element.id();
              const targetEdgesID = [];
              const nodes = store.state.mindmap.elements.nodes.filter(ele => {
                return ele.data.id !== targetID;
              });

              const edges = store.state.mindmap.elements.edges.filter(ele => {
                if (
                  ele.data.source === targetID ||
                  ele.data.target === targetID
                ) {
                  targetEdgesID.push(ele.data.id);
                  return false;
                } else return true;
              });

              const userID = store.state.auth.user.user_id;
              store
                .dispatch("mindmap/patchMindmapData", {
                  userID,
                  nodes,
                  edges
                })
                .then(
                  () => {
                    console.log("성공");
                    cy.remove("#" + element.id());
                    targetEdgesID.forEach(id => {
                      cy.remove("#" + id);
                    });
                  },
                  error => {
                    alert("데이터 삭제에 실패했습니다.");
                    console.log(error);
                  }
                );
            }
          }
        },
        {
          content: "View",
          select: function(element) {
            showArticleView(element.id());
          }
        }
      ];
      const edgeCommand = [
        {
          content: "Delete",
          select: function(ele) {
            cy.remove("#" + ele.id());
          }
        }
      ];
      const coreCommand = [
        {
          content: "Add",
          select: function() {
            let x = 1000;
            let y = 500;
            let min = 0;
            cy.nodes().forEach(function(target) {
              console.log("노드 아이디 값:" + target.id());
              if (target.id() < min) {
                min = Number(target.id());
                console.log("id, min : " + target.id() + " " + min);
              }
            });
            min = Number(min) - 1;
            cy.add([
              {
                group: "nodes",
                data: { id: min },
                position: { x, y }
              }
            ]);
            cy.fit();
          }
        }
      ];

      cy.cxtmenu({
        selector: "node",
        openMenuEvents: "cxttap",
        commands: nodeCommand
      });
      cy.cxtmenu({ selector: "edge", commands: edgeCommand });
      cy.cxtmenu({ selector: "core", commands: coreCommand });
    }
  }
};

export default Mindmap;
