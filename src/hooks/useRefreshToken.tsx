export default function useRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  return refreshToken;
}
