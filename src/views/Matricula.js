import React, { useState, useEffect } from "react";
import api from "../utils/api.utils";
import { useParams } from "react-router-dom";

const Matricula = ({ loading, setLoading, loadingGif, adicionarPonto }) => {
  const [matricula, setMatricula] = useState(null);
  const [matriculaValidadas, setMatriculaValidadas] = useState([]);
  const [matriculaNaoValidadas, setMatriculaNaoValidadas] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const getAtosValidados = async () => {
      try {
        setLoading(true);
        const naoValidada = await api.getAtosNaoValidadosMatriculasById(id);
        const validadas = await api.getAtosValidadosMatriculasById(id);
        const getMat = await api.getMatriculasById(id);
        setMatricula(getMat);
        setMatriculaNaoValidadas(naoValidada);
        setMatriculaValidadas(validadas);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAtosValidados();
  }, [id, setLoading]);
  console.log(loading);
  const [selectedAtos, setSelectedAtos] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedAtos.includes(value)) {
      setSelectedAtos(selectedAtos.filter((ato) => ato !== value));
    } else {
      setSelectedAtos([...selectedAtos, value]);
    }
  };

  const checkAtos = matriculaNaoValidadas.map((ato, index) => (
    <div
      className="btn-group mx-1"
      role="group"
      aria-label="Basic checkbox toggle button group"
      key={index}
    >
      <input
        className="btn-check"
        type="checkbox"
        id={`ato${ato.ato}`}
        autoComplete="off"
        value={`ato${ato.ato}`}
        checked={selectedAtos.includes(`ato${ato.ato}`)}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={`ato${ato.ato}`} className="btn btn-outline-primary">
        {ato.ato}
      </label>
    </div>
  ));

  const atosValidadosCheck = matriculaValidadas.map((ato, index) => (
    <div
      className="btn-group mx-1"
      role="group"
      aria-label="Basic checkbox toggle button group"
      key={index}
    >
      <input
        className="btn-check"
        type="checkbox"
        id={`ato${ato.ato}`}
        autoComplete="off"
        value={`ato${ato.ato}`}
        checked
        onChange={handleCheckboxChange}
        disabled
      />
      <label htmlFor={`ato${ato.ato}`} className="btn btn-outline-primary">
        {ato.ato}
      </label>
    </div>
  ));

  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      {!loading ? (
        <>
          <h2>
            Matrícula{" "}
            {matricula !== null ? adicionarPonto(matricula.codigo) : null}
          </h2>
          <div className="p-3">
            <div className="mt-3">
              <div className="mb-3">Lista de atos para validar</div>
              {checkAtos}
            </div>
            <button className="mt-3">Salvar</button>
          </div>
          <div>
            <div className="p-3 mt-3">
              <div className="mb-3">Lista de atos validados</div>
              {atosValidadosCheck}
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

export default Matricula;
