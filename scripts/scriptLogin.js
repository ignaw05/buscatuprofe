document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.password === password && u.email === email)

    if (!user){
        alert("Inicio de sesión incorrecto. Revise sus credenciales");
        return;
    }

    localStorage.setItem('loggedUser', JSON.stringify(user));
    alert(`Bienvenido, profe ${user.nombre}`)
    window.location.href = "profes.html"
})