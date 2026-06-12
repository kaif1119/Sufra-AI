import { getAiResponse } from "../services/chat.api";
import {
    appendMessage,
    appendMessageContent,
    appendTempMessage,
    appendTempMessageContent,
    setTempChat,
    setChatFromTempChat
} from "../state/chat.slice"
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()

    async function handleGetAIResponse({ message, chatId }) {

        console.log("chatId", chatId)
        if (!chatId) {
            dispatch(appendTempMessage({
                role: "user",
                content: message,
                timestamp: Date.now()
            }))
            dispatch(appendTempMessage({
                role: "ai",
                content: "",
                timestamp: Date.now()
            }))
        } else {
            dispatch(appendMessage({
                chatId,
                message: {
                    role: "user",
                    content: message,
                }
            }))
            dispatch(appendMessage({
                chatId,
                message: {
                    role: "ai",
                    content: "",
                }
            }))
        }

        await getAiResponse({
            message, chatId,
            onContent: (content) => {
                if (!chatId) {
                    dispatch(appendTempMessageContent({ index: 1, content }))
                    return
                }

                dispatch(appendMessageContent({ chatId, content }))
            },
            onChat: (chat) => {
                dispatch(setTempChat({ chat }))
            },
            onComplete: () => {
                if (!chatId) {
                    dispatch(setChatFromTempChat())
                }
            }
        })
    }

    return {
        handleGetAIResponse
    }

}
