import React, { useEffect, useState } from "react";
import api from "../utils/api.utils";

const MeuPerfil = ({
  userData,
  setLoading,
  loading,
  loadingGif,
  targaryenSigil,
  starkSigil,
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
  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2>Meu perfil</h2>
      {!loading ? (
        <>
          <div className="wrap-divs d-flex flex-column align-items-center">
            <div className="d-flex align-items-center justify-content-center">
              {userData.house === "Stark" ? (
                <>
                  <img
                    style={{ width: "150px" }}
                    src={starkSigil}
                    alt="Sigil da casa Stark que é a cabeça de um lobo, na cor preta e fundo transparente, dentro da imagem do lobo tem um texto escrito Winter is Comming Stark"
                  />
                </>
              ) : (
                <img
                  style={{ width: "150px" }}
                  src={targaryenSigil}
                  alt="Sigil da casa Targaryen que é um dragão de 3 cabeças na cor preta e fundo transparente, abaixo tem uma texto que diz Fire and Blood"
                />
              )}
            </div>
            <div className="d-flex flex-column">
              <span>
                Nome: <b>{userData.full_name}</b>
              </span>
              <span>
                E-mail: <b>{userData.email}</b>
              </span>
              <span>
                Departamento: <b>{userData.departament}</b>
              </span>
              <span>
                Casa: <b>{userData.house}</b>
              </span>
              <span>
                Quantidade de atos validados: <b>{atos.length}</b>
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <img style={{ width: "100px" }} src={loadingGif} alt="Loading gif" />
        </div>
      )}
    </div>
  );
};

export default MeuPerfil;
