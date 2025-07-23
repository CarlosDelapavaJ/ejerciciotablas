import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-field';
import { bbvaWebButtonDefaultAmbient } from '@bbva-web-components/bbva-web-button-default';
import { bbvaWebLinkAmbient } from '@bbva-web-components/bbva-web-link';

import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-form-password/bbva-web-form-password.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-web-components/bbva-foundations-grid-default-layout/bbva-foundations-grid-default-layout.js';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '../../../../Componentes/cells-co-lista-pokemon-ui/cells-co-lista-pokemon-ui.js';
import '../../../../Componentes/cells-co-poke-list-dm/cells-co-poke-list-dm.js';

import styles from './login-page-styles.js';
const DEFAULT_I18N_KEYS = {
  loginTitle: 'login-page.title',
  help: 'login-page.help',
  userInputLabel: 'login-page.user-input-label',
  userPasswordLabel: 'login-page.user-password-label',
  button: 'login-page.button',
  forgetPassword: 'login-page.forget-password',
  clientButton: 'login-page.client-button',
};

class LoginMobilePage extends intl(CellsPage) {
  static get is() {
    return 'login-page';
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
      pokemones: {
        type: Array,
        attribute: false,
      },
      name: {
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
    this.pokemones = [];
    this.name = 'Pokemon';
    this.url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png';
    this.i18nKeys = DEFAULT_I18N_KEYS;
    this.subscribe('page_state', (pageState) => (this.pageState = pageState));
    this.pokemon = {};
    this.dispatchEvent(
      new CustomEvent('application-started', {
        bubbles: true,
        composed: true,
      })
    );
  }


  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }
    return super.update && super.update(props);
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);
    const queryScope = this.shadowRoot ? this.shadowRoot : this;
    this.language = localStorage.getItem('language') || window.IntlMsg.lang;
    this._setSettings();
  }

  _setSettings() {
    window.IntlMsg.lang = this.language;
  }

  _pokemones(e) {
    this.pokemones = e.detail;
    this.name = this.pokemones.name;
    this.url = this.pokemones.sprites.front_default;
  }

  _getPokemon() {
    const dataManager = this.shadowRoot.querySelector('#dmPokemon');
    if (dataManager) {
      dataManager.getPokemones();
    }
  }
  get _mainContentTpl() {
    return html`
      <div class="imagen">
        <cells-co-lista-pokemon-ui
          name-pokemon=${this.name || 'Pokemon'}
          url-imagen=${this.url || ''}
          @get-pokemones=${this._getPokemon}
        >
        </cells-co-lista-pokemon-ui>
        <cells-co-poke-list-dm
          id="dmPokemon"
          @data-sucess=${this._pokemones}
        ></cells-co-poke-list-dm>
      </div>
    `;
  }

  render() {
    return html` ${this._mainContentTpl} `;
  }
}
window.customElements.define(LoginMobilePage.is, LoginMobilePage);
