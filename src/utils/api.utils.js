import axios from "axios";

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:9000/",
    });
    this.api.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      (error) => {
        console.log(error);
      }
    );
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userId");
          window.location = "/admin/login";
        }
        throw error;
      }
    );
  }
  login = async (loginInfo) => {
    try {
      const { data } = await this.api.post("/user/auth/login", loginInfo);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem(
        "tokenExpirationTimestamp",
        data.expirationTimestamp
      );
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  signup = async (signupInfo) => {
    try {
      const { data } = await this.api.post("/user/auth/signup", signupInfo);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getMatriculasNaoValidadas = async () => {
    try {
      const { data } = await this.api.get("/matriculas/");
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getMatriculasById = async (matriculaID) => {
    try {
      const { data } = await this.api.get(`/matriculas/${matriculaID}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getAtosNaoValidadosMatriculasById = async (matriculaID) => {
    try {
      const { data } = await this.api.get(
        `/atos/nao-validados/matricula/${matriculaID}`
      );
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getAtosValidadosMatriculasById = async (matriculaID) => {
    try {
      const { data } = await this.api.get(
        `/atos/validados/matricula/${matriculaID}`
      );
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getUserNav = async (userId) => {
    try {
      const { data } = await this.api.get(`/user/${userId}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getAtosByUser = async (userId) => {
    try {
      const { data } = await this.api.get(`/atos/atos-validados/${userId}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };

  getAtosValidados = async () => {
    try {
      const { data } = await this.api.get(`/atos/validados/geral`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };

  getAtosFiltrados = async (inicio, fim) => {
    try {
      const { data } = await this.api.get(
        `/atos/validados/filtrados/${inicio}/${fim}`
      );
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getRanking = async () => {
    try {
      const { data } = await this.api.get(`/atos/validados/ranking/`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
}
/* eslint-disable-next-line*/
export default new Api();
