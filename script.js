// Variable para almacenar el nombre del usuario y contexto de memoria
let usuarioNombre = "Vecino/a";
let temaActual = null;
let contadorConsultasTema = 0;

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
// BASE DE CONOCIMIENTO DE PREGUNTAS CLAVE DE TAPSO
// ----------------------------------------------------
const conocimientoTapso = {
  muni: {
    clave: "muni",
    palabrasClave: ["muni", "municipalidad", "intendente", "gobierno", "comisionado", "autoridades"],
    respuesta: "La Municipalidad de Tapso está a tu disposición para trámites institucionales y atención vecinal. La gestión se coordina entre el sector catamarqueño (Centro Cívico) y el sector santiagueño."
  },
  policia: {
    clave: "policia",
    palabrasClave: ["policia", "seguridad", "comisaria", "destacamento", "emergencia"],
    respuesta: "Para emergencias o consultas de seguridad, podés acudir a la comisaría/destacamento local de Tapso o comunicarte con las líneas de emergencia locales."
  },
  futbol: {
    clave: "futbol",
    palabrasClave: ["futbol", "fútbol", "tapso fc", "club"],
    respuesta: "El Club Tapso FC es un orgullo deportivo local. Podés hacer clic en la tarjeta de la izquierda para ver su galería de fotos e instalaciones."
  },
  puntodigital: {
    clave: "puntodigital",
    palabrasClave: ["punto digital", "digital", "internet", "capacitacion", "computadoras", "cursos"],
    respuesta: "El Punto Digital Tapso ofrece capacitaciones en informática, acceso libre y gratuito a internet, consolas de entretenimiento y asistencia para trámites virtuales (ANSES, Boleto Estudiantil, etc.)."
  },
  hosteria: {
    clave: "hosteria",
    palabrasClave: ["hosteria", "hostería", "alojamiento", "hospedaje", "turismo", "dormir", "hotel"],
    respuesta: "La histórica Hostería de Tapso cuenta con habitaciones equipadas, aire acondicionado, WiFi y servicio de comedor para turistas y visitantes. Podés ver las fotos en la sección 'Conocé Tapso'."
  },
  festival: {
    clave: "festival",
    palabrasClave: ["festival", "festivales", "union de pueblos", "evento", "fiesta"],
    respuesta: "El Festival Unión de Pueblos es el evento cultural más esperado de la zona, reuniendo a vecinos y visitantes con música folclórica en vivo, artesanías y comidas típicas."
  },
  padel: {
    clave: "padel",
    palabrasClave: ["padel", "pádel", "liga", "torneo", "deporte", "cancha"],
    respuesta: "¡Arranca la Liga de Pádel! Comienza a finales de septiembre en el Complejo Deportivo con categorías masculina (suma 13) y femenina (suma 15). Consultas al 3854415855."
  },
  historia: {
    clave: "historia",
    palabrasClave: ["historia", "origen", "pueblo", "fundacion", "ferrocarril"],
    respuesta: "Tapso es una localidad de rica tradición ligada históricamente al Ferrocarril Belgrano, integrando comunidades de Catamarca y Santiago del Estero."
  },
  tramites: {
    clave: "tramites",
    palabrasClave: ["tramite", "tramites", "trámites", "gestion", "atencion"],
    respuesta: "Podés realizar trámites administrativos presencialmente en el Municipio o hacer tu consulta directa por WhatsApp a través de nuestro botón directo."
  }
};

// ----------------------------------------------------
// RESPUESTAS VARIADAS PARA INFORMACIÓN NO ENCONTRADA
// ----------------------------------------------------
const respuestasDesconocidas = [
  "Lo siento, por el momento no cuento con esa información específica. Te sugiero consultar directamente al Municipio a través de nuestro botón de **WhatsApp** en la sección de contacto.",
  "No tengo esa respuesta en mi base de datos actual. Si querés una atención más personalizada, podés enviarnos un mensaje por **WhatsApp** usando el enlace que está abajo.",
  "Mmm, no sabría decirte con exactitud sobre ese tema. Podés probar escribiéndonos por **WhatsApp** a través del botón correspondiente en el panel de contacto.",
  "Por ahora no dispongo de ese dato. Te invito a hacer tu consulta mediante el botón directo de **WhatsApp** que encontrás en las vías de comunicación.",
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
// LÓGICA DEL CHAT Y ASISTENTE VIRTUAL
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
  const texto = input.value.trim().toLowerCase();
  const chatBox = document.getElementById("chatBox");

  if (texto === "") return;

  // Sonido de envío de mensaje
  playSend();

  chatBox.innerHTML += `<p>👤 <strong>Tú:</strong> ${input.value}</p>`;
  input.value = "";

  let respuesta = "";

  // 1. Manejo de Saludos
  if (/^(hola|hols|buenas|buen|buenos|buenas noches|buenas tardes|que tal|como va|saludos)/i.test(texto)) {
    const saludos = [
      `¡Hola ${usuarioNombre}! ¿En qué puedo ayudarte hoy?`,
      `¡Buenas! Qué gusto saludarte, ${usuarioNombre}. ¿Qué consulta tenés?`,
      `¡Hola, ${usuarioNombre}! Contame, ¿sobre qué tema de Tapso te gustaría consultar?`
    ];
    respuesta = saludos[Math.floor(Math.random() * saludos.length)];
    temaActual = null;
    contadorConsultasTema = 0;
  }
  // 2. Manejo de Despedidas
  else if (/^(chau|adios|nos vemos|hasta luego|que tengas buen dia|gracias|muchas gracias)/i.test(texto)) {
    const despedidas = [
      `¡Hasta luego, ${usuarioNombre}! Que tengas un excelente día.`,
      `¡De nada, ${usuarioNombre}! Quedo a tu disposición si necesitas algo más.`,
      `¡Nos vemos! Un saludo cordial de parte de la Municipalidad de Tapso.`
    ];
    respuesta = despedidas[Math.floor(Math.random() * despedidas.length)];
    temaActual = null;
    contadorConsultasTema = 0;
  }
  // 3. Procesamiento de Preguntas Clave y Memoria de Tema
  else {
    let temaDetectado = null;
    let respuestaTema = null;

    // Buscar si el texto coincide con la base de datos
    for (const item of Object.values(conocimientoTapso)) {
      if (item.palabrasClave.some(kw => texto.includes(kw))) {
        temaDetectado = item.clave;
        respuestaTema = item.respuesta;
        break;
      }
    }

    if (temaDetectado) {
      if (temaDetectado === temaActual) {
        contadorConsultasTema++;
        // Si vuelve a preguntar o pedir más datos del mismo tema sin cambiar de asunto
        if (contadorConsultasTema >= 2) {
          respuesta = `No dispongo de más información sobre este tema por el momento. ¿Te puedo ayudar con alguna otra consulta sobre Tapso?`;
          // Resetear el tema para que la próxima pregunta arranque limpia
          temaActual = null;
          contadorConsultasTema = 0;
        } else {
          respuesta = respuestaTema;
        }
      } else {
        // Es un tema nuevo: actualizamos memoria
        temaActual = temaDetectado;
        contadorConsultasTema = 1;
        respuesta = respuestaTema;
      }
    } else {
      // No coincide con ningún tema conocido
      respuesta = obtenerRespuestaDesconocida();
      temaActual = null;
      contadorConsultasTema = 0;
    }
  }

  // Tiempo de respuesta simulado para reproducir el sonido de recepción
  setTimeout(() => {
    playReceive();
    chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ${formatearTexto(respuesta)}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 300);
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
  temaActual = null;
  contadorConsultasTema = 0;
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