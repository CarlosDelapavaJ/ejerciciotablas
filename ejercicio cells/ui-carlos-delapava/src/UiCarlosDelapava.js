import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './ui-carlos-delapava.css.js';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <ui-carlos-delapava></ui-carlos-delapava>
 * ```
 */
export class UiCarlosDelapava extends LitElement {
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
    this.name = 'Componente de Prueba';
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('ui-carlos-delapava-shared-styles'),
    ];
  }

  render() {
    return html`
      <p>${this.name}</p>
      <p>Este es un párrafo de ejemplo para mostrar el estilo del texto.</p>
      <div class="img">
        <img
          src="https://media.istockphoto.com/id/2166773378/photo/autumn-on-lake-gosau-in-salzkammergut-austria.jpg?s=1024x1024&w=is&k=20&c=7aQ4RNky5oVOk4ju1lDxu18_3m9sFziIYEEnafBt9XA="
          alt="Imagen de ejemplo"
        />
      </div>
      <div class="lista">
        <ul>
          <li>Elemento de lista 1</li>
          <li>Elemento de lista 2</li>
          <li>Elemento de lista 3</li>
        </ul>
      </div>
      <a href="https://www.google.com/" target="_blank">Visita nuestro sitio</a>
      <form>
        <div class="form">
          <div>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" />
          </div>
          <div>
            <label for="correo">Correo:</label>
            <input type="email" id="correo" name="correo" />
          </div>
          <div class="button">
            <input  type="submit" value="Enviar" />
          </div>
        </div>
      </form>
    `;
  }
}
