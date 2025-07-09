// components/pokemon-list.js
let max = 10;
let min = 0;

class PokemonList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.pokemons = [];
        this.seleccion = [];
        this._prueba = 0;
    }

    connectedCallback() {
        this.fetchPokemons();
    }

    async fetchPokemons() {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const details = await Promise.all(
            data.results.map(p => fetch(p.url).then(r => r.json()))
        );

        details.forEach(p => {
            p.favorite = false;
        });

        this.pokemons = details;
        this.getRender();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
       .card {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 12px 16px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            background-color: #fff;
        }

        .card img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 8px;
            margin-right: 16px;
        }

        .card-content {
            flex: 1;
            text-align: center;
        }

        .card-content h2 {
            margin: 0;
            
        }

        .card-content p {
            
            color: #666;
        }

        .card input[type="checkbox"] {
            transform: scale(1.3);
        }
      </style>
      

    ${this.seleccion.map(p => `
    <div class="card"  data-name="${p.name}" id=${p.id}>
    <img src="${p.sprites.front_default}" alt="${p.name}" />
    <div>
    <h2>${p.name}</h2>
    <p>${p.types.map(t => t.type.name).join(', ')}</p>
    </div>
    <input type="checkbox" ${p.favorite ? 'checked' : ''}>
    </div>
    `).join('')}
      
    `;
    }

    addEventListeners() {
        const botones = this.shadowRoot.querySelectorAll('.card');
        botones.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const nombre = e.target.getAttribute('data-name');
                const id = e.target.getAttribute('id');
                alert(`¡Haz hecho clic en ${nombre}!`);
                this._prueba = id
            });
        });
    }

    getPrueba() {
        return this.seleccion[this._prueba - 1];
    }

    getRender() {
        this.seleccion =[];
        for (let index = min; index < max; index++) {
            this.seleccion.push( this.pokemons[index]);
            
        }
        console.log(this.seleccion)
        this.render()
    }

}

customElements.define('pokemon-list', PokemonList);

const boton = document.querySelector('pokemon-list');

previous.addEventListener("click", () => {
  if (min != 0) {
    min -= 10;
    max -= 10
    boton.getRender();
  }

});

next.addEventListener("click", () => {
  min += 10;
  max += 10;
  boton.getRender();
});

