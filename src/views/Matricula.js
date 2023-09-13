import React, { useState, useEffect } from "react";
import api from "../utils/api.utils";
import { useParams } from "react-router-dom";

const Matricula = () => {
  const [matricula, setMatriculas] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const getMatricula = async () => {
      try {
        const data = await api.getAtosNaoValidadosMatriculasById(id);
        setMatriculas(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMatricula();
  }, [id]);
  console.log(matricula);
  const [selectedAtos, setSelectedAtos] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedAtos.includes(value)) {
      setSelectedAtos(selectedAtos.filter((ato) => ato !== value));
    } else {
      setSelectedAtos([...selectedAtos, value]);
    }
  };

  const checkAtos = [];
  for (let i = 1; i <= matricula.qtdatos; i++)
    checkAtos.push(
      <label key={i}>
        <input
          type="checkbox"
          value={`ato${i}`}
          checked={selectedAtos.includes(`ato${i}`)}
          onChange={handleCheckboxChange}
        />
        {i}
      </label>
    );

  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2>Matrícula {matricula.codigo}</h2>

      <div>
        <div className="border p-3 mt-3 btn bg-dark text-light">
          <div className="mb-3">Lista de atos</div>
          {checkAtos}
        </div>
      </div>
    </div>
  );
};

export default Matricula;
