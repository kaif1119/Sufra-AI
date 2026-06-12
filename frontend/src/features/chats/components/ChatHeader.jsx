function ChatHeader({ title, messageCount, onNewChat }) {
  function handleGoogleLogin() {
    window.location.href = "/api/auth/google";
  }

  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-[#dfe4ea] bg-white/95 px-4 py-3 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#111827] text-xs font-semibold text-white lg:hidden">
              AI
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold tracking-tight text-[#101217] md:text-lg">
                {title}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#697386]">
                <span>{messageCount} messages</span>
                <span className="hidden sm:inline">Mistral Medium</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full bg-[#eefaf4] px-3 py-1.5 text-xs font-medium text-[#087443] sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#19a463]" />
            Live
          </div>
          <button
            type="button"
            className="inline-flex h-9 items-center cursor-pointer justify-center rounded-lg bg-[#111827] px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f2937]"
            onClick={handleGoogleLogin}
          >
            Google login
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center cursor-pointer justify-center rounded-lg border border-[#dfe4ea] bg-white px-3 text-sm font-semibold text-[#273142] shadow-sm transition hover:border-[#b9c7d8] hover:bg-[#f8fafc]"
            onClick={onNewChat}
          >
            New chat
          </button>
        </div>
      </div>
    </header>
  );
}

export default ChatHeader;
