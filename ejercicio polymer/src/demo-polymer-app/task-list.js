import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import {} from "@polymer/polymer/lib/elements/dom-repeat.js";
import "./task-item.js";
import "./task-new.js";

class TaskList extends PolymerElement {
  static get is() {
    return "task-list";
  }
  static get properties() {
    return {
      tasks: {
        type: Array,
        value: [],
      },
    };
  }

    static get template() {
    return html`
        <style>
        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 10px;
          background-color: #f9f9f9;
        }
        .new{
        margin-bottom: 10px;
        }
        </style>
        <div class="container">
            <div class="new">
            <task-new on-task-added="addTask"></task-new>
            </div>
            <div class="item">
            <template is="dom-repeat" items="[[tasks]]" index-as="index" as="item">
                <task-item
                    task="[[item]]"
                    index="[[index]]"
                    on-task-deleted="_deleteTask"
                    on-task-update="_update"
                ></task-item>
            </template>
            </div>
        </div>
    `;
    }

  _deleteTask(e) {
    const index = e.detail;
    this.splice("tasks", index, 1);
    this._saveTasks();
  }
  
  addTask(e) {
    this.push("tasks", e.detail);
    this._saveTasks();
  }

  _saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  _update(e){
    console.log(e)
    this.set(`tasks.${e.detail}.completed`, true);
    this._saveTasks();
  }
}

customElements.define("task-list", TaskList);
