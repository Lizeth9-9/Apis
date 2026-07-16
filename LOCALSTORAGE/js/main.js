async function galeria() {
    try {
        // edpoint predefinido
        /*         const respuesta = await fetch('https://api.unsplash.com/search/photos?query=nature&client_id=cknF6p-DUqn7m70r9nkgLVBxrho-bXopa3TrlbCqVo4'); */

        // edpoint con 20 img
        const respuesta = await fetch('https://api.unsplash.com/search/photos?query=nature&per_page=20&client_id=cknF6p-DUqn7m70r9nkgLVBxrho-bXopa3TrlbCqVo4');



        const datos = await respuesta.json();
        console.log(datos);

        const container = document.querySelector('.container');
        datos.results.forEach(element => {
            // console.log(element.urls.regular);

            const card = document.createElement('div');
            const card2 = document.createElement('div');

            card2.classList.add('card');
            const img = document.createElement('img');
            img.src = element.urls.regular;

            const fotografo = document.createElement('h1');
            fotografo.textContent = element.user.name;

            const boton = document.createElement('button');

            boton.addEventListener('click', () => {
                boton.classList.toggle('activo');
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
            container.appendChild(card2)
        });

        function guardarFavoritos() {

        }


    } catch (error) {
        console.error('Error al cargar los datos:', error.message);
        alert('No se pudieron cargar los productos.');
    }
}
galeria();
