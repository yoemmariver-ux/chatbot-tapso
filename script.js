// Variable para almacenar el nombre del usuario y contexto
let usuarioNombre = "Vecino/a";
let contextoActual = null;

// Base de datos de imágenes para la Galería (Lightbox)
const galerias = {
  tapsofc: [
    { src: 'images/tapsofc.jpg', caption: 'Club Tapso FC - Plantel Principal' },
    { src: 'images/tapsofc2.jpg', caption: 'Encuentro deportivo local' }
  ],
  hosteria: [
    { src: 'images/hosteria.jpg', caption: 'Fachada de la Histórica Hostería de Tapso' },
    { src: 'images/hosteria2.jpg', caption: 'Instalaciones y alrededores' }
  ],
  festival: [
    { src: 'images/festival.jpg', caption: 'Festival Unión de Pueblos' },
    { src: 'images/festival2.jpg', caption: 'Escenario y show en vivo' }
  ],
  padel: [
    { src: 'images/padel-tapso.jpg', caption: 'Torneo y Liga de Pádel Tapso' }
  ]
};

let galeriaActual = [];
let indiceImagen = 0;

// Respuestas variadas para cuando NO se encuentra la información
const respuestasDesconocidas = [
  "Lo siento, por el momento no cuento con esa información específica. Te sugiero consultar directamente al Municipio a través de nuestro botón de **WhatsApp** en la sección de contacto.",
  "No tengo esa respuesta en mi base de datos actual. Si querés una atención más personalizada, podés enviarnos un mensaje por **WhatsApp** usando el enlace de redes que está abajo.",
  "Mmm, no sabría decirte con exactitud sobre ese tema. Podés probar escribiéndonos por **WhatsApp** a través del botón correspondiente en el panel de contacto.",
  "Por ahora no dispongo de ese dato. Te invito a hacer tu consulta mediante el botón directo de **WhatsApp** que encontrás abajo en las vías de comunicación.",
  "Esa consulta excede mi conocimiento actual. Para ayudarte mejor, te recomiendo ponerte en contacto por **WhatsApp** desde el cuadro de redes oficiales."
];

function obtenerRespuestaDesconocida() {
  const indice = Math.floor(Math.random() * respuestasDesconocidas.length);
  return respuestasDesconocidas[indice];
}

// ----------------------------------------------------
// EFECTO DE SONIDO (AUDIO SINTETIZADO)
// ----------------------------------------------------
function playClick() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    // Manejo en caso de que el navegador bloquee audio automático
  }
}

// ----------------------------------------------------
// INICIALIZACIÓN
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("loginModal");
  const btnComenzar = document.getElementById("btnComenzar");
  const inputNombre = document.getElementById("nombre");

  if (modal) modal.style.display = "flex";

  if (btnComenzar) {
    btnComenzar.addEventListener("click", function() {
      playClick();
      const nombreIngresado = inputNombre.value.trim();
      if (nombreIngresado !== "") {
        usuarioNombre = nombreIngresado;
      }
      modal.style.display = "none";
      mostrarSaludoInicial();
    });
  }

  if (inputNombre) {
    inputNombre.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        btnComenzar.click();
      }
    });
  }

  const inputMensaje = document.getElementById("mensaje");
  const btnEnviar = document.getElementById("btnEnviar");

  if (inputMensaje && btnEnviar) {
    inputMensaje.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        responder();
      }
    });

    btnEnviar.addEventListener("click", function() {
      playClick();
      responder();
    });
  }
});

// ----------------------------------------------------
// ASISTENTE DE CHAT
// ----------------------------------------------------
function mostrarSaludoInicial() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = `
    <p>🤖 <strong>Asistente:</strong> ¡Hola <strong>${usuarioNombre}</strong>! Bienvenido/a al portal de Tapso. ¿En qué te puedo ayudar hoy?</p>
  `;
  mostrarSugerenciasIniciales();
}

function mostrarSugerenciasIniciales() {
  const chatBox = document.getElementById("chatBox");
  let contenedorChips = document.getElementById("sugerencias-container");

  if (!contenedorChips) {
    contenedorChips = document.createElement("div");
    contenedorChips.id = "sugerencias-container";
    contenedorChips.className = "sugerencias-container";
    chatBox.parentNode.insertBefore(contenedorChips, chatBox.nextSibling);
  }

  contenedorChips.innerHTML = `
    <button class="chip-btn" onclick="enviarSugerencia('Muni')">🏛️ Muni</button>
    <button class="chip-btn" onclick="enviarSugerencia('Policía')">👮 Policía</button>
    <button class="chip-btn" onclick="enviarSugerencia('Fútbol')">⚽ Fútbol (Tapso FC)</button>
    <button class="chip-btn" onclick="enviarSugerencia('Punto Digital')">💻 Punto Digital</button>
    <button class="chip-btn" onclick="enviarSugerencia('Hostería')">🏨 Hostería</button>
    <button class="chip-btn" onclick="enviarSugerencia('Historia')">📜 Historia</button>
    <button class="chip-btn" onclick="enviarSugerencia('Trámites')">📝 Trámites</button>
  `;
}

function responder() {
  const input = document.getElementById("mensaje");
  const texto = input.value.trim().toLowerCase();
  const chatBox = document.getElementById("chatBox");

  if (texto === "") return;

  chatBox.innerHTML += `<p>👤 <strong>Tú:</strong> ${input.value}</p>`;
  input.value = "";

  let respuesta = "";

  // Detección de Saludos
  if (/^(hola|hols|buenas|buen|buenos|buenas noches|buenas tardes|que tal|como va|saludos)/i.test(texto)) {
    const saludos = [
      `¡Hola ${usuarioNombre}! ¿En qué puedo ayudarte hoy?`,
      `¡Buenas! Qué gusto saludarte, ${usuarioNombre}. ¿Qué consulta tenés?`,
      `¡Hola, ${usuarioNombre}! Contame, ¿sobre qué tema de Tapso te gustaría consultar?`
    ];
    respuesta = saludos[Math.floor(Math.random() * saludos.length)];
    contextoActual = null;
  }
  // Detección de Despedidas
  else if (/^(chau|adios|nos vemos|hasta luego|que tengas buen dia|gracias|muchas gracias)/i.test(texto)) {
    const despedidas = [
      `¡Hasta luego, ${usuarioNombre}! Que tengas un excelente día.`,
      `¡De nada, ${usuarioNombre}! Quedo a tu disposición si necesitas algo más.`,
      `¡Nos vemos! Un saludo cordial de parte de la Municipalidad de Tapso.`
    ];
    respuesta = despedidas[Math.floor(Math.random() * despedidas.length)];
    contextoActual = null;
  }
  // Base de Conocimientos
  else if (texto.includes("muni") || texto.includes("municipalidad")) {
    respuesta = "La Municipalidad de Tapso está a tu disposición para trámites institucionales y atención vecinal.";
    contextoActual = "muni";
  } else if (texto.includes("policia") || texto.includes("seguridad") || texto.includes("comisaria")) {
    respuesta = "Para emergencias o consultas de seguridad, podés acudir a la comisaría local de Tapso.";
    contextoActual = "policia";
  } else if (texto.includes("futbol") || texto.includes("tapso fc") || texto.includes("deporte")) {
    respuesta = "El Club Tapso FC es un orgullo deportivo local. Podes ver fotos e información en el panel izquierdo o del torneo de Pádel en el calendario.";
    contextoActual = "futbol";
  } else if (texto.includes("punto digital") || texto.includes("internet") || texto.includes("computadoras")) {
    respuesta = "El Punto Digital Tapso ofrece capacitaciones, acceso libre a internet y trámites virtuales.";
    contextoActual = "punto digital";
  } else if (texto.includes("hosteria") || texto.includes("alojamiento") || texto.includes("turismo")) {
    respuesta = "La histórica Hostería de Tapso ofrece hospedaje y gastronomía regional en un entorno natural único.";
    contextoActual = "hosteria";
  } else if (texto.includes("historia") || texto.includes("origen")) {
    respuesta = "Tapso es una localidad con profunda historia ferroviaria y tradición en la provincia de Catamarca.";
    contextoActual = "historia";
  } else if (texto.includes("tramite") || texto.includes("tramites")) {
    respuesta = "Podés realizar trámites administrativos presencialmente en el Municipio o consultar vía WhatsApp.";
    contextoActual = "tramites";
  } else {
    respuesta = obtenerRespuestaDesconocida();
    contextoActual = null;
  }

  chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ${formatearTexto(respuesta)}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function formatearTexto(str) {
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function enviarSugerencia(palabra) {
  playClick();
  const input = document.getElementById("mensaje");
  input.value = palabra;
  responder();
}

function limpiar() {
  playClick();
  mostrarSaludoInicial();
}

function toggleDarkMode() {
  playClick();
  document.body.classList.toggle("dark-mode");
}

// ----------------------------------------------------
// GALERÍA DE IMÁGENES (LIGHTBOX)
// ----------------------------------------------------
function abrirGaleria(categoria) {
  playClick();
  if (!galerias[categoria] || galerias[categoria].length === 0) return;

  galeriaActual = galerias[categoria];
  indiceImagen = 0;

  const modalGaleria = document.getElementById("galleryModal");
  if (modalGaleria) {
    modalGaleria.style.display = "flex";
    actualizarImagenGaleria();
  }
}

function actualizarImagenGaleria() {
  const imgElem = document.getElementById("imgGaleria");
  const captionElem = document.getElementById("captionGaleria");

  if (imgElem && captionElem && galeriaActual[indiceImagen]) {
    imgElem.src = galeriaActual[indiceImagen].src;
    captionElem.innerText = galeriaActual[indiceImagen].caption;
  }
}

function cambiarImagen(direccion) {
  playClick();
  indiceImagen += direccion;

  if (indiceImagen < 0) {
    indiceImagen = galeriaActual.length - 1;
  } else if (indiceImagen >= galeriaActual.length) {
    indiceImagen = 0;
  }

  actualizarImagenGaleria();
}

function cerrarGaleria() {
  playClick();
  const modalGaleria = document.getElementById("galleryModal");
  if (modalGaleria) {
    modalGaleria.style.display = "none";
  }
}