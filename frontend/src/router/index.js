import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import auth from "./auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  auth
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
