import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './cells-co-lista-pokemon-ui.css.js';
import '@bbva-experience-components/bbva-banner-image/bbva-banner-image';
import '@bbva-experience-components/bbva-button-default/bbva-button-default';
import '@bbva-experience-components/bbva-type-text/bbva-type-text';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <cells-co-lista-pokemon-ui></cells-co-lista-pokemon-ui>
 * ```
 */
export class CellsCoListaPokemonUi extends LitElement {
  static get properties() {
    return {
      namePokemon: {
        type: String,
        attribute: 'name-pokemon',
      },
      urlImagen: {
        type: String,
        attribute: 'url-imagen',
      },
    };
  }

  constructor() {
    super();
    this.namePokemon = 'Pokemon';
    this.urlImagen = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png';
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('cells-co-lista-pokemon-ui-shared-styles'),
    ];
  }

  render() {
    return html`
      <div class="imagenes">
        <bbva-banner-image
          id="imgBanner"
          size="S"
          image-src=${this.urlImagen || 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'}
          img-accessibility-text="Imagen de Pokémon"
          height="220px"
        ></bbva-banner-image>
        <bbva-type-text
          text=${this.namePokemon || 'Pokemon'}
          size="L"
        ></bbva-type-text>
        <bbva-button-default
          text="Pokemones"
          @click="${this._eventData}"
        ></bbva-button-default>
      </div>
    `;
  }

  _eventData() {
    this.dispatchEvent(
      new CustomEvent('get-pokemones', {
        bubbles: true,
        composed: true,
      }),
    );
  }
}
