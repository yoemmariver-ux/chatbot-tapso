let nombreUsuario = "Vecino/a";
let vozActiva = true;
let modoOscuro = false;

// Respuestas del Asistente
const respuestas = {
  "autoridades": {
    texto: "🏛️ **Autoridades Municipales:**\n• Intendente: Gestión Municipal de Tapso.\n• Centro Cívico: Ruta Nac. 157, Tapso, Catamarca.\n\n¿Te gustaría saber los horarios de atención al público?",
    seguimiento: "horarios"
  },
  "horarios": {
    texto: "🕒 **Horarios de atención:**\nLunes a viernes de 07:30 a 13:00 hs. ¿Querés que te comunique con algún área específica?"
  },
  "ubicación": {
    texto: "📍 **Ubicación:**\nTapso se encuentra ubicado en el departamento El Alto, provincia de Catamarca, sobre la Ruta Nacional 157.",
    seguimiento: "cómo llegar"
  },
  "cómo llegar": {
    texto: "🚗 Podes acceder por la Ruta Nacional 157, tanto desde Frías como desde Recreo. ¿Necesitás datos de transporte de colectivos?"
  },
  "historia": {
    texto: "📜 **Historia de Tapso:**\nTapso es un pueblo ferroviario e histórico con más de 200 años de identidad y cultura en el este catamarqueño."
  },
  "policía": {
    texto: "👮 **Comisaría / Policía de Tapso:**\nAnte emergencias, comunicate al **101** o dirigite a la seccional local sobre la calle principal."
  },
  "punto digital": {
    texto: "💻 **Punto Digital Tapso:**\nBrinda acceso libre a internet, capacitaciones laborales, trámites de ANSES y asistencia tecnológica gratuita.",
    seguimiento: "cursos"
  },
  "cursos": {
    texto: "🎓 Actualmente se dictan talleres de informática y gestión administrativa. ¿Querés inscribirte o consultar requisitos?"
  },
  "hostería": {
    texto: "🏨 **Hostería Municipal:**\nOfrece alojamiento cómodo para visitantes y turistas. Podés consultar disponibilidad directamente en el Centro Cívico."
  },
  "festivales": {
    texto: "🎉 **Festivales y Eventos:**\nTapso celebra anualmente el Festival Unión de Pueblos, fiestas patrias y encuentros culturales comunitarios."
  },
  "turismo": {
    texto: "🍃 **Turismo Tapso:**\nDisfrutá de nuestros espacios verdes, el Complejo Deportivo y circuitos locales. ¿Querés ver la galería de fotos?"
  }
};

// Fotos para Galerías
const galerias = {
  "tapsofc": [
    { src: "images/tapsofc.jpg", caption: "Escudo Oficial Club Tapso FC" },
    { src: "images/tapsofc1.jpg", caption: "Más que un club, una pasión" },
    { src: "images/tapsofc2.jpg", caption: "Plantel de Tapso FC" }
  ],
  "hosteria": [
    { src: "images/hosteria.jpg", caption: "Fachada de la Hostería Municipal" },
    { src: "images/hosteria1.jpg", caption: "Vista exterior e ingresos" },
    { src: "images/hosteria2.jpg", caption: "Comedor e instalaciones internas" },
    { src: "images/hosteria3.jpg", caption: "Sala de estar" },
    { src: "images/hosteria4.jpg", caption: "Habitaciones" }
  ],
  "turismo": [
    { src: "images/visita-tapso.jpg", caption: "Visita a Tapso y atractivos" }
  ],
  "festivales": [
    { src: "images/festival.jpg", caption: "Festival Unión de Pueblos" }
  ]
};

let galeriaActual = [];
let indiceImagen = 0;
let ultimoSeguimiento = null;

// Modal de Nombre al iniciar
document.addEventListener("DOMContentLoaded", () => {
  const btnComenzar = document.getElementById("btnComenzar");
  const loginModal = document.getElementById("loginModal");
  const nombreInput = document.getElementById("nombreInput");

  btnComenzar.addEventListener("click", () => {
    const val = nombreInput.value.trim();
    if (val) {
      nombreUsuario = val;
    }
    loginModal.style.display = "none";
    saludarInicial();
  });

  nombreInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      btnComenzar.click();
    }
  });
});

// Saludo Inicial sin comillas ni formato raro
function saludarInicial() {
  const saludo = `¡Hola ${nombreUsuario}! Bienvenido/a al portal de Tapso. ¿En qué te puedo ayudar hoy?`;
  agregarMensaje(saludo, "asistente");
  hablarTexto(saludo);
}

// Alternar Modo Claro / Modo Oscuro
function toggleModo() {
  modoOscuro = !modoOscuro;
  document.body.classList.toggle("dark-mode", modoOscuro);
  const btnModo = document.getElementById("btnModo");
  if (btnModo) {
    btnModo.innerText = modoOscuro ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
  }
}

function toggleVoz() {
  vozActiva = !vozActiva;
  const btnVoz = document.getElementById("btnVoz");
  if (vozActiva) {
    btnVoz.innerText = "🔊 Voz: Activada";
  } else {
    btnVoz.innerText = "🔇 Voz: Desactivada";
    window.speechSynthesis.cancel();
  }
}

function hablarTexto(textoLimpieza) {
  if (!vozActiva || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const textoLimpio = textoLimpieza.replace(/[*#_]/g, '');
  const utterance = new SpeechSynthesisUtterance(textoLimpio);
  utterance.lang = 'es-AR';
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
}

function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const texto = input.value.trim();
  if (!texto) return;

  agregarMensaje(texto, "usuario");
  input.value = "";

  setTimeout(() => {
    procesarRespuesta(texto);
  }, 350);
}

function enviarSugerencia(clave) {
  agregarMensaje(clave, "usuario");
  setTimeout(() => {
    procesarRespuesta(clave);
  }, 350);
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

function procesarRespuesta(consulta) {
  const query = consulta.toLowerCase();
  let respuestaObj = null;

  if (ultimoSeguimiento && (query.includes("sí") || query.includes("si") || query.includes("dale") || query.includes("bueno"))) {
    respuestaObj = respuestas[ultimoSeguimiento];
    ultimoSeguimiento = null;
  } else {
    for (let key in respuestas) {
      if (query.includes(key)) {
        respuestaObj = respuestas[key];
        break;
      }
    }
  }

  if (respuestaObj) {
    agregarMensaje(respuestaObj.texto, "asistente");
    ultimoSeguimiento = respuestaObj.seguimiento || null;
  } else {
    const respuestaDefault = `Disculpá ${nombreUsuario}, no entendí del todo esa consulta. Podés tocar uno de los botones de abajo o preguntarme por Autoridades, Ubicación, Hostería, Policía o Punto Digital.`;
    agregarMensaje(respuestaDefault, "asistente");
    ultimoSeguimiento = null;
  }
}

function limpiarChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";
  saludarInicial();
}

document.getElementById("mensaje")?.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    enviarMensaje();
  }
});

// Lógica de Galería
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