import React, { useState } from "react";
import api from "../../utils/api.utils";

const Mandato = ({ loadingGif }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const redefinirAtos = async () => {
    try {
      setLoading(true);
      const res = await api.addValidadoCampo();
      if (res) {
        console.log(res);
        setMessage(res.msg);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.msg);
    }
  };

  return (
    <div className="d-flex flex-column back-logado w-100 container mt-3 radios-5 p-3">
      <h2>
        <span role="img" arial-label="Pen" className="mx-1">
          <i className="bi bi-vector-pen"></i>
        </span>
        Mandato
      </h2>
      <hr />
      <div className="grid-container mb-3">
        <div
          onClick={redefinirAtos}
          className="grid-item p-2 border btn btn-secondary d-flex flex-column"
        >
          <i className="bi bi-gear-wide-connected"></i>Redefinir atos
        </div>
        <div className="grid-item p-2 border btn btn-secondary d-flex flex-column">
          <i className="bi bi-gear-wide-connected"></i>Redefinir matrículas
        </div>
      </div>
      <div className="help-info">
        <i className="bi bi-info-circle mx-1"></i>
        <span>
          Utilizados para verificar atos/matrículas validados ou não validados.
        </span>
      </div>
      {/*
      <hr />
      
      <div className="grid-container mb-3">
        <div className="grid-item p-2 border btn btn-secondary d-flex flex-column">
          <i className="bi bi-gear-wide-connected"></i>Atualizar Ranking Casas
        </div>
        <div className="grid-item p-2 border btn btn-secondary d-flex flex-column">
          <i className="bi bi-gear-wide-connected"></i>Redefinir Casas
        </div>
        <div className="grid-item p-2 border btn btn-secondary d-flex flex-column">
          <i className="bi bi-gear-wide-connected"></i>Atualizar DB Postgre
        </div>
        <div className="grid-item p-2 border btn btn-secondary d-flex flex-column">
          <i className="bi bi-gear-wide-connected"></i>Editar usuários
        </div>
      </div>
      <div className="help-info">
        <i className="bi bi-info-circle mx-1"></i>
        <span>Fase de testes, não utilizar.</span>
      </div>
      */}
      {loading && (
        <div className="d-flex justify-content-center">
          <img style={{ width: "100px" }} src={loadingGif} alt="Loading gif" />
        </div>
      )}
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
};

export default Mandato;
