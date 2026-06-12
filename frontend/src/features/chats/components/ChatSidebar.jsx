function ChatSidebar({ chats, onNewChat, onSelectChat }) {
  return (
    <aside className="hidden h-screen overflow-y-auto border-r border-[#dfe4ea] bg-[#fbfcfe] px-5 py-6 cursor-pointer lg:block">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#111827] text-sm font-semibold text-white">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold">Sufra-AI</p>
            <p className="text-xs text-[#697386]">Personal AI workspace</p>
          </div>
        </div>
        <button
          type="button"
          className="grid h-9 w-9 place-items-center cursor-pointer rounded-lg border border-[#dfe4ea] bg-white text-lg leading-none text-[#2f6fed] shadow-sm transition hover:border-[#b9c7d8]"
          title="Start a new chat"
          onClick={onNewChat}
        >
          +
        </button>
      </div>

      <div className="mb-8 rounded-lg border border-[#dfe4ea] bg-white p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#697386]">
          Model
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold">Mistral Medium</span>
          <span className="rounded-full bg-[#dff6eb] px-2.5 py-1 text-xs font-medium text-[#087443]">
            Live
          </span>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#697386]">
          Chats
        </p>
        <span className="text-xs text-[#697386]">{chats.length}</span>
      </div>

      <div className="space-y-2">
        {chats.length === 0 && (
          <div className="rounded-lg border border-dashed border-[#cfd8e3] p-4 text-sm leading-6 text-[#697386]">
            Your saved conversations will appear here after the first response.
          </div>
        )}

        {chats.map((chat) => (
          <button
            key={chat.id}
            type="button"
            onClick={() => onSelectChat(chat.id)}
            className="block w-full rounded-lg border cursor-pointer border-[#dfe4ea] bg-white px-4 py-3 text-left shadow-sm"
          >
            <p className="truncate text-sm font-medium">
              {chat.title || "Untitled chat"}
            </p>
            <p className="mt-1 text-xs text-[#697386]">
              {chat.messages?.length ?? 0} messages
            </p>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default ChatSidebar;
