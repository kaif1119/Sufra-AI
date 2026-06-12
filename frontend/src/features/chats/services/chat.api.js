
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export class AuthRequiredError extends Error {
    constructor() {
        super("Authentication required");
        this.name = "AuthRequiredError";
    }
}

function apiUrl(path) {
    return `${API_BASE_URL}${path}`;
}

function assertOk(res, message) {
    if (res.status === 401) {
        throw new AuthRequiredError();
    }

    if (!res.ok) {
        throw new Error(message);
    }
}

function normalizeChat(chat) {
    return {
        id: chat.id,
        title: chat.title,
        messages: chat.messages ?? [],
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
    }
}

export async function getChats() {
    const res = await fetch(apiUrl("/api/chats"), {
        method: "GET",
        credentials: "include",
    })

    assertOk(res, "Failed to fetch chats")

    const data = await res.json()

    return (data.chats ?? []).map(normalizeChat)
}

export async function getAiResponse({ message, chatId, onContent, onChat, onComplete }) {

    const res = await fetch(apiUrl("/api/chats"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            content: message, chatId
        })
    })

    assertOk(res, "Failed to get AI response")

    const stream = res.body;

    const decoder = new TextDecoder();

    for await (const chunk of stream) {
        const response = decoder.decode(chunk)

        response.split('\n').forEach(line => {

            if (line.startsWith("data:")) {
                onContent(JSON.parse(line.replaceAll("data:", "")).text)
            }
            if (line.startsWith("title:")) {
                const chat = JSON.parse(line.replace("title: ", ""))
                onChat({
                    id: chat.chatId,
                    title: chat.title,
                    messages: []
                })
            }
        })

    }

    onComplete()



}
