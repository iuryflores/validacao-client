import React, { useEffect, useState } from "react";
import api from "../../utils/api.utils";

const Ranking = ({
  userData,
  setLoading,
  loading,
  loadingGif,
  targaryenSigil,
  starkSigil,
  onrigoSigil,
  adicionarPonto,
}) => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const getAtosByUser = async () => {
      try {
        setLoading(true);
        const dados = await api.getRanking();
        const casasEsperadas = ["Stark", "Targaryen", "undefined"];
        const dadosOrganizados = casasEsperadas.map((casa) => ({
          casa,
          pontuacao: dados[casa] || 0,
        }));

        // Ordenar os dados com base na pontuação de forma decrescente
        dadosOrganizados.sort((a, b) => {
          if (a.casa === "undefined") return -1;
          if (b.casa === "undefined") return 1;
          return b.pontuacao - a.pontuacao;
        });

        // Atualizar o estado com os dados organizados
        setRanking(dadosOrganizados);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAtosByUser();
  }, [userData.full_name, setLoading]);

  let place = 0;
  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h3 style={{ fontFamily: "Game" }}>Ranking</h3>
      {!loading ? (
        <>
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center w-100 justify-content-center">
              <table className="table w-100">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "50%" }}>Casa</th>
                    <th style={{ width: "45%" }}>
                      Quantidade de atos validados
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {ranking &&
                    ranking.map((item, index) => {
                      place++;
                      return (
                        <tr key={index}>
                          <td>{place}º</td>
                          <td>{item.casa}</td>
                          <td>{item.pontuacao}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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

export default Ranking;
