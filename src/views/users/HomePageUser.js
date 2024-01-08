import React from "react";
// import api from "../../utils/api.utils";

const HomePageUser = ({
  userData,
  loadingGif,
  targaryenSigil,
  starkSigil,
  onrigoSigil,
  adicionarPonto,
}) => {
  return (
    <div
      style={{ overflow: "hidden" }}
      className="other-divs d-flex flex-column w-100 container mt-3 "
    >
      <div className="">
        <div className="d-flex flex-column container back-logado radios-5 p-5">
          <h4>
            <span role="img" aria-label="Castle">
              🏰
            </span>{" "}
            Bem-vindo(a) ao "Jogo da Validação"
          </h4>
          <h5 style={{ textIndent: "60px", marginTop: "10px" }}>
            Os corredores do reino eletrônico ecoam com os murmúrios da grande
            disputa que se aproxima. Nesta batalha épica, duas nobres casas se
            destacam: Casa Stark e Casa Targaryen. Prepare-se para a guerra!
          </h5>
          {userData.house === "Stark" ? (
            <div className="container d-flex flex-column align-items-center p-5">
              <h4 style={{ fontFamily: "Game" }}>
                <span role="img" aria-label="Wolf">
                  {" "}
                  🐺
                </span>
                Casa Stark: Rigor e Lealdade!{" "}
                <span role="img" aria-label="Wolf">
                  🐺
                </span>
              </h4>
              <h5
                className="fs-4 container"
                style={{ textIndent: "60px", textAlign: "justify" }}
              >
                Os Stark são conhecidos por sua honra e determinação. Assim como
                o inverno que se aproxima, eles enfrentam os desafios com
                firmeza. Cada validação é um juramento ao dever, fortalecendo
                suas fileiras e consolidando sua posição.
              </h5>
            </div>
          ) : null}
          {userData.house === "Targaryen" ? (
            <div className="container">
              <h5 style={{ fontFamily: "Game" }}>
                <span role="img" aria-label="Fire">
                  🔥
                </span>{" "}
                Casa Targaryen: Fogo e Poder!{" "}
                <span role="img" aria-label="Fire">
                  🔥
                </span>
              </h5>
              <p className="fs-4">
                Os Targaryen, com sangue de dragão, possuem a chama da ambição.
                Assim como seus antigos símbolos alados, eles buscam conquistar
                os desafios com fogo. Cada validação é um passo rumo ao trono,
                cada validação é um passo rumo à dominação.
              </p>
            </div>
          ) : null}
          <div className="d-flex flex-column border p-2">
            <h5>
              <span role="img" aria-label="Crow">
                👑
              </span>{" "}
              Quem Reinará? Você Decide!
            </h5>
            <p>
              <span role="img" aria-label="Crow">
                👑
              </span>{" "}
              Prepare-se para uma odisseia digital única no "Jogo da Validação"!
              Erga seu estandarte e proclame que a busca pela validação é nossa
              missão sagrada. Unidos, alcançaremos a vitória e deixaremos uma
              lenda para os futuros participantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageUser;
