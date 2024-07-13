// utils/auth.ts
import { getCookie } from "cookies-next";

export function isAuthenticated(): boolean {
  const accessToken = getCookie("accessToken");
  const userData = getCookie("role"); // Assuming you have user data in cookies

  // Perform any additional checks if necessary
  return !!accessToken && !!userData;
}
