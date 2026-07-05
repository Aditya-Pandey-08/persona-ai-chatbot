import ReactMarkdown from "react-markdown";

import hitesh from "../assets/hitesh.jpg";
import piyush from "../assets/piyush.jpg";

export default function Message({
  sender,
  text,
  selectedPersona,
}) {
    console.log("Message Persona:", selectedPersona);
  const isUser = sender === "user";

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const bot = selectedPersona === "hitesh"
    ? {
        name: "Hitesh Choudhary",
        image: hitesh,
      }
    : {
        name: "Piyush Garg",
        image: piyush,
      };


  return (

    <div className="mb-8 flex">

      {/* Avatar */}

      {!isUser && (

        <img
          src={bot.image}
          alt={bot.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />

      )}

      {isUser && (

        <div className="w-12 h-12 rounded-full bg-[#5865F2] mr-4 flex items-center justify-center text-white font-bold">
          You
        </div>

      )}

      <div className="flex-1">

        {/* Header */}

        <div className="flex items-center gap-3 mb-2">

          <h3 className="font-bold text-white">

            {isUser ? "You" : bot.name}

          </h3>

          <span className="text-xs text-gray-500">

            {currentTime}

          </span>

        </div>

        {/* Message */}

        <div className="text-gray-100 leading-8">

          <ReactMarkdown>

            {text}

          </ReactMarkdown>

        </div>

      </div>

    </div>

  );

}