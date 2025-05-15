import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_CALLBACK_URL) {
  throw new Error("As variáveis de ambiente para o Google OAuth não estão configuradas.");
}

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("Perfil do Google:", profile);
    try {
      const user = await authService.handleGoogleLogin(profile);
      return done(null, user);
    } catch (error) {
      console.error("Erro ao processar login do Google:", error);
      return done(error);
    }
  }
));

export default passport;