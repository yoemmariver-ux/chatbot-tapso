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
  ubicacion_geografica_tapso: {
    clave: "ubicacion_geografica_tapso",
    palabrasClave: ["ubicacion", "ubicación", "donde queda", "dónde queda", "como llegar", "cómo llegar", "mapa", "ruta 157", "el alto", "choya", "limites", "límites", "santiago del estero", "catamarca", "geografia", "geografía", "dos provincias"],
    respuesta: "Tapso cuenta con una particularidad geopolítica: se encuentra dividida entre dos provincias. El sector oeste pertenece al Departamento El Alto (Catamarca) y el sector este al Departamento Choya (Santiago del Estero). La línea de separación son las vías del ferrocarril. Se ubica estratégicamente sobre la Ruta Nacional N° 157."
  },
  historia_fundacion_tapso: {
    clave: "historia_fundacion_tapso",
    palabrasClave: ["historia", "fundacion", "fundación", "fundador", "origen", "nombre", "quichua", "significado", "cuantos años tiene", "cuántos años tiene", "bicentenario", "200 años", "pasado", "vias", "vías", "ferrocarril", "tren"],
    respuesta: "El nombre Tapso proviene del vocablo quichua que significa **'Franja Estrecha de Tierra'**. Fue fundada oficialmente el 15 de junio de 1826 y celebró su Bicentenario (200 años) el 19 de junio de 2026. Su crecimiento estuvo históricamente ligado al desarrollo de las líneas férreas."
  },
  municipalidad_autoridades_tapso: {
    clave: "municipalidad_autoridades_tapso",
    palabrasClave: ["muni", "municipalidad", "intendente", "gobierno", "comisionado", "autoridades", "mario sosa", "ruly vega", "gestion", "gestión", "gobernar", "oficina municipal", "centro civico", "centro cívico"],
    respuesta: "La gestión se administra en plena coordinación: el sector de Catamarca está gobernado por el Municipio de Tapso, a cargo del Intendente **Dr. Mario Sosa** (Unión por la Patria) en el Centro Cívico; mientras que el sector de Santiago del Estero cuenta con el comisionado municipal **Ruly Vega**."
  },
  hosteria_alojamiento_tapso: {
    clave: "hosteria_alojamiento_tapso",
    palabrasClave: ["hosteria", "hostería", "alojamiento", "hospedaje", "turismo", "dormir", "hotel", "quedarse", "pileta", "piscina", "habitaciones", "precio", "reserva", "telefono hosteria", "teléfono hostería", "servicios", "wifi", "aire acondicionado"],
    respuesta: "La Hostería Municipal de Tapso está sobre la Ruta Nacional N° 157. Ofrece habitaciones con baño privado, aire acondicionado, TV de pantalla plana, Wi-Fi gratuito, estacionamiento, restaurante/bar y piscina al aire libre. Teléfono de contacto directo: **385 6096508**."
  },
  punto_digital_tapso: {
    clave: "punto_digital_tapso",
    palabrasClave: ["punto digital", "digital", "internet", "capacitacion", "capacitación", "computadoras", "cursos", "wifi publico", "wifi público", "tecnologia", "tecnología", "tramites", "trámites", "anses", "validar identidad", "mi argentina", "videojuegos", "jovenes", "jóvenes"],
    respuesta: "El Punto Digital Tapso es un espacio público y gratuito con computadoras e internet libre para trámites online (ANSES, Boleto Estudiantil, etc.), sala de videojuegos para jóvenes, área de proyecciones audiovisuales y cursos de habilidades digitales."
  },
  seguridad_policia_tapso: {
    clave: "seguridad_policia_tapso",
    palabrasClave: ["policia", "policía", "comisaria", "comisaría", "destacamento", "seguridad", "denuncia", "destacamento 15", "comisaria de tapso", "comisaría de tapso", "emergencia", "patrullero", "oficiales", "achalco"],
    respuesta: "En la parte catamarqueña opera la Comisaría de Tapso de la Policía de Catamarca (con apoyo de la Subcomisaría de Colonia de Achalco). En el sector santiagueño funciona el Destacamento Policial N° 15, articulando controles con la Comisaría Comunitaria N° 23 de Frías."
  },
  festivales_aniversario_tapso: {
    clave: "festivales_aniversario_tapso",
    palabrasClave: ["festival", "festivales", "fiesta", "aniversario", "cumpleaños del pueblo", "15 de junio", "union de pueblos", "unión de pueblos", "el colono", "folklore", "desfile", "peña", "musica", "música", "comidas tipicas", "comidas típicas", "evento"],
    respuesta: "Las festividades principales son: el **Aniversario de Tapso** (15 de junio, con desfiles cívicos y agrupaciones gauchas), el **Festival 'Unión de Pueblos'** (encuentro folclórico insignia) y el **Festival de 'El Colono'** en Colonia Achalco (música nativa y comidas típicas)."
  },
  turismo_deportes_tapso: {
    clave: "turismo_deportes_tapso",
    palabrasClave: ["que hacer", "qué hacer", "pasear", "museo", "iglesia", "la aguadita", "arte rupestre", "arqueologia", "arqueología", "sierra", "naturaleza", "rally", "hockey", "cancha", "deporte", "mountain bike"],
    respuesta: "Podés visitar la Iglesia local, el Museo Municipal (arqueológico y ferroviario), la Iglesia de Ntra. Sra. del Rosario en Ayapaso, y los senderos a las serranías de El Alto / La Aguadita (arte rupestre). En deportes destaca la cancha de hockey de césped sintético y las competencias de Mountain Bike y Rally Regional."
  },
  futbol: {
    clave: "futbol",
    palabrasClave: ["futbol", "fútbol", "tapso fc", "club"],
    respuesta: "El Club Tapso FC es un orgullo deportivo local. Podés hacer clic en la tarjeta correspondiente en la columna de la izquierda para ver su galería de fotos."
  },
  padel: {
    clave: "padel",
    palabrasClave: ["padel", "pádel", "liga", "torneo", "cancha de padel"],
    respuesta: "¡Arranca la Liga de Pádel! Comienza a finales de septiembre en el Complejo Deportivo con categorías masculina (suma 13) y femenina (suma 15). Consultas al 3854415855."
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
    <button class="chip-btn" onclick="enviarSugerencia('Autoridades')">🏛️ Autoridades</button>
    <button class="chip-btn" onclick="enviarSugerencia('Ubicación')">📍 Ubicación</button>
    <button class="chip-btn" onclick="enviarSugerencia('Historia')">📜 Historia</button>
    <button class="chip-btn" onclick="enviarSugerencia('Policía')">👮 Policía</button>
    <button class="chip-btn" onclick="enviarSugerencia('Punto Digital')">💻 Punto Digital</button>
    <button class="chip-btn" onclick="enviarSugerencia('Hostería')">🏨 Hostería</button>
    <button class="chip-btn" onclick="enviarSugerencia('Festivales')">🎉 Festivales</button>
    <button class="chip-btn" onclick="enviarSugerencia('Turismo')">🌲 Turismo</button>
  `;
}

function responder() {
  const input = document.getElementById("mensaje");
  const texto = input.value.trim().toLowerCase();
  const chatBox = document.getElementById("chatBox");

  if (texto === "") return;

  // Sonido de envío
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

    // Buscar coincidencia en la base de datos
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
        if (contadorConsultasTema >= 2) {
          respuesta = `No dispongo de más información sobre este tema por el momento. ¿Te puedo ayudar con alguna otra consulta sobre Tapso?`;
          temaActual = null;
          contadorConsultasTema = 0;
        } else {
          respuesta = respuestaTema;
        }
      } else {
        temaActual = temaDetectado;
        contadorConsultasTema = 1;
        respuesta = respuestaTema;
      }
    } else {
      respuesta = obtenerRespuestaDesconocida();
      temaActual = null;
      contadorConsultasTema = 0;
    }
  }

  // Simulación de delay y sonido de recepción
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