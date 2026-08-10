import { LoginData } from "../types/LoginData";
import { RegisterData } from "../types/RegisterData";
import api from "./api";

export const register = async (data: RegisterData) => {
  const response = await api.post("/api/auth/registro", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/api/auth/entrar", data);
  return response.data;
};

export const dashboard = async() => {
    const response = await api.get('/api/auth/eu');
    return response.data

}