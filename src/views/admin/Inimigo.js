import React, { useEffect, useState } from "react";
import api from "../../utils/api.utils";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import loadingGif from "../../imgs/loading-state.gif";

const Inimigo = ({ adicionarPonto }) => {
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
  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2>Matrículas não validadas - {adicionarPonto(matriculas.length)}</h2>
      {!loading ? (
        <>
          <div className="wrap-divs">
            {currentMatriculas.map((matricula, index) => {
              return (
                <div
                  key={index}
                  onClick={() => goToMatricula(matricula._id)}
                  className="border bg-light p-2 btn cursor-pointer d-flex flex-column align-items-start"
                >
                  <span>
                    Matrícula:{" "}
                    <strong>{adicionarPonto(matricula.codigo)}</strong>
                  </span>
                  <span>
                    <small>
                      Último ato: <strong>{matricula.qtdAtos}</strong>
                    </small>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mb-3 d-flex align-items-center justify-content-end">
            <label htmlFor="perPage">Matrículas por página:</label>
            <select
              id="perPage"
              value={matriculasPerPage}
              onChange={handlePerPageChange}
              className="form-select w-25 mx-2"
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={500}>500</option>
            </select>
          </div>
          <div className="pagination mt-3 align-items-center">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-secondary me-1"
            >
              <i className="fa-solid fa-backward"></i>
            </button>
            <span className="align-middle">
              {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastMatricula >= totalMatriculas}
              className="btn btn-secondary ms-1"
            >
              <i className="fa-solid fa-forward"></i>
            </button>
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

export default Inimigo;
