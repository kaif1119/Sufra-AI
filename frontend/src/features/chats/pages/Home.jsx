import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../auth/services/auth.api";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import ChatSidebar from "../components/ChatSidebar";
import EmptyChat from "../components/EmptyChat";
import MessageList from "../components/MessageList";
import { useChat } from "../hooks/useChat";
import { AuthRequiredError, getChats } from "../services/chat.api";
import { setChats, setCurrentChatId } from "../state/chat.slice";

const suggestions = [
  "Draft a launch plan for my AI product",
  "Explain this codebase architecture",
  "Write a better prompt for image generation",
  "Summarize today into clear action items",
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleGetAIResponse } = useChat();

  const tempMessages = useSelector((state) => state.chat.tempMessages);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const chats = useSelector((state) => state.chat.chats);
  const currentChat = chats[currentChatId];

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const chatList = useMemo(() => Object.values(chats), [chats]);
  const activeMessages = tempMessages.length
    ? tempMessages
    : (currentChat?.messages ?? []);
  const latestMessageContent = activeMessages.at(-1)?.content ?? "";
  const activeChatTitle =
    currentChat?.title ||
    (activeMessages.length ? "New conversation" : "Sufra-AI");

  useEffect(() => {
    async function loadChats() {
      try {
        const savedChats = await getChats();
        const chatsById = savedChats.reduce((acc, chat) => {
          acc[chat.id] = chat;
          return acc;
        }, {});

        dispatch(setChats(chatsById));
      } catch (error) {
        if (error instanceof AuthRequiredError) {
          navigate("/auth", { replace: true });
          return;
        }

        console.error(error);
      }
    }

    loadChats();
  }, [dispatch, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeMessages.length, latestMessageContent]);

  async function sendMessage(content = message) {
    const trimmedMessage = content.trim();

    if (!trimmedMessage || isSending) return;

    setIsSending(true);
    setMessage("");

    try {
      await handleGetAIResponse({
        message: trimmedMessage,
        chatId: currentChatId,
      });
    } catch (error) {
      if (error instanceof AuthRequiredError) {
        navigate("/auth", { replace: true });
        return;
      }

      console.error(error);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function startNewChat() {
    dispatch(setCurrentChatId(null));
  }

  function selectChat(chatId) {
    dispatch(setCurrentChatId(chatId));
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/auth", { replace: true });
    }
  }

  return (
    <div className="h-[100dvh] overflow-hidden bg-[#f6f7fb] text-[#101217]">
      <div className="grid h-[100dvh] grid-cols-1 overflow-hidden lg:grid-cols-[300px_1fr]">
        <ChatSidebar
          chats={chatList}
          currentChatId={currentChatId}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
          onNewChat={startNewChat}
          onSelectChat={selectChat}
        />

        <main className="flex h-[100dvh] min-h-0 flex-col overflow-hidden">
          <ChatHeader
            title={activeChatTitle}
            messageCount={activeMessages.length}
            onLogout={handleLogout}
            onNewChat={startNewChat}
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />

          <section className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-6 md:px-8">
            <div className="mx-auto max-w-5xl">
              {activeMessages.length === 0 ? (
                <EmptyChat
                  suggestions={suggestions}
                  onSelectSuggestion={sendMessage}
                />
              ) : (
                <MessageList
                  messages={activeMessages}
                  messagesEndRef={messagesEndRef}
                />
              )}
            </div>
          </section>

          <ChatInput
            message={message}
            isSending={isSending}
            onMessageChange={setMessage}
            onSubmit={handleSubmit}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
