// Si en el futuro quieres agregar funcionalidades interactivas puedes usar este archivo

// Ejemplo: Mostrar alerta al hacer clic en botones ClaveÚnica
document.querySelectorAll('.clave-unica-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Si quieres prevenir navegación solo para demo, descomenta la siguiente línea:
        // e.preventDefault();
        alert('Será redirigido a ClaveÚnica');
    });
});

