import React, { useEffect, useState } from "react";
import api from "../../utils/api.utils";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import loadingGif from "../../imgs/loading-state.gif";

// import battleIcon from "../../imgs/battle.png";

const MinhaCaixa = ({ adicionarPonto, loading, setLoading, userData }) => {
  const [matricula, setMatricula] = useState([]);
  const [error, setError] = useState(null);

  const [matriculaAtual, setMatriculaAtual] = useState(null);

  const navigate = useNavigate();

  const userId = userData._id;
  useEffect(() => {
    if (userData.matricula_atual) {
      setMatriculaAtual(userData.matricula_atual);
    }
    setLoading(false);
  }, [setLoading, userData.matricula_atual]);

  const goToMatricula = (matriculaCodigo) => {
    navigate(`/users/matricula/${matriculaCodigo}`);
  };
  const handleBattle = () => {
    const getMatriculasNaoValidadas = async () => {
      try {
        setLoading(true);
        const data = await api.getBattle({ userId });
        setMatricula(data);

        if (getMatriculasNaoValidadas.length > 0) {
          setError(null);
        } else {
          setError(matricula.msg);
          console.log("finalize a matricula antes de solicitar outra");
        }
        setLoading(false);
      } catch (error) {
        setError("Erro ao obter a matrícula");
        console.log(error, "Error");
        setLoading(false);
      }
    };
    getMatriculasNaoValidadas();
  };

  let mostrarMatricula;

  if (matricula.codigo || matricula.length) {
    mostrarMatricula = matricula.codigo;
  } else if (matriculaAtual) {
    mostrarMatricula = matriculaAtual;
  }
  console.log(matriculaAtual);
  console.log(matricula);
  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2 className="p-3">⚔️ O Destino da Validação está em Suas Mãos! ⚔️</h2>
      <h5 className="p-3">
        A cada validação, você avança em direção à vitória, sua casa se
        fortalece e seu nome se torna lendário. Que a melhor casa prevaleça e
        deixe sua marca na história do "Jogo da Validação".
      </h5>
      {!loading ? (
        <div className="d-flex flex-column align-items-center">
          {matriculaAtual ? (
            <div className="w-100 mb-3 d-flex align-items-center justify-content-center">
              <div className="alert alert-warning">
                Finalize a matricula atual antes de solicitar uma nova!
              </div>
            </div>
          ) : (
            <div className="w-100 mb-3 d-flex align-items-center justify-content-end">
              <span>
                Solicite uma matrícula{" "}
                <i className="bi bi-arrow-right-short"></i>
              </span>
              <div className="d-flex  btn btn-info mx-2" onClick={handleBattle}>
                <h1>⚔️</h1>
              </div>
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}
          {mostrarMatricula && (
            <div
              className="pergaminho d-flex fs-2 p-5 clickable"
              onClick={() => goToMatricula(mostrarMatricula)}
            >
              {mostrarMatricula}
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <img style={{ width: "100px" }} src={loadingGif} alt="Loading gif" />
        </div>
      )}
    </div>
  );
};

export default MinhaCaixa;
