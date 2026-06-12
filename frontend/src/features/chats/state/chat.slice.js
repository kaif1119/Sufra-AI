import { createSlice } from "@reduxjs/toolkit";


export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        currentChatId: null,
        tempChat: null,
        tempMessages: []
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
            state.currentChatId = Object.keys(action.payload)[ 0 ] ?? null;
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        addChat: (state, action) => {
            state.chats[ action.payload.id ] = action.payload;
            state.currentChatId = action.payload.id;
        },
        appendMessage: (state, action) => {
            const { chatId, message: { role, content } } = action.payload
            state.chats[ chatId ].messages.push({
                role,
                content,
                timestamp: Date.now()
            })
        },
        appendMessageContent: (state, action) => {
            const { chatId, index, content } = action.payload
            const messageIndex = index ?? state.chats[ chatId ].messages.length - 1
            state.chats[ chatId ].messages[ messageIndex ].content += content
        },
        appendTempMessage: (state, action) => {

            console.log(action.payload)

            state.tempMessages.push({
                role: action.payload.role,
                content: action.payload.content,
                timestamp: Date.now()
            })
        },
        appendTempMessageContent: (state, action) => {
            const { index, content } = action.payload
            state.tempMessages[ index ].content += content
        },
        setTempChat: (state, action) => {
            state.tempChat = action.payload.chat
        },
        setChatFromTempChat: (state) => {
            state.chats[ state.tempChat.id ] = state.tempChat
            state.chats[ state.tempChat.id ].messages = state.tempMessages
            state.currentChatId = state.tempChat.id
            state.tempChat = null
            state.tempMessages = []
        }
    }
})


export const { setChats,
    setCurrentChatId,
    addChat,
    appendMessage,
    appendMessageContent,
    appendTempMessage,
    appendTempMessageContent,
    setTempChat,
    setChatFromTempChat } = chatSlice.actions
export default chatSlice.reducer
