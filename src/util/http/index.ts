import axios from "axios";

export const getBaseApiUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
    return `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
};

export const scoreApi = axios.create({
  baseURL: getBaseApiUrl(),
});
