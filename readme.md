# CUMEats - Plataforma de Comida a Domicilio Universitaria 🍔🍕

Este proyecto es una aplicación web Frontend desarrollada para la asignatura de desarrollo web. Consiste en una plataforma de búsqueda y gestión de pedidos de comida a domicilio centrada en el entorno universitario (CUMe y Mérida).

**🌐 Proyecto Desplegado en Vivo:** [Visitar CUMEats](https://cumeats-tw.web.app/)

## 👨‍💻 Autor
* **Nombre:** David Ortega Contreras

## 🚀 Características Principales y Requisitos Cumplidos

El proyecto cumple estrictamente con los requisitos del enunciado, destacando:

1. **Estructura Semántica (HTML5):** Uso riguroso de etiquetas semánticas (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<aside>`) para estructurar el contenido de todas las páginas.
2. **Diseño a Medida (CSS3):** * Diseño completamente *Responsive* utilizando CSS Grid y Flexbox.
   * Uso de variables nativas de CSS (`:root`) para la paleta de colores y temas dinámicos.
   * **Sin librerías externas** (cero Bootstrap o Tailwind).
   * Separación total de estilos (sin CSS *inline*).
3. **Carga Dinámica de Componentes:** Uso de JavaScript (`main.js`) para inyectar dinámicamente el `header.html` y `footer.html` en todas las páginas, evitando la duplicidad de código.
4. **Sistema de Datos Simulados (JSON):** Toda la información de los restaurantes y sus cartas se centraliza en `data/restaurantes.json` y se carga de forma asíncrona mediante `fetch()`.
5. **Funcionalidad JavaScript Avanzada:**
   * **Validación de Formularios:** Comprobación estricta de campos (emails, teléfonos, contraseñas, precios lógicos) con mensajes de error inyectados en el DOM.
   * **Buscador en tiempo real:** Autocompletado de direcciones dinámico al escribir.
   * **Filtrado:** Simulación de búsqueda que renderiza las tarjetas de restaurantes según su zona de reparto.
   * **Carrito de la compra:** Sistema interactivo para añadir/eliminar platos de la carta y calcular el total dinámicamente.
   * **Manipulación del DOM:** Posibilidad de añadir platos dinámicamente en el panel de administración (`edicion.html`).

## ☁️ Control de Versiones y Despliegue

Para llevar el proyecto un paso más allá de los requisitos básicos y simular un entorno de desarrollo profesional real, se ha implementado lo siguiente:

* **Control de Versiones (Git & GitHub):** El código fuente está versionado y respaldado en un repositorio de GitHub, utilizando buenas prácticas y un archivo `.gitignore` para omitir archivos innecesarios de Node.js y del sistema operativo.
* **Hosting (Firebase):** La aplicación ha sido desplegada en producción a través de **Google Firebase Hosting**. Esto proporciona una URL pública con certificado SSL (HTTPS) que permite al evaluador testear la aplicación web de forma completa desde cualquier dispositivo, sin necesidad de descargar el código ni levantar un servidor local.

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura modular y limpia:

```text
ORTEGA_CONTRERAS_DAVID/
├── assets/                  # Imágenes y recursos multimedia
│   ├── logos_restaurantes/  # Imágenes de portadas de restaurantes
│   └── logo_cumeats.png     # Logo principal de la aplicación
├── components/              # Fragmentos HTML reutilizables
│   ├── footer.html
│   └── header.html
├── css/                     # Hojas de estilo
│   ├── forms.css            # Estilos específicos para inputs y validaciones
│   └── styles.css           # Estilos globales, grid y componentes UI
├── data/                    # Datos simulados (Mock DB)
│   └── restaurantes.json    # Base de datos de establecimientos y platos
├── js/                      # Lógica de la aplicación
│   ├── detalles.js          # Renderizado de la carta y carrito de compras
│   ├── edicion.js           # Lógica del panel de administración (añadir platos)
│   ├── main.js              # Carga de componentes globales (Header/Footer)
│   ├── search.js            # Lógica del buscador, autocompletado y listado
│   └── validations.js       # Reglas de validación para registro y edición
├── .gitignore               # Archivos omitidos en el control de versiones
└── *.html                   # Vistas principales de la aplicación (index, listado, etc.)