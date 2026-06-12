function InlineText({ text, isUser = false }) {
  const parts = text.split(
    /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g,
  );

  return parts.map((part, index) => {
    if (!part) return null;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={index}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className={
            isUser
              ? "break-words underline decoration-white/50 underline-offset-2"
              : "break-words font-medium text-[#255fd5] underline decoration-[#b9c7d8] underline-offset-2"
          }
        >
          {link[1]}
        </a>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className={`break-words rounded px-1.5 py-0.5 font-mono text-[0.92em] ${isUser ? "bg-white/15 text-white" : "bg-[#eef2f7] text-[#1f2937]"}`}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className={
            isUser ? "font-semibold text-white" : "font-semibold text-[#111827]"
          }
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

export default InlineText;
