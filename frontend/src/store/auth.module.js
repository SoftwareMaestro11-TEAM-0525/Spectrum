import axios from "axios";
import jwt_decode from "jwt-decode";
import Auth from "../services/auth.service";

export const auth = {
  namespaced: true,
  state: { status: { loggedIn: false }, user: null },
  actions: {
    login({ commit }, user) {
      Auth.login(user).then(
        response => {
          const decodedToken = jwt_decode(response.data.result.token);
          const { user_id, user_email } = decodedToken;
          const userData = {
            ...response.data.result,
            user_id,
            user_email
          };
          //localStorage.setItem("user", JSON.stringify(userData));
          commit("loginSuccess", userData);

          Auth.getUserName().then(
            response => {
              commit("addUserName", response.data.result.user_name);
              return Promise.resolve();
            },
            error => {
              return Promise.reject(error);
            }
          );
        },
        error => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      commit("logout");
    },
    register({ commit }, user) {
      const { email: userEmail, password: userPwd } = user;
      Auth.register(user).then(
        () => {
          Auth.login({ username: userEmail, password: userPwd }).then(
            response => {
              const decodedToken = jwt_decode(response.data.result.token);
              const { user_id } = decodedToken;
              return axios
                .post(
                  "/api/cytoscape",
                  {
                    user_id: user_id,
                    cyjson: {
                      nodes: [
                        {
                          data: {
                            id: "0",
                            name: this.$store.state.auth.user.name
                          }
                        }
                      ],
                      edges: []
                    }
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + response.data.result.token
                    }
                  }
                )
                .then(
                  response => {
                    commit("registerSuccess");
                    return Promise.resolve(response.data);
                  },
                  error => {
                    console.log("Error in make cyjson doc");
                    return Promise.reject(error);
                  }
                );
            },
            error => {
              return Promise.reject(error);
            }
          );
        },
        error => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    addUserName(state, userName) {
      state.user.name = userName;
    }
  }
};
