function EmptyChat({ suggestions, onSelectSuggestion }) {
  return (
    <div className="grid gap-5 py-6 sm:gap-6 sm:py-8 md:grid-cols-[1.1fr_0.9fr] md:py-14 lg:py-16">
      <div className="min-w-0">
        <p className="mb-4 inline-flex max-w-full rounded-full border border-[#cfd8e3] bg-white px-3 py-1 text-xs font-medium text-[#4b5565] shadow-sm sm:text-sm">
          Thoughtful AI chat for everyday work
        </p>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-[#101217] sm:text-4xl md:text-5xl lg:text-6xl">
          Turn a rough idea into a clear next move.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#5d6678] sm:mt-5 sm:text-base sm:leading-7">
          Use Sufra-AI to explore code, draft plans, sharpen prompts, and
          keep momentum while the assistant streams answers in real time.
        </p>
      </div>

      <div className="rounded-lg border border-[#dfe4ea] bg-white p-4 shadow-sm sm:p-5">
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
