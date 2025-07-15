import { LitElement, html, css } from "lit";
import { filterLitCss } from "./filter-lit-css";
import { registerTranslateConfig, use, translate } from "lit-translate";

registerTranslateConfig({
  loader: (lang) =>
    fetch(`/assets/locales/${lang}.json`).then((res) => res.json()),
});
use("es");

class FilterLit extends LitElement {
  static styles = [filterLitCss];

  static properties = {
    status: {
      type: String,
    },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <md-outlined-select
        label=${translate("selectStatus")}
        @change=${this._actualizarStatus}
      >
        <md-select-option value="alive">${translate("aliveState")}</md-select-option>
        <md-select-option value="dead">${translate("deadState")}</md-select-option>
        <md-select-option value="unknown">${translate("unknownState")}</md-select-option>
      </md-outlined-select>

      <md-outlined-text-field
        label=${translate("textFiltro")}
        id="textFiltro"
      >las</md-outlined-text-field>

      <md-filled-button @click=${this._actualizarOrigen}>
        ${translate("buttonFilter")}
      </md-filled-button>
    `;
  }

  _actualizarStatus(event) {
    const selectedValue = event.target.value;
    this._sendData("filtro-estatus", selectedValue);
  }
  _actualizarOrigen() {
    const input = this.shadowRoot.getElementById("textFiltro");
    const selectedValue = input?.value?.trim().toLowerCase();
    this._sendData("filtro-origen", selectedValue);
  }
  _sendData(event, value) {
    const selectedValue = value;
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: selectedValue,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("filter-lit", FilterLit);
