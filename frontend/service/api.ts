import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Remplace cette IP par l'IP locale de ton PC
// Vérifie avec `ipconfig` ou `ifconfig`
const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Ajout du token automatiquement dans les headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Gestion des erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Erreur API :", error.message);
    return Promise.reject(error);
  }
);

export default api;
