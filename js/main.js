/* Archivo: assets/js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // Todos los HTML están en la raíz, así que la ruta a los componentes siempre es la misma
    const basePath = 'components/';

    const components = [
        { id: 'header-placeholder', file: basePath + 'header.html' },
        { id: 'footer-placeholder', file: basePath + 'footer.html' }
    ];

    // Función para cargar el HTML
    const loadComponent = ({ id, file }) => {
        return fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                return response.text();
            })
            .then(htmlString => {
                const placeholder = document.getElementById(id);
                if (placeholder) {
                    placeholder.innerHTML = htmlString;
                }
            })
            .catch(error => console.error('Error cargando componente:', error));
    };

    // Ejecutar las cargas
    components.forEach(loadComponent);
});