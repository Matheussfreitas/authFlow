import { User } from '@/types/User';
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export type LoginSuccess = {
  token: string;
  user: User;
}

type LoginError = {
  message: string;
}

type LoginResponse = LoginSuccess | LoginError;

type RegisterResponse = User | LoginError;

const login = async (email: string, password: string): Promise<LoginResponse> => {
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

const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data || error.message;
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

export { getUserByToken, login, register };
