/* ==========================================================================
                        DETALLES.JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {

    // ==========================================================================
    // CARGA DINÁMICA DE DATOS DEL RESTAURANTE
    // ==========================================================================
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    let res = null;

    try {
        const response = await fetch('data/restaurantes.json');
        const restaurantes = await response.json();
        res = restaurantes.find(r => r.id === id);
    } catch (error) {
        console.error("Error al cargar los datos del restaurante:", error);
    }

    if (res) {
        document.title = `${res.nombre} - CampusBite`;
        document.querySelector('.restaurant-title').textContent = res.nombre;
        document.querySelector('.detail-value-address').textContent = res.direccion;
        document.querySelector('.detail-value-tel').textContent = res.telefono;
        document.querySelector('.detail-value-email').textContent = res.email;
        document.querySelector('.detail-value-price').textContent = `${res.precioMin.toFixed(2)}€ - ${res.precioMax.toFixed(2)}€`;
        document.querySelector('.detail-value-rating').textContent = `${res.valoracion} / 5`;
        document.querySelector('.detail-value-bike').textContent = res.bikeFriendly === "Sí" ? "Sí, disponemos de aparcamiento seguro." : "No disponible.";

        // Temas de color dinámicos según el ID (Opcional, basado en tu CSS)
        const headerBg = document.getElementById('restaurant-header-bg');
        if (res.id === 1) headerBg.classList.add('cume-theme');
        if (res.id === 2) headerBg.classList.add('pizza-theme');

        // Renderizar Categorías
        const tagsBox = document.getElementById('categories-container');
        tagsBox.innerHTML = res.categorias.map(cat => `<span class="tag">${cat}</span>`).join('');

        // Renderizar Platos
        const dishGrid = document.getElementById('dish-grid');
        dishGrid.innerHTML = res.carta.map(plato => `
            <article class="dish-card">
                <div class="dish-content">
                    <h4 class="dish-name">${plato.nombre}</h4>
                    <p class="dish-description">${plato.desc}</p>
                    <span class="dish-price">${plato.precio.toFixed(2)} €</span>
                </div>
                <button type="button" class="btn btn-add-cart">➕</button>
            </article>
        `).join('');
    }

    // ==========================================================================
    // LÓGICA DEL CARRITO DE COMPRAS (Versión Limpia con Clases CSS)
    // ==========================================================================
    let carrito = [];
    const cartEmptyMsg = document.querySelector('.cart-empty-msg');
    const btnComprar = document.querySelector('.cart-footer button');

    // Crear el contenedor de la lista de productos
    const cartList = document.createElement('ul');
    cartList.className = 'cart-items-list';
    cartEmptyMsg.parentNode.insertBefore(cartList, cartEmptyMsg.nextSibling);

    const actualizarCarrito = () => {
        cartList.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            cartEmptyMsg.style.display = 'block';
            btnComprar.classList.add('disabled');
            btnComprar.disabled = true;
            btnComprar.textContent = 'Finalizar Compra';
        } else {
            cartEmptyMsg.style.display = 'none';
            btnComprar.classList.remove('disabled');
            btnComprar.disabled = false;

            carrito.forEach((item, index) => {
                total += item.precio;

                const li = document.createElement('li');
                li.className = 'cart-item';

                li.innerHTML = `
                    <span class="cart-item-name">${item.nombre}</span>
                    <strong class="cart-item-price">${item.precio.toFixed(2)}€</strong>
                `;

                const btnEliminar = document.createElement('button');
                btnEliminar.innerHTML = '🗑️';
                btnEliminar.className = 'btn-remove-item';
                btnEliminar.title = "Quitar del pedido";

                btnEliminar.addEventListener('click', () => {
                    carrito.splice(index, 1);
                    actualizarCarrito();
                });

                li.appendChild(btnEliminar);
                cartList.appendChild(li);
            });

            btnComprar.textContent = `Comprar (${total.toFixed(2)}€)`;
        }
    };

    // Delegación de eventos para añadir platos
    document.getElementById('dish-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-cart')) {
            const card = e.target.closest('.dish-card');
            const nombre = card.querySelector('.dish-name').textContent;
            const precioTexto = card.querySelector('.dish-price').textContent;
            const precio = parseFloat(precioTexto.replace('€', '').trim());

            carrito.push({ nombre, precio });
            actualizarCarrito();
        }
    });

    // Acción de comprar
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            if (carrito.length > 0) {
                alert(`✅ ¡Pedido procesado con éxito!\n\nHas pagado ${btnComprar.textContent.replace('Comprar (', '').replace(')', '')}.\nPuedes pasar a recoger tu pedido por el mostrador.`);
                carrito = [];
                actualizarCarrito();
            }
        });
    }

});