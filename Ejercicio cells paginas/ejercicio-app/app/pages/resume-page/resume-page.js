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
    this.subscribe('pokemon', (pokemon) => this.pokemon = pokemon);
    console.log(this.pokemon, this.pageState);
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel>
        <div slot="app__header">
          <h2>Resumen Page</h2>
        </div>
        <slot slot="app__main">
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
