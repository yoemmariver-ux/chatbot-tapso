// Manejo del chat y respuestas automáticas
const chat = document.getElementById("chat");
const entrada = document.getElementById("entrada");
const btnEnviar = document.getElementById("btnEnviar");
const btnLimpiar = document.getElementById("btnLimpiar");
const toggleModo = document.getElementById("toggleModo");

btnEnviar.addEventListener("click", enviarMensaje);
btnLimpiar.addEventListener("click", () => chat.innerHTML = "");
toggleModo.addEventListener("click", () => document.body.classList.toggle("oscuro"));

function enviarMensaje() {
  const texto = entrada.value.trim().toLowerCase();
  if (!texto) return;

  mostrarMensaje(texto, "usuario");

  let respuesta = "";

  // Palabras clave
  if (texto.includes("muni") || texto.includes("municipalidad")) {
    respuesta = "🏛️ Municipalidad de Tapso: ubicada en Av. Virgen del Valle, ofrece servicios administrativos y atención al vecino.";
  } else if (texto.includes("policía")) {
    respuesta = "👮 Policía de Tapso: Comisaría local en el centro del pueblo, atención las 24 horas.";
  } else if (texto.includes("escuela")) {
    respuesta = "📚 Escuelas de Tapso: Primaria N°71 y secundaria en Misión Monotécnica, con programas educativos locales.";
  } else if (texto.includes("punto digital")) {
    respuesta = "💻 Punto Digital Tapso: espacio con acceso a internet, capacitaciones y trámites digitales.";
  } else if (texto.includes("hosteria")) {
    respuesta = "🏨 Hostería Tapso: Av. Virgen del Valle 4234, check-in desde las 14:00, check-out hasta las 10:00.";
  } else if (texto.includes("historia")) {
    respuesta = "📖 Tapso fue fundado el 15 de junio de 1826. Se ubica entre Catamarca y Santiago del Estero, con rica tradición cultural.";
  } else if (texto.includes("lugares")) {
    respuesta = "📍 Lugares de Tapso: Municipalidad, Policía, Escuelas, Punto Digital, Hostería, Club Tapso FC, Festival Unión de Pueblos.";
  } else if (texto.includes("más info")) {
    respuesta = "ℹ️ Para más información de un lugar específico, escribe su nombre (ejemplo: 'hosteria', 'escuela').";
  } else {
    respuesta = "Encantado de atenderte, Emma. ¿En qué puedo ayudarte?";
  }

  mostrarMensaje(respuesta, "bot");
  entrada.value = "";
}

function mostrarMensaje(texto, tipo) {
  const div = document.createElement("div");
  div.className = tipo === "usuario" ? "mensaje-usuario" : "mensaje-bot";
  div.textContent = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Función para mostrar info de galería
function mostrarInfo(tipo) {
  const infoExtra = document.getElementById("infoExtra");
  if (tipo === "tapsofc") {
    infoExtra.textContent = "⚽ Tapso FC participa en el Torneo Regional Federal Amateur. Actualmente ocupa la posición 4 de su grupo.";
  } else if (tipo === "festival") {
    infoExtra.textContent = "🎶 El Festival Unión de Pueblos se realiza cada junio en Tapso, con música folclórica, danza y gastronomía típica.";
  } else if (tipo === "hosteria") {
    infoExtra.textContent = "🏨 La Hostería Tapso está en Av. Virgen del Valle 4234. Check-in desde las 14:00, check-out hasta las 10:00.";
  }
}
