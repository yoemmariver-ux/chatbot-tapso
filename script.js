// Variable para almacenar el nombre del usuario y el contexto
let usuarioNombre = "Vecino/a";
let contextoActual = null;

// Respuestas variadas para cuando NO se encuentra la información
const respuestasDesconocidas = [
  "Lo siento, por el momento no cuento con esa información específica. Te sugiero consultar directamente al Municipio a través de nuestro botón de **WhatsApp** en la sección de contacto.",
  "No tengo esa respuesta en mi base de datos actual. Si querés una atención más personalizada, podés enviarnos un mensaje por **WhatsApp** usando el enlace de redes que está abajo.",
  "Mmm, no sabría decirte con exactitud sobre ese tema. Podés probar escribiéndonos por **WhatsApp** a través del botón correspondiente en el panel de contacto.",
  "Por ahora no dispongo de ese dato. Te invito a hacer tu consulta mediante el botón directo de **WhatsApp** que encontrás abajo en las vías de comunicación.",
  "Esa consulta excede mi conocimiento actual. Para ayudarte mejor, te recomiendo ponerte en contacto por **WhatsApp** desde el cuadro de redes oficiales."
];

// Función para obtener una respuesta variante
function obtenerRespuestaDesconocida() {
  const indice = Math.floor(Math.random() * respuestasDesconocidas.length);
  return respuestasDesconocidas[indice];
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("loginModal");
  const btnComenzar = document.getElementById("btnComenzar");
  const inputNombre = document.getElementById("nombre");

  if (modal) modal.style.display = "flex";

  if (btnComenzar) {
    btnComenzar.addEventListener("click", function() {
      const nombreIngresado = inputNombre.value.trim();
      if (nombreIngresado !== "") {
        usuarioNombre = nombreIngresado;
      }
      modal.style.display = "none";
      mostrarSaludoInicial();
    });
  }

  // Permitir presionar Enter en el modal de nombre
  if (inputNombre) {
    inputNombre.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        btnComenzar.click();
      }
    });
  }

  // Permitir presionar Enter en el chat
  const inputMensaje = document.getElementById("mensaje");
  const btnEnviar = document.getElementById("btnEnviar");

  if (inputMensaje && btnEnviar) {
    inputMensaje.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        btnEnviar.click();
      }
    });

    btnEnviar.addEventListener("click", responder);
  }
});

// Función para mostrar el saludo de bienvenida
function mostrarSaludoInicial() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = `
    <p>🤖 <strong>Asistente:</strong> ¡Hola <strong>${usuarioNombre}</strong>! Bienvenido/a al portal de Tapso. ¿En qué te puedo ayudar hoy?</p>
  `;
  mostrarSugerenciasIniciales();
}

// Muestra los botones de sugerencias
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

// Procesa el mensaje ingresado
function responder() {
  const input = document.getElementById("mensaje");
  const texto = input.value.trim().toLowerCase();
  const chatBox = document.getElementById("chatBox");

  if (texto === "") return;

  // Mostrar mensaje del usuario
  chatBox.innerHTML += `<p>👤 <strong>Tú:</strong> ${input.value}</p>`;
  input.value = "";

  let respuesta = "";

  // 1. Detección de Saludos (hola, hols, buenas, buen dia, etc.)
  if (/^(hola|hols|buenas|buen|buenos|buenas noches|buenas tardes|que tal|como va|saludos)/i.test(texto)) {
    const saludos = [
      `¡Hola ${usuarioNombre}! ¿En qué puedo ayudarte hoy?`,
      `¡Buenas! Qué gusto saludarte, ${usuarioNombre}. ¿Qué consulta tenés?`,
      `¡Hola, ${usuarioNombre}! Contame, ¿sobre qué tema de Tapso te gustaría consultar?`
    ];
    respuesta = saludos[Math.floor(Math.random() * saludos.length)];
    contextoActual = null;
  }
  // 2. Detección de Despedidas (chau, adios, nos vemos, etc.)
  else if (/^(chau|adios|nos vemos|hasta luego|que tengas buen dia|gracias|muchas gracias)/i.test(texto)) {
    const despedidas = [
      `¡Hasta luego, ${usuarioNombre}! Que tengas un excelente día.`,
      `¡De nada, ${usuarioNombre}! Quedo a tu disposición si necesitas algo más.`,
      `¡Nos vemos! Un saludo cordial de parte de la Municipalidad de Tapso.`
    ];
    respuesta = despedidas[Math.floor(Math.random() * despedidas.length)];
    contextoActual = null;
  }
  // 3. Consultas por temas de la Base de Conocimiento
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
    // Si no coincide con ninguna palabra clave, elige una respuesta variante que sugiere WhatsApp
    respuesta = obtenerRespuestaDesconocida();
    contextoActual = null;
  }

  // Responder en el chat con formato y scroll automático
  chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ${formatearTexto(respuesta)}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Función auxiliar para formatear negritas en el chat
function formatearTexto(str) {
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// Función al hacer clic en los chips/sugerencias
function enviarSugerencia(palabra) {
  const input = document.getElementById("mensaje");
  input.value = palabra;
  responder();
}

// Función para LIMPIAR el chat y RESTAURAR el saludo
function limpiar() {
  mostrarSaludoInicial();
}

// Función para alternar Modo Oscuro
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Efecto de sonido básico (Click)
function playClick() {
  // Función para reproducir sonido de interacción si se desea asociar un audio
}