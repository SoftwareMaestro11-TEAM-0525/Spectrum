import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import auth from "./auth";
import Main from "@/views/Main/Main";
import Input from "@/views/Input/Input";

import store from "@/store/index";

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
    path: "/input/:type",
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

router.beforeEach((to, from, next) => {
  const publicPages = ["Login", "Join", "Password", "Home"];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = store.state.auth.status.loggedIn;

  if (authRequired && !loggedIn) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
