import React, { useState, useEffect } from "react";
import api from "../utils/api.utils";
import { useParams } from "react-router-dom";

const Matricula = () => {
  const [matricula, setMatricula] = useState([]);
  const [atos, setAtos] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const getAtosValidados = async () => {
      try {
        const getAtos = await api.getAtosValidadosMatriculasById(id);
        const getMat = await api.getMatriculasById(id);
        setMatricula(getMat);
        setAtos(getAtos);
      } catch (error) {
        console.log(error);
      }
    };
    getAtosValidados();
  }, [id]);
  const handleCheckboxChange = () => {};
  const atoNumber = atos.atosValidados || [];
  console.log(atos.atosValidados)

const checkAtos = [];

for (let i = 0; i <= matricula.qtdatos; i++) {
  const atoNumero = i;
  const indexAtoNumber = atoNumber.findIndex((atoObj) => atoObj.codigo === atoNumero);
  
  if (indexAtoNumber) {
    console.log(`Índice de atoNumero: ${i}, Índice de atoNumber: ${indexAtoNumber}`);
  }

  checkAtos.push(
    <label key={i}>
      <input
        type="checkbox"
        value={atoNumero}
        checked={indexAtoNumber !== -1}
        onChange={handleCheckboxChange}
      />
      {i}
    </label>
  );
}

  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2>Matrícula {matricula.codigo}</h2>

      <div className="d-flex">
        <div className="border p-3 mt-3 btn bg-dark text-light">
          <div className="mb-3">Lista de atos</div>
          {checkAtos}
        </div>
      </div>
      <button className="mt-3">Salvar</button>
    </div>
  );
};

export default Matricula;
