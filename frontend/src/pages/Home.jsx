import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Home({
  selectedPersona,
  setSelectedPersona,
}) {
  return (
    <div className="h-screen flex bg-[#313338]">

      <Sidebar
        selectedPersona={selectedPersona}
        setSelectedPersona={setSelectedPersona}
      />

      <ChatWindow
        selectedPersona={selectedPersona}
      />

    </div>
  );
}