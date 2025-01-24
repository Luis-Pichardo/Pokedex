const pokemonList = document.querySelector("#cardPokemon");
const urlGETPokemon = "https://pokeapi.co/api/v2/pokemon/";


async function obtenerPokemon() {
    try {
        for (let i = 1; i <= 24; i++) { 
            const response = await fetch(urlGETPokemon + i);
            const data = await response.json();

            mostrarData(data);
        }
    } catch (error) {
        console.log("Problemas al obtener los datos de los pokemon", error);
    }
}


const mostrarData = (data) => {

    let tipoPokemon = data.types.map((tipo) => `${tipo.type.name.toUpperCase()} </br>`);
    tipoPokemon = tipoPokemon.join(''); //MAPEAR Y UNIR LOS TIPOS DE POKEMON

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
            <div class="card shadow-sm" data-pokemon-id="${data.id}">
                <img src="${data.sprites.other["official-artwork"].front_shiny}" class="card-img-top" alt="..." width="100%" height="150">
                <div class="card-body">
                    <p class="card-text">
                        #${String(data.id).padStart(4,'0')} </br>
                        ${data.name.toUpperCase()} </br>
                        ${data.weight}KG </br>
                        ${data.height}M </br>
                        ${tipoPokemon}
                    </p>                   
                </div>`;

    pokemonList.append(div);

};

window.addEventListener('load', async () => {
    await obtenerPokemon();
});

//Código para manejar el clic en la tarjeta del Pokémon
document.getElementById("cardPokemon").addEventListener('click', async (event) => {
    const card = event.target.closest('.card');
    if (card) {
        const pokemonId = card.getAttribute('data-pokemon-id');
        mostrarDetallesPokemon(pokemonId);
    }
});

//FUNCION PARA MOSTRAR LOS DETALLES DEL POKEMON
async function mostrarDetallesPokemon(id) {
    try {
        const basePath = window.location.hostname === "luis-pichardo.github.io" 
        ? "/Pokedex/" 
        : "./";
        window.location.href = `${basePath}details.html?pokemonId=${id}`;
    } catch (error) {
        console.log('Problemas al obtener los detalles del Pokémon', error);
    }
}

// Campo de búsqueda
const searchForm = document.querySelector("form[role='search']");
const searchInput = document.querySelector('input[aria-label="Search"]');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchText = searchInput.value.toLowerCase().trim();

    if (searchText) {
        await buscarPokemonPorNombre(searchText);
    }
});

// Función para buscar un Pokémon por su nombre desde el API
async function buscarPokemonPorNombre(nombre) {
    try {
        const response = await fetch(`${urlGETPokemon}${nombre}`);
        if (!response.ok) {
            throw new Error("No se encontró el Pokémon");
        }

        const data = await response.json(); 
        pokemonList.innerHTML = ""; 
        mostrarData(data); 
    } catch (error) {
        console.error("Error al buscar el Pokémon:", error.message);
        alert("No se encontró el Pokémon, verifica el nombre e intenta nuevamente.");
    }
}




