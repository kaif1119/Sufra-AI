# Sufra-AI

Sufra-AI is a full-stack AI chat application built with React, Node.js, Express, MongoDB, and Mistral AI. It lets users sign in with Google, start AI-powered conversations, receive real-time streaming responses, and store chat history securely in MongoDB.

This project demonstrates practical full-stack development skills, including authentication, protected APIs, database integration, AI model integration, response streaming, and production deployment configuration.

## Features

- Google OAuth authentication
- JWT authentication with HTTP-only cookies
- AI chat interface with real-time streaming responses
- Automatic chat title generation
- Persistent chat history using MongoDB
- Protected backend API routes
- Responsive React/Vite frontend
- Production-ready environment configuration

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Redux Toolkit
- Backend: Node.js, Express.js, Passport.js, JWT
- Database: MongoDB, Mongoose
- AI: Mistral AI, LangChain
- Deployment: Render-ready full-stack setup, with optional Vercel frontend deployment

## Project Structure

```text
Sufra-AI/
  backend/        Express API, auth, database, AI service
  frontend/       React/Vite user interface
  DEPLOYMENT.md   Production deployment guide
```

## Getting Started

Install dependencies:

```bash
npm install --prefix backend
npm install --prefix frontend
```

Create a backend `.env` file using `backend/.env.example`, then start the app locally:

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

## Deployment

The project can be deployed as a single full-stack Render Web Service. The backend serves the API and, in production, also serves the built frontend from `frontend/dist`.

For complete deployment steps, see `DEPLOYMENT.md`.

## Repository Description

A full-stack AI chat application with Google OAuth, JWT authentication, MongoDB chat history, and real-time Mistral AI response streaming.
