function EmptyChat({ suggestions, onSelectSuggestion }) {
  return (
    <div className="grid gap-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:py-16">
      <div>
        <p className="mb-4 inline-flex rounded-full border border-[#cfd8e3] bg-white px-3 py-1 text-sm font-medium text-[#4b5565] shadow-sm">
          Thoughtful AI chat for everyday work
        </p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-[#101217] md:text-6xl">
          Turn a rough idea into a clear next move.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#5d6678]">
          Use Sufra-AI to explore code, draft plans, sharpen prompts, and
          keep momentum while the assistant streams answers in real time.
        </p>
      </div>

      <div className="rounded-lg border border-[#dfe4ea] bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold">Try a prompt</p>
        <div className="mt-4 grid gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSelectSuggestion(suggestion)}
              className="rounded-lg border border-[#dfe4ea] bg-[#fbfcfe] px-4 py-3 text-left text-sm font-medium leading-6 text-[#273142] transition hover:border-[#9eb3cb] hover:bg-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmptyChat;
