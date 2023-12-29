import "./App.css";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { LoginPage } from "./views/LoginPage";
import HomePage from "./views/admin/HomePage";
import HomePageUser from "./views/users/HomePageUser";
import Navbar from "./components/Navbar";
import Ranking from "./views/admin/Ranking";
import MeuPerfil from "./views/users/MeuPerfil";
import MinhaCasa from "./views/users/MinhaCasa";
import Matricula from "./views/users/Matricula";
import MatriculasNaoValidadas from "./views/admin/MatriculasNaoValidadas";
import api from "./utils/api.utils";

import starkSigil from "./imgs/star@2x.png";
import targaryenSigil from "./imgs/targ@2x.png";
import onrigoSigil from "./imgs/logoONrigo@2x.png";
import onrigoSigilHorizontal from "./imgs/horizontal@2x.png";

// import loadingGif from "./imgs/loading-state.gif";
import loadingStark from "./imgs/stark.gif";
import loadingTargaryen from "./imgs/targaryen.gif";

import MinhaCaixa from "./views/users/MinhaCaixa";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const userToken = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const [loggedIn, setLoggedIn] = useState(!!userToken);

  const handleLogin = (username) => {
    setLoggedIn(true);
    navigate("/");
  };
  const handleSignup = (username, password, departament, house, newEmail) => {
    setLoggedIn(false);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("tokenExpirationTimestamp");
    setLoggedIn(false);
    navigate("/login/");
  };

  let pathLogged = "";

  if (!userData.admin && location.pathname === pathLogged) {
    logout();
  }

  if (userData.admin === true) {
    pathLogged = "admin/";
    if (location.pathname === "/users/") {
      navigate("/admin/");
    }
  } else {
    pathLogged = "users/";
    if (location.pathname === "/admin/") {
      navigate("/users/");
    }
  }

  if (location.pathname === "/") {
    navigate(`${pathLogged}`);
  }

  const isTokenExpired = () => {
    const tokenExpirationTimestamp = sessionStorage.getItem(
      "tokenExpirationTimestamp"
    );

    // Verifica se o tokenExpirationTimestamp é uma data válida
    if (!tokenExpirationTimestamp) {
      // Se não houver um timestamp de expiração, consideramos o token como expirado
      return true;
    }

    // Converte o timestamp para um objeto Date
    const expirationDate = new Date(tokenExpirationTimestamp);

    // Obtém a data e hora atuais
    const currentDate = new Date();

    // Compara se a data atual é maior que a data de expiração do token
    return currentDate > expirationDate;
  };

  useEffect(() => {
    if (isTokenExpired()) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      setLoggedIn(false);
      navigate("/login/");
      return;
    }
    if (loggedIn) {
      const getUser = async (userId) => {
        try {
          const data = await api.getUserNav(userId);
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      };
      getUser(userId);
    }
  }, [userId, navigate, loggedIn]);

  //formatar numero da matricula
  const adicionarPonto = (matricula) => {
    if (matricula.length > 3 || matricula > 999) {
      const numeroString = matricula.toString();
      const parteInteira = numeroString.slice(0, -3);
      const parteDecimal = numeroString.slice(-3);
      return parteInteira + "." + parteDecimal;
    } else {
      return matricula;
    }
  };

  let loadingGif;
  if (userData.house === "Stark") {
    loadingGif = loadingStark;
  } else {
    loadingGif = loadingTargaryen;
  }

  return (
    <div className="App d-flex justify-content-start flex-column">
      {loggedIn ? (
        <Navbar
          onLogout={logout}
          userData={userData}
          onrigoSigilHorizontal={onrigoSigilHorizontal}
          starkSigil={starkSigil}
          targaryenSigil={targaryenSigil}
        />
      ) : null}
      <Routes>
        {loggedIn ? (
          <>
            {pathLogged === "admin/" ? (
              <Route
                path="/admin/"
                element={
                  <HomePage
                    userData={userData}
                    loading={loading}
                    setLoading={setLoading}
                    loadingGif={loadingGif}
                    starkSigil={starkSigil}
                    targaryenSigil={targaryenSigil}
                    onrigoSigil={onrigoSigil}
                    adicionarPonto={adicionarPonto}
                  />
                }
              />
            ) : null}

            {pathLogged === "users/" ? (
              <Route
                path="/users/"
                element={
                  <HomePageUser
                    userData={userData}
                    loading={loading}
                    setLoading={setLoading}
                    loadingGif={loadingGif}
                    starkSigil={starkSigil}
                    targaryenSigil={targaryenSigil}
                    onrigoSigil={onrigoSigil}
                    adicionarPonto={adicionarPonto}
                  />
                }
              />
            ) : null}
            <Route
              path={`${pathLogged}matriculas-nao-validadas`}
              element={
                <MatriculasNaoValidadas
                  userData={userData}
                  loading={loading}
                  setLoading={setLoading}
                  loadingGif={loadingGif}
                  starkSigil={starkSigil}
                  targaryenSigil={targaryenSigil}
                  adicionarPonto={adicionarPonto}
                />
              }
            />
            <Route
              path={`${pathLogged}matricula/:matriculaCodigo`}
              element={
                <Matricula
                  userData={userData}
                  loading={loading}
                  setLoading={setLoading}
                  loadingGif={loadingGif}
                  starkSigil={starkSigil}
                  targaryenSigil={targaryenSigil}
                  adicionarPonto={adicionarPonto}
                />
              }
            />
            <Route
              path={`${pathLogged}ranking`}
              element={
                <Ranking
                  userData={userData}
                  loading={loading}
                  setLoading={setLoading}
                  loadingGif={loadingGif}
                  starkSigil={starkSigil}
                  targaryenSigil={targaryenSigil}
                  adicionarPonto={adicionarPonto}
                />
              }
            />

            <Route
              path={`${pathLogged}meu-perfil`}
              element={
                <MeuPerfil
                  userData={userData}
                  loading={loading}
                  setLoading={setLoading}
                  loadingGif={loadingGif}
                  starkSigil={starkSigil}
                  targaryenSigil={targaryenSigil}
                  adicionarPonto={adicionarPonto}
                />
              }
            />
            <Route
              path={`${pathLogged}minha-caixa`}
              element={
                <MinhaCaixa
                  userData={userData}
                  loading={loading}
                  setLoading={setLoading}
                  loadingGif={loadingGif}
                  starkSigil={starkSigil}
                  targaryenSigil={targaryenSigil}
                  adicionarPonto={adicionarPonto}
                />
              }
            />
            <Route path={`${pathLogged}minha-casa`} element={<MinhaCasa />} />
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
                  onrigoSigil={onrigoSigil}
                />
              }
            />
            <Route
              path={`${pathLogged}login/`}
              element={
                <LoginPage
                  handleLogin={handleLogin}
                  handleSignup={handleSignup}
                  message={message}
                  setMessage={setMessage}
                  onrigoSigil={onrigoSigil}
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
