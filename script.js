// Función para enviar el mensaje del usuario
function enviarMensaje() {
  const entrada = document.getElementById("entrada");
  const mensaje = entrada.value.trim();
  if (mensaje === "") return;

  mostrarMensajeUsuario(mensaje);
  entrada.value = "";

  // Mostrar estado "escribiendo..."
  mostrarEstado("El asistente está escribiendo...");

  // Simular un pequeño retraso antes de responder
  setTimeout(() => {
    responder(mensaje);
    limpiarEstado();
  }, 1000);
}

// Mostrar mensaje del usuario en el chat
function mostrarMensajeUsuario(texto) {
  const chat = document.getElementById("chat");
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje usuario";
  mensaje.textContent = texto;
  chat.appendChild(mensaje);
  chat.scrollTop = chat.scrollHeight; // auto-scroll
}

// Mostrar respuesta del asistente en el chat
function mostrarRespuesta(texto) {
  const chat = document.getElementById("chat");
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje asistente";
  mensaje.textContent = texto;
  chat.appendChild(mensaje);
  chat.scrollTop = chat.scrollHeight; // auto-scroll
}

// Mostrar estado (ej: escribiendo...)
function mostrarEstado(texto) {
  document.getElementById("estado").textContent = texto;
}

// Limpiar estado
function limpiarEstado() {
  document.getElementById("estado").textContent = "";
}

// Lógica de respuestas básicas
function responder(mensaje) {
  let respuesta = "";
  const msg = mensaje.toLowerCase();

  if (msg.includes("hola")) {
    respuesta = "¡Hola! Bienvenido al Municipio de Tapso. ¿En qué puedo ayudarte?";
  } else if (msg.includes("curso")) {
    respuesta = "Actualmente se dictan cursos de informática en el Punto Digital Tapso.";
  } else if (msg.includes("profesor") || msg.includes("instructor")) {
    respuesta = "El instructor es José Emmanuel Sandoval.";
  } else if (msg.includes("facebook")) {
    respuesta = "Puedes visitar nuestro Facebook Oficial aquí: https://www.facebook.com/municipiodetapso";
  } else if (msg.includes("adios") || msg.includes("chau")) {
    respuesta = "¡Hasta luego! Que tengas un buen día.";
  } else {
    respuesta = "No entendí tu mensaje, ¿podés repetirlo?";
  }

  mostrarRespuesta(respuesta);
}
