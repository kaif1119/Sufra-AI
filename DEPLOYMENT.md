# Sufra-AI Deployment Guide

Ye project full-stack hai: React/Vite frontend, Express backend, MongoDB Atlas, Google OAuth, aur Mistral API.

Resume ke liye easiest setup: **single Render Web Service**. Isme backend `/api` handle karega aur production me frontend build bhi serve karega, so final link ek hi hoga.

## 1. GitHub Par Push Karo

Root folder se:

```bash
git init
git add .
git commit -m "Prepare project for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sufra-ai.git
git push -u origin main
```

`.env`, `node_modules`, aur `dist` files `.gitignore` me hain, isliye secrets GitHub par push nahi honge.

## 2. Render Par Full-Stack App Deploy Karo

Render me **New > Web Service** select karo aur GitHub repo connect karo.

Settings:

```text
Root Directory: blank/root
Build Command: npm run build
Start Command: npm start
```

Environment variables:

```text
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MISTRAL_API_KEY=your_mistral_api_key
BACKEND_URL=https://your-backend.onrender.com
GOOGLE_CALLBACK_URL=https://your-backend.onrender.com/api/auth/google/callback
FRONTEND_URL=https://your-backend.onrender.com
CORS_ORIGIN=https://your-backend.onrender.com
```

Deploy ke baad health check open karo:

```text
https://your-backend.onrender.com/health
```

Expected response:

```json
{ "status": "ok" }
```

## 3. Google OAuth Update Karo

Google Cloud Console me OAuth client ke andar ye add karo:

```text
Authorized redirect URI:
https://your-backend.onrender.com/api/auth/google/callback

Authorized JavaScript origin:
https://your-backend.onrender.com
```

Local development ke liye optional:

```text
http://localhost:3000/api/auth/google/callback
http://localhost:5173
```

## 4. Final Check

1. Render app URL open karo.
2. Google login try karo.
3. Ek message send karo.
4. Render logs me error na ho aur MongoDB me chat save ho rahi ho.

Resume link ke liye final URL:

```text
https://your-backend.onrender.com
```

## Optional: Frontend Vercel Par Alag Deploy

Agar frontend ko Vercel par alag deploy karna ho to:

Vercel me repo import karo.

Settings:

```text
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Environment variable:

```text
VITE_API_BASE_URL=https://your-backend.onrender.com
```

Is option me backend env me `FRONTEND_URL` aur `CORS_ORIGIN` ko Vercel URL par set karke backend redeploy karna hoga.
