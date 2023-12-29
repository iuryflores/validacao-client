import React from "react";
import { Link } from "react-router-dom";

import logoIury from "../imgs/iury.png";

export const Footer = () => {
  return (
    <>
      <hr className="espacamento-100" />
      <footer>
        <div className="logo">
          © 2023 | Todos os direitos reservados - Jogo da Validação
        </div>
        <Link to="https://iuryflores.com.br" target="_blank">
          <img src={logoIury} alt="Logotipo 1RIGO" /> Desenvolvido por Iury
          Flores
        </Link>
      </footer>
    </>
  );
};
