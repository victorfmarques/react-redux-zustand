import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000"
})

api.interceptors.request.use(async (config) => {
  const sleep = async (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(500)
  return config
})