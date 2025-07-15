import { LitElement, html, css } from "lit";
import { registerTranslateConfig, use, translate } from "lit-translate";
import { DataManager } from "./components/dataManager.js";
import "./card/card-lit.js";
import "./filter/filter-lit.js";
import "@material/web/button/filled-button.js";
import "@material/web/select/outlined-select.js";
import "@material/web/select/select-option.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/progress/circular-progress.js";

registerTranslateConfig({
  loader: (lang) =>
    fetch(`/assets/locales/${lang}.json`).then((res) => res.json()),
});
use("es");

export class DemoLitApp extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
      }
      h2 {
        text-align: center;
      }
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;
        text-align: center;
      }
      p {
        margin-top: 1rem;
      }
    `,
  ];

  static properties = {
    _lang: {
      type: Boolean,
      state: true,
    },
    url: {
      type: String,
    },
    metodo: {
      type: String,
    },
    evento: {
      type: String,
    },
    data: {
      type: Array,
    },
    todos: {
      type: Array,
    },
    filtro: {
      type: Array,
    },
  };

  constructor() {
    super();
    this._lang = use.lang;
    this.url = "";
    this.metodo = "GET";
    this.evento = "";
    this.data = [];
    this.todos = [];
    this.filtro = [];
  }

  render() {
    return html`
      <md-outlined-select
        @change="${this.changeLanguages}"
        label=${translate("language")}
      >
        <md-select-option value="es" ?selected=${use.lang === "es"}
          >${translate("spanish")}</md-select-option
        >
        <md-select-option value="en" ?selected=${use.lang === "en"}
          >${translate("english")}</md-select-option
        >
      </md-outlined-select>
      <filter-lit
        @filtro-estatus="${this._filtrarPorEstatus}"
        @filtro-origen="${this._filtrarPorOrigen}"
      ></filter-lit>
      <hr />
      <h2>${translate("labelMorty")}</h2>

      ${this.cargando
        ? html`
            <div class="loading">
              <md-circular-progress indeterminate></md-circular-progress>
              <p>${translate("loading")}...</p>
            </div>
          `
        : html`
            <div class="grid">
              ${this.data.map(
                (char) => html`<card-lit .character=${char}></card-lit>`
              )}
            </div>
          `}

      <data-manager
        url=${this.url}
        metodo=${this.metodo}
        evento=${this.evento}
        @todos="${this._recibidosTodos}"
        @personajes="${this._recibidoPersonajes}"
        @error="${this._handleDataManagerError}"
      >
      </data-manager>
    `;
  }

  async ejecutarDMTodos() {
    await this.updateComplete;
    const dataManagerElement = this.shadowRoot.querySelector("data-manager");
    if (dataManagerElement) {
      dataManagerElement.getPersonajes();
    }
  }

  async cargarTodosPersonajes() {
    this.cargando = true;
    this.url = "https://rickandmortyapi.com/api/character";
    this.metodo = "GET";
    this.evento = "personajes";
    await this.ejecutarDMTodos();
  }

  _recibidosTodos(event) {
    this.data = event.detail.results;
    this.cargarTodosPersonajes();
  }

  _recibidoPersonajes(event) {
    this.todos = event.detail;
    this.data = event.detail;
    this.cargando = false;
  }

  _handleDataManagerError(event) {
    console.error("Error al cargar datos:", event.detail);
  }

  _filtrarPorOrigen(estatus) {
    const palabraClave = estatus.detail;
    const coincidencias = this.todos.filter((p) =>
      p.origin.name.toLowerCase().includes(palabraClave.toLowerCase())
    );
    this.data = coincidencias;
  }
  _filtrarPorEstatus(event) {
    const estatus = event.detail;
    const filtrados = this.todos.filter(
      (personaje) => personaje.status.toLowerCase() === estatus
    );
    this.data = filtrados;
  }

  firstUpdated() {
    this.cargarTodosPersonajes();
  }

  async changeLanguages(event) {
    const newLang = event.target.value;
    await use(newLang);
    this._lang = newLang;
  }
}
customElements.define("demo-lit-app", DemoLitApp);
