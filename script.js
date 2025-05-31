document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfileDiv = document.getElementById('userProfile');
    const userAvatarImg = document.getElementById('userAvatar');
    const userNameSpan = document.getElementById('userName');
    const denunciaCountElement = document.getElementById('denunciaCount');
    const tramiteLinks = document.querySelectorAll('.tramites-grid .clave-unica-btn.require-login');

    // ** TU URL DE AUTORIZACIÓN DE DISCORD **
    const discordAuthUrl = 'https://discord.com/oauth2/authorize?client_id=1377883012552986726&redirect_uri=https%3A%2F%2Ftu-sitio-web.com%2Fcallback&response_type=code&scope=identify%20guilds.join';

    // Simulación de número de denuncias (esto vendría de tu backend)
    let denunciaCount = 0;
    function updateDenunciaCount() {
        denunciaCountElement.textContent = denunciaCount;
    }
    const intervalId = setInterval(() => {
        if (denunciaCount < 5) {
            denunciaCount++;
            updateDenunciaCount();
        } else {
            clearInterval(intervalId);
        }
    }, 1000);

    // Función para verificar si el usuario está autenticado (ahora depende de tu backend)
    function isUserLoggedIn() {
        // Aquí deberías verificar si el usuario tiene una sesión válida
        // (por ejemplo, comprobando si hay una cookie de sesión o un token en localStorage).
        return localStorage.getItem('authToken') !== null; // Ejemplo básico con localStorage
    }

    // Función para actualizar la interfaz de autenticación
    function updateAuthUI(userData) {
        if (userData) {
            loginBtn.classList.add('hidden');
            userProfileDiv.classList.remove('hidden');
            userAvatarImg.src = userData.avatarUrl; // Muestra la imagen del usuario
            userNameSpan.textContent = userData.username;
        } else {
            loginBtn.classList.remove('hidden');
            userProfileDiv.classList.add('hidden');
            userAvatarImg.src = '';
            userNameSpan.textContent = '';
        }
    }

    // Función para simular el cierre de sesión (debería comunicarse con el backend para invalidar la sesión)
    function simulateLogout() {
        localStorage.removeItem('authToken'); // Ejemplo básico con localStorage
        updateAuthUI(null);
        window.location.href = './';
    }

    function handleTramiteClick(event) {
        if (!isUserLoggedIn()) {
            event.preventDefault();
            alert('Debes iniciar sesión con tu cuenta de Discord para acceder a este trámite.');
        } else {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
                window.location.href = this.getAttribute('href');
            }, 300);
        }
    }

    function attachTramiteListeners() {
        tramiteLinks.forEach(link => {
            link.removeEventListener('click', handleTramiteClick);
            link.addEventListener('click', handleTramiteClick);
        });
    }

    // Event listeners
    loginBtn.addEventListener('click', () => {
        window.location.href = discordAuthUrl; // Redirigir a la URL de Discord al hacer clic
    });
    logoutBtn.addEventListener('click', simulateLogout);

    // Inicialización: verificar si hay una sesión al cargar la página
    const authToken = localStorage.getItem('authToken'); // Ejemplo básico con localStorage
    if (authToken) {
        // ** Aquí deberías hacer una petición a tu backend para obtener la información del usuario
        // basada en el authToken y luego llamar a updateAuthUI con esos datos. **
        // Esto es solo una simulación para mostrar cómo se usaría updateAuthUI:
        const mockUserData = {
            username: 'NombreDeUsuario',
            avatarUrl: 'https://cdn.discordapp.com/avatars/ID_DEL_USUARIO/HASH_DEL_AVATAR.png' // Reemplaza con la lógica real
        };
        updateAuthUI(mockUserData);
        attachTramiteListeners();
    } else {
        attachTramiteListeners();
    }

    // --- Lógica específica para la página del panel de administración (admin/index.html) ---
    if (window.location.pathname.indexOf('admin') > -1) {
        const accessDeniedDiv = document.getElementById('accessDenied');
        const adminContentDiv = document.getElementById('adminContent');
        const tramiteList = document.getElementById('tramiteList');
        const storedAuthTokenAdmin = localStorage.getItem('authToken'); // Ejemplo básico

        if (storedAuthTokenAdmin) {
            // ** Aquí deberías hacer una petición al backend para verificar el rol del usuario
            // basado en el authToken y obtener los trámites. **
            // Esto es solo una simulación:
            const mockAdminUser = { roles: ['carabinero'], username: 'AdminUsuario', avatarUrl: 'url_admin_avatar' };
            if (mockAdminUser.roles && mockAdminUser.roles.includes('carabinero')) {
                adminContentDiv.style.display = 'block';
                // Simulación de datos de trámites
                const tramitesSimulados = [
                    { tipo: 'Hurto Simple', usuario: 'Ciudadano123' },
                    { tipo: 'Robo de Vehiculo', usuario: 'Usuario456' },
                    { tipo: 'Estafa', usuario: 'OtroUsuario' },
                    { tipo: 'Reclamo', usuario: 'Quejoso789' }
                ];
                tramitesSimulados.forEach(tramite => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('admin-list-item');
                    listItem.innerHTML = `<strong>Tipo:</strong> ${tramite.tipo} - <strong>Enviado por:</strong> ${tramite.usuario}`;
                    tramiteList.appendChild(listItem);
                });
                // Actualizar la interfaz del panel de administración con la información del usuario (opcional)
                const adminUserProfileDiv = document.getElementById('adminUserProfile');
                const adminUserAvatarImg = document.getElementById('adminUserAvatar');
                const adminUserNameSpan = document.getElementById('adminUserName');
                if (adminUserProfileDiv) adminUserProfileDiv.classList.remove('hidden');
                if (adminUserAvatarImg) adminUserAvatarImg.src = mockAdminUser.avatarUrl;
                if (adminUserNameSpan) adminUserNameSpan.textContent = mockAdminUser.username;
            } else {
                accessDeniedDiv.style.display = 'block';
                setTimeout(() => {
                    window.location.href = '../';
                }, 3000);
            }
        } else {
            accessDeniedDiv.style.display = 'block';
            setTimeout(() => {
                window.location.href = '../';
            }, 3000);
        }
    }
});
