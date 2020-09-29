import axios from "axios";
import authHeader from "./auth-header";

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
            commit("setCyjson", response.data.result.cyjson);
            return Promise.resolve(response.data.result.cyjson);
          },
          error => {
            return Promise.reject(error);
          }
        );
    },
    patchMindmapData({ commit }, data) {
      const { userID, cyjson } = data;
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
    }
  },
  mutations: {
    setCyjson(state, cyjson) {
      state.elements = cyjson;
    }
  }
};
