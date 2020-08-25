import Login from "@/views/auth/Login";
import Join from "@/views/auth/Join";
import Password from "@/views/auth/Password";
import Auth from "@/views/auth/Auth";

export default [
  {
    path: "/",
    name: "Auth",
    component: Auth,
    children: [
      {
        path: "login",
        name: "Login",
        component: Login
      },
      {
        path: "join",
        name: "Join",
        component: Join
      },
      {
        path: "password",
        name: "Password",
        component: Password
      }
    ]
  }
];
