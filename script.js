window.onload = function() {
  const modal = document.getElementById("loginModal");
  const btnComenzar = document.getElementById("btnComenzar");
  const nombreInput = document.getElementById("nombre");

  // Al hacer clic en Comenzar
  btnComenzar.onclick = function() {
    iniciarSesion();
  };

  // Permitir presionar la tecla Enter en el input del nombre
  nombreInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      iniciarSesion();
    }
  });

  function iniciarSesion() {
    const nombre = nombreInput.value.trim();
    if (nombre !== "") {
      modal.style.display = "none";
      const chatBox = document.getElementById("chatBox");
      chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ¡Hola <strong>${nombre}</strong>! Bienvenido al portal de Tapso. ¿En qué puedo ayudarte hoy?</p>`;
    } else {
      alert("Por favor, ingresa tu nombre para continuar.");
    }
  }
};

// Enviar mensaje en el Chat
document.getElementById("btnEnviar").onclick = enviarMensaje;

document.getElementById("mensaje").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    enviarMensaje();
  }
});

function enviarMensaje() {
  const mensajeInput = document.getElementById("mensaje");
  const mensaje = mensajeInput.value.trim();
  
  if (mensaje !== "") {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p>👤 <strong>Tú:</strong> ${mensaje}</p>`;
    mensajeInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll hacia abajo
  }
}

function limpiar() {
  document.getElementById("chatBox").innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}