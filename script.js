const chat = document.getElementById("chat");
const entrada = document.getElementById("entrada");
const btnEnviar = document.getElementById("btnEnviar");
const btnLimpiar = document.getElementById("btnLimpiar");
const toggleModo = document.getElementById("toggleModo");
const nombreModal = document.getElementById("nombreModal");
const guardarNombre = document.getElementById("guardarNombre");
const nombreInput = document.getElementById("nombreInput");
const infoModal = document.getElementById("infoModal");
const infoExtra = document.getElementById("infoExtra");

let nombreUsuario = "";

// Mostrar modal de nombre al inicio
window.onload = () => {
  nombreModal.style.display = "block";
};

guardarNombre.addEventListener("click", () => {
  nombreUsuario = nombreInput.value.trim();
  if (nombreUsuario) {
    nombreModal.style.display = "none";
    mostrarMensaje(`Bienvenido/a ${nombreUsuario} 👋`, "bot");
  }
});

btnEnviar.addEventListener("click", enviarMensaje);
btnLimpiar.addEventListener("click", () => chat.innerHTML = "");
toggleModo.addEventListener("click", () => document.body.classList.toggle("oscuro"));
entrada.addEventListener("keypress", (e) => {
  if (e.key === "Enter") enviarMensaje();
});

function enviarMensaje() {
  const texto = entrada.value.trim().toLowerCase();
  if (!texto) return;

  mostrarMensaje(texto, "usuario");

  let respuesta = "";

  if (texto.includes("municipalidad")) {
    respuesta = "🏛️ Municipalidad de Tapso: ubicada en Av. Virgen del Valle.";
  } else if (texto.includes("policía")) {
    respuesta = "👮 Policía de Tapso: Comisaría local en el centro.";
  } else if (texto.includes("hosteria")) {
    respuesta = "🏨 Hostería Tapso: alojamiento cómodo en el centro.";
  } else if (texto.includes("historia")) {
    respuesta = "📖 Tapso fue fundado en 1826.";
  } else if (texto.includes("lugares") || texto.includes("distritos")) {
    respuesta = "📍 Lugares: Municipalidad, Policía, Escuelas, Punto Digital, Hostería.";
  } else if (texto.includes("autoridades")) {
    respuesta = "👔 Autoridades: Intendente, concejales y secretarios.";
  } else if (texto.includes("punto digital")) {
    respuesta = "💻 Punto Digital Tapso: acceso a internet y capacitaciones.";
  } else {
    respuesta = "Encantado de ayudarte, Emma.";
  }

  mostrarMensaje(respuesta, "bot");
  entrada.value = "";
}

function mostrarMensaje(texto, tipo) {
  const div = document.createElement("div");
  div.className = tipo === "usuario" ? "mensaje-usuario" : "mensaje-bot";
  div.textContent = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight