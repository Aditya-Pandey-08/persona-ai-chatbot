import hitesh from "../assets/hitesh.jpg";
import piyush from "../assets/piyush.jpg";

export default function ChatHeader({ selectedPersona }) {
    console.log("Header Persona:", selectedPersona);
  const persona =
    selectedPersona === "hitesh"
      ? {
          name: "Hitesh Choudhary",
          role: "Programming Mentor",
          image: hitesh,
        }
      : {
          name: "Piyush Garg",
          role: "Software Engineer",
          image: piyush,
        };

  return (
    <div className="h-24 bg-[#2B2D31] border-b border-gray-700 flex items-center px-8">

      <img
        src={persona.image}
        alt={persona.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
      />

      <div className="ml-5">

        <h1 className="text-white text-2xl font-bold">
          {persona.name}
        </h1>

        <p className="text-gray-400">
          {persona.role}
        </p>

        <p className="text-green-400 text-sm">
          🟢 Online
        </p>

      </div>

    </div>
  );
}