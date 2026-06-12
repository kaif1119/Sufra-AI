import * as chatDao from "../dao/chat.dao.js";
import { getAIResponse, getTitle } from "../services/ai.service.js";

function formatChat(chat) {
    return {
        id: chat._id,
        title: chat.title,
        messages: chat.messages || [],
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
    }
}

export async function getChats(req, res) {
    const chats = await chatDao.findChatsByUser({ user: req.user.id });

    res.status(200).json({
        chats: chats.map(formatChat)
    });
}

export async function handleMessage(req, res) {
    const { content, chatId } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");


    const generateTitle = async () => {
        if (!chatId) {
            const data = await getTitle({ message: content })
            const chat = await chatDao.createChat({ title: data.chatTitle, user: req.user.id })
            res.write(`title: ${JSON.stringify({ title: data.chatTitle, chatId: chat._id })}\n\n`)
            return chat
        }
        return null
    }

    const findChat = async () => {
        if (!chatId) return null;

        const chat = await chatDao.findChatByIdAndUser({ chatId, user: req.user.id });

        if (!chat) {
            throw new Error("Chat not found");
        }

        return chat;
    }

    const aiStream = async () => {
        const stream = await getAIResponse({ content });

        let AIMessage = ""

        for await (const chunk of stream) {
            AIMessage += chunk[ 0 ].contentBlocks[ 0 ].text;
            res.write(`data: ${JSON.stringify({ text: chunk[ 0 ].contentBlocks[ 0 ].text })}\n\n`);
        }

        return AIMessage
    }

    const [ chat, existingChat, AIMessage ] = await Promise.all([ generateTitle(), findChat(), aiStream() ])
    const activeChat = chat || existingChat;

    await chatDao.appendMessages({
        chatId: activeChat._id,
        user: req.user.id,
        messages: [
            { role: "user", content },
            { role: "ai", content: AIMessage },
        ]
    });

    // res.write(`data: [DONE]\n\n`);
    res.end()
}
