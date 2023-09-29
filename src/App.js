import "./App.css";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { LoginPage } from "./views/LoginPage";
import HomePage from "./views/HomePage";
import Navbar from "./components/Navbar";
import Ranking from "./views/Ranking";
import MeuPerfil from "./views/MeuPerfil";
import MinhaCasa from "./views/MinhaCasa";
import Matricula from "./views/Matricula";
import MatriculasNaoValidadas from "./views/MatriculasNaoValidadas";
import api from "./utils/api.utils";

import loadingGif from "./imgs/loading-state.gif";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState("");

  const navigate = useNavigate();
  const userToken = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const [loggedIn, setLoggedIn] = useState(!!userToken);

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
  useEffect(() => {
    const getUser = async (userId) => {
      try {
        const data = await api.getUserNav(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser(userId);
  }, [userId]);

  return (
    <div className="App d-flex justify-content-start flex-column">
      {loggedIn ? <Navbar onLogout={logout} userData={userData} /> : null}
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/matriculas-nao-validadas"
              element={<MatriculasNaoValidadas />}
            />
            <Route
              path="/matricula/:id"
              element={
                <Matricula
                  loading={loading}
                  setLoading={setLoading}
                  loadingGif={loadingGif}
                />
              }
            />
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
