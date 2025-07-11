import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class TaskItem extends PolymerElement {
  static get properties() {
    return {
      task: {
        type: String,
        value: "",
      },
    };
  }

  static get template() {
    return html`
      <style>
        .task-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 10px;
          background-color: #f9f9f9;
        }

        .task-container span {
          flex-grow: 1;
        }

        .completed {
          text-decoration: line-through;
          color: #888;
        }

        button {
          margin-left: 10px;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .delete-btn {
          background-color: #e74c3c;
          color: white;
        }

        .complete-btn {
          background-color: #2ecc71;
          color: white;
        }

        button[disabled] {
          background-color: #ccc;
          cursor: not-allowed;
        }
      </style>

      <div class="task-container">
        <span class$="[[:completed(task.completed)]]">[[task.name]]</span>
        <button
          class="delete-btn"
          on-click="deleteTask"
          disabled$="[[task.completed]]"
        >
          Eliminar
        </button>
        <button
          class="complete-btn"
          on-click="completeTask"
          disabled$="[[task.completed]]"
        >
          Completada
        </button>
      </div>
    `;
  }

  deleteTask() {
    this.dispatchEvent(
      new CustomEvent("task-deleted", {
        detail: this.index,
        bubbles: true,
        composed: true,
      })
    );
  }

  _completed(completed) {
    return completed ? "completed" : "";
  }

  completeTask(e) {
    this.dispatchEvent(
      new CustomEvent("task-update", {
        detail: this.index ,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("task-item", TaskItem);
