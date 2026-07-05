import { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [selectedPersona, setSelectedPersona] = useState(null);

  return (
    <Home
      selectedPersona={selectedPersona}
      setSelectedPersona={setSelectedPersona}
    />
  );
}

export default App;