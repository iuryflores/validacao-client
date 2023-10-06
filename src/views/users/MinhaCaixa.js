import React, { useEffect, useState } from "react";
import api from "../../utils/api.utils";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import loadingGif from "../../imgs/loading-state.gif";

import battleIcon from "../../imgs/battle.png";

const MinhaCaixa = ({ adicionarPonto }) => {
  const [loading, setLoading] = useState(true);

  const [matriculas, setMatriculas] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [matriculasPerPage, setMatriculasPerPage] = useState(50); // Define quantas matrículas são exibidas por página

  const navigate = useNavigate();

  useEffect(() => {
    const getMatriculasNaoValidadas = async () => {
      try {
        const data = await api.getMatriculasNaoValidadas();
        setMatriculas(data);
        setLoading(false);
      } catch (error) {
        console.log(error, "Error");
      }
    };
    getMatriculasNaoValidadas();
  }, []);

  const totalMatriculas = matriculas.length;
  const totalPages = Math.ceil(totalMatriculas / matriculasPerPage);

  const indexOfLastMatricula = currentPage * matriculasPerPage;
  const indexOfFirstMatricula = indexOfLastMatricula - matriculasPerPage;
  const currentMatriculas = matriculas.slice(
    indexOfFirstMatricula,
    indexOfLastMatricula
  );

  const goToMatricula = (matriculaID) => {
    navigate(`/matricula/${matriculaID}`);
  };

  const handlePerPageChange = (event) => {
    const perPage = parseInt(event.target.value);
    setMatriculasPerPage(perPage);
    setCurrentPage(1); // Reset to first page when changing per page count
  };

  const handleBattle = () => {
    console.log("Solicita matrícula")
  };
  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2 className="p-3">⚔️ O Destino da Validade está em Suas Mãos! ⚔️</h2>
      <h5 className="p-3">
        A cada validação, você avança em direção à vitória, sua casa se
        fortalece e seu nome se torna lendário. Que a melhor casa prevaleça e
        deixe sua marca na história do "Jogo da Validação".
      </h5>
      {!loading ? (
        <>
          <div className="w-100 mb-3 d-flex align-items-center justify-content-end">
            <div className="d-flex btn btn-outline-info" onClick={handleBattle}>
              <h1>⚔️</h1>
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

export default MinhaCaixa;
