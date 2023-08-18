import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import api from "../utils/api.utils.js";
import { useNavigate } from "react-router-dom";

export const LoginPage = ({
  handleLogin,
  handleSignup,
  message,
  setMessage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.login({ username, password });
      handleLogin(username);
    } catch (error) {
      setError(error);
      console.log({ error });
    }
  };

  const [signupMode, setSignupMode] = useState(false);

  const signModeSwith = () => {
    setSignupMode(!signupMode);
    setError(null);
  };

  const [newUsername, setNewUsername] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [departament, setDepartament] = useState("Analise");
  const [house, setHouse] = useState("Stark");

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      try {
        await api.signup({ newUsername, confirmPassword, departament, house });
        setMessage("Usuário criado com sucesso!");
        handleSignup(newUsername, newPassword, departament, house);
        signModeSwith(false);
      } catch (error) {
        setError(error);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 8000);
  }, [message, setMessage]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-12 login-container">
        <div className="d-flex flex-column align-items-center w-100 mt-3">
          {message !== null && (
            <div className="alert alert-success d-flex flex-column align-items-center w-100">
              {message}
            </div>
          )}
          {error !== null && (
            <div className="alert alert-danger d-flex flex-column align-items-center w-100">
              {error}
            </div>
          )}
        </div>
        {signupMode ? (
          <form onSubmit={handleSignupSubmit} className="p-3">
            <h2 className="mb-3">Cadastro</h2>
            <div className="mb-3">
              <label htmlFor="newUsername" className="form-label">
                Nome de Usuário
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Usuário"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <label htmlFor="newPassword" className="form-label">
              Senha
            </label>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Senha
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                De qual departamento você faz parte?
              </label>
              <select
                className="form-select mb-3"
                value={departament}
                onChange={(e) => setDepartament(e.target.value)}
              >
                <option value="Analise">Analise</option>
                <option value="Conferencia">Conferencia</option>
                <option value="Oficio">Oficio</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="house" className="form-label">
                Você é membro de qual casa de Westeros?
              </label>
              <select
                className="form-select mb-3"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
              >
                <option value="Stark">Stark</option>
                <option value="Targaryen">Targaryen</option>
              </select>
            </div>
            <div className="mt-3 d-flex flex-column mb-3">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>
            <div className="mt-3 d-flex flex-column">
              <span className="d-flex flex-column align-items-center w-100">
                Já tem uma conta?{" "}
              </span>
              <span className="btn btn-outline-primary" onClick={signModeSwith}>
                {" "}
                Faça login
              </span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>Validação ONRIGO</h1>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-3 d-flex flex-column mb-3">
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>
            <div className="mt-3 d-flex flex-column">
              <span className="d-flex flex-column align-items-center w-100">
                Não tem uma conta?{" "}
              </span>
              <span className="btn btn-outline-primary" onClick={signModeSwith}>
                Cadastre-se
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ...
