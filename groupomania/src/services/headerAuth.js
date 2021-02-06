export default function headerAuth() {
  const user = JSON.parse(sessionStorage.getItem('token'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}
