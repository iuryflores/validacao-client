import "./App.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { LoginPage } from "./views/LoginPage";
import HomePage from "./views/HomePage";
import Navbar from "./components/Navbar";
import Ranking from "./views/Ranking";
import MeuPerfil from "./views/MeuPerfil";
import MinhaCasa from "./views/MinhaCasa";
import Matricula from "./views/Matricula";
import MatriculasNaoValidadas from "./views/MatriculasNaoValidadas";

function App() {
  const [message, setMessage] = useState("");
  //const [loading, setLoading] = useState(true);

  let location = useLocation().pathname;
  //let newLocation = location.slice(0, 6);
  console.log(location);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(!!userId);

  const handleLogin = (username) => {
    // Aqui você pode realizar a autenticação adequada e definir o estado loggedIn
    setLoggedIn(true);
    navigate("/");
  };
  const handleSignup = (username, password, departament, house, newEmail) => {
    // Aqui você pode adicionar lógica para registrar um novo usuário
    // e, em seguida, automaticamente fazer login com as credenciais fornecidas
    setLoggedIn(false);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="App d-flex justify-content-start flex-column">
      {loggedIn ? <Navbar onLogout={logout} /> : null}
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/matriculas-nao-validadas" element={<MatriculasNaoValidadas />} />
            <Route path="/matricula/:id" element={<Matricula />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/meu-perfil" element={<MeuPerfil />} />
            <Route path="/minha-casa" element={<MinhaCasa />} />
          </>
        ) : (
          <>
            <Route
              path="*"
              element={
                <LoginPage
                  handleLogin={handleLogin}
                  handleSignup={handleSignup}
                  message={message}
                  setMessage={setMessage}
                />
              }
            />
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
