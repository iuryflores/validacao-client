import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import api from "../utils/api.utils.js";
import { FormControl, InputGroup } from "react-bootstrap";

export const LoginPage = ({
  handleLogin,
  handleSignup,
  message,
  setMessage,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dominioPadrao = "1rigo.com"; // Substitua 'dominio.com' pelo seu domínio padrão

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.login({ email, password });
      handleLogin(email);
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
  const [newEmail, setNewEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [departament, setDepartament] = useState("Análise");
  const [house, setHouse] = useState("Stark");

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      try {
        await api.signup({
          newUsername,
          confirmPassword,
          departament,
          house,
          newEmail,
        });
        setMessage("Usuário criado com sucesso!");
        handleSignup(newUsername, newPassword, departament, house, newEmail);
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
      setError(null);
      setMessage(null);
    }, 8000);
  }, [message, setMessage]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-12 login-container">
        <div className="d-flex flex-column align-items-center w-100 mt-3">
          {message && (
            <div className="alert alert-success d-flex flex-column align-items-center w-100">
              {message}
            </div>
          )}
          {error && (
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
                Nome completo
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Usuário"
                value={newUsername}
                autoComplete="username"
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <InputGroup className="mb-3">
              <FormControl
                id="newEmail"
                name="newEmail"
                value={newEmail}
                onChange={handleNewEmailChange}
                placeholder="Digite seu e-mail corporativo"
                aria-label="E-mail corporativo"
              />
              <InputGroup.Text>@{dominioPadrao}</InputGroup.Text>
            </InputGroup>
            <label htmlFor="newPassword" className="form-label">
              Senha
            </label>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Senha"
                value={newPassword}
                autoComplete="current-password"
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
                autoComplete="current-password"
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
            <h1>ONRIGO</h1>
            <InputGroup className="mb-3">
              <FormControl
                id="Email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail corporativo"
                aria-label="E-mail corporativo"
              />
              <InputGroup.Text>@{dominioPadrao}</InputGroup.Text>
            </InputGroup>
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              value={password}
              autoComplete="current-password"
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
