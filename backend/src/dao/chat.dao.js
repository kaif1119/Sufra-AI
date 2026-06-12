import chatModel from "../models/chat.model.js";



export async function createChat({ title, user }) {
    const chat = await chatModel.create({ title, user })
    return chat;
}

export async function findChatsByUser({ user }) {
    const chats = await chatModel
        .find({ user, isDeleted: false })
        .sort({ updatedAt: -1 })
        .lean();

    return chats;
}

export async function findChatByIdAndUser({ chatId, user }) {
    const chat = await chatModel.findOne({ _id: chatId, user, isDeleted: false });
    return chat;
}

export async function appendMessages({ chatId, user, messages }) {
    const chat = await chatModel.findOneAndUpdate(
        { _id: chatId, user, isDeleted: false },
        {
            $push: {
                messages: {
                    $each: messages
                }
            }
        },
        { new: true }
    );

    return chat;
}
