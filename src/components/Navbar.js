import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({
  onLogout,
  userData,
  onrigoSigil,
  starkSigil,
  targaryenSigil,
}) => {
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
      <Link className="navbar-brand px-3 d-flex align-items-center" to="/">
        <img
          src={onrigoSigil}
          height="50px"
          alt="logo onrigo, tem um dragão vermelho de cabeça para baixo do lado direito e um logo preto de cabeça para cima do lado esquerto"
        />
        <span style={{ fontWeight: "bold" }}>ONRIGO</span>
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
          <li className={`nav-item ${isLinkActive("/users/")}`}>
            <Link className="nav-link" to="/users/">
              Home
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/users/minha-caixa/")}`}>
            <Link className="nav-link" to="/users/minha-caixa/">
              Minhas matriculas
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/users/meu-perfil/")}`}>
            <Link className="nav-link" to="/users/meu-perfil/">
              Meu perfil
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/users/minha-casa/")}`}>
            <Link className="nav-link" to="/users/minha-casa/">
              Minha casa
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/users/ranking/")}`}>
            <Link className="nav-link" to="/users/ranking/">
              Ranking
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
        style={{ fontWeight: "bold", marginRight: "10px", fontFamily: "Game" }}
      >
        {newNome}
        {userData.house === "Stark" ? (
          <div className="icon-user">
            <img
              style={{ width: "50px" }}
              src={starkSigil}
              alt="Sigil da casa Stark que é a cabeça de um lobo, na cor preta e fundo transparente, dentro da imagem do lobo tem um texto escrito Winter is Comming Stark"
            />
          </div>
        ) : (
          <div className="icon-user">
            <img
              style={{ width: "50px" }}
              src={targaryenSigil}
              alt="Sigil da casa Targaryen que é um dragão de 3 cabeças na cor preta e fundo transparente, abaixo tem uma texto que diz Fire and Blood"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
