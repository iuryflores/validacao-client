import React, { useEffect, useState } from "react";
import api from "../utils/api.utils";

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

  console.log(ranking);
  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2>Ranking</h2>
      {!loading ? (
        <>
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center justify-content-center">
              <table className="table">
                <thead>
                  <tr>
                    <th>Casa</th>
                    <th>Pontuação</th>
                  </tr>
                </thead>

                <tbody>
                  {ranking &&
                    ranking.map((item, index) => (
                      <tr key={index}>
                        <td>{item.casa}</td>
                        <td>{item.pontuacao}</td>
                      </tr>
                    ))}
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
