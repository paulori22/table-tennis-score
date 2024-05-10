import axios from "axios";

export const getBaseApiUrl = () => {
  const baseUrlEnv =
    process.env.NEXT_PUBLIC_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
    return `http://${baseUrlEnv}/api`;
  }

  return `https://${baseUrlEnv}/api`;
};

export const scoreApi = axios.create({
  baseURL: getBaseApiUrl(),
});
