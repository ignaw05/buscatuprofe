document.getElementById("registerForm").addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("FUNCIONA")
    const nombre = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    const ubicacion = document.getElementById('selectProvincia').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const user = {nombre,email,password,phone,ubicacion};

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(u => u.email === email)){
        alert('Email ya registrado');
        return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso!');
    localStorage.setItem('loggedUser', JSON.stringify(user));
    window.location.href = "profes.html";
})
