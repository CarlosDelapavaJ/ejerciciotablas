import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-field';
import { bbvaWebButtonDefaultAmbient } from '@bbva-web-components/bbva-web-button-default';
import { bbvaWebLinkAmbient } from '@bbva-web-components/bbva-web-link';
import '@cells-components/cells-template-paper-drawer-panel';

import styles from './habilidades-pokemon-page-styles.js';

const DEFAULT_I18N_KEYS = {
  loginTitle: 'login-page.title',
  help: 'login-page.help',
  userInputLabel: 'login-page.user-input-label',
  userPasswordLabel: 'login-page.user-password-label',
  button: 'login-page.button',
  forgetPassword: 'login-page.forget-password',
  clientButton: 'login-page.client-button',
};

class HabilidadesPokemonPage extends intl(CellsPage) {
  static get is() {
    return 'habilidades-pokemon-page';
  }

  static get properties() {
    return {
      pageState: {
        type: Object,
        attribute: false,
      },
      language: {
        type: String,
      },
      dark: {
        type: String,
      },
      i18nKeys: {
        type: Object,
        attribute: false,
      },
      abilities: {
        type: Object,
      },
      abilitie: {
        type: String,
      },
    };
  }

  static get styles() {
    return [
      styles,
      bbvaWebFormFieldAmbient.dark,
      bbvaWebButtonDefaultAmbient.dark,
      bbvaWebLinkAmbient.dark,
    ];
  }

  constructor() {
    super();
    this.i18nKeys = DEFAULT_I18N_KEYS;
    this.subscribe('page_state', (pageState) => (this.pageState = pageState));
    this.dispatchEvent(
      new CustomEvent('application-started', {
        bubbles: true,
        composed: true,
      })
    );
  }

  onPageEnter() {
    this.subscribe('abilities', (abilities) => (this.abilities = abilities));
    this.abilitie = this.abilities[0].ability.name;
  }

  _goProximo() {
    console.log('log Habilidades');
    this.navigate('imagenes-pokemon');
  }
  _goAnterior() {
    this.navigate('resume');
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel>
        <div slot="app__header">
          
        </div>
        <slot slot="app__main">
          <h2>Habilidades Page</h2>
          <bbva-type-text
          text="Habilidad: ${this.abilitie}"
          size="2XL"
        ></bbva-type-text>
          <bbva-button-default
            text="Anterior pantalla"
            @click=${this._goAnterior}
          ></bbva-button-default>
          <bbva-button-default
            text="Próxima pantalla"
            @click=${this._goProximo}
          ></bbva-button-default>
        </slot>
      </cells-template-paper-drawer-panel>
    `;
  }
}
window.customElements.define(HabilidadesPokemonPage.is, HabilidadesPokemonPage);
