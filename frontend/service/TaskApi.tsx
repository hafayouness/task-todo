import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task, TaskResponse } from "../type/Task";

// Remplacer localhost par l'IP locale si vous testez sur mobile
const BASE_URL = "http://localhost:5000/api";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Ajouter le token JWT automatiquement
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gestion des erreurs
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Erreur API :", error.message);
    return Promise.reject(error);
  }
);

// Récupérer les tâches d’un utilisateur
export const getTasksByUser = async (userId: number): Promise<TaskResponse> => {
  const res = await API.get(`/task/user/${userId}`);
  return res.data;
};

// Créer une tâche
export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const res = await API.post("/task/create", task);
  return res.data;
};

// Supprimer une tâche
export const deleteTask = async (taskId: number): Promise<void> => {
  await API.delete(`/task/${taskId}`);
};

// Changer le statut
export const updateTaskStatus = async (
  taskId: number,
  status: "pending" | "done"
): Promise<Task> => {
  const res = await API.put(`/task/${taskId}`, { status });
  return res.data;
};

export default API;
