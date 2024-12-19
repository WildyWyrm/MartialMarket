// Nuestro array de productos
const productos = [
    { id: 1, nombre: "Aqua-bag", precio: 1500, img: "/imagenes/acquabag9.jpg" },
    { id: 2, nombre: "Bolso grande con bolsillos", precio: 2000, img: "/imagenes/bolsograndebolsillos2.jpg" },
    { id: 3, nombre: "Cabezal Sparring Cerrado", precio: 2000, img: "/imagenes/cabezalsparringcerrado8.jpg" },
];

// creacion del carrito 
let carrito = [];

//DOM
const catalogoProductos = document.querySelector("#catalogo-productos");
const carritoLista = document.querySelector("#mi-carrito ul");
const totalCarrito = document.querySelector(".mi-carrito-p");

// la funcion para mostrar los productos en el catálogo
function cargarProductos() {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
            <div class="card h-100">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-primary btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
                </div>
            </div>
        `;
        catalogoProductos.appendChild(card);
    });
}

// funcion para agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

// funcion para eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// funcion para vaciar todo el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

//actualizar la vista del carrito
function actualizarCarrito() {
    //limpiar el carrito
    carritoLista.innerHTML = "";
    let total = 0;

    //mostrar cada producto del carrito
    carrito.forEach((producto, index) => {
        total += producto.precio;
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>
        `;
        carritoLista.appendChild(item);
    });

    //mostrar total
    totalCarrito.innerText = `Total: $${total}`;
}

// EVENTOS
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();

    // delegacion de eventos para los botones "agregar al carrito"
    catalogoProductos.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-agregar")) {
            const id = parseInt(e.target.dataset.id);
            agregarAlCarrito(id);
        }
    });

    // boton para vaciar carrito
    const vaciarBtn = document.createElement("button");
    vaciarBtn.className = "btn btn-danger mt-3";
    vaciarBtn.innerText = "Vaciar Carrito";
    vaciarBtn.addEventListener("click", vaciarCarrito);
    document.querySelector("#mi-carrito").appendChild(vaciarBtn);
});
