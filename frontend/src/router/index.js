import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import auth from "./auth";
import Mindmap from "@/views/mindmap/Mindmap";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/mindmap",
    name: "Mindmap",
    component: Mindmap
  },
  ...auth
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
