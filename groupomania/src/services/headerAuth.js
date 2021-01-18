export default function headerAuth() {
  const user = JSON.parse(localStorage.getItem('token'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}
