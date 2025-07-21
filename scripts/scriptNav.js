document.addEventListener('DOMContentLoaded', () => {
    const profeLink = document.getElementById('soy-profe-link');
  
    if (profeLink) {
      profeLink.addEventListener('click', (e) => {
        e.preventDefault(); // evitar que siga el href="#"
        
        const user = JSON.parse(localStorage.getItem('loggedUser'));
  
        if (user) {
          // Si está logueado, ir al panel de profes
          window.location.href = 'profes.html';
        } else {
          // Si no está logueado, llevar al login
          window.location.href = 'login.html';
        }
      });
    }
    const user = JSON.parse(localStorage.getItem('loggedUser'));

  if (user) {
    const nav = document.querySelector('nav');
    const nombreSpan = document.createElement('span');
    nombreSpan.textContent = ` | Bienvenido, ${user.nombre}`;
    nav.appendChild(nombreSpan);
  }
  });
  

