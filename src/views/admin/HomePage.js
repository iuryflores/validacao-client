import React, { useEffect, useState } from "react";
import api from "../../utils/api.utils";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HomePage = ({
  userData,
  setLoading,
  loading,
  loadingGif,
  targaryenSigil,
  starkSigil,
  onrigoSigil,
  adicionarPonto,
}) => {
  const [atosRanking, setAtosRanking] = useState("");

  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  const [atosFiltrados, setAtosFiltrados] = useState([]);

  const [loadingFilter, setLoadingFilter] = useState(false);

  const handleFiltrarAtos = async () => {
    try {
      if (!dataInicial || !dataFinal) {
        console.log("Selecione ambas as datas para filtrar atos.");
        return;
      }
      setLoadingFilter(true);
      // Formata as datas para o formato 'YYYY-MM-DD' (assumindo que seja esse o formato esperado pelo backend)
      const formattedStartDate = dataInicial.toISOString().split("T")[0];
      const formattedEndDate = dataFinal.toISOString().split("T")[0];

      const atosFiltrados = await api.getAtosFiltrados(
        formattedStartDate,
        formattedEndDate
      );

      setAtosFiltrados(atosFiltrados);
      setLoadingFilter(false);
    } catch (error) {
      console.error("Erro ao filtrar atos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAtosRanking = async () => {
      try {
        setLoading(true);
        const pegarAtos = await api.getRanking();
        setAtosRanking(pegarAtos);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAtosRanking();
  }, [userData.full_name, setLoading]);

  const atosStarks = atosRanking.Stark || 0;
  const atosTargaryen = atosRanking.Targaryen || 0;
  const atosUndefined = atosRanking.undefined || 0;

  const totalAtos = atosStarks + atosTargaryen + atosUndefined;
  const totalAtosFiltrados =
    atosFiltrados.Stark ||
    0 + atosFiltrados.Targaryen ||
    0 + atosFiltrados.undefined ||
    0;

  return (
    <div className="other-divs d-flex flex-column w-100 container mt-3 ">
      {!loading ? (
        <div className="">
          <div className="d-flex flex-column container back-logado radios-5 p-3">
            <h5>Total de atos validados</h5>
            <hr />
            <div className="d-flex justify-content-around col-12 mt-3">
              <div className="card d-flex align-items-center p-3 col-3">
                <img
                  style={{ width: "100px" }}
                  src={starkSigil}
                  alt="Sigil da casa Stark que é a cabeça de um lobo, na cor preta e fundo transparente, dentro da imagem do lobo tem um texto escrito Winter is Comming Stark"
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text fs-1">
                    <b>{adicionarPonto(atosStarks)}</b>
                  </p>
                </div>
              </div>
              <div className="card d-flex align-items-center p-3 col-3">
                <img
                className="targaryenSigil"
                  style={{ width: "100px" }}
                  src={targaryenSigil}
                  alt="Sigil da casa Targaryen que é um dragão de 3 cabeças na cor preta e fundo transparente, abaixo tem uma texto que diz Fire and Blood"
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text fs-1">
                    <b>{adicionarPonto(atosTargaryen)}</b>
                  </p>
                </div>
              </div>
              <div className="card d-flex align-items-center p-3 col-3">
                <img
                  style={{ width: "100px" }}
                  src={onrigoSigil}
                  alt="Sigil da casa Targaryen que é um dragão de 3 cabeças na cor preta e fundo transparente, abaixo tem uma texto que diz Fire and Blood"
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text fs-1">
                    <b>{adicionarPonto(totalAtos)}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column container back-logado radios-5 p-3 mt-1">
            <div className="d-flex align-items-center justify-content-between">
              <h5>Atos validados por data</h5>
              <div className="d-flex align-items-center">
                <DatePicker
                  selected={dataInicial}
                  onChange={(date) => setDataInicial(date)}
                  className="form-control"
                  placeholderText="Data Inicial"
                />
                <DatePicker
                  selected={dataFinal}
                  onChange={(date) => setDataFinal(date)}
                  className="form-control"
                  placeholderText="Data final"
                />
                <div className="btn btn-primary" onClick={handleFiltrarAtos}>
                  Filtrar Atos
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-around col-12 mt-3">
              <div className="card d-flex align-items-center p-3 col-3">
                <img
                  style={{ width: "100px" }}
                  src={starkSigil}
                  alt="Sigil da casa Stark que é a cabeça de um lobo, na cor preta e fundo transparente, dentro da imagem do lobo tem um texto escrito Winter is Comming Stark"
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text fs-1">
                    {!loadingFilter ? (
                      <b>{adicionarPonto(atosFiltrados.Stark || 0)}</b>
                    ) : (
                      <img
                        style={{ width: "30px" }}
                        src={loadingGif}
                        alt="Loading gif"
                      />
                    )}
                  </p>
                </div>
              </div>
              <div className="card d-flex align-items-center p-3 col-3">
                <img
                  style={{ width: "100px" }}
                  src={targaryenSigil}
                  alt="Sigil da casa Targaryen que é um dragão de 3 cabeças na cor preta e fundo transparente, abaixo tem uma texto que diz Fire and Blood"
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text fs-1">
                    {!loadingFilter ? (
                      <b>{adicionarPonto(atosFiltrados.Targaryen || 0)}</b>
                    ) : (
                      <img
                        style={{ width: "30px" }}
                        src={loadingGif}
                        alt="Loading gif"
                      />
                    )}
                  </p>
                </div>
              </div>
              <div className="card d-flex align-items-center p-3 col-3">
                <img
                  style={{ width: "100px" }}
                  src={onrigoSigil}
                  alt="Sigil da casa Targaryen que é um dragão de 3 cabeças na cor preta e fundo transparente, abaixo tem uma texto que diz Fire and Blood"
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-text fs-1">
                    {!loadingFilter ? (
                      <b>{adicionarPonto(totalAtosFiltrados)}</b>
                    ) : (
                      <img
                        style={{ width: "30px" }}
                        src={loadingGif}
                        alt="Loading gif"
                      />
                    )}
                  </p>
                </div>
              </div>
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
