// Respuestas del Asistente
const respuestas = {
  "autoridades": "🏛️ **Autoridades Municipales:**\n• Intendente: Gestión Municipal de Tapso.\n• Centro Cívico: Ruta Nac. 157, Tapso, Catamarca.",
  "ubicación": "📍 **Ubicación:**\nTapso se encuentra ubicado en el departamento El Alto, provincia de Catamarca, sobre la Ruta Nacional 157.",
  "historia": "📜 **Historia:**\nTapso es un pueblo histórico con más de 200 años de historia, caracterizado por su calidez comunitaria y desarrollo local.",
  "policía": "👮 **Comisaría / Policía:**\nPara emergencias o consultas con la seccional policial de Tapso, comunicate al 101 o acércate al puesto de control.",
  "punto digital": "💻 **Punto Digital Tapso:**\nOfrece acceso libre a internet, capacitaciones, trámites de ANSES y asistencia digital gratuita para toda la comunidad.",
  "hostería": "🏨 **Hostería Municipal:**\nContamos con alojamiento cómodo y servicios para turistas y visitantes. Podés hacer tu reserva en el Centro Cívico.",
  "festivales": "🎉 **Festivales y Eventos:**\nTapso celebra fiestas patrias, eventos culturales y torneos deportivos durante todo el año.",
  "turismo": "🍃 **Turismo Tapso:**\nDisfrutá de nuestras plazas, el Complejo Deportivo, circuitos de senderismo y espacios culturales."
};

// Fotos para Galerías
const galerias = {
  "tapsofc": [
    { src: "tapso-fc.jpg", caption: "Escudo Oficial Club Tapso FC" }
  ],
  "hosteria": [
    { src: "hosteria.jpg", caption: "Fachada de la Hostería Municipal" }
  ],
  "turismo": [
    { src: "turismo.jpg", caption: "Paisajes naturales de Tapso" }
  ]
};

let galeriaActual = [];
let indiceImagen = 0;

// Saludo Inicial
window.onload = function() {
  const nombreUsuario = prompt("Por favor, ingresa tu nombre para comenzar:") || "emma";
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = `<p class="chat-mensaje asistente">🤖 <strong>Asistente:</strong> ¡Hola <strong>${nombreUsuario}</strong>! Bienvenido/a al portal de Tapso. ¿En qué te puedo ayudar hoy?</p>`;
};

// Enviar Mensaje del Usuario
function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const texto = input.value.trim();
  if (!texto) return;

  agregarMensaje(texto, "usuario");
  input.value = "";

  setTimeout(() => {
    responder(texto);
  }, 400);
}

// Sugerencias Chips
function enviarSugerencia(clave) {
  agregarMensaje(clave, "usuario");
  setTimeout(() => {
    responder(clave);
  }, 400);
}

function agregarMensaje(texto, emisor) {
  const chatBox = document.getElementById("chatBox");
  const p = document.createElement("p");
  p.className = `chat-mensaje ${emisor}`;
  
  if (emisor === "usuario") {
    p.innerText = texto;
  } else {
    p.innerHTML = `🤖 <strong>Asistente:</strong> ${texto.replace(/\n/g, "<br>")}`;
  }
  
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function responder(consulta) {
  const query = consulta.toLowerCase();
  let respuestaEncontrada = "Disculpá, no entendí tu consulta. Podés hacer clic en uno de los botones de abajo para consultar sobre Autoridades, Ubicación, Hostería, etc.";

  for (let key in respuestas) {
    if (query.includes(key)) {
      respuestaEncontrada = respuestas[key];
      break;
    }
  }

  agregarMensaje(respuestaEncontrada, "asistente");
}

function limpiarChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = `<p class="chat-mensaje asistente">🤖 <strong>Asistente:</strong> Chat reiniciado. ¿En qué te puedo ayudar?</p>`;
}

// Permitir Enter
document.getElementById("mensaje")?.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    enviarMensaje();
  }
});

// Lógica de Galería (Modal)
function abrirGaleria(categoria) {
  if (galerias[categoria]) {
    galeriaActual = galerias[categoria];
    indiceImagen = 0;
    mostrarImagenGaleria();
    document.getElementById("galleryModal").style.display = "flex";
  }
}

function mostrarImagenGaleria() {
  const img = document.getElementById("imgGaleria");
  const caption = document.getElementById("captionGaleria");
  img.src = galeriaActual[indiceImagen].src;
  caption.innerText = galeriaActual[indiceImagen].caption;
}

function cambiarImagen(direccion) {
  indiceImagen += direccion;
  if (indiceImagen < 0) indiceImagen = galeriaActual.length - 1;
  if (indiceImagen >= galeriaActual.length) indiceImagen = 0;
  mostrarImagenGaleria();
}

function cerrarGaleria() {
  document.getElementById("galleryModal").style.display = "none";
}