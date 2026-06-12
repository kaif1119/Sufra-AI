import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getChats, handleMessage } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.get("/", authMiddleware, getChats);
chatRouter.post("/", authMiddleware, handleMessage);


export default chatRouter;
