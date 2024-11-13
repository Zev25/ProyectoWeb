let carrito = [];

function anadirCarrito(producto, precio) {
    let item = carrito.find(item => item.producto === producto);
    if (item) {
        item.quantity += 1;
    } else {
        carrito.push({ producto, precio, quantity: 1 });
    }
    actuCarrito();
}

function actuCarrito() {
    let tablaCarrito = document.getElementById('cartTable');
    if (!tablaCarrito) return;

    tablaCarrito.innerHTML = `
        <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
        </tr>
    `;

    let precioTotal = 0;
    carrito.forEach(item => {
        precioTotal += item.precio * item.quantity;
        tablaCarrito.innerHTML += `
            <tr>
                <td>${item.producto}</td>
                <td>${item.quantity}</td>
                <td>$${(item.precio * item.quantity).toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById('totalPrice').innerText = `$${precioTotal.toFixed(2)}`;
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

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        closeAllDropdowns();
    }
}

// Ejecutar cuando la página carrito.html se carga
document.addEventListener('DOMContentLoaded', actuCarrito);
