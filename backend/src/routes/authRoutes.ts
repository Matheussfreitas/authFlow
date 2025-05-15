import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import passport from 'passport';

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/user", AuthController.getUserByToken);

authRouter.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));
authRouter.get("/google/callback", passport.authenticate("google", {
  session: false,
  failureRedirect: "/auth/login",
  }), AuthController.googleCallback);

export default authRouter;