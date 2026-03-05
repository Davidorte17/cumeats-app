/* Archivo: js/edicion.js */
document.addEventListener('DOMContentLoaded', () => {
    const dishesContainer = document.getElementById('dishesContainer');
    const btnAddDish = document.getElementById('btnAddDish');

    // Función para crear una fila de plato
    const createDishRow = () => {
        const dishRow = document.createElement('div');
        dishRow.className = 'dish-edit-row';
        
        dishRow.innerHTML = `
            <div class="form-group" style="flex: 2;">
                <input type="text" name="dishName[]" placeholder="Nombre del plato" class="form-control" required>
            </div>
            <div class="form-group" style="flex: 3;">
                <input type="text" name="dishDesc[]" placeholder="Descripción corta" class="form-control">
            </div>
            <div class="form-group" style="flex: 1;">
                <input type="number" name="dishPrice[]" placeholder="Precio" step="0.01" class="form-control" required>
            </div>
            <button type="button" class="btn-remove-dish" title="Eliminar plato">🗑️</button>
        `;

        // Evento para eliminar la fila
        dishRow.querySelector('.btn-remove-dish').addEventListener('click', () => {
            dishRow.remove();
        });

        return dishRow;
    };

    // Añadir un plato inicial por defecto
    if (dishesContainer) {
        dishesContainer.appendChild(createDishRow());
    }

    // Evento para añadir más platos
    if (btnAddDish) {
        btnAddDish.addEventListener('click', () => {
            dishesContainer.appendChild(createDishRow());
        });
    }
});