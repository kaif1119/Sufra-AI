import { useMemo } from "react";
import InlineText from "./InlineText";

const codeKeywords = new Set([
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "def",
  "default",
  "do",
  "else",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "import",
  "in",
  "let",
  "new",
  "null",
  "return",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "var",
  "while",
  "yield",
]);

function highlightCodeLine(line, lineIndex) {
  const tokenPattern =
    /(\/\/.*|#.*|\/\*.*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*(?=\s*\()|\b[A-Za-z_$][\w$]*\b|[{}()[\].,;:+\-*/%=<>!&|?]+)/g;
  const tokens = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenPattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(line.slice(lastIndex, match.index));
    }

    const token = match[0];
    let className = "text-[#e5e7eb]";

    if (/^(\/\/|#|\/\*)/.test(token)) {
      className = "text-[#7dd3fc]";
    } else if (/^["'`]/.test(token)) {
      className = "text-[#86efac]";
    } else if (/^\d/.test(token)) {
      className = "text-[#fbbf24]";
    } else if (codeKeywords.has(token)) {
      className = "text-[#c084fc]";
    } else if (
      /^[A-Za-z_$][\w$]*$/.test(token) &&
      line
        .slice(match.index + token.length)
        .trimStart()
        .startsWith("(")
    ) {
      className = "text-[#93c5fd]";
    } else if (/^[{}()[\].,;:+\-*/%=<>!&|?]+$/.test(token)) {
      className = "text-[#f8fafc]";
    }

    tokens.push(
      <span key={`${lineIndex}-${match.index}`} className={className}>
        {token}
      </span>,
    );
    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push(line.slice(lastIndex));
  }

  return tokens.length ? tokens : " ";
}

function CodeBlock({ language, text }) {
  return (
    <div className="my-4 max-w-full overflow-hidden rounded-lg border border-[#1f2937] bg-[#0b1020] shadow-[0_18px_45px_rgba(15,23,42,0.16)] sm:my-5">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#111827] px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] sm:h-3 sm:w-3" />
        </div>
        <span className="truncate text-xs font-medium uppercase tracking-[0.12em] text-[#aab4c3]">
          {language || "code"}
        </span>
      </div>
      <pre className="max-h-[420px] max-w-full overflow-auto p-3 text-xs leading-6 text-[#e5e7eb] sm:max-h-[520px] sm:p-4 sm:text-[13px]">
        <code>
          {text.map((line, lineIndex) => (
            <span
              key={lineIndex}
              className="block min-h-6 whitespace-pre font-mono"
            >
              <span className="mr-3 inline-block w-6 select-none text-right text-[#64748b] sm:mr-4 sm:w-7">
                {lineIndex + 1}
              </span>
              {highlightCodeLine(line, lineIndex)}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function parseMarkdownBlocks(content) {
  const lines = content.split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let list = null;
  let code = null;

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  }

  function flushList() {
    if (!list) return;
    blocks.push(list);
    list = null;
  }

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const codeFence = trimmedLine.match(/^```(\w+)?/);

    if (codeFence) {
      if (code) {
        blocks.push(code);
        code = null;
        return;
      }

      flushParagraph();
      flushList();
      code = { type: "code", language: codeFence[1] ?? "", text: [] };
      return;
    }

    if (code) {
      code.text.push(line);
      return;
    }

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      return;
    }

    const heading = trimmedLine.match(/^(#{1,3})\s+(.+)/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2],
      });
      return;
    }

    if (/^---+$/.test(trimmedLine)) {
      flushParagraph();
      flushList();
      blocks.push({ type: "divider" });
      return;
    }

    const quote = trimmedLine.match(/^>\s+(.+)/);
    if (quote) {
      flushParagraph();
      flushList();
      blocks.push({ type: "quote", text: quote[1] });
      return;
    }

    const bullet = trimmedLine.match(/^[-*]\s+(.+)/);
    const numbered = trimmedLine.match(/^\d+[.)]\s+(.+)/);
    if (bullet || numbered) {
      flushParagraph();
      const nextListType = bullet ? "bullet" : "numbered";

      if (!list || list.listType !== nextListType) {
        flushList();
        list = { type: "list", listType: nextListType, items: [] };
      }

      list.items.push(bullet?.[1] ?? numbered[1]);
      return;
    }

    flushList();
    paragraph.push(trimmedLine);
  });

  if (code) blocks.push(code);
  flushParagraph();
  flushList();

  return blocks;
}

function MarkdownBlock({ block }) {
  if (block.type === "heading") {
    const headingClass =
      block.level === 1
        ? "break-words pt-2 text-lg font-semibold leading-7 text-[#111827] sm:text-xl sm:leading-8"
        : "break-words pt-1 text-base font-semibold leading-7 text-[#111827] sm:text-lg sm:leading-8";

    return (
      <h3 className={headingClass}>
        <InlineText text={block.text} />
      </h3>
    );
  }

  if (block.type === "list") {
    const ListTag = block.listType === "numbered" ? "ol" : "ul";
    const listClass =
      block.listType === "numbered"
        ? "list-decimal space-y-1 pl-5 marker:text-[#697386]"
        : "list-disc space-y-1 pl-5 marker:text-[#697386]";

    return (
      <ListTag className={`${listClass} break-words text-[#273142]`}>
        {block.items.map((item, index) => (
          <li key={index} className="pl-1">
            <InlineText text={item} />
          </li>
        ))}
      </ListTag>
    );
  }

  if (block.type === "code") {
    return <CodeBlock language={block.language} text={block.text} />;
  }

  if (block.type === "quote") {
    return (
      <blockquote className="break-words rounded-r-lg border-l-4 border-[#9eb3cb] bg-[#f6f7fb] px-4 py-3 text-[#4b5565]">
        <InlineText text={block.text} />
      </blockquote>
    );
  }

  if (block.type === "divider") {
    return <hr className="border-[#dfe4ea]" />;
  }

  return (
    <p className="break-words text-[#273142]">
      <InlineText text={block.text} />
    </p>
  );
}

function AssistantMessage({ content }) {
  const blocks = useMemo(() => parseMarkdownBlocks(content), [content]);

  if (!content) {
    return <p className="text-sm leading-7 text-[#5d6678]">Thinking...</p>;
  }

  return (
    <div className="min-w-0 space-y-4 text-sm leading-6 sm:text-[15px] sm:leading-7">
      {blocks.map((block, index) => (
        <MarkdownBlock key={index} block={block} />
      ))}
    </div>
  );
}

export default AssistantMessage;
