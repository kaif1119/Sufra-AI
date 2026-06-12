function ChatSidebar({
  chats,
  currentChatId,
  isOpen,
  onClose,
  onLogout,
  onNewChat,
  onSelectChat,
}) {
  function handleNewChat() {
    onNewChat();
    onClose?.();
  }

  function handleSelectChat(chatId) {
    onSelectChat(chatId);
    onClose?.();
  }

  function handleSwitchGoogleAccount() {
    window.location.href = "/api/auth/google";
  }

  function handleLogout() {
    onClose?.();
    onLogout();
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close chats menu"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-[#101217]/40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-[100dvh] w-[min(86vw,320px)] min-w-0 flex-col overflow-y-auto border-r border-[#dfe4ea] bg-[#fbfcfe] px-4 py-5 shadow-2xl transition-transform duration-300 lg:static lg:z-auto lg:h-screen lg:w-auto lg:translate-x-0 lg:px-5 lg:py-6 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between gap-3 lg:mb-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#111827] text-sm font-semibold text-white">
              AI
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Sufra-AI</p>
              <p className="truncate text-xs text-[#697386]">
                Personal AI workspace
              </p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#dfe4ea] bg-white text-sm font-semibold text-[#273142] shadow-sm transition hover:border-[#b9c7d8] lg:hidden"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div className="mb-5 grid gap-2 lg:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#111827] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f2937]"
            onClick={handleNewChat}
          >
            New chat
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-[#dfe4ea] bg-white px-4 text-sm font-semibold text-[#273142] shadow-sm transition hover:border-[#b9c7d8] hover:bg-[#f8fafc]"
            onClick={handleSwitchGoogleAccount}
          >
            Switch Google account
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-[#f4b8b2] bg-[#fff5f3] px-4 text-sm font-semibold text-[#b42318] shadow-sm transition hover:border-[#ee8f86]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="mb-6 rounded-lg border border-[#dfe4ea] bg-white p-4 shadow-sm lg:mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#697386]">
            Model
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="truncate text-sm font-semibold">Mistral Medium</span>
            <span className="shrink-0 rounded-full bg-[#dff6eb] px-2.5 py-1 text-xs font-medium text-[#087443]">
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

          {chats.map((chat) => {
            const isActive = chat.id === currentChatId;

            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => handleSelectChat(chat.id)}
                className={`block w-full rounded-lg border px-4 py-3 text-left shadow-sm transition hover:border-[#b9c7d8] hover:bg-white ${
                  isActive
                    ? "border-[#b9c7d8] bg-white"
                    : "border-[#dfe4ea] bg-[#fbfcfe]"
                }`}
              >
                <p className="truncate text-sm font-medium">
                  {chat.title || "Untitled chat"}
                </p>
                <p className="mt-1 text-xs text-[#697386]">
                  {chat.messages?.length ?? 0} messages
                </p>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}

export default ChatSidebar;
