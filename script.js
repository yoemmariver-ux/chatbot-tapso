let nombreUsuario = "Vecino/a";
let modoOscuro = false;
let estadoConversacion = null;

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

// Saludo Inicial
function saludarInicial() {
  const saludo = `¡Hola ${nombreUsuario}! Bienvenido/a al portal de Tapso. ¿En qué te puedo ayudar hoy?`;
  agregarMensaje(saludo, "asistente");
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

function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const texto = input.value.trim();
  if (!texto) return;

  agregarMensaje(texto, "usuario");
  input.value = "";

  setTimeout(() => {
    procesarRespuesta(texto);
  }, 300);
}

function enviarSugerencia(clave) {
  agregarMensaje(clave, "usuario");
  setTimeout(() => {
    procesarRespuesta(clave);
  }, 300);
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

// FLUJO DE CONVERSACIÓN NATURAL (SIN FORMATOS NI TITULOS EN NEGRITA REPETIDOS)
function procesarRespuesta(consulta) {
  const query = consulta.toLowerCase().trim();

  // MENTOR / FLUJO AUTORIDADES (CATAMARCA VS SANTIAGO)
  if (estadoConversacion === "esperando_jurisdiccion_autoridades") {
    if (query.includes("catamarca")) {
      agregarMensaje("Por el lado de Catamarca, la gestión municipal corresponde al Municipio de Tapso (Dpto. El Alto). El Centro Cívico atiende de Lunes a Viernes de 07:30 a 13:00 hs.", "asistente");
      estadoConversacion = null;
      return;
    } else if (query.includes("santiago") || query.includes("santiagueña")) {
      agregarMensaje("Por el lado de Santiago del Estero, la administración corresponde a la Comisión Municipal de Tapso (Dpto. Choya).", "asistente");
      estadoConversacion = null;
      return;
    }
  }

  if (query.includes("autoridades") || query.includes("autoridad")) {
    agregarMensaje("Tapso se divide entre las provincias de Catamarca y Santiago del Estero. ¿De cuál de las dos jurisdicciones te gustaría conocer las autoridades?", "asistente");
    estadoConversacion = "esperando_jurisdiccion_autoridades";
    return;
  }

  // UBICACIÓN Y CÓMO LLEGAR
  if (query.includes("ubicación") || query.includes("ubicacion")) {
    agregarMensaje("Tapso se encuentra sobre la Ruta Nacional 157, en el límite interprovincial de Catamarca y Santiago del Estero. ¿Necesitás saber cómo llegar desde Frías o Recreo?", "asistente");
    estadoConversacion = "esperando_llegar";
    return;
  }

  if (estadoConversacion === "esperando_llegar" && (query.includes("sí") || query.includes("si") || query.includes("cómo") || query.includes("como"))) {
    agregarMensaje("Podés acceder directamente por la Ruta Nacional 157 tanto desde Recreo (al sur) como desde Frías (al norte). Ambos accesos están totalmente pavimentados.", "asistente");
    estadoConversacion = null;
    return;
  }

  // PUNTO DIGITAL Y CURSOS
  if (query.includes("punto digital")) {
    agregarMensaje("El Punto Digital Tapso brinda acceso libre a internet, trámites de ANSES y capacitaciones gratuitas. ¿Te interesa conocer sobre los cursos disponibles?", "asistente");
    estadoConversacion = "esperando_cursos";
    return;
  }

  if (estadoConversacion === "esperando_cursos" && (query.includes("sí") || query.includes("si") || query.includes("curso") || query.includes("capacitaciones"))) {
    agregarMensaje("Actualmente se dicta el curso de Informática con orientación en administración y gestión en la sede de Punto Digital.", "asistente");
    estadoConversacion = null;
    return;
  }

  // OTRAS SECCIONES
  if (query.includes("hostería") || query.includes("hosteria")) {
    agregarMensaje("La Hostería Municipal ofrece alojamiento cómodo para los visitantes. Podés acercarte al Centro Cívico para consultar disponibilidad y tarifas.", "asistente");
    estadoConversacion = null;
    return;
  }

  if (query.includes("festivales") || query.includes("festival")) {
    agregarMensaje("El evento más destacado es el Festival Unión de Pueblos, que reúne música, artesanos y gastronomía de toda la región.", "asistente");
    estadoConversacion = null;
    return;
  }

  if (query.includes("policía") || query.includes("policia")) {
    agregarMensaje("Ante emergencias con la seccional policial, podés comunicarte al 101 o dirigirte a la dependencia ubicada sobre la avenida principal.", "asistente");
    estadoConversacion = null;
    return;
  }

  if (query.includes("historia")) {
    agregarMensaje("Tapso es una localidad con más de 200 años de historia, nacida al calor del ferrocarril y caracterizada por la unión de dos provincias.", "asistente");
    estadoConversacion = null;
    return;
  }

  if (query.includes("turismo")) {
    agregarMensaje("En Tapso podés disfrutar de los espacios verdes, el Complejo Deportivo, la histórica Hostería y los circuitos locales.", "asistente");
    estadoConversacion = null;
    return;
  }

  // MENSAJE POR DEFECTO
  agregarMensaje(`Disculpá ${nombreUsuario}, no logré entender bien tu consulta. Podés preguntarme sobre Autoridades, Ubicación, Punto Digital, Hostería, Festivales o Policía.`, "asistente");
  estadoConversacion = null;
}

function limpiarChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";
  estadoConversacion = null;
  saludarInicial();
}

document.getElementById("mensaje")?.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    enviarMensaje();
  }
});

// LÓGICA DE GALERÍA Y FOTOS EN PANTALLA COMPLETA
function abrirGaleria(categoria) {
  if (galerias[categoria]) {
    galeriaActual = galerias[categoria];
    indiceImagen = 0;
    document.getElementById("galleryNav").style.display = galeriaActual.length > 1 ? "flex" : "none";
    mostrarImagenGaleria();
    document.getElementById("galleryModal").style.display = "flex";
  }
}

function abrirImagenUnica(src, caption) {
  galeriaActual = [{ src: src, caption: caption }];
  indiceImagen = 0;
  document.getElementById("galleryNav").style.display = "none";
  mostrarImagenGaleria();
  document.getElementById("galleryModal").style.display = "flex";
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