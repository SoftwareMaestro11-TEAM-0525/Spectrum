import Login from "../views/auth/Login";
import Join from "../views/auth/Join";
import Password from "../views/auth/Password";

export default [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/join",
    name: "Join",
    component: Join
  },
  {
    path: "/password",
    name: "Password",
    component: Password
  }
];
