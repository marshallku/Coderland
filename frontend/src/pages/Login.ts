export default function Login() {
  window.location.href = `${import.meta.env.VITE_API_SERVER_URI}/auth/google`;
  return null;
}
