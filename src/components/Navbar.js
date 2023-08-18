import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <Link className="navbar-brand px-3" to="/">
        Validação ONRIGO
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
          <li className="nav-item active">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/matriculas-disponiveis/">
              Matrículas disponiveis
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ranking/">
              Ranking
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/meu-perfil/">
              Meu perfil
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/minha-casa">
              Minha casa
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sair">
              Sair
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
