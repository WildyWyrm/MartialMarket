document.addEventListener("DOMContentLoaded", function () {
    const productosLink = document.getElementById("navbarDropdownProductos");
    let clickCount = 0;

    productosLink.addEventListener("click", function (event) {
        if (window.innerWidth <= 992) { // detectamos que tipo de dispositivo es
            event.preventDefault();
            clickCount++;

            if (clickCount === 1) {
                // para abrir el menu desplegable con el primer click
                productosLink.setAttribute("aria-expanded", "true");
                productosLink.classList.toggle("show");
            } else if (clickCount === 2) {
                // redirige en el segundo clic
                window.location.href = "productos.html";
            }
        }
    });

    // reiniciamos el contador de clicks cuando se cierra el menu
    document.addEventListener("click", function (e) {
        if (!productosLink.contains(e.target)) {
            clickCount = 0;
            productosLink.setAttribute("aria-expanded", "false");
            productosLink.classList.remove("show");
        }
    });
});
