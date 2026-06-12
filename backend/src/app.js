import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/auth.routes.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config/config.js';
import chatRoutes from './routes/chat.routes.js';

const app = express();
const allowedOrigins = config.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");

app.set("trust proxy", 1);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
}));

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
},
    (accessToken, refreshToken, profile, done) => {
        // Handle user authentication logic here
        done(null, profile);
    })
);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);

if (config.NODE_ENV === "production" && existsSync(frontendIndexPath)) {
    app.use(express.static(frontendDistPath));
    app.get(/.*/, (req, res) => {
        res.sendFile(frontendIndexPath);
    });
}


export default app;
