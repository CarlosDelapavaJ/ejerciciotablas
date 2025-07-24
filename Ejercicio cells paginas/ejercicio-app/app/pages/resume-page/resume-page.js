import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaHelp } from '@bbva-web-components/bbva-foundations-icons';
import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-field';
import { bbvaWebButtonDefaultAmbient } from '@bbva-web-components/bbva-web-button-default';
import { bbvaWebLinkAmbient } from '@bbva-web-components/bbva-web-link';
import '@cells-components/cells-template-paper-drawer-panel';

import styles from './resume-page-styles.js';

const DEFAULT_I18N_KEYS = {
  loginTitle: 'login-page.title',
  help: 'login-page.help',
  userInputLabel: 'login-page.user-input-label',
  userPasswordLabel: 'login-page.user-password-label',
  button: 'login-page.button',
  forgetPassword: 'login-page.forget-password',
  clientButton: 'login-page.client-button',
};

class ResumePage extends intl(CellsPage) {
  static get is() {
    return 'resume-page';
  }

  static get properties() {
    return {
      pageState: {
        type: Object,
        attribute: false,
      },
      frontDefault: {
        type: String,
      },
      dark: {
        type: String,
      },
      i18nKeys: {
        type: Object,
        attribute: false,
      },
      stats: {
        type: Object,
      },
      imagenes: {
        type: Object,
      },
      estatus: {
        type: Object,
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
    this.estatus = {vida: '', ataque: '', defensa: ''};
    this.subscribe('page_state', (pageState) => (this.pageState = pageState));
    this.dispatchEvent(
      new CustomEvent('application-started', {
        bubbles: true,
        composed: true,
      })
    );
  }
  _goProximo() {
    console.log('log Resume');
    this.navigate('habilidades-pokemon');
  }
  _goAnterior() {
    this.navigate('login');
  }

  onPageEnter() {
    this.subscribe('stats', (stats) => this.stats = stats);
    this.subscribe('imagenes', (imagenes) => this.imagenes = imagenes);
    this.frontDefault = this.imagenes.front_default;

    this.estatus.vida = this.stats[0].base_stat;
    this.estatus.defensa = this.stats[2].base_stat;
    this.estatus.ataque = this.stats[1].base_stat;
    console.log(this.estatus, this.stats);
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel>
        <slot slot="app__main">
          <h2>Resumen Page</h2>
          <bbva-banner-image
            id="imgBanner"
            size="S"
            image-src=${this.front_default || 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'}
            img-accessibility-text="Imagen de Pokémon"
            height="100px"
          ></bbva-banner-image>
          <bbva-type-text
          text="Vida: ${this.estatus.vida || ''}"
          size="2XL"
        ></bbva-type-text>
        <bbva-type-text
          text="Ataque: ${this.estatus.ataque || ''}"
          size="2XL"
        ></bbva-type-text>
        <bbva-type-text
          text="Defensa: ${this.estatus.defensa || ''}"
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
window.customElements.define(ResumePage.is, ResumePage);
