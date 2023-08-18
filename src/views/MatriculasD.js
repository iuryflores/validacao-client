import React, { useEffect, useState } from "react";
import api from "../utils/api.utils";
import { useNavigate } from "react-router-dom";

const Matriculas = () => {
  const [matriculas, setMatriculas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getMatriculasNaoValidadas = async () => {
      try {
        const data = await api.getMatriculasNaoValidadas();
        setMatriculas(data);
      } catch (error) {
        console.log(error, "Error");
      }
    };
    getMatriculasNaoValidadas();
  }, []);
  const goToMatricula = (matriculaID) => {
    navigate(`/matricula/${matriculaID}`);
  };
  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2>Matrículas Disponíveis</h2>
      <div>
        {matriculas.map((matricula, index) => {
          return (
            <div
              key={index}
              onClick={() => goToMatricula(matricula._id)}
              className="border p-3 mt-3 btn bg-dark text-light"
            >
              <p>Matrícula: {matricula.codigo}</p>
              <p>Quantidade de atos: {matricula.qtdAtos}</p>
              {!matricula.status ? "NÃO VALIDADA" : "VALIDADA"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matriculas;
