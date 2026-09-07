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

  if (texto.includes("muni") || texto.includes("municipalidad")) {
    respuesta = "🏛️ Municipalidad de Tapso: ubicada en Av. Virgen del Valle.";
  } else if (texto.includes("policía")) {
    respuesta = "👮 Policía de Tapso: Comisaría local en el centro.";
  } else if (texto.includes("hosteria")) {
    respuesta = "🏨 Hostería Tapso: Av. Virgen del Valle 4234.";
  } else if (texto.includes("historia")) {
    respuesta = "📖 Tapso fue fundado en 1826.";
  } else if (texto.includes("lugares")) {
    respuesta = "📍 Lugares: Municipalidad, Policía, Escuelas, Punto Digital, Hostería.";
  } else if (texto.includes("autoridades")) {
    respuesta = "👔 Autoridades: Intendente, concejales y secretarios.";
  } else if (texto.includes("intendente")) {
    respuesta = "👔 El intendente es la máxima autoridad municipal.";
  } else if (texto.includes("ubicación")) {
    respuesta = "📍 Tapso está en el límite Catamarca-Santiago del Estero.";
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
  chat.scrollTop = chat.scrollHeight;
}

function mostrarInfo(tipo) {
  const infoExtra = document.getElementById("infoExtra");
  if (tipo === "tapsofc") {
    infoExtra.textContent = "⚽ Tapso FC participa en el Torneo Regional.";
  } else if (tipo === "festival") {
    infoExtra.textContent = "🎉 Festival Unión de Pueblos en junio.";
  } else if (tipo === "hosteria") {
    infoExtra.textContent = "🏨 Hostería Tapso: alojamiento cómodo en el centro.";
  }
}
