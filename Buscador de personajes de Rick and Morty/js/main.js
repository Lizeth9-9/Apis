const formulario = document.querySelector('formulario');
const input = document.querySelector('input');
const contenedor = document.querySelector('contenedor');

async function obtenerDatos() {
    try {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character?name=${personaje}`);


        //conversion de lenguaje a json
        const datos = await respuesta.json();
        console.log(datos);

        // limpiar el contenedor de busqueda 
        contenedor.innerHTML = "";

        datos.results.forEach(async (element) => {
            //extrae la informacion de cada personaje
            const name = element.name;
            const image = element.image;
            const status = element.status;
            const species = element.species;

            //crear un elemento div para cada personaje
            const div = document.createElement('div');
            div.classList.add('personaje');
            const namePersonaje = document.createElement('h2');
            namePersonaje.textContent = name;

            const imagePersonaje = document.createElement('img');
            imagePersonaje.src = image;

            const statusPersonaje = document.createElement('p');
            statusPersonaje.textContent = `Estado: ${status}`;

            const speciesPersonaje = document.createElement('p');
            speciesPersonaje.textContent = `Especie: ${species}`;

            //agregar los elementos al div
            div.append(namePersonaje, imagePersonaje, statusPersonaje, speciesPersonaje);

            //agregar el div al contenedor
            contenedor.appendChild(div);

            //limpiar el input de busqueda
            input.value = "";

        });

    }
    catch (error) {
        console.error('Error al cargar los personajes:', error.message);
        alert('No se pudieron cargar los personajes.');
    }
}
//eventos para el boton
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const personaje = input.value.trim().toLowerCase();
    if (personaje) {
        obtenerDatos(personaje);
    } else {
        alert('Por favor ingrese un nombre de personaje.');
    }
    obtenerDatos();