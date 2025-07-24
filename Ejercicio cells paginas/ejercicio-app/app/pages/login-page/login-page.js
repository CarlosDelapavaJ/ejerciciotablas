import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-field';
import { bbvaWebButtonDefaultAmbient } from '@bbva-web-components/bbva-web-button-default';
import { bbvaWebLinkAmbient } from '@bbva-web-components/bbva-web-link';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-experience-components/bbva-button-default/bbva-button-default';

import '../../../components/ui/cells-co-ejercicio-cells-ui/cells-co-ejercicio-cells-ui.js';
import '../../../components/dm/cells-co-pokemon-dm/cells-co-pokemon-dm.js';

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

class LoginPage extends intl(CellsPage) {
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
      pokemon: {
        type: Object,
        attribute: false,
      }
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
    const queryScope = this.shadowRoot ? this.shadowRoot : this;
    this.language = localStorage.getItem('language') || window.IntlMsg.lang;
    this._setSettings();
  }

  _setSettings() {
    window.IntlMsg.lang = this.language;
  }

  get _renderContentTpl() {
    return html`
      <cells-co-ejercicio-cells-ui
        name-pokemon=${this.pokemon?.name || ''}
        image-pokemon=${this.pokemon?.sprites?.front_default || 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'}
        @get-pokemon=${this._getPokemon}
      ></cells-co-ejercicio-cells-ui>
    `;
  }

  _getPokemon() {
    const dmPokemon = this.shadowRoot.querySelector('#dmPokemon');
    if (dmPokemon) {
      dmPokemon.getPokemon();
    }
  }

  _loadPokemon(e) {
    this.pokemon = e.detail;
    console.log(this.pokemon, this.pageState);
  }

  _errorPokemon(e) {
    console.error('Error getting pokemon', e);
  }

  _goResume() {
    this.publish('pokemon', this.pokemon);
    this.publish('imagenes', this.pokemon.sprites);
    this.publish('peliculas', this.pokemon.moves);
    this.publish('abilities', this.pokemon.abilities);
    this.publish('stats', this.pokemon.stats);
    this.navigate('resume');
  }

  render() {
    return html`
      <cells-co-pokemon-dm
        id="dmPokemon"
        @fetch-success=${this._loadPokemon}
        @fetch-error="${this._errorPokemon}">
      </cells-co-pokemon-dm>
      <cells-template-paper-drawer-panel page-title="${this.t(this.i18nKeys.loginTitle)}" state="active">
        <div slot="app__header">
          <h1>Login Page</h1>
        </div>
        <slot slot="app__main">
          ${this._renderContentTpl}
          <bbva-button-default
            text="Próxima pantalla"
            @click=${this._goResume}
          ></bbva-button-default>
        </slot>
      </cells-template-paper-drawer-panel>
    `;
  }
}
window.customElements.define(LoginPage.is, LoginPage);
