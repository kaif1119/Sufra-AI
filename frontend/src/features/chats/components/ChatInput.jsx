function ChatInput({ message, isSending, onMessageChange, onSubmit }) {
  return (
    <div className="sticky bottom-0 z-20 shrink-0 border-t border-[#dfe4ea] bg-white px-3 py-3 sm:px-5 sm:py-4 md:px-8">
      <form
        onSubmit={onSubmit}
        className="mx-auto flex max-w-5xl items-center gap-2 rounded-lg border border-[#cfd8e3] bg-[#fbfcfe] p-2 shadow-sm sm:gap-3"
      >
        <input
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="min-h-11 min-w-0 flex-1 bg-transparent px-2 text-sm text-[#101217] outline-none placeholder:text-[#8b96a8] sm:min-h-12 sm:px-3"
          type="text"
          placeholder="Ask Sufra-AI anything..."
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={!message.trim() || isSending}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-[#111827] px-4 text-sm font-semibold text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:bg-[#9aa4b2] sm:h-12 sm:px-5"
        >
          {isSending ? "Sending" : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
