const categoriesList = document.querySelector('#categoriesList');
const productsGrid = document.querySelector('#productsGrid');

// Fetch categories from DummyJSON API with await
async function fetchCategories() {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const categories = await response.json();
        console.log('Categories:', categories);
        //displayCategories(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

//fetch all products from DummyJSON API with await
async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=0');
        const products = await response.json();
        console.log('Products:', products);
        //displayProducts(products.products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Función de inicialización que ejecuta ambas peticiones en paralelo con Promise.all
/*async function init() {
    try {
        await Promise.all([
            fetchCategories(),
            fetchProducts()
        ]);
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}*/

// funcion de inicalizacion sin promise.all
async function init() {
    try {
        await fetchCategories();
        await fetchProducts();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Llamar a init cuando se carga la página
init();