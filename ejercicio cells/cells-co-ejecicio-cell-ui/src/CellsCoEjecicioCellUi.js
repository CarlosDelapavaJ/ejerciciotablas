import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';

import '@bbva-experience-components/bbva-banner-image/bbva-banner-image';
import '@bbva-experience-components/bbva-button-default/bbva-button-default'
import '@bbva-experience-components/bbva-type-text/bbva-type-text';

import styles from './cells-co-ejecicio-cell-ui.css.js';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <cells-co-ejecicio-cell-ui></cells-co-ejecicio-cell-ui>
 * ```
 */

export class CellsCoEjecicioCellUi extends LitElement {
  static get properties() {
    return {
      /**
       * Description for property
       */
      name: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.name = 'Cells';
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('cells-co-ejecicio-cell-ui-shared-styles'),
    ];
  }

  render() {
    return html`
      <p>Welcome to ${this.name}</p>
      <bbva-banner-image
        size="M"
        image-src="data:image/jpeg;base64,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"
        img-accessibility-text="This image is M size"
      ></bbva-banner-image>
      <bbva-button-default text="lalal"></bbva-button-default>
      <bbva-type-text text="Size: 2XS" size="2XS"></bbva-type-text>
    `;
  }
}
