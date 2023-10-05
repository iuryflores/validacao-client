import React, { useEffect, useState } from "react";
import api from "../utils/api.utils";

const HomePage = ({
  userData,
  setLoading,
  loading,
  loadingGif,
  targaryenSigil,
  starkSigil,
  onrigoSigil,
}) => {
  const [atos, setAtos] = useState("");

  useEffect(() => {
    const getAtosByUser = async () => {
      try {
        const pegarAtos = await api.getAtosByUser(userData.full_name);
        setAtos(pegarAtos);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAtosByUser();
  }, [userData.full_name, setLoading]);
  console.log(atos);

  const totalAtos = atos.length + atos.length;
  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2>
        <i className="bi bi-graph-up-arrow"></i> Base de dados
      </h2>
      {!loading ? (
        <div className="d-flex justify-content-around col-12 mt-3">
          <div className="card d-flex align-items-center p-3 col-3">
            <img
              style={{ width: "150px" }}
              src={starkSigil}
              alt="Sigil da casa Stark que é a cabeça de um lobo, na cor preta e fundo transparente, dentro da imagem do lobo tem um texto escrito Winter is Comming Stark"
            />
            <div class="card-body d-flex flex-column align-items-center">
              <h5 class="btn-success btn">Atos validados</h5>
              <p class="card-text fs-1">
                <b>{atos.length}</b>
              </p>
            </div>
          </div>
          <div className="card d-flex align-items-center p-3 col-3">
            <img
              style={{ width: "150px" }}
              src={targaryenSigil}
              alt="Sigil da casa Targaryen que é um dragão de 3 cabeças na cor preta e fundo transparente, abaixo tem uma texto que diz Fire and Blood"
            />
            <div class="card-body d-flex flex-column align-items-center">
              <h5 class="btn-success btn">Atos validados</h5>
              <p class="card-text fs-1">
                <b>{atos.length}</b>
              </p>
            </div>
          </div>
          <div className="card d-flex align-items-center p-3 col-3">
            <img
              style={{ width: "150px" }}
              src={onrigoSigil}
              alt="Sigil da casa Targaryen que é um dragão de 3 cabeças na cor preta e fundo transparente, abaixo tem uma texto que diz Fire and Blood"
            />
            <div class="card-body d-flex flex-column align-items-center">
              <h5 class=" btn-success btn">Total de Atos validados</h5>
              <p class="card-text fs-1">
                <b>{totalAtos}</b>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <img style={{ width: "100px" }} src={loadingGif} alt="Loading gif" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
