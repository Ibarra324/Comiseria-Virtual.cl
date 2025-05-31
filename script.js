document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfileDiv = document.getElementById('userProfile');
    const userAvatarImg = document.getElementById('userAvatar');
    const userNameSpan = document.getElementById('userName');
    const denunciaCountElement = document.getElementById('denunciaCount');
    const tramiteLinks = document.querySelectorAll('.tramites-grid .clave-unica-btn.require-login');

    // ** TU URL DE AUTORIZACIÓN DE DISCORD **
    const discordAuthUrl = 'https://discord.com/oauth2/authorize?client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&response_type=code&scope=identify'; // Reemplaza con tus datos

    // Inicializar el contador de denuncias desde localStorage o cero
    let denunciaCount = localStorage.getItem('denunciaCount') ? parseInt(localStorage.getItem('denunciaCount')) : 0;
    updateDenunciaCount();

    function updateDenunciaCount() {
        denunciaCountElement.textContent = denunciaCount;
        localStorage.setItem('denunciaCount', denunciaCount);
    }

    // Función para simular el incremento de denuncias (ejemplo)
    function simulateNewDenuncia() {
        denunciaCount++;
        updateDenunciaCount();
    }

    // Simulación de nuevas denuncias cada cierto tiempo (solo para demostración)
    // setInterval(simulateNewDenuncia, 5000);

    // Función para verificar si el usuario está autenticado (simulación con localStorage)
    function isUserLoggedIn() {
        return localStorage.getItem('discordUser') !== null;
    }

    // Función para obtener la información del usuario de Discord (simulación)
    function getDiscordUser() {
        const userJson = localStorage.getItem('discordUser');
        return userJson ? JSON.parse(userJson) : null;
    }

    // Función para actualizar la interfaz de autenticación
    function updateAuthUI(user) {
        if (user) {
            loginBtn.style.display = 'none';
            userProfileDiv.classList.remove('hidden');
            userAvatarImg.src = user.avatarUrl || 'default-avatar.png'; // Usa una imagen por defecto si no hay avatar
            userNameSpan.textContent = user.username;
        } else {
            loginBtn.style.display = 'inline-block';
            userProfileDiv.classList.add('hidden');
            userAvatarImg.src = '';
            userNameSpan.textContent = '';
        }
    }

    // Función para simular el inicio de sesión con Discord
    function simulateDiscordLogin() {
        const mockUser = {
            id: '123456789',
            username: 'UsuarioEjemplo#1234',
            avatarUrl: 'https://via.placeholder.com/30/007bff/FFFFFF?Text=UE' // URL de un avatar de ejemplo
        };
        localStorage.setItem('discordUser', JSON.stringify(mockUser));
        updateAuthUI(mockUser);
        attachTramiteListeners();
    }

    // Función para simular el cierre de sesión
    function simulateLogout() {
        localStorage.removeItem('discordUser');
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
        // En una implementación real, aquí redirigirías a la URL de autorización de Discord
        // window.location.href = discordAuthUrl;
        simulateDiscordLogin(); // Para la simulación
    });
    logoutBtn.addEventListener('click', simulateLogout);

    // Inicialización: verificar si hay un usuario logueado al cargar la página
    const loggedInUser = getDiscordUser();
    updateAuthUI(loggedInUser);
    attachTramiteListeners();
});
