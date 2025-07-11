import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class TaskNew extends PolymerElement {
    static get template() {
        return html`
        <style>
            button {
                margin-left: 10px;
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                }
        </style>
        <input type="text" id="taskInput" placeholder="Nueva tarea" />
        <button on-click="agregar">Agregar</button>
    `;
    }
    
    agregar() {
        
        const input = this.shadowRoot.querySelector('#taskInput');
        let name = input.value.trim();
        let task={
            name:name,
            completed:false
        }
        if (name) {
            this.dispatchEvent(new CustomEvent('task-added', {
                detail: task,
                bubbles: true,
                composed: true
            }));
            input.value = '';
        }
    }
}

customElements.define('task-new', TaskNew);
