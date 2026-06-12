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

const _config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
  FRONTEND_URL:process.env.FRONTEND_URL,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};

export default Object.freeze(_config);
