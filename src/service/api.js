// @service/api.ts
import axios from "axios";
import { Platform } from "react-native";

export const BASE_URL =
  Platform.select({
    ios: "http://localhost:5001",
    android: "http://10.0.2.2:5001",
    default: "http://localhost:5001",
  }) ?? "http://localhost:5001";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  // withCredentials: false, // usually not needed in RN
});

export default axiosInstance;
