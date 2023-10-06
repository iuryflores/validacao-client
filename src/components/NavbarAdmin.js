import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarAdmin = ({ onLogout, userData, onrigoSigil }) => {
  const location = useLocation();
  const { pathname } = location;

  // Função para verificar se o link está ativo
  const isLinkActive = (linkPath) => {
    return pathname === linkPath ? "active" : "";
  };

  const getNome = (nome) => {
    if (!nome) {
      console.error("Nome vazio");
      return;
    }
    const partesNome = nome.split(" ");

    const primeiro = partesNome[0];
    const ultimo = partesNome[partesNome.length - 1];

    return { primeiro, ultimo };
  };

  const nomeFormatado = getNome(userData.full_name);

  let newNome = "";
  if (nomeFormatado) {
    const { primeiro, ultimo } = nomeFormatado;
    newNome = primeiro + " " + ultimo;
  }
  return (
    <nav className="navbar navbar-expand-lg  bg-light w-100">
      <Link className="navbar-brand px-3" to="/">
        <img
          src={onrigoSigil}
          height="50px"
          alt="logo onrigo, tem um dragão vermelho de cabeça para baixo do lado direito e um logo preto de cabeça para cima do lado esquerto"
        />
        ONRIGO - Validação
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item ${isLinkActive("/")}`}>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li
            className={`nav-item ${isLinkActive("/matriculas-nao-validadas/")}`}
          >
            <Link className="nav-link" to="/matriculas-nao-validadas/">
              Matrículas disponíveis
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/ranking/")}`}>
            <Link className="nav-link" to="/ranking/">
              Ranking
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/meu-perfil/")}`}>
            <Link className="nav-link" to="/meu-perfil/">
              Meu perfil
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/minha-casa/")}`}>
            <Link className="nav-link" to="/minha-casa/">
              Minha casa
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/admin/login/")}`}>
            <Link className="nav-link" onClick={onLogout} to="/login/">
              Sair
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="d-flex align-items-center"
        style={{ fontWeight: "bold", marginRight: "10px" }}
      >
        {newNome}
        <i className="bi bi-person-circle mx-1 fs-2"></i>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
