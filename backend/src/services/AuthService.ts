import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/AuthRepository";
import { Profile } from "passport-google-oauth20";

const authRepository = new AuthRepository();

interface JwtPayload {
  id: string;
}

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
    const token = jwt.sign({ id: user.id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    )
    return { token, user };
  }

  async register(name: string, email: string, password: string) {
    const user = await authRepository.findByEmail(email);
    if (user) {
      throw new Error("Email ja cadastrado");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return authRepository.createUser(name, email, hashedPassword);
  }

  async getUserByToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as JwtPayload;
      const user = await authRepository.findByUserId(decoded.id);
      if (!user) {
        throw new Error("Usuario nao encontrado");
      }
      return user;
    } catch (error) {
      throw new Error("Token invalido");
    }
  }

  async handleGoogleLogin(profile: Profile) {
    if (!profile.emails || profile.emails.length === 0) {
      throw new Error("O perfil do Google não contém um e-mail válido.");
    }
    const email = profile.emails[0].value;
    const name = profile.displayName;
    let user = await authRepository.findByEmail(email);
    if (!user) {
      user = await authRepository.createUser(name, email, "google_oauth_default_password");
      console.log("[AuthService] Novo usuário criado:", user.id);
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    console.log("[AuthService] Usuário autenticado com sucesso:", user.id);
    return { id: user.id, name: user.name, token };
  }
}