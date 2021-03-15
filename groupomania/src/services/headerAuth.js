import jwt_decode from "jwt-decode";

export default function headerAuth() {
  const user = JSON.parse(localStorage.getItem('token'));
  const username = jwt_decode(user.token).username
  if (user && user.token && username) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}
