import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarAdmin = ({
  onLogout,
  userData,
  onrigoSigilHorizontal,
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
    <nav className="navbar navbar-expand-lg   w-100">
      <Link className="navbar-brand px-3" to="/">
        <img
          src={onrigoSigilHorizontal}
          height="50px"
          alt="logo onrigo, tem um dragão vermelho de cabeça para baixo do lado direito e um logo preto de cabeça para cima do lado esquerto"
        />
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
          <li className={`nav-item ${isLinkActive("/admin/inimigo/")}`}>
            <Link className="nav-link" to="/admin/inimigo/">
              Inimigo
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/admin/batalha/")}`}>
            <Link className="nav-link" to="/admin/batalha/">
              Batalha
            </Link>
          </li>
          {/* <li className={`nav-item ${isLinkActive("/meu-perfil/")}`}>
            <Link className="nav-link" to="/meu-perfil/">
              Meu perfil
            </Link>
          </li> */}
          <li className={`nav-item ${isLinkActive("/admin/mandato/")}`}>
            <Link className="nav-link" to="/admin/mandato/">
              Mandato
            </Link>
          </li>
          <li className={`nav-item ${isLinkActive("/admin/login/")}`}>
            <Link className="nav-link" onClick={onLogout} to="/admin/login/">
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

export default NavbarAdmin;
