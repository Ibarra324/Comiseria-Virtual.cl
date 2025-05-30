document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfileDiv = document.getElementById('userProfile');
    const userAvatarImg = document.getElementById('userAvatar');
    const userNameSpan = document.getElementById('userName');
    const denunciaCountElement = document.getElementById('denunciaCount');

    // Simulación de número de denuncias (esto vendría de tu backend)
    const initialDenunciaCount = 15;
    denunciaCountElement.textContent = initialDenunciaCount;

    // Función para simular el inicio de sesión con Discord
    function simulateDiscordLogin() {
        // Simulación de datos del usuario de Discord
        const user = {
            id: '123456789',
            username: 'UsuarioDiscord',
            avatar: 'https://cdn.discordapp.com/avatars/123456789/abcdef1234567890abcdef1234567890.png?size=32' // Reemplaza con una URL real
        };
        localStorage.setItem('user', JSON.stringify(user));
        updateUserInterface(user);
    }

    // Función para cerrar sesión
    function logout() {
        localStorage.removeItem('user');
        updateUserInterface(null);
    }

    // Función para actualizar la interfaz de usuario basada en el estado de la sesión
    function updateUserInterface(user) {
        if (user) {
            loginBtn.classList.add('hidden');
            userProfileDiv.classList.remove('hidden');
            userAvatarImg.src = user.avatar;
            userNameSpan.textContent = user.username;
        } else {
            loginBtn.classList.remove
