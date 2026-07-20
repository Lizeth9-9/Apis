// ==========================================
// PASO 1: CONFIGURACIÓN DE LA API
// ==========================================

/* const URL_BASE_API = 'https://api.unsplash.com/search/photos';
const PARAMETROS_BUSQUEDA = {
    query: 'nature',      // Tema de búsqueda
    per_page: 12,         // Cantidad de fotos
    client_id: API_KEY    // Nuestra clave de acceso
};
 */

async function galeria() {
    try {
        const container = document.querySelector('.container');
        // edpoint predefinido
        const respuesta = await fetch('https://api.unsplash.com/search/photos?query=nature&per_page=30&client_id=cknF6p-DUqn7m70r9nkgLVBxrho-bXopa3TrlbCqVo4');


        // =======================================
        // SKELETON - PANTALLA DE CARGA TEMPORAL
        // =======================================

        for (let i = 0; i < 8; i++) {
            const skeleton = document.createElement('div');
            skeleton.classList.add('skeleton');

            const skeletonBox = document.createElement('div');
            skeletonBox.classList.add('skeleton-box');

            skeleton.appendChild(skeletonBox);
            container.appendChild(skeleton);
        }
        const datos = await respuesta.json();
        console.log(datos);

        const state = {
            fotos: datos.results,
            favoritos: JSON.parse(localStorage.getItem('favoritosPhotos')) || []
        }

        //FUNCION DE CONTADOR CADA QUE SE SELECCIONA FOTO//

        function Contador() {
            document.querySelector('#contador').textContent = `❤️ ${state.favoritos.length}`;

        };
        Contador();

        // ==================================================
        // BOTON FAVORITOS -MUESTRA LO SELECCIONADO FAVORITO
        // ================================================== 
        let mostrandoFavoritos = false;

        document.querySelector('#contador').addEventListener('click', () => {
            mostrandoFavoritos = !mostrandoFavoritos;

            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const boton = card.querySelector('button');
                const favorite = boton.classList.contains('activo');

                if (mostrandoFavoritos) {
                    if (favorite) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                } else {
                    card.style.display = 'block';
                }
            });
        });
        // Container en vacio para borrar y dejarle vacio 
        container.innerHTML = '';

        // ==========================================
        // PINTARNDO LAS CARD:FOTOS, AUTOR
        // ==========================================   
        datos.results.forEach(element => {
            // console.log(element.urls.regular);

            const card = document.createElement('div');
            const card2 = document.createElement('div');

            card.classList.add('card');
            card2.classList.add('card2');

            const img = document.createElement('img');
            img.src = element.urls.regular;

            const fotografo = document.createElement('h2');
            fotografo.textContent = element.user.name;

            // ==========================================
            // BOTON FAVORITOS
            // ==========================================   

            // pintando el boton antes del clik//
            const boton = document.createElement('button');

            if (state.favoritos.includes(element.id)) {
                boton.classList.add('activo');
                boton.textContent = '❤️';
            }
            else {
                boton.textContent = '🤍';
            }

            // cambia el estado al dar click se activa por medio del id//
            boton.addEventListener('click', () => {
                boton.classList.toggle('activo');
                toggleFavorito(element.id);
                if (boton.classList.contains('activo')) {
                    boton.textContent = '❤️';
                } else {
                    boton.textContent = '🤍';
                }
                console.log(element.id);

            });

            card2.appendChild(img)
            card2.appendChild(fotografo)
            card2.appendChild(boton)
            card.appendChild(card2)
            container.appendChild(card)
        });

        // LOCAL STORE - PARA GUARDAR -ALMACENAMIENTO LOCAL
        function guardarFavoritos() {
            localStorage.setItem('favoritosPhotos', JSON.stringify(state.favoritos))
            console.log(localStorage);

        }

        // DECIDE GUARDAR SEGUN EL ID 

        function toggleFavorito(id) {
            const index = state.favoritos.indexOf(id);
            if (index === -1) {
                state.favoritos.push(id);
            }
            else {
                state.favoritos.splice(index, 1);
            }
            guardarFavoritos();
            Contador();

        }

    } catch (error) {
        console.error('Error al cargar los datos:', error.message);
        alert('No se pudieron cargar los productos.');
    }
}
galeria();
