import "./App.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { LoginPage } from "./views/LoginPage";
import HomePage from "./views/HomePage";
import Navbar from "./components/Navbar";
import Matriculas from "./views/MatriculasD";
import Ranking from "./views/Ranking";
import MeuPerfil from "./views/MeuPerfil";
import MinhaCasa from "./views/MinhaCasa";

function App() {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);

  let location = useLocation().pathname;
  let newLocation = location.slice(0, 6);

  const navigate = useNavigate();

  const userId = sessionStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(!!userId);

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
    <div className="App d-flex justify-content-start flex-column">
      {loggedIn ? <Navbar /> : null}
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/matriculas-disponiveis" element={<Matriculas />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/meu-perfil" element={<MeuPerfil />} />
            <Route path="/minha-casa" element={<MinhaCasa />} />
          </>
        ) : (
          <>
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
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
