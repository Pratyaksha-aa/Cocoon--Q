// Login Logic
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      window.location.href = 'personality_quiz.html';
    } else {
      alert('Login failed: ' + (await response.json()).error);
    }
  });
}

// Registration Logic
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      window.location.href = 'personality_quiz.html';
    } else {
      alert('Registration failed: ' + (await response.json()).error);
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const showRegister = document.getElementById("show-register");
    const showLogin = document.getElementById("show-login");
  
    showRegister.addEventListener("click", () => {
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
    });
  
    showLogin.addEventListener("click", () => {
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    });
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Logged in successfully!");
    });
  
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Registered successfully!");
    });
  });
  