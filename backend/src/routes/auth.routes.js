import { Router } from 'express';
import passport from 'passport';
import { getCurrentUser, googleAuthCallback, logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.get("/me", authMiddleware, getCurrentUser);
authRouter.post("/logout", logout);

authRouter.get("/google",
    passport.authenticate('google', {
        session: false,
        scope: [ 'profile', 'email' ],
        prompt: 'select_account'
    })
);

authRouter.get("/google/callback", passport.authenticate('google',
    {
        session: false,
        failureRedirect: '/'
    }),
    googleAuthCallback
);


export default authRouter;
