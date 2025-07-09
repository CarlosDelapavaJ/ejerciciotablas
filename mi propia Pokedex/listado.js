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
    attributeChangedCallback(){
        console.log("cambiar")
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
    border-radius: 8px;
    padding: 8px 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    font-size: 14px;
    max-width: 300px; /* opcional, para limitar el ancho */
}

.card img {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    margin-right: 12px;
}

      </style>
      
    

    ${this.seleccion.map(p => `
    <div class="card"  data-name="${p.name}" id=${p.id}>
    <img src="${p.sprites.front_default}" alt="${p.name}" />
    <div>
    <h2>${p.name}</h2>
    <p>${p.types.map(t => t.type.name).join(', ')}</p>
    </div>
    <input type="checkbox" class="favorite-checkbox" data-id="${p.id}" ${p.favorite ? 'checked' : ''}>
    </div>
    `).join('')}
      
    `;
    }

    addEventListeners() {
        const checkboxes = this.shadowRoot.querySelectorAll('.favorite-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const pokemon = this.pokemons.find(p => p.id === id);
                if (pokemon) {
                    pokemon.favorite = e.target.checked;
                }
            });

        });
        console.log("check")
        const botones = this.shadowRoot.querySelectorAll('.card');
        botones.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = e.target.getAttribute('id');
                this._prueba = id
            });
        });
    }

    getPrueba() {
        let sec = null;
        this.seleccion.forEach(p => {
            if (p.id == this._prueba) {
                sec = p;
            }
        })
        return sec;
    }

    getRender() {
        this.seleccion = [];
        for (let index = min; index < max; index++) {
            this.seleccion.push(this.pokemons[index]);

        }
        this.render()
        this.addEventListeners();
    }
    getFavorite() {
        this.seleccion = [];
        this.pokemons.forEach(element => {
            if (element.favorite == true) {
                this.seleccion.push(element)
            }
        });
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
todos.addEventListener("click", () => {
    boton.getRender()

});
favorito.addEventListener("click", () => {
    boton.getFavorite()
});


const checkboxes = this.shadowRoot.querySelectorAll('favorite-checkbox');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {

        console.log(`Pokémon ${pokemon.name} favorito: ${pokemon.favorite}`);

    });
});


