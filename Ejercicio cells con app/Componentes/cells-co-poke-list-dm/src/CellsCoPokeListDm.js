import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './cells-co-poke-list-dm.css.js';
import '@bbva-global-apis-dm/bbva-global-generic-dm';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <cells-co-poke-list-dm></cells-co-poke-list-dm>
 * ```
 */
export class CellsCoPokeListDm extends LitElement {
  static get properties() {
    return {
      url: {
        type: String,
      },
      randomPokemon: {
        type: Number,
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://pokeapi.co/api/v2/';
    this.randomPokemon = 1;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('cells-co-poke-list-dm-shared-styles'),
    ];
  }

  _onDataSucess(event) {
    this._eventData(event.detail, 'data-sucess');
  }

  _onDataError(event) {
    console.error('Error en la petición:', event.detail);
    this._eventData(event.detail, 'data-error');
  }

  render() {
    return html`
      <bbva-global-generic-dm
        id="genericDm"
        host=${this.url}
        path="pokemon/${this.randomPokemon}"
        cross-domain
        @generic-dm-fetch=${this._onDataSucess}
        @generic-dm-fetch-error=${this._onDataError}
      >
      </bbva-global-generic-dm>
      <slot></slot>
    `;
  }

  getPokemones() {
    this._pokemonRandom();
    const dataManager = this.shadowRoot.querySelector('#genericDm');
    if (dataManager) {
      dataManager.getData();
    }
  }

  _pokemonRandom() {
    this.randomPokemon = Math.floor(Math.random() * (250 - 1 + 1)) + 1;
  }
  _eventData(data, eventoNombre) {
    this.dispatchEvent(
      new CustomEvent(eventoNombre, {
        detail: data,
        bubbles: true,
        composed: true,
      }),
    );
  }
}
