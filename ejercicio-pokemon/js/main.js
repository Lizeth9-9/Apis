async function obtenerDatos() {
    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const datos = await respuesta.json();
        console.log(datos);


        const container = document.querySelector('.container');

        datos.results.forEach(async (element) => {
            const RespuestaPokemon = await fetch(element.url);
            const datosPokemon = await RespuestaPokemon.json();
            console.log(datosPokemon);


            const cardPokemon = document.createElement('div');
            cardPokemon.classList.add('card');

            const nombre = document.createElement('h3')
            nombre.textContent = element.name;

            const img = document.createElement('img');
            const src =   datosPokemon.sprites.front_default;
            img.src = datosPokemon.sprites.front_default;

            cardPokemon.appendChild(nombre);
            cardPokemon.appendChild(img);
            container.appendChild(cardPokemon);
            });

    }
    catch (error) {
        console.error('Error al cargar los datos:', error.message);
        alert('No se pudieron cargar los productos.');
    }
}
obtenerDatos();