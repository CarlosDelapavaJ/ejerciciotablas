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
      back_default: {
        type: String,
      },
      front_default: {
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
    this.back_default = '';
    this.front_default = '';
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
    this.back_default = this.imagenes.back_default;
    this.front_default = this.imagenes.front_default;
    console.log(this.imagenes, this.imagenes.back_default, this.pageState);
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel>
        <slot slot="app__main">
        <h2>Imagenes Page</h2>
        <div class="imagenes">
          <bbva-banner-image
            id="imgBanner"
            size="S"
            image-src=${this.back_default || 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'}
            img-accessibility-text="Imagen de Pokémon"
            height="220px"
          ></bbva-banner-image>
          <bbva-banner-image
            id="imgBanner"
            size="S"
            image-src=${this.front_default || 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'}
            img-accessibility-text="Imagen de Pokémon"
            height="100px"
          ></bbva-banner-image>
        </div>
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
