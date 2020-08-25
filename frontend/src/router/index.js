import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import auth from "./auth";
import Main from "@/views/Main/Main";
import Input from "@/views/Main/Input";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/main",
    name: "Main",
    component: Main
  },
  {
    path: "/input",
    name: "Input",
    component: Input
  },
  ...auth
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
