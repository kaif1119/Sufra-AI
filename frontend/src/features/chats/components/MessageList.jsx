import AssistantMessage from "./AssistantMessage";
import InlineText from "./InlineText";

function MessageList({ messages, messagesEndRef }) {
  return (
    <div className="space-y-6 pb-6">
      {messages.map((chatMessage, index) => {
        const isUser = chatMessage.role === "user";
        const isAiLoading = chatMessage.role === "ai" && !chatMessage.content;

        return (
          <div
            key={`${chatMessage.timestamp ?? index}-${index}`}
            className={`flex w-full gap-3 ${isUser ? "justify-end" : "justify-start"}`}
          >
            {!isUser && (
              <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#111827] text-xs font-semibold text-white shadow-sm">
                AI
              </div>
            )}

            <div
              className={
                isUser
                  ? "max-w-[min(720px,85%)] rounded-2xl rounded-br-md bg-[#2f6fed] px-5 py-3.5 text-white shadow-sm"
                  : "min-w-0 flex-1 rounded-xl bg-white/70 px-1 py-1 text-[#273142]"
              }
            >
              {isUser ? (
                <p className="whitespace-pre-wrap text-sm leading-7">
                  <InlineText text={chatMessage.content} isUser />
                </p>
              ) : (
                <div className="max-w-[820px]">
                  <div className="mb-2 flex items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#697386]">
                      Assistant
                    </p>
                    {isAiLoading && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#19a463]" />
                    )}
                  </div>
                  <div className="rounded-xl border border-[#e6ebf2] bg-white px-5 py-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                    <AssistantMessage
                      content={isAiLoading ? "" : chatMessage.content}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
