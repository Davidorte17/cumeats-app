/* ==========================================================================
   ARCHIVO: js/search.js
   Implementación de búsqueda, autocompletado y renderizado dinámico
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. VARIABLES Y DATOS
    let restaurantes = [];
    const direccionesMock = [
        "Avenida de la Universidad, Mérida",
        "Avenida de Santa Teresa de Jornet, Mérida",
        "Calle Santa Eulalia, Mérida",
        "Calle Marquesa de Pinares, Mérida",
        "Plaza de España, Mérida",
        "Avenida Reina Sofía, Mérida"
    ];

    // Intentamos cargar el JSON de la carpeta data
    try {
        const response = await fetch('data/restaurantes.json');
        if (!response.ok) throw new Error("No se pudo cargar el JSON");
        restaurantes = await response.json();
    } catch (error) {
        console.error("Error al obtener los datos de restaurantes:", error);
    }

    // Referencias a los inputs (index usa 'direccion', listado usa 'addressSearch')
    const searchInput = document.getElementById('direccion') || document.getElementById('addressSearch');

    // ==========================================================================
    // 2. LÓGICA DE AUTOCOMPLETADO
    // ==========================================================================
    if (searchInput) {
        const suggestionsBox = document.createElement('ul');
        suggestionsBox.classList.add('autocomplete-results');
        suggestionsBox.style.display = 'none';
        
        // Insertamos el menú de sugerencias después del input
        searchInput.parentNode.insertBefore(suggestionsBox, searchInput.nextSibling);

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            suggestionsBox.innerHTML = ''; 
            
            if (query.length < 2) {
                suggestionsBox.style.display = 'none';
                return;
            }

            const coincidencias = direccionesMock.filter(dir => dir.toLowerCase().includes(query));

            if (coincidencias.length > 0) {
                suggestionsBox.style.display = 'block';
                coincidencias.forEach(dir => {
                    const li = document.createElement('li');
                    li.textContent = dir;
                    li.addEventListener('click', () => {
                        searchInput.value = dir;
                        suggestionsBox.style.display = 'none';
                    });
                    suggestionsBox.appendChild(li);
                });
            } else {
                suggestionsBox.style.display = 'none';
            }
        });

        // Cerrar sugerencias al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (e.target !== searchInput && e.target !== suggestionsBox) {
                suggestionsBox.style.display = 'none';
            }
        });
    }

    // ==========================================================================
    // 3. RENDERIZADO DE TARJETAS Y FILTRADO (listado.html)
    // ==========================================================================
    
    const renderCards = (items, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        if (items.length === 0) {
            container.innerHTML = `<p class="error-message">No se han encontrado establecimientos para esta zona.</p>`;
            return;
        }

        items.forEach(res => {
            const card = document.createElement('article');
            card.className = 'restaurant-card';
            
            // Lógica para elegir imagen o emoji
            const mediaContent = res.imagen 
                ? `<img src="${res.imagen}" alt="${res.nombre}" class="restaurant-cover">` 
                : res.icono;

            card.innerHTML = `
                <div class="restaurant-img-placeholder">
                    ${mediaContent}
                </div>
                <div class="restaurant-info">
                    <div class="restaurant-header-info">
                        <h3 class="restaurant-name"><a href="detalle.html?id=${res.id}">${res.nombre}</a></h3>
                        <span class="rating">⭐ ${res.valoracion}</span>
                    </div>
                    <p class="category-tag">${res.categorias.join(' • ')}</p>
                    <div class="restaurant-delivery">
                        <span class="delivery-time">⏱️ ${res.tiempoEntrega}</span>
                        <span class="delivery-price">Envío: ${res.costeEnvio.toFixed(2)}€</span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    };

    // Si estamos en listado.html, ejecutamos la lógica de los dos bloques
    if (window.location.pathname.includes('listado.html')) {
        const params = new URLSearchParams(window.location.search);
        const queryUrl = params.get('direccion');
        const searchSection = document.getElementById('search-results-container');
        const searchTitle = document.getElementById('search-title');

        // A. Siempre rellenamos el bloque de abajo con TODOS
        renderCards(restaurantes, 'all-list');

        // B. Si hay búsqueda en la URL, rellenamos el bloque de arriba
        if (queryUrl) {
            const queryClean = queryUrl.toLowerCase();
            if (searchInput) searchInput.value = queryUrl;
            
            if (searchTitle) searchTitle.textContent = `Resultados para: "${queryUrl}"`;

            const resultadosFiltrados = restaurantes.filter(res => {
                // Buscamos coincidencia en nombre o en las palabras clave de las zonas
                const matchNombre = res.nombre.toLowerCase().includes(queryClean);
                const matchZona = res.zonas.some(zona => queryClean.includes(zona.toLowerCase()));
                return matchNombre || matchZona;
            });

            renderCards(resultadosFiltrados, 'search-list');
        } else {
            // Si no hay búsqueda, ocultamos el bloque de arriba para que no estorbe
            if (searchSection) searchSection.style.display = 'none';
        }
    }
});