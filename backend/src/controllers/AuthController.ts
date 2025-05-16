import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const user = await authService.register(name, email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await authService.login(email, password);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getUserByToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }
    try {
      const user = await authService.getUserByToken(token);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static async googleCallback(req: Request, res: Response) {
    console.log("req.user no callback:", req.user);
    try {
      const user = req.user as { token: string };
      if (!user) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }
      return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${user.token}`);
    } catch (error) {
      console.error("Erro no callback do Google:", error);
      res.status(500).json({ message: "Erro ao processar login do Google" });
    }
  }
}
