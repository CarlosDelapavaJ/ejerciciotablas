import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-field';
import { bbvaWebButtonDefaultAmbient } from '@bbva-web-components/bbva-web-button-default';
import { bbvaWebLinkAmbient } from '@bbva-web-components/bbva-web-link';
import '@cells-components/cells-template-paper-drawer-panel';

import styles from './imagenes-pokemon-page-styles.js';

const DEFAULT_I18N_KEYS = {
  loginTitle: 'login-page.title',
  help: 'login-page.help',
  userInputLabel: 'login-page.user-input-label',
  userPasswordLabel: 'login-page.user-password-label',
  button: 'login-page.button',
  forgetPassword: 'login-page.forget-password',
  clientButton: 'login-page.client-button',
};

class ImagenesPokemonPage extends intl(CellsPage) {
  static get is() {
    return 'imagenes-pokemon-page';
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
      imagenes: {
        type: Object,
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

  _goProximo() {
    console.log('log Imagenes');
    this.navigate('peliculas');
  }
  _goAnterior() {
    this.navigate('habilidades-pokemon');
  }

  onPageEnter() {
    this.subscribe('imagenes', (pokemon) => (this.imagenes = pokemon));
    console.log(this.imagenes, this.imagenes.back_default, this.pageState);
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel>
        <div slot="app__header">
          <h2>Imagenes Page</h2>
        </div>
        <slot slot="app__main">
          <bbva-banner-image
            id="imgBanner"
            size="S"
            image-src=${this.imagenes.back_default || 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'}
            img-accessibility-text="Imagen de Pokémon"
            height="220px"
          ></bbva-banner-image>
          <bbva-banner-image
            id="imgBanner"
            size="S"
            image-src=${this.imagenes || 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'}
            img-accessibility-text="Imagen de Pokémon"
            height="220px"
          ></bbva-banner-image>

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
window.customElements.define(ImagenesPokemonPage.is, ImagenesPokemonPage);
