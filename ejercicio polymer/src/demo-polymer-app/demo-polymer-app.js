import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import './task-list.js';


/**
 * @customElement
 * @polymer
 */
class DemoPolymerApp extends PolymerElement {
  
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      
      <h1>Gestor de Tareas</h1>
      <task-list tasks=[[tasks]]></task-list>

    `;
  }
  static get properties() {

    return {
      
    };
  }

}

window.customElements.define('demo-polymer-app', DemoPolymerApp);
