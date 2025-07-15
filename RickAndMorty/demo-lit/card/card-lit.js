import { LitElement, html, css } from "lit";
import { cardLitCss } from "./card-lit-css";
import { registerTranslateConfig, use, translate } from "lit-translate";

registerTranslateConfig({
  loader: (lang) =>
    fetch(`/assets/locales/${lang}.json`).then((res) => res.json()),
});
use("es");

class CardLit extends LitElement {
  static styles = [cardLitCss];

  static properties = {
    character: {
      type: Object,
    },
  };

  constructor() {
    super();
    this.character = {};
  }

  render() {
    return html`
      <div class="card">
        <img src="${this.character.image}" alt="${this.character.name}" />
        <h3>${translate("characterName")} ${this.character.name}</h3>
        <p><strong>${translate("characterStatus")}</strong> ${this.character.status}</p>
        <p><strong>${translate("characterSpecies")}</strong> ${this.character.species}</p>
        <p><strong>${translate("characterGender")}</strong> ${this.character.gender}</p>
        <p><strong>${translate("characterOrigin")}</strong> ${this.character.origin.name}</p>
        <p><strong>${translate("characterLocation")}</strong> ${this.character.location.name}</p>
      </div>
    `;
  }
}

customElements.define("card-lit", CardLit);
