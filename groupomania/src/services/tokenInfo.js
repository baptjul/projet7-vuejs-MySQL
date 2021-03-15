import jwt_decode from "jwt-decode";

export default function tokenInfo() {
  let token = localStorage.getItem('token')
  let decoded = jwt_decode(token);
  return decoded;
}
