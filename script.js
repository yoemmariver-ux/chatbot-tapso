// Variable para almacenar el nombre del usuario
let usuarioNombre = "Vecino/a";

// ----------------------------------------------------
// SISTEMA DE MEMORIA Y HILO DE CONVERSACIÓN
// ----------------------------------------------------
let memoriaContexto = {
  temaActivo: null,          // Guarda el tema actual (ej: 'hosteria', 'padel')
  contadorRepeticiones: 0,   // Cuenta cuántas veces seguidas se consulta sobre el mismo tema
  historialUltimosMensajes: [] // Almacena el historial reciente de la interacción
};

// ----------------------------------------------------
// SISTEMA DE AUDIO (Carpeta 'sounds/')
// ----------------------------------------------------
const soundClick = new Audio('sounds/click.mp3');
const soundSend = new Audio('sounds/send.mp3');
const soundReceive = new Audio('sounds/receive.mp3');

function playClick() {
  soundClick.currentTime = 0;
  soundClick.play().catch(() => {});
}

function playSend() {
  soundSend.currentTime = 0;
  soundSend.play().catch(() => {});
}

function playReceive() {
  soundReceive.currentTime = 0;
  soundReceive.play().catch(() => {});
}

// ----------------------------------------------------
// BASE DE DATOS DE GALERÍAS DE IMÁGENES
// ----------------------------------------------------
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

// ----------------------------------------------------
// RESPUESTAS VARIADAS PARA INFORMACIÓN NO ENCONTRADA
// ----------------------------------------------------
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
// INICIALIZACIÓN DE LA APLICACIÓN
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
      responder();
    });
  }
});

// ----------------------------------------------------
// LÓGICA DEL CHAT CON MEMORIA DE CONVERSACIÓN
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
    <button class="chip-btn" onclick="enviarSugerencia('Festival')">🎉 Festival</button>
    <button class="chip-btn" onclick="enviarSugerencia('Pádel')">🎾 Pádel</button>
    <button class="chip-btn" onclick="enviarSugerencia('Trámites')">📝 Trámites</button>
  `;
}

function responder() {
  const input = document.getElementById("mensaje");
  const textoOriginal = input.value.trim();
  const texto = textoOriginal.toLowerCase();
  const chatBox = document.getElementById("chatBox");

  if (texto === "") return;

  playSend();

  chatBox.innerHTML += `<p>👤 <strong>Tú:</strong> ${textoOriginal}</p>`;
  input.value = "";

  let respuesta = "";
  let nuevoTema = detectarTema(texto);

  // 1. Manejo de saludos y despedidas
  if (/^(hola|hols|buenas|buen|buenos|buenas noches|buenas tardes|que tal|como va|saludos)/i.test(texto)) {
    const saludos = [
      `¡Hola ${usuarioNombre}! ¿En qué puedo ayudarte hoy?`,
      `¡Buenas! Qué gusto saludarte, ${usuarioNombre}. ¿Qué consulta tenés?`,
      `¡Hola, ${usuarioNombre}! Contame, ¿sobre qué tema de Tapso te gustaría consultar?`
    ];
    respuesta = saludos[Math.floor(Math.random() * saludos.length)];
    actualizarMemoria(null);
  } 
  else if (/^(chau|adios|nos vemos|hasta luego|que tengas buen dia|gracias|muchas gracias)/i.test(texto)) {
    const despedidas = [
      `¡Hasta luego, ${usuarioNombre}! Que tengas un excelente día.`,
      `¡De nada, ${usuarioNombre}! Quedo a tu disposición si necesitas algo más.`,
      `¡Nos vemos! Un saludo cordial de parte de la Municipalidad de Tapso.`
    ];
    respuesta = despedidas[Math.floor(Math.random() * despedidas.length)];
    actualizarMemoria(null);
  } 
  // 2. Si detecta un nuevo tema explícito
  else if (nuevoTema) {
    if (memoriaContexto.temaActivo === nuevoTema) {
      memoriaContexto.contadorRepeticiones++;
    } else {
      memoriaContexto.temaActivo = nuevoTema;
      memoriaContexto.contadorRepeticiones = 1;
    }

    respuesta = generarRespuestaPorTema(nuevoTema, memoriaContexto.contadorRepeticiones);
  }
  // 3. Si NO detecta tema nuevo, pero HAY un tema activo en la memoria (Seguimiento del hilo)
  else if (memoriaContexto.temaActivo) {
    memoriaContexto.contadorRepeticiones++;
    respuesta = generarRespuestaSeguimiento(memoriaContexto.temaActivo, texto, memoriaContexto.contadorRepeticiones);
  } 
  // 4. Si no hay tema previo ni nuevo tema detectable
  else {
    respuesta = obtenerRespuestaDesconocida();
    actualizarMemoria(null);
  }

  // Guardar en el historial
  memoriaContexto.historialUltimosMensajes.push({ usuario: textoOriginal, bot: respuesta });

  // Simular tiempo de respuesta y sonido de recepción
  setTimeout(() => {
    playReceive();
    chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ${formatearTexto(respuesta)}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 300);
}

// Helper para detectar temas en el texto
function detectarTema(texto) {
  if (texto.includes("muni") || texto.includes("municipalidad")) return "muni";
  if (texto.includes("policia") || texto.includes("seguridad") || texto.includes("comisaria")) return "policia";
  if (texto.includes("futbol") || texto.includes("tapso fc") || texto.includes("club")) return "futbol";
  if (texto.includes("punto digital") || texto.includes("digital") || texto.includes("internet") || texto.includes("capacitacion") || texto.includes("computadoras")) return "punto_digital";
  if (texto.includes("hosteria") || texto.includes("alojamiento") || texto.includes("hospedaje") || texto.includes("turismo")) return "hosteria";
  if (texto.includes("festival") || texto.includes("union de pueblos") || texto.includes("evento")) return "festival";
  if (texto.includes("padel") || texto.includes("liga") || texto.includes("torneo")) return "padel";
  if (texto.includes("historia") || texto.includes("origen") || texto.includes("pueblo")) return "historia";
  if (texto.includes("tramite") || texto.includes("tramites") || texto.includes("gestion")) return "tramites";
  return null;
}

// Respuestas según el tema cargado
function generarRespuestaPorTema(tema, repeticiones) {
  if (repeticiones > 2) {
    return `Seguimos hablando de **${nombreTemaFormateado(tema)}**. Como tenés varias dudas puntuales sobre esto, te recomiendo consultar directamente por **WhatsApp** al Municipio para que te den detalles precisos.`;
  }

  switch (tema) {
    case "muni":
      return "La Municipalidad de Tapso está disponible para trámites e informes. ¿Necesitás consultar por algún área o trámite específico?";
    case "policia":
      return "La Comisaría local atiende emergencias y trámites de seguridad. ¿Buscás el contacto o consultar por algún trámite policial?";
    case "futbol":
      return "El Club Tapso FC representa el fútbol local. Podés ver su galería de fotos en el panel izquierdo. ¿Querés saber algo más sobre el club?";
    case "punto_digital":
      return "El Punto Digital Tapso brinda capacitaciones gratuitas, acceso a computadoras e internet. ¿Te gustaría saber sobre cursos o trámites online?";
    case "hosteria":
      return "La histórica Hostería de Tapso ofrece hospedaje y comida regional en un entorno natural. Podés revisar la galería en 'Conocé Tapso'. ¿Buscás más información sobre alojamiento?";
    case "festival":
      return "El Festival Unión de Pueblos es la gran fiesta cultural local con música en vivo. Podés ver fotos en el panel lateral. ¿Querés saber más sobre este evento?";
    case "padel":
      return "La Liga de Pádel arranca a fines de septiembre en el Complejo Deportivo (16 parejas, $20.000 inscripción). Consultas al 3854415855. ¿Te interesa anotarte o saber sobre categorías?";
    case "historia":
      return "Tapso cuenta con un origen histórico muy ligado al ferrocarril y la cultura de Catamarca. ¿Te interesa algún periodo en particular?";
    case "tramites":
      return "Los trámites administrativos se gestionan en la Municipalidad o Punto Digital. ¿Qué trámite necesitas realizar?";
    default:
      return obtenerRespuestaDesconocida();
  }
}

// Respuestas cuando el usuario repregunta sobre el MISMO tema usando el hilo de la conversación
function generarRespuestaSeguimiento(tema, texto, repeticiones) {
  if (repeticiones >= 3) {
    return `Sobre **${nombreTemaFormateado(tema)}**: si necesitás datos específicos que no tengo cargados, escribinos por **WhatsApp** usando el botón oficial que está abajo.`;
  }

  // Preguntas frecuentes de seguimiento
  if (texto.includes("donde") || texto.includes("ubicacion") || texto.includes("queda")) {
    if (tema === "padel") return "La Liga de Pádel se juega en la cancha dentro del Complejo Deportivo de Tapso, Catamarca.";
    if (tema === "hosteria") return "La Hostería se encuentra en la zona céntrica de Tapso, Catamarca. Podés ver sus fotos en el panel lateral.";
    if (tema === "punto_digital" || tema === "muni") return "El Punto Digital y la sede Municipal están ubicados en la localidad de Tapso, Catamarca.";
    return `La ubicación referente a **${nombreTemaFormateado(tema)}** podés verificarla en la zona céntrica de Tapso o consultarnos por WhatsApp.`;
  }

  if (texto.includes("cuanto") || texto.includes("precio") || texto.includes("costo") || texto.includes("valor") || texto.includes("inscripcion")) {
    if (tema === "padel") return "La inscripción para la Liga de Pádel cuesta $20.000 por pareja. Cupos limitados.";
    return `Para consultar precios o tarifas actualizadas sobre **${nombreTemaFormateado(tema)}**, podés comunicarte por WhatsApp al canal oficial.`;
  }

  if (texto.includes("cuando") || texto.includes("fecha") || texto.includes("horario") || texto.includes("dia")) {
    if (tema === "padel") return "La Liga de Pádel empieza a finales de septiembre con 1 fecha por semana.";
    return `Para conocer fechas o horarios detallados sobre **${nombreTemaFormateado(tema)}**, te sugerimos contactarnos por WhatsApp.`;
  }

  // Respuesta general de seguimiento si no reconoce la repregunta puntual
  return `Siguiendo con el tema de **${nombreTemaFormateado(tema)}**: por el momento no dispongo de ese dato específico. Podés escribirnos por **WhatsApp** desde el botón de contacto para aclararlo.`;
}

function nombreTemaFormateado(tema) {
  const nombres = {
    muni: "Municipalidad de Tapso",
    policia: "Policía de Tapso",
    futbol: "Club Tapso FC",
    punto_digital: "Punto Digital",
    hosteria: "Hostería de Tapso",
    festival: "Festival Unión de Pueblos",
    padel: "Liga de Pádel",
    historia: "Historia de Tapso",
    tramites: "Trámites Municipales"
  };
  return nombres[tema] || "este tema";
}

function actualizarMemoria(nuevoTema) {
  memoriaContexto.temaActivo = nuevoTema;
  memoriaContexto.contadorRepeticiones = 0;
}

function formatearTexto(str) {
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function enviarSugerencia(palabra) {
  const input = document.getElementById("mensaje");
  input.value = palabra;
  responder();
}

function limpiar() {
  playClick();
  actualizarMemoria(null);
  memoriaContexto.historialUltimosMensajes = [];
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