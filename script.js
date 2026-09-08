let nombreUsuario = "";

// Función de login
function login() {
  nombreUsuario = document.getElementById("nombre").value || "vecino";
  document.getElementById("loginModal").style.display = "none";
  mostrarRespuesta("¡Hola " + nombreUsuario + "! Bienvenido al asistente de Tapso. Estoy aquí para ayudarte con información de nuestro municipio.");
}

// Conectar botón comenzar y Enter
document.getElementById("btnComenzar").addEventListener("click", login);
document.getElementById("nombre").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    login();
  }
});

// Mostrar respuesta en el chat
function mostrarRespuesta(texto) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = "bot-msg";
  msg.textContent = texto;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enviar mensaje
function enviarMensaje() {
  const mensaje = document.getElementById("mensaje").value.toLowerCase();
  if (mensaje.trim() !== "") {
    const chatBox = document.getElementById("chatBox");
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.textContent = mensaje;
    chatBox.appendChild(userMsg);
    responder(mensaje);
    document.getElementById("mensaje").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Botón enviar
document.getElementById("btnEnviar").addEventListener("click", enviarMensaje);

// Enviar con Enter
document.getElementById("mensaje").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarMensaje();
  }
});

// Limpiar chat
function limpiar() {
  document.getElementById("chatBox").innerHTML = "";
}

// Modo oscuro
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Respuestas automáticas
function responder(mensaje) {
  let respuesta = "";

  if (mensaje.includes("municipalidad") || mensaje.includes("muni")) {
    respuesta = "La municipalidad de Tapso te espera de lunes