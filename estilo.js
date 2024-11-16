let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function anadirCarrito(producto, precio) {
    let item = carrito.find(item => item.producto === producto);
    if (item) {
        item.quantity += 1;
    } else {
        carrito.push({ producto, precio, quantity: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actuCarrito();
}

function actuCarrito() {
    let carritoContenido = document.querySelector('.carrito-contenido');
    carritoContenido.innerHTML = `
        <div>
            <strong>Producto</strong> <strong>Cantidad</strong> <strong>Precio</strong>
        </div>
    `;

    let precioTotal = 0;
    carrito.forEach(item => {
        precioTotal += item.precio * item.quantity;
        carritoContenido.innerHTML += `
            <div>
                <span>${item.producto}</span>
                <span>${item.quantity}</span>
                <span>$${(item.precio * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });

    carritoContenido.innerHTML += `
        <div>
            <strong>Total:</strong> <span id="totalPrice">$${precioTotal.toFixed(2)}</span>
        </div>
    `;
}

// Función para alternar la visibilidad del menú desplegable
function altMenu(event, idDesplegable) {
    event.preventDefault();
    const MenuDesplegable = document.getElementById(idDesplegable);
    if (MenuDesplegable.style.display === 'block') {
        MenuDesplegable.style.display = 'none';
    } else {
        closeAllDropdowns(); // Cierra otros menús desplegables abiertos
        MenuDesplegable.style.display = 'block';
    }
}

// Función para cerrar todos los menús desplegables
function closeAllDropdowns() {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].style.display = 'none';
    }
}

// Mostrar/Ocultar contenido del carrito
document.querySelector('.carrito-boton').addEventListener('click', function() {
    var carritoContenido = document.querySelector('.carrito-contenido');
    carritoContenido.style.display = carritoContenido.style.display === 'block' ? 'none' : 'block';
});

// Ejecutar cuando la página se carga
document.addEventListener('DOMContentLoaded', actuCarrito);

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        closeAllDropdowns();
    }
};
