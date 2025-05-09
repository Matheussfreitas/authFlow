import { Task } from '@/types/Task';
import { User } from '@/types/User';
import axios from 'axios';

// Configuração da instância do Axios
const api = axios.create({
  baseURL: "http://localhost:3000",
});

const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data || error.message;
  }
};

const register = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const getUserByToken = async (token: string): Promise<User> => {
  try {
    const response = await api.post("/auth/user", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data || error.message;
  }
};

const createTask = async (userId: string, data: Task): Promise<Task> => {
  try {
    const response = await api.post(`/${userId}/tasks` , data)
    return response.data;
  } catch (error: any) {
    return error.response?.data || error.message;
  }
}

export { login, register, getUserByToken, createTask };