import { useEffect, useRef } from "react";


export default function ChatInput({
  message,
  setMessage,
  handleSend,
  loading,
}) {
  const inputRef = useRef(null);

  // Auto focus whenever component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(e) {
    // Shift + Enter -> New Line
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }

    // Enter -> Send
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="bg-[#2B2D31] border-t border-gray-700 p-5">

      <div className="flex items-end gap-3">

        <textarea
          ref={inputRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message your AI mentor..."
          className="flex-1 resize-none rounded-2xl bg-[#1E1F22] px-5 py-4 text-white outline-none"
        />

<button
  disabled={loading}
  onClick={handleSend}
  className="h-14 w-14 rounded-2xl bg-[#5865F2] flex items-center justify-center hover:bg-blue-600 transition disabled:opacity-60"
>
  ➤
</button>

      </div>

    </div>
  );
}