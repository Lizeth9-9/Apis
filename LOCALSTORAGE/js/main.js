async function obtenerImg() {
    try {
        const respuesta = await fetch('https://api.unsplash.com/search/photos?query=nature&client_id=cknF6p-DUqn7m70r9nkgLVBxrho-bXopa3TrlbCqVo4');
        const datos = await respuesta.json();
        console.log(datos);

        const container = document.querySelector('.container')
        datos.results.forEach(element => {
            // console.log(element.urls.regular);

            const card = document.createElement('div')
            card.classList.add('card');
            const img = document.createElement('img');
            img.src = element.urls.regular;

            card.appendChild (img)
            container.appendChild(card)
        });


    } catch (error) {
        console.error('Error al cargar los datos:', error.message);
        alert('No se pudieron cargar los productos.');
    }
}
obtenerImg();
