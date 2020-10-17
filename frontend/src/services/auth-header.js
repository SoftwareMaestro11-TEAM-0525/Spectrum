export default function authHeader() {
  let userToken = JSON.parse(localStorage.getItem("vuex")).auth.user.token;

  if (userToken) {
    return { Authorization: "Bearer " + userToken };
  } else {
    return {};
  }
}
