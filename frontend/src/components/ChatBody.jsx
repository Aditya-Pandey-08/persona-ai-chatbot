import Message from "./Message";

export default function ChatBody({
  messages,
  loading,
  selectedPersona,
}) {
  return (
    <div className="flex-1 overflow-y-auto p-8">

      {messages.length === 0 ? (

        <div className="text-center mt-40">

          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome 👋
          </h1>

          <p className="text-gray-400 text-xl">
            Ask anything to your AI mentor.
          </p>

        </div>

      ) : (

        messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={msg.text}
            selectedPersona={selectedPersona}
          />
        ))

      )}

      {loading && (
        <Message
          sender="bot"
          text="Typing..."
          selectedPersona={selectedPersona}
        />
      )}

    </div>
  );
}