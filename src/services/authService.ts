import api from "./api";
import { LoginData } from "../types/LoginData";
import { RegisterData } from "../types/RegisterData";

export const register = async (data: RegisterData) => {
  const response = await api.post("/api/auth/registro", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/api/auth/entrar", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/api/auth/sair')
  return response.data
};

