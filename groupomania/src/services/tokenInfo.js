import jwt_decode from "jwt-decode";

export default function tokenInfo() {
  var token = sessionStorage.getItem('token')
  var decoded = jwt_decode(token);

  return decoded;
}
