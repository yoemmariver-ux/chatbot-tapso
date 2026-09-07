function login() {
  let nombre = document.getElementById("nombre").value;
  alert("Bienvenido " + nombre);
  document.getElementById("loginModal").style.display = "none";
}

// Simulación login Gmail
document.getElementById("gmailLogin").addEventListener("click", () => {
  alert("Login con Gmail exitoso (simulado)");
  document.getElementById("loginModal").style.display = "none";
});

function enviar() {
  let mensaje = document.getElementById("mensaje").value;
  let chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += "<p>👤 " + mensaje + "</p>";
  document.getElementById("mensaje").value = "";
}

function limpiar() {
  document.getElementById("chatBox").innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
