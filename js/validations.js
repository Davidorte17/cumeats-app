/* ==========================================================================
   ARCHIVO: js/validations.js
   Requisito 7a: Validación completa de formularios
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar listeners de mostrar/ocultar contraseñas
    initPasswordToggles();

    // 1. FORMULARIO DE REGISTRO
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateRegistration()) {
                alert("✅ Registro completado con éxito. Redirigiendo...");
                window.location.href = "login.html";
            }
        });
    }

    // 2. FORMULARIO DE LOGIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateLogin()) {
                alert("✅ Inicio de sesión correcto.");
                window.location.href = "index.html";
            }
        });
    }

    // 3. FORMULARIO DE EDICIÓN DE RESTAURANTE
    const editRestaurantForm = document.getElementById('editRestaurantForm');
    if (editRestaurantForm) {
        editRestaurantForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateRestaurantEdit()) {
                alert("✅ Datos del restaurante actualizados correctamente.");
            }
        });
    }
});

/* ==========================================================================
   LÓGICA DE VALIDACIÓN: REGISTRO
   ========================================================================== */
function validateRegistration() {
    clearErrors();
    let isValid = true;

    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const email = document.getElementById('emailRegistro');
    const password = document.getElementById('passwordRegistro');
    const confirmPassword = document.getElementById('passwordConfirm');

    if (!nombre.value.trim()) isValid = showError(nombre, "El nombre es obligatorio.");
    if (!apellidos.value.trim()) isValid = showError(apellidos, "Los apellidos son obligatorios.");
    
    if (!email.value.trim()) {
        isValid = showError(email, "El correo electrónico es obligatorio.");
    } else if (!isValidEmail(email.value)) {
        isValid = showError(email, "Formato de correo inválido (ejemplo@correo.com).");
    }

    // Contraseña robusta: 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 alfanumérico/especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!password.value) {
        isValid = showError(password, "La contraseña es obligatoria.");
    } else if (!passwordRegex.test(password.value)) {
        isValid = showError(password, "La contraseña no cumple los requisitos de seguridad.");
    }

    if (!confirmPassword.value) {
        isValid = showError(confirmPassword, "Debes confirmar tu contraseña.");
    } else if (password.value !== confirmPassword.value) {
        isValid = showError(confirmPassword, "Las contraseñas no coinciden.");
    }

    return isValid;
}

/* ==========================================================================
   LÓGICA DE VALIDACIÓN: LOGIN
   ========================================================================== */
function validateLogin() {
    clearErrors();
    let isValid = true;

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (!email.value.trim()) {
        isValid = showError(email, "El correo electrónico es obligatorio.");
    } else if (!isValidEmail(email.value)) {
        isValid = showError(email, "Formato de correo inválido.");
    }

    if (!password.value) {
        isValid = showError(password, "La contraseña es obligatoria.");
    }

    return isValid;
}

/* ==========================================================================
   LÓGICA DE VALIDACIÓN: EDICIÓN RESTAURANTE
   ========================================================================== */
function validateRestaurantEdit() {
    clearErrors();
    let isValid = true;

    const phone = document.getElementById('restPhone');
    const email = document.getElementById('restEmail');
    const priceMin = document.getElementById('restPriceMin');
    const priceMax = document.getElementById('restPriceMax');

    // Validar teléfono (solo números y opcionalmente un '+' al inicio)
    const phoneRegex = /^\+?\d{9,15}$/;
    if (!phoneRegex.test(phone.value.replace(/\s+/g, ''))) {
        isValid = showError(phone, "El teléfono debe ser numérico y válido.");
    }

    if (!isValidEmail(email.value)) {
        isValid = showError(email, "Formato de correo inválido.");
    }

    // Validar precios positivos y coherencia (min < max)
    const minVal = parseFloat(priceMin.value);
    const maxVal = parseFloat(priceMax.value);

    if (isNaN(minVal) || minVal < 0) {
        isValid = showError(priceMin, "El precio no puede ser negativo.");
    }
    if (isNaN(maxVal) || maxVal < 0) {
        isValid = showError(priceMax, "El precio no puede ser negativo.");
    }
    if (minVal > maxVal) {
        isValid = showError(priceMax, "El precio máximo debe ser mayor al mínimo.");
        isValid = showError(priceMin, "Revisa los rangos de precio.");
    }

    return isValid;
}

/* ==========================================================================
   FUNCIONES AUXILIARES
   ========================================================================== */
function showError(inputElement, message) {
    inputElement.classList.add('is-invalid');
    const errorContainer = document.getElementById(inputElement.id + 'Error');
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
    }
    return false; // Siempre devuelve false para la variable isValid
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(el => {
        el.textContent = '';
        el.classList.add('hidden');
    });

    const invalidInputs = document.querySelectorAll('.is-invalid');
    invalidInputs.forEach(input => input.classList.remove('is-invalid'));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initPasswordToggles() {
    const toggleBtns = document.querySelectorAll('.btn-toggle-password');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // El input hermano anterior es el campo de contraseña
            const input = this.previousElementSibling;
            if (input && input.tagName === 'INPUT') {
                if (input.type === 'password') {
                    input.type = 'text';
                    this.textContent = '🙈'; // Cambiar icono
                } else {
                    input.type = 'password';
                    this.textContent = '👁️'; // Cambiar icono
                }
            }
        });
    });
}