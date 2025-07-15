import { LitElement } from "lit";

export class DataManager extends LitElement {
  static properties = {
    url: {
      type: String,
    },
    metodo: {
      type: String,
    },
    evento: {
      type: String,
    },
    datos: {
      type: Object,
    },
  };

  constructor() {
    super();
    this.url = "";
    this.metodo = "POST";
    this.datos = {};
    this.evento = "";
  }

  _handleError(error) {
    console.error("DataManager - Algo salió mal:", error);
    this.dispatchEvent(
      new CustomEvent("error", {
        detail: error,
        bubbles: true,
        composed: true,
      })
    );
  }

  _sendData(data) {
    this.dispatchEvent(
      new CustomEvent(this.evento, {
        detail: data,
        bubbles: true,
        composed: true,
      })
    );
  }

  async getPersonajes() {
    if (!this.url) {
      this._handleError(
        new Error(
          "URL no definida para DataManager. No se puede realizar la petición."
        )
      );
      return;
    }

    let options = {
      method: this.metodo,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: this.metodo === "GET" ? undefined : JSON.stringify(this.datos),
    };
    try {
      let personajes = [];
      let url = this.url;
      while (url) {
        const response = await fetch(url, options);
        const data = await response.json();
        personajes = personajes.concat(data.results);
        url = data.info.next;
      }
      this._sendData(personajes);
    } catch (error) {
      this._handleError(error);
    }
  }
}

customElements.define("data-manager", DataManager);
