document.addEventListener('DOMContentLoaded', function() {
    const denunciaCountElement = document.getElementById('denunciaCount');
    const permisosPandemiaCountElement = document.getElementById('permisosPandemiaCount');
    const constanciaCountElement = document.getElementById('constanciaCount');
    const salvoconductoCountElement = document.getElementById('salvoconductoCount');
    const panelCarabineroLink = document.getElementById('panelCarabineroLink');
    const requireAuthLinks = document.querySelectorAll('.require-auth');
    const discordAuthUrl = "https://discord.com/oauth2/authorize?client_id=1299098578836521041&redirect_uri=http%3A%2F%2Ft78.8c4.mytemp.website%2Fcomisaria_virtual%2Fcomisaria_callback.php&response_type=code&scope=identify";
    const carabineroRoleId = 'TU_ID_DE_ROL_DE_CARABINERO'; // Reemplaza con el ID real del rol de Carabinero en Discord

    // Función para obtener datos desde localStorage
    function getData(key) {
        const dataJSON = localStorage.getItem(key);
        return dataJSON ? JSON.parse(dataJSON) : [];
    }

    // Función para guardar datos en localStorage
    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Inicializar los arrays de datos
    let denuncias = getData('denuncias');
    let permisosPandemia = getData('permisosPandemia');
    let constancias = getData('constancias');
    let salvoconductos = getData('salvoconductos');

    // Función para actualizar el contador visual
    function actualizarContador(element, count) {
        if (element) {
            element.textContent = count;
        }
    }

    // Actualizar los contadores al cargar la página
    actualizarContador(denunciaCountElement, denuncias.length);
    actualizarContador(permisosPandemiaCountElement, permisosPandemia.length);
    actualizarContador(constanciaCountElement, constancias.length);
    actualizarContador(salvoconductoCountElement, salvoconductos.length);

    // Función simulada para agregar una nueva denuncia
    window.agregarNuevaDenuncia = function(nuevaDenuncia) {
        denuncias.push(nuevaDenuncia);
        saveData('denuncias', denuncias);
        actualizarContador(denunciaCountElement, denuncias.length);
        console.log("Nueva denuncia agregada y guardada:", nuevaDenuncia);
        console.log("Listado de denuncias actual:", denuncias);
    };

    // Función simulada para agregar un nuevo permiso de pandemia
    window.agregarNuevoPermisoPandemia = function(nuevoPermiso) {
        permisosPandemia.push(nuevoPermiso);
        saveData('permisosPandemia', permisosPandemia);
        actualizarContador(permisosPandemiaCountElement, permisosPandemia.length);
        console.log("Nuevo permiso pandemia agregado y guardado:", nuevoPermiso);
    };

    // ... (funciones similares para constancias y salvoconductos)

    // --- Lógica de Autenticación con Discord ---

    function verificarAutenticacion() {
        const accessToken = localStorage.getItem('discord_access_token');
        return !!accessToken;
    }

    function verificarRolCarabinero(callback) {
        const accessToken = localStorage.getItem('discord_access_token');
        if (!accessToken) {
            callback(false);
            return;
        }

        // Simulación de la verificación del rol (esto requeriría una API real de Discord)
        // Aquí DEBERÍAS hacer una llamada a la API de Discord para obtener la información del usuario
        // y verificar si tiene el rol específico.

        // --- SIMULACIÓN (BORRAR EN PRODUCCIÓN) ---
        const userRolesJSON = localStorage.getItem('discord_user_roles');
        const userRoles = userRolesJSON ? JSON.parse(userRolesJSON) : [];
        const isCarabinero = userRoles.includes(carabineroRoleId);
        callback(isCarabinero);
        // --- FIN DE SIMULACIÓN ---
    }
