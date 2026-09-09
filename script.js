// Variable para almacenar el nombre del usuario
let usuarioNombre = "Vecino/a";

// ----------------------------------------------------
// SISTEMA DE MEMORIA Y HILO DE CONVERSACIÓN
// ----------------------------------------------------
let memoriaContexto = {
  temaActivo: null,            // Guarda el tema actual
  contadorRepeticiones: 0,     // Cuenta cuántas veces seguidas se consulta sobre el mismo tema
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
    <button class="chip-btn" onclick="enviarSugerencia('Ubicación')">📍 Ubicación</button>
    <button class="chip-btn" onclick="enviarSugerencia('Historia')">📜 Historia</button>
    <button class="chip-btn" onclick="enviarSugerencia('Muni')">🏛️ Municipio</button>
    <button class="chip-btn" onclick="enviarSugerencia('Hostería')">🏨 Hostería</button>
    <button class="chip-btn" onclick="enviarSugerencia('Punto Digital')">💻 Punto Digital</button>
    <button class="chip-btn" onclick="enviarSugerencia('Policía')">👮 Policía</button>
    <button class="chip-btn" onclick="enviarSugerencia('Festivales')">🎉 Festivales</button>
    <button class="chip-btn" onclick="enviarSugerencia('Turismo y Deportes')">🌲 Turismo/Deportes</button>
    <button class="chip-btn" onclick="enviarSugerencia('Pádel')">🎾 Pádel</button>
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

  // 1. Saludos y despedidas
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
      `¡Nos vemos! Un saludo cordial de parte de la comunidad de Tapso.`
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
  // 3. Si NO detecta tema nuevo pero HAY tema activo en la memoria (Hilo de conversación)
  else if (memoriaContexto.temaActivo) {
    memoriaContexto.contadorRepeticiones++;
    respuesta = generarRespuestaSeguimiento(memoriaContexto.temaActivo, texto, memoriaContexto.contadorRepeticiones);
  } 
  // 4. Sin tema previo ni coincidencia
  else {
    respuesta = obtenerRespuestaDesconocida();
    actualizarMemoria(null);
  }

  // Guardar en el historial
  memoriaContexto.historialUltimosMensajes.push({ usuario: textoOriginal, bot: respuesta });

  setTimeout(() => {
    playReceive();
    chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ${formatearTexto(respuesta)}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 300);
}

// Detector de temas amplio basado en tus palabras clave
function detectarTema(texto) {
  if (texto.includes("ubicacion") || texto.includes("donde queda") || texto.includes("como llegar") || texto.includes("mapa") || texto.includes("ruta 157") || texto.includes("el alto") || texto.includes("choya") || texto.includes("limites") || texto.includes("dos provincias") || texto.includes("geografia")) {
    return "ubicacion_geografica_tapso";
  }
  if (texto.includes("historia") || texto.includes("fundacion") || texto.includes("fundador") || texto.includes("origen") || texto.includes("quichua") || texto.includes("significado") || texto.includes("bicentenario") || texto.includes("200 años") || texto.includes("ferrocarril") || texto.includes("tren") || texto.includes("pasado")) {
    return "historia_fundacion_tapso";
  }
  if (texto.includes("muni") || texto.includes("municipalidad") || texto.includes("intendente") || texto.includes("mario sosa") || texto.includes("ruly vega") || texto.includes("comisionado") || texto.includes("gestion") || texto.includes("autoridades") || texto.includes("centro civico")) {
    return "municipalidad_autoridades_tapso";
  }
  if (texto.includes("hosteria") || texto.includes("hotel") || texto.includes("hospedaje") || texto.includes("alojamiento") || texto.includes("dormir") || texto.includes("pileta") || texto.includes("piscina") || texto.includes("habitaciones") || texto.includes("385 6096508") || texto.includes("reserva")) {
    return "hosteria_alojamiento_tapso";
  }
  if (texto.includes("punto digital") || texto.includes("computadoras") || texto.includes("wifi publico") || texto.includes("cursos") || texto.includes("anses") || texto.includes("mi argentina") || texto.includes("videojuegos") || texto.includes("tecnologia")) {
    return "punto_digital_tapso";
  }
  if (texto.includes("policia") || texto.includes("comisaria") || texto.includes("destacamento") || texto.includes("seguridad") || texto.includes("denuncia") || texto.includes("emergencia") || texto.includes("achalco")) {
    return "seguridad_policia_tapso";
  }
  if (texto.includes("festival") || texto.includes("fiesta") || texto.includes("aniversario") || texto.includes("cumpleaños") || texto.includes("15 de junio") || texto.includes("union de pueblos") || texto.includes("el colono") || texto.includes("folklore") || texto.includes("desfile") || texto.includes("peña")) {
    return "festivales_aniversario_tapso";
  }
  if (texto.includes("turismo") || texto.includes("pasear") || texto.includes("que hacer") || texto.includes("museo") || texto.includes("iglesia") || texto.includes("la aguadita") || texto.includes("arte rupestre") || texto.includes("sierra") || texto.includes("rally") || texto.includes("hockey") || texto.includes("mountain bike") || texto.includes("deporte")) {
    return "turismo_deportes_tapso";
  }
  if (texto.includes("padel") || texto.includes("liga de padel") || texto.includes("torneo de padel") || texto.includes("3854415855")) {
    return "padel_tapso";
  }
  return null;
}

// Información detallada a devolver
function generarRespuestaPorTema(tema, repeticiones) {
  if (repeticiones > 5) {
    return `Seguimos conversando sobre **${nombreTemaFormateado(tema)}**. Si tenés más dudas específicas, te sugiero consultarnos vía **WhatsApp** mediante el botón inferior para asesorarte de forma personalizada.`;
  }

  switch (tema) {
    case "ubicacion_geografica_tapso":
      return "Tapso cuenta con una particularidad geopolítica: está dividida entre dos provincias. El sector oeste pertenece al Departamento El Alto (Catamarca) y el sector este al Departamento Choya (Santiago del Estero), divididos por las vías del ferrocarril. Se ubica estratégicamente sobre la **Ruta Nacional N° 157**, siendo un punto clave de tránsito en el NOA.";

    case "historia_fundacion_tapso":
      return "El nombre **Tapso** proviene del quichua y significa *'Franja Estrecha de Tierra'*. Fue fundada el 15 de junio de 1826 y celebró su **Bicentenario (200 años)** el 19 de junio de 2026 con un histórico desfile cívico-militar y grandes obras. Su desarrollo estuvo siempre ligado al ferrocarril.";

    case "municipalidad_autoridades_tapso":
      return "La gestión se coordina entre dos jurisdicciones: el sector catamarqueño lo administra el Municipio de Tapso a cargo del **Intendente Dr. Mario Sosa** (Centro Cívico), mientras que el sector santiagueño lo encabeza el **Comisionado Ruly Vega**. Ambos gobiernos trabajan conjuntamente en servicios y eventos.";

    case "hosteria_alojamiento_tapso":
      return "La **Hostería Municipal de Tapso** está sobre la Ruta Nacional N° 157. Cuenta con habitaciones con baño privado, aire acondicionado, TV plana, Wi-Fi gratis, estacionamiento, restaurante/bar y piscina al aire libre. Teléfono de contacto directo: **385 6096508**.";

    case "punto_digital_tapso":
      return "El **Punto Digital Tapso** es un espacio público y gratuito con computadoras e internet libre para trámites (ANSES, Boleto Estudiantil, etc.) y aprendizaje. Además, tiene sala de entretenimientos con consolas para jóvenes, proyecciones audiovisuales y cursos de habilidades digitales.";

    case "seguridad_policia_tapso":
      return "La seguridad opera en cooperación: en Catamarca actúa la **Comisaría de Tapso** (con apoyo de la Subcomisaría de Colonia Achalco). En Santiago del Estero opera el **Destacamento Policial N° 15**, en coordinación con la Comisaría Comunitaria N° 23 de Frías.";

    case "festivales_aniversario_tapso":
      return "Las festividades principales son:\n\n• **Aniversario de Tapso:** 15 de junio (actos y desfiles a mediados de mes).\n• **Festival 'Unión de Pueblos':** Encuentro folclórico insignia entre ambas provincias.\n• **Festival 'El Colono':** Celebración de música nativa y comidas típicas en Colonia Achalco.";

    case "turismo_deportes_tapso":
      return "Atractivos destacados:\n\n• **Cultura y Fe:** Iglesia local, Museo Municipal (arqueológico/ferroviario) e Iglesia de Ayapaso.\n• **Naturaleza:** Serranías de El Alto y zona arqueológica de La Aguadita (arte rupestre).\n• **Deportes:** Cancha sintética de hockey, competencias de Mountain Bike y fechas de Rally Regional.";

    case "padel_tapso":
      return "¡La **Liga de Pádel** arranca a finales de septiembre en el Complejo Deportivo! 16 parejas, 1 fecha por semana, inscripción $20.000. Categorías Masculino (suma 13) y Femenino (suma 15). Consultas al **3854415855**.";

    default:
      return obtenerRespuestaDesconocida();
  }
}

// Respuestas cuando se repregunta sobre el MISMO tema conservando la memoria
function generarRespuestaSeguimiento(tema, texto, repeticiones) {
  if (repeticiones >= 5) {
    return `Sobre **${nombreTemaFormateado(tema)}**: para más detalles o consultas personalizadas, te invitamos a enviarnos un mensaje por **WhatsApp** usando el botón del panel inferior.`;
  }

  // 1. Preguntas de Horarios
  if (texto.includes("horario") || texto.includes("horarios") || texto.includes("hora") || texto.includes("abierto") || texto.includes("atencion")) {
    if (tema === "punto_digital_tapso") {
      return "El **Punto Digital Tapso** funciona de lunes a viernes en horario administrativo municipal. Podés acercarte para usar las computadoras, realizar trámites o pedir información sobre los cursos disponibles.";
    }
    if (tema === "municipalidad_autoridades_tapso") {
      return "La atención en el Municipio (Centro Cívico) se realiza habitualmente de **Lunes a Viernes de 7:00 a 13:00 hs**.";
    }
    if (tema === "hosteria_alojamiento_tapso") {
      return "La Hostería Municipal cuenta con recepción para huéspedes. Para coordinar horarios de check-in o reservas, podés llamar al **385 6096508**.";
    }
  }

  // 2. Preguntas de Ubicación / Dónde queda
  if (texto.includes("donde") || texto.includes("ubicacion") || texto.includes("queda") || texto.includes("direccion")) {
    if (tema === "punto_digital_tapso") return "El **Punto Digital Tapso** se encuentra ubicado en el área cívica/institucional de la localidad de Tapso.";
    if (tema === "hosteria_alojamiento_tapso") return "La Hostería Municipal queda sobre la **Ruta Nacional N° 157**, en Tapso.";
    if (tema === "municipalidad_autoridades_tapso") return "El Municipio (sector Catamarca) está ubicado en la zona del **Centro Cívico** de Tapso.";
    if (tema === "padel_tapso" || tema === "turismo_deportes_tapso") return "Las actividades deportivas están centradas en el **Complejo Deportivo de Tapso**.";
  }

  // 3. Preguntas de Precios / Costos
  if (texto.includes("cuanto") || texto.includes("precio") || texto.includes("costo") || texto.includes("valor") || texto.includes("gratis") || texto.includes("cobran")) {
    if (tema === "punto_digital_tapso") return "¡Todos los servicios del **Punto Digital** (internet, trámites, computadoras, videojuegos y cursos) son **100% gratuitos** para los vecinos!";
    if (tema === "padel_tapso") return "La inscripción a la Liga de Pádel cuesta **$20.000 por pareja**.";
  }

  // 4. Preguntas de Contacto / Teléfono
  if (texto.includes("telefono") || texto.includes("contacto") || texto.includes("llamar") || texto.includes("reserva") || texto.includes("numero")) {
    if (tema === "hosteria_alojamiento_tapso") return "El teléfono de la Hostería Municipal es **385 6096508**.";
    if (tema === "padel_tapso") return "Para consultar sobre el Pádel, comunicate al **3854415855**.";
  }

  return `Seguimos conversando sobre **${nombreTemaFormateado(tema)}**. Podés consultarme sobre ubicación, horarios, actividades o trámites de esta área.`;
}

function nombreTemaFormateado(tema) {
  const nombres = {
    ubicacion_geografica_tapso: "Ubicación Geográfica",
    historia_fundacion_tapso: "Historia y Fundación",
    municipalidad_autoridades_tapso: "Municipalidad y Autoridades",
    hosteria_alojamiento_tapso: "Hostería Municipal",
    punto_digital_tapso: "Punto Digital",
    seguridad_policia_tapso: "Seguridad y Policía",
    festivales_aniversario_tapso: "Festivales y Aniversarios",
    turismo_deportes_tapso: "Turismo y Deportes",
    padel_tapso: "Liga de Pádel"
  };
  return nombres[tema] || "este tema";
}

function actualizarMemoria(nuevoTema) {
  memoriaContexto.temaActivo = nuevoTema;
  memoriaContexto.contadorRepeticiones = 0;
}

function formatearTexto(str) {
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
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