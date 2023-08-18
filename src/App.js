import "./App.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { LoginPage } from "./views/LoginPage";
import HomePage from "./views/HomePage";

function App() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  let location = useLocation().pathname;
  let newLocation = location.slice(0, 6);

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);
  const handleLogin = (username) => {
    // Aqui você pode realizar a autenticação adequada e definir o estado loggedIn
    setLoggedIn(true);
    navigate("/home");
  };
  const handleSignup = (username, password, departament, house) => {
    // Aqui você pode adicionar lógica para registrar um novo usuário
    // e, em seguida, automaticamente fazer login com as credenciais fornecidas
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <Routes>
        {loggedIn ? (
          <Route path="/home" element={<HomePage />} />
        ) : (
          <Route
            path="/login"
            element={
              <LoginPage
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                message={message}
                setMessage={setMessage}
              />
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
