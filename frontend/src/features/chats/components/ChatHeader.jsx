function ChatHeader({ title, messageCount, onNewChat, onOpenSidebar }) {
  function handleSwitchGoogleAccount() {
    window.location.href = "/api/auth/google";
  }

  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-[#dfe4ea] bg-white/95 px-3 py-2.5 backdrop-blur sm:px-5 md:px-8 md:py-3">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-[#dfe4ea] bg-white shadow-sm transition hover:border-[#b9c7d8] sm:h-10 sm:w-10 lg:hidden"
            onClick={onOpenSidebar}
            aria-label="Open chats menu"
          >
            <span className="h-0.5 w-4 rounded-full bg-[#273142]" />
            <span className="h-0.5 w-4 rounded-full bg-[#273142]" />
            <span className="h-0.5 w-4 rounded-full bg-[#273142]" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold tracking-tight text-[#101217] sm:text-base md:text-lg">
              {title}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#697386]">
              <span>{messageCount} messages</span>
              <span className="hidden md:inline">Mistral Medium</span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full bg-[#eefaf4] px-3 py-1.5 text-xs font-medium text-[#087443] xl:flex">
            <span className="h-2 w-2 rounded-full bg-[#19a463]" />
            Live
          </div>
          <button
            type="button"
            className="hidden h-9 items-center justify-center rounded-lg bg-[#111827] px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f2937] lg:inline-flex"
            onClick={handleSwitchGoogleAccount}
            aria-label="Use another Google account"
          >
            <span className="xl:hidden">Switch account</span>
            <span className="hidden xl:inline">Switch Google account</span>
          </button>
          <button
            type="button"
            className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-[#dfe4ea] bg-white px-3 text-sm font-semibold text-[#273142] shadow-sm transition hover:border-[#b9c7d8] hover:bg-[#f8fafc]"
            onClick={onNewChat}
            aria-label="Start a new chat"
          >
            <span className="md:hidden">+</span>
            <span className="hidden md:inline">New chat</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default ChatHeader;
