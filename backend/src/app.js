import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config/config.js";
import chatRoutes from "./routes/chat.routes.js";
import { getAuthenticatedUser } from "./middlewares/auth.middleware.js";

const app = express();

app.set("trust proxy", 1);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const frontendPath = path.join(path.resolve(), "../frontend/dist");

app.get("/", (req, res, next) => {
  if (!getAuthenticatedUser(req)) {
    return res.redirect("/auth");
  }

  next();
});

app.use(express.static(frontendPath));

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    },
  ),
);

app.get("/api/test",(req,res)=>res.send("Server Is Running...."))

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

app.get("*frontend", (req, res) => {
  res.sendFile("index.html", { root: frontendPath });
});

export default app;
