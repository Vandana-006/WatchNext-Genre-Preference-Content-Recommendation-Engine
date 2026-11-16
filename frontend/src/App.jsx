
import { useState } from "react";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return user ? (
    <Dashboard user={user} onLogout={handleLogout} />
  ) : (
    <Welcome onLoginSuccess={setUser} />
  );
}

export default App;
