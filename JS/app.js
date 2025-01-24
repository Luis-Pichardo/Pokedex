//CONSTANTES UTILIZADAS
const pokemonList = document.querySelector("#cardPokemon");
const urlGETPokemon = "https://pokeapi.co/api/v2/pokemon/";


async function obtenerPokemon() { //FUNCIÓN PARA EXTRAER LOS POKEMON DE LA API
    try {
        for (let i = 1; i <= 24; i++) { //BUCLE PARA TRAER LOS PRIMEROS 24 POKEMON
            const response = await fetch(urlGETPokemon + i);
            const data = await response.json();

            mostrarData(data);
        }
    } catch (error) {
        console.log("Problemas al obtener los datos de los pokemon", error);
    }
}


const mostrarData = (data) => { //FUNCION PARA MOSTRAR LOS POKEMON EN LAS TARJETAS
    // console.log(data);

    let tipoPokemon = data.types.map((tipo) => `${tipo.type.name.toUpperCase()} </br>`);
    tipoPokemon = tipoPokemon.join(''); //MAPEAR Y UNIR LOS TIPOS DE POKEMON
    // console.log(tipoPokemon);


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

window.addEventListener('load', async () => { //EVENTO PARA MOSTRAR LOS REGISTROS CUANDO CARGA LA PÁGINA
    await obtenerPokemon();
});

//Codigo para la modal en donde se mostrara la informacion del pokemon seleccionado...

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
        // Redirigir a la página de detalles con el ID del Pokémon como parámetro
        window.location.href = `/HTML/Details.html?pokemonId=${id}`;
    } catch (error) {
        console.log('Problemas al obtener los detalles del Pokémon', error);
    }
}

// Campo de búsqueda
const searchForm = document.querySelector("form[role='search']");
const searchInput = document.querySelector('input[aria-label="Search"]');

// Evita el comportamiento por defecto del formulario
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    const searchText = searchInput.value.toLowerCase().trim(); // Obtiene el texto del input

    if (searchText) {
        await buscarPokemonPorNombre(searchText); // Llama a la función para buscar en el API
    }
});

// Función para buscar un Pokémon por su nombre desde el API
async function buscarPokemonPorNombre(nombre) {
    try {
        const response = await fetch(`${urlGETPokemon}${nombre}`); // Llama al API con el nombre del Pokémon
        if (!response.ok) {
            throw new Error("No se encontró el Pokémon"); // Muestra error si no existe
        }

        const data = await response.json(); // Obtiene los datos del Pokémon
        pokemonList.innerHTML = ""; // Limpia la lista de Pokémon antes de mostrar el resultado
        mostrarData(data); // Muestra el Pokémon encontrado
    } catch (error) {
        console.error("Error al buscar el Pokémon:", error.message);
        alert("No se encontró el Pokémon, verifica el nombre e intenta nuevamente.");
    }
}




