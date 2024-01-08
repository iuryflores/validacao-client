import React, { useState, useEffect } from "react";
import api from "../../utils/api.utils";
import { useNavigate, useParams } from "react-router-dom";

const Matricula = ({
  message,
  setMessage,
  loading,
  setLoading,
  loadingGif,
  adicionarPonto,
  userData,
}) => {
  const [matricula, setMatricula] = useState(null);
  const [matriculaValidadas, setMatriculaValidadas] = useState([]);
  const [matriculaNaoValidadas, setMatriculaNaoValidadas] = useState([]);

  const { matriculaCodigo } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedAtos([]);
    const getAtosValidados = async () => {
      try {
        setLoading(true);
        const naoValidada = await api.getAtosNaoValidadosMatriculaByCodigo(
          matriculaCodigo
        );
        const validadas = await api.getAtosValidadosMatriculaByCodigo(
          matriculaCodigo
        );
        const getMat = await api.getMatriculaByCodigo(matriculaCodigo);
        setMatricula(getMat);
        setMatriculaNaoValidadas(naoValidada);
        setMatriculaValidadas(validadas);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage("Não foi possível carregar atos");
        console.log(error);
      }
    };
    getAtosValidados();
  }, [matriculaCodigo, setLoading, setMessage]);
  const [selectedAtos, setSelectedAtos] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedAtos.includes(value)) {
      setSelectedAtos(selectedAtos.filter((ato) => ato !== value));
    } else {
      setSelectedAtos([...selectedAtos, value]);
    }
  };

  //ATOS AINDA NAO VALIDADOS
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
        id={`ato${ato.codigo}`}
        autoComplete="off"
        value={`${ato.codigo}`}
        checked={selectedAtos.includes(`${ato.codigo}`)}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={`ato${ato.codigo}`} className="btn btn-outline-warning">
        {ato.codigo}
      </label>
    </div>
  ));
  //ATOS JÁ VALIDADOS
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
        id={`ato${ato.codigo}`}
        autoComplete="off"
        value={`ato${ato.codigo}`}
        checked
        onChange={handleCheckboxChange}
        disabled
      />
      <label htmlFor={`ato${ato.codigo}`} className="btn btn-outline-success">
        {ato.codigo}
      </label>
    </div>
  ));

  //SEND ATOS DO API
  const handleValidar = async () => {
    try {
      setLoading(true);
      const validar = await api.validarAtos({
        selectedAtos,
        matricula,
        userData,
      });

      if (validar) {
        setLoading(false);
        navigate(0);
        console.log(validar);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      {!loading ? (
        <>
          <h2>
            Matrícula{" "}
            {matricula !== null ? adicionarPonto(matricula.codigo) : null}
          </h2>

          {message && <div className="alert alert-info">{message}</div>}
          {!message && (
            <>
              <div className="p-3">
                <div className="card border-warning">
                  <div className="card-header text-bg-warning">
                    <i className="bi bi-caret-down-fill"></i>
                    <b>ATOS NÃO VALIDADOS</b>
                  </div>
                  <div
                    className="card-body text-bg-dark"
                    style={{ borderRadius: "0 0 5px 5px" }}
                  >
                    {checkAtos}
                  </div>
                </div>
                <div className="w-100 d-flex flex-column align-items-end">
                  <button className="mt-3" onClick={handleValidar}>
                    Salvar
                  </button>
                </div>
              </div>
              <hr />
              <div className="p-3">
                <div className="card border-primary">
                  <div className="card-header text-bg-primary">
                    <i className="bi bi-caret-down-fill"></i>
                    <b>ATOS VALIDADOS</b>
                  </div>
                  <div
                    className="card-body text-bg-dark"
                    style={{ borderRadius: "0 0 5px 5px" }}
                  >
                    {atosValidadosCheck}
                  </div>
                </div>
              </div>
            </>
          )}
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
