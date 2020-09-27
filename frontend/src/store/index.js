import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { auth } from "@/store/auth.module";
import { mindmap } from "@/store/mindmap.module";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {},
  modules: {
    auth,
    mindmap
  },
  plugins: [createPersistedState()]
});
