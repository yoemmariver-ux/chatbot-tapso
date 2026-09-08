// Variable para guardar el nombre del usuario
let nombreUsuario = "";

// Función de login
function login() {
  nombreUsuario = document.getElementById("nombre").value || "vecino";
  document.getElementById("loginModal").style.display = "none";
  mostrarRespuesta("¡Hola " + nombreUsuario + "! Bienvenido al asistente de Tapso. Estoy aquí para ayudarte con información de nuestro municipio.");
}

// Función para mostrar mensajes en el chat
function mostrarRespuesta(texto) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = "bot-msg";
  msg.textContent = texto;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight; // mantiene el scroll abajo
}

// Función para enviar mensaje
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

// Enviar con Enter desde PC
document.getElementById("mensaje").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarMensaje();
  }
});

// Función para limpiar el chat
function limpiar() {
  document.getElementById("chatBox").innerHTML = "";
}

// Función para modo oscuro/claro
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Bloques de respuestas
function responder(mensaje) {
  let respuesta = "";

  if (mensaje.includes("municipalidad") || mensaje.includes("muni")) {
    respuesta = "La municipalidad de Tapso te espera de lunes a viernes de 8 a 13 hs para ayudarte con tus trámites.";
  } else if (mensaje.includes("policia") || mensaje.includes("comisaria")) {
    respuesta = "La comisaría de Tapso está en el centro del pueblo, siempre lista para cuidar la seguridad de nuestros vecinos.";
  } else if (mensaje.includes("punto digital")) {
    respuesta = "El Punto Digital de Tapso es un espacio para aprender y conectarse, parte del programa nacional que busca acercar la tecnología a todos.";
  } else if (mensaje.includes("hosteria")) {
    respuesta = "La Hostería de Tapso es un lugar histórico y acogedor, ideal para descansar y disfrutar de la tranquilidad de nuestra localidad.";
  } else if (mensaje.includes("historia") || mensaje.includes("fundacion")) {
    respuesta = "Tapso fue fundado en 1826 y cada 12 de agosto celebramos con orgullo nuestro aniversario.";
  } else if (mensaje.includes("lugares") || mensaje.includes("localidades")) {
    respuesta = "Tapso cuenta con localidades como Achalco, Ayapaso, Simogasta, Colonia Achalco, Los Morteros, Choya Viejo, La Calera, La Chilca, La Puerta de Molle Yaco, Pozo Grande y Albigasta. ¡Cada una con su encanto propio!";
  } else if (mensaje.includes("distritos")) {
    respuesta = "Nuestro municipio se organiza en distintos distritos y zonas rurales que forman parte de la comunidad activa de Tapso.";
  } else if (mensaje.includes("intendente")) {
    respuesta = "El intendente actual de Tapso es Mario Sosa, quien trabaja junto a su equipo para el bienestar de todos los vecinos.";
  } else if (mensaje.includes("autoridades")) {
    respuesta = "Además del intendente Mario Sosa, el gobierno municipal está integrado por concejales y secretarios que acompañan la gestión.";
  } else if (mensaje.includes("ubicacion") || mensaje.includes("donde queda")) {
    respuesta = "Tapso se encuentra en el límite entre Catamarca y Santiago del Estero, siendo un punto de unión entre ambas provincias.";
  } else if (mensaje.includes("hola") || mensaje.includes("buenas")) {
    respuesta = "¡Hola " + nombreUsuario + "! Qué alegría saludarte. Soy el asistente de Tapso y estoy aquí para ayudarte.";
  } else if (mensaje.includes("fiesta patronal") || mensaje.includes("patronal")) {
    respuesta = "¡Las Fiestas Patronales de Tapso son un momento único! Cada 12 de agosto celebramos con música, tradición y la alegría de toda la comunidad.";
  } else if (mensaje.includes("festival") || mensaje.includes("union de pueblos")) {
    respuesta = "El Festival Unión de Pueblos se celebra en junio y reúne a vecinos y visitantes con música, danzas y gastronomía típica. ¡Una verdadera fiesta de la cultura!";
  } else {
    respuesta = "Lo siento, no entendí tu mensaje. Podés preguntar sobre la municipalidad, policía, Punto Digital, hostería, historia, lugares, distritos, intendente, autoridades, ubicación o fiestas. " +
                "Si necesitás atención personalizada, hacé click en el ícono de WhatsApp y un asistente del municipio te ayudará.";
  }

  mostrarRespuesta(respuesta);
}
