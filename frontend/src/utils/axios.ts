import axios from 'axios';

// Configuração da instância do Axios
const api = axios.create({
  baseURL: "http://localhost:3000",
});

const login = async (email: string, password: string): Promise<any> => {
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

const register = async (name: string, email: string, password: string): Promise<any> => {
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

export { login, register };