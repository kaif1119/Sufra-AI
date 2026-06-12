import { config } from "dotenv";
config();

const requiredEnvVars = [
    "JWT_SECRET",
    "MONGO_URI",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "MISTRAL_API_KEY",
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`${envVar} is not defined in environment variables`);
        process.exit(1);
    }
}

const trimTrailingSlash = (value) => value.replace(/\/$/, "");

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = trimTrailingSlash(process.env.FRONTEND_URL || "http://localhost:5173");
const BACKEND_URL = trimTrailingSlash(process.env.BACKEND_URL || `http://localhost:${PORT}`);

const _config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
    FRONTEND_URL,
    BACKEND_URL,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || `${BACKEND_URL}/api/auth/google/callback`,
    CORS_ORIGIN: process.env.CORS_ORIGIN || FRONTEND_URL,
}

export default Object.freeze(_config);
