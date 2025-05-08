import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/AuthRepository";

const authRepository = new AuthRepository();

export class AuthService {
  async login(email: string, password: string) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuario nao encontrado");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha invalida");
    }
    return user;
  }

  async register(name: string, email: string, password: string) {
    const user = await authRepository.findByEmail(email);
    if (user) {
      throw new Error("Email ja cadastrado");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return authRepository.createUser(name, email, hashedPassword);
  }
}