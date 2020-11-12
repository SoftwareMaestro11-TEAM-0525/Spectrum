import axios from "axios";
import authHeader from "../services/auth-header";

const initialState = {
  elements: {
    nodes: [],
    edges: []
  }
};

export const mindmap = {
  namespaced: true,
  state: initialState,
  actions: {
    getMindmapData({ commit }, { userID }) {
      return axios
        .get(`/api/cytoscape/${userID}`, {
          headers: authHeader()
        })
        .then(
          response => {
            console.log(response.data.result.cyjson);
            commit("setCyjson", response.data.result.cyjson);
            return Promise.resolve(response.data.result.cyjson);
          },
          error => {
            console.log(error.response);
            return Promise.reject(error);
          }
        );
    },
    addMindmapNode({ commit }, data) {
      commit("addNode", data);
    },
    addMindmapEdge({ commit }, data) {
      commit("addEdge", data);
    },
    patchMindmapData({ commit, state }, data) {
      const { userID } = data;
      const { nodes, edges } = state.elements;
      const cyjson = {
        nodes,
        edges
      };

      return axios
        .patch(
          `/api/cytoscape/${userID}`,
          {
            cyjson: cyjson
          },
          {
            headers: authHeader()
          }
        )
        .then(
          response => {
            commit("setCyjson", response.data.result.cyjson);
            return Promise.resolve();
          },
          error => {
            return Promise.reject(error);
          }
        );
    },
    patchSampleMindmapData({ commit }, data) {
      const { userID } = data;
      const cyjson = {
        nodes: [
          { data: { id: "0", name: "김현우" } },
          { data: { id: "-1", name: "멋쟁이 사자처럼" } },
          { data: { id: "-2", name: "컨트리뷰톤" } },
          { data: { id: "-3", name: "교내" } },
          { data: { id: "-4", name: "소프트웨어마에스트로" } },
          { data: { id: "-5", name: "어학" } },
          { data: { id: "-6", name: "7기" } },
          { data: { id: "-7", name: "8기" } },
          { data: { id: "-8", name: "HSK 2급" } },
          { data: { id: "-9", name: "TOEIC" } },
          { data: { id: "-10", name: "개인블로그" } },
          { data: { id: "-11", name: "여기거기" } },
          { data: { id: "-12", name: "빌리언즈" } },
          { data: { id: "-13", name: "제페토" } },
          { data: { id: "-14", name: "똑똑" } },
          { data: { id: "-15", name: "디지스트 아이디어톤" } },
          { data: { id: "-16", name: "sPetcial" } },
          { data: { id: "-17", name: "운영진" } },
          { data: { id: "-18", name: "영상녹화" } },
          { data: { id: "-19", name: "django" } },
          { data: { id: "-20", name: "대경권프로그래밍대회" } },
          { data: { id: "-21", name: "미국 연수" } },
          { data: { id: "-22", name: "산호세대학" } },
          { data: { id: "-23", name: "CES2018" } }
        ],
        edges: [
          { data: { id: "1", source: "0", target: "-1" } },
          { data: { id: "2", source: "0", target: "-3" } },
          { data: { id: "3", source: "0", target: "-2" } },
          { data: { id: "4", source: "0", target: "-4" } },
          { data: { id: "5", source: "-3", target: "-21" } },
          { data: { id: "6", source: "-21", target: "-22" } },
          { data: { id: "7", source: "-21", target: "-23" } },
          { data: { id: "8", source: "-3", target: "-20" } },
          { data: { id: "9", source: "-5", target: "-8" } },
          { data: { id: "10", source: "-5", target: "-9" } },
          { data: { id: "11", source: "0", target: "-5" } },
          { data: { id: "12", source: "-1", target: "-6" } },
          { data: { id: "13", source: "-1", target: "-7" } },
          { data: { id: "14", source: "-7", target: "-16" } },
          { data: { id: "15", source: "-14", target: "-15" } },
          { data: { id: "16", source: "-6", target: "-10" } },
          { data: { id: "17", source: "-6", target: "-11" } },
          { data: { id: "18", source: "-6", target: "-12" } },
          { data: { id: "19", source: "-6", target: "-13" } },
          { data: { id: "20", source: "-10", target: "-19" } },
          { data: { id: "21", source: "-11", target: "-19" } },
          { data: { id: "22", source: "-12", target: "-19" } },
          { data: { id: "23", source: "-13", target: "-19" } },
          { data: { id: "24", source: "-7", target: "-18" } },
          { data: { id: "25", source: "-7", target: "-17" } },
          { data: { id: "26", source: "-7", target: "-14" } }
        ]
      };
      return axios
        .patch(
          `/api/cytoscape/${userID}`,
          {
            cyjson: cyjson
          },
          {
            headers: authHeader()
          }
        )
        .then(
          response => {
            commit("setCyjson", response.data.result.cyjson);
            return Promise.resolve();
          },
          error => {
            return Promise.reject(error);
          }
        );
    },
    patchEmptyMindmapData({ commit }, data) {
      const { userID } = data;
      return axios
        .patch(
          `/api/cytoscape/${userID}`,
          {
            cyjson: {}
          },
          {
            headers: authHeader()
          }
        )
        .then(
          response => {
            commit("setCyjson", response.data.result.cyjson);
            return Promise.resolve();
          },
          error => {
            return Promise.reject(error);
          }
        );
    }
  },
  mutations: {
    setCyjson(state, cyjson) {
      state.elements = cyjson;
    },
    addNode(state, data) {
      const { id, name } = data;
      //{ data: { id: "-23", name: "CES2018" } }
      state.elements.nodes.push({
        data: {
          id: id,
          name: name
        }
      });
    },
    addEdge(state, data) {
      const { id, source, target } = data;
      state.elements.edges.push({
        data: { id: id, source: source, target: target }
      });
    }
  }
};
