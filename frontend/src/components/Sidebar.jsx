import hitesh from "../assets/hitesh.jpg";
import piyush from "../assets/piyush.jpg";

const personas = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    role: "Programming Mentor",
    image: hitesh,
    border: "border-blue-500",
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    role: "Software Engineer",
    image: piyush,
    border: "border-green-500",
  },
];

export default function Sidebar({
  selectedPersona,
  setSelectedPersona,
}) {
  function handlePersonaSelect(personaId) {

    // Same persona pe click kiya
    if (selectedPersona === personaId) {
      return;
    }

    // Agar pehle se chat chal rahi hai
    if (selectedPersona) {
      const confirmSwitch = window.confirm(
        "Switch instructor?\n\nCurrent chat will be cleared."
      );

      if (!confirmSwitch) {
        return;
      }
    }

    setSelectedPersona(personaId);
  }

  return (
    <div className="w-80 bg-[#2B2D31] border-r border-gray-700 p-6">

      <h1 className="text-2xl font-bold text-white mb-8">
        🤖 Persona AI
      </h1>

      {personas.map((persona) => (

        <div
          key={persona.id}
          onClick={() => handlePersonaSelect(persona.id)}
          className={`rounded-xl p-4 cursor-pointer transition-all duration-300 mb-5 ${
            selectedPersona === persona.id
              ? "bg-[#5865F2] scale-105 shadow-lg"
              : "bg-[#1E1F22] hover:bg-[#3a3c42]"
          }`}
        >

          <img
            src={persona.image}
            alt={persona.name}
            className={`w-24 h-24 rounded-full object-cover mx-auto border-4 ${persona.border}`}
          />

          <h2 className="text-white text-center mt-4 font-semibold text-lg">
            {persona.name}
          </h2>

          <p className="text-gray-300 text-center text-sm">
            {persona.role}
          </p>

        </div>

      ))}

    </div>
  );
}