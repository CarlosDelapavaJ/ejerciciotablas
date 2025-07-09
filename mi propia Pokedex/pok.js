document.addEventListener("DOMContentLoaded", function (event) {
const boton = document.querySelector('pokemon-list');

boton.addEventListener('click', () => {
    const pokemon = boton.getPrueba();
    const tiposTexto = pokemon.types.map(t => t.type.name).join(', ');

    let templateContainer = document.getElementById('template-container');

    let comp = document.querySelector('.tarjeta-detalle');

    if (comp) {
        comp.querySelector('#titulo').textContent = "Nombre: " + pokemon.name;
        comp.querySelector('#tipo').textContent = "Tipo: " + tiposTexto;
        comp.querySelector('#frente').setAttribute("src", pokemon.sprites.front_default);
        comp.querySelector('#espalda').setAttribute("src", pokemon.sprites.back_default);
        comp.querySelector('#shiny').setAttribute("src", pokemon.sprites.front_shiny);
        comp.querySelector('#experiencia').textContent = "Experiencia base: " + pokemon.base_experience;
        comp.querySelector('#altura').textContent = "Altura: " + pokemon.height;
        comp.querySelector('#salud').textContent = "Vida: " + pokemon.stats[0].base_stat;
        comp.querySelector('#defensa').textContent = "Defensa: " + pokemon.stats[2].base_stat;
        comp.querySelector('#ataque').textContent = "Ataque: " + pokemon.stats[1].base_stat;
        comp.querySelector('#velocidad').textContent = "Velocidad: " + pokemon.stats[5].base_stat;
    } else {
        let tpl = document.getElementById('tarjeta');
        let clon = tpl.content.cloneNode(true);
        clon.querySelector('#titulo').textContent = "Nombre: " + pokemon.name;
        clon.querySelector('#tipo').textContent = "Tipo: " + tiposTexto;
        clon.querySelector('#frente').setAttribute("src", pokemon.sprites.front_default);
        clon.querySelector('#espalda').setAttribute("src", pokemon.sprites.back_default);
        clon.querySelector('#shiny').setAttribute("src", pokemon.sprites.front_shiny);
        clon.querySelector('#experiencia').textContent = "Experiencia base: " + pokemon.base_experience;
        clon.querySelector('#altura').textContent = "Altura: " + pokemon.height;
        clon.querySelector('#salud').textContent = "Vida: " + pokemon.stats[0].base_stat;
        clon.querySelector('#defensa').textContent = "Defensa: " + pokemon.stats[2].base_stat;
        clon.querySelector('#ataque').textContent = "Ataque: " + pokemon.stats[1].base_stat;
        clon.querySelector('#velocidad').textContent = "Velocidad: " + pokemon.stats[5].base_stat;
        templateContainer.appendChild(clon);
    }

});
});
