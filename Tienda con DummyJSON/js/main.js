let productos = [];

async function obtenerDatos() {
  try {
    const respuesta = await fetch('https://dummyjson.com/products?limit=0');
    const datos = await respuesta.json();
    console.log(datos);

    productos = datos.products;
    filtrarProductos(productos);


    const carga = document.querySelector('#cargando');
    carga.style.display = 'none'


  } catch (error) {
    console.error('Error al cargar los datos:', error.message);
    alert('No se pudieron cargar los productos.');

    const carga = document.querySelector('#cargando');
    carga.textContent = 'Error al cargar los productos';

  }
}

function filtrarProductos(lista) {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  lista.forEach(element => {
    const card = document.createElement('div');
    card.classList.add('card');

    const titulo = document.createElement('h1');
    titulo.textContent = element.title;

    const precio = document.createElement('h2');
    precio.textContent = element.price;

    const categoria = document.createElement('p');
    categoria.textContent = element.category;

    const img = document.createElement('img');
    img.src = element.images[0];

    card.appendChild(titulo);
    card.appendChild(precio);
    card.appendChild(categoria);
    card.appendChild(img);
    container.appendChild(card);
  });
}

obtenerDatos();

async function obtenerCategorias() {
  try {
    const Categ = await fetch('https://dummyjson.com/products/categories');
    const datos2 = await Categ.json();
    console.log(datos2);

    const select = document.querySelector('#filtrarCategoria');
    datos2.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.slug;
      option.textContent = categoria.name;
      select.appendChild(option);

    });

  } catch (error) {
    console.error('Error al cargar categorías:', error.message);
  }
}

function aplicarFiltros() {
  const textoBuscado = document.querySelector('#buscar').value.toLowerCase();
  const categoriaSelec = document.querySelector('#filtrarCategoria').value;
  const precioMin = parseFloat(document.querySelector('#filtrarPrecio').value);

  const productosFiltrados = productos.filter(producto => {
    const coincideTexto = producto.title.toLowerCase().includes(textoBuscado);
    const coincideCategoria = categoriaSelec === 'todas' || producto.category === categoriaSelec;
    const coincidePrecio = isNaN(precioMin) || producto.price >= precioMin;

    return coincideTexto && coincideCategoria && coincidePrecio;
  });

  filtrarProductos(productosFiltrados);

}

obtenerCategorias();

document.querySelector('#boton').addEventListener('click', aplicarFiltros);
document.querySelector('#filtrarCategoria').addEventListener('change', aplicarFiltros);
document.querySelector('#filtrarPrecio').addEventListener('input', aplicarFiltros);