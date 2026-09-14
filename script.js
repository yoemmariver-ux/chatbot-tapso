// Variable para almacenar el nombre del usuario y contexto de memoria
let usuarioNombre = "Vecino/a";
let temaActual = null;
let contadorConsultasTema = 0;

// Estado para controlar el flujo de conversación interactivo
let esperandoEleccionSubtema = null;

// ----------------------------------------------------
// FECHA DINÁMICA EN ESPAÑOL PARA EL WIDGET
// ----------------------------------------------------
function cargarFechaActualWidget() {
  const elemFecha = document.getElementById("climaFecha");
  if (!elemFecha) return;

  const hoy = new Date();
  const opciones = { weekday: 'long', day: 'numeric', month: 'long' };
  let fechaTexto = hoy.toLocaleDateString('es-AR', opciones);

  // Capitalizar primera letra (Ej: "Lunes, 14 Septiembre")
  fechaTexto = fechaTexto.charAt(0).toUpperCase() + fechaTexto.slice(1);
  fechaTexto = fechaTexto.replace(" de ", " "); // Formato limpio como el widget de la foto

  elemFecha.textContent = fechaTexto;
}

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
// SÍNTESIS DE VOZ (TEXT-TO-SPEECH)
// ----------------------------------------------------
function hablarTexto(mensaje) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(mensaje);
    utterance.lang = 'es-AR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

// ----------------------------------------------------
// BASE DE DATOS DE GALERÍAS DE IMÁGENES
// ----------------------------------------------------
const galerias = {
  tapsofc: [
    { src: 'images/tapsofc.jpg', caption: 'Club Tapso FC - Escudo Oficial' },
    { src: 'images/tapsofc1.jpg', caption: 'Club Tapso FC - Institucional' },
    { src: 'images/tapsofc2.jpg', caption: 'Club Tapso FC - Plantel Principal' }
  ],
  hosteria: [
    { src: 'images/hosteria.jpg', caption: 'La Histórica Hostería de Tapso - Entrada Principal' },
    { src: 'images/hosteria1.jpg', caption: 'Hostería de Tapso - Fachada Exterior' },
    { src: 'images/hosteria2.jpg', caption: 'Hostería de Tapso - Comedor y Galería' },
    { src: 'images/hosteria3.jpg', caption: 'Hostería de Tapso - Sala de Estar y TV' },
    { src: 'images/hosteria4.jpg', caption: 'Hostería de Tapso - Habitaciones' }
  ],
  festival: [
    { src: 'images/festival.jpg', caption: 'Festival Unión de Pueblos' }
  ],
  festivales: [
    { src: 'images/festival.jpg', caption: 'Festival Unión de Pueblos' }
  ],
  padel: [
    { src: 'images/padel-tapso.jpg', caption: 'Torneo y Liga de Pádel Tapso' }
  ],
  turismo: [
    { src: 'images/visita-tapso.jpg', caption: 'Visitá Tapso - Turismo, Espectáculos y Festivales' }
  ]
};

let galeriaActual = [];
let indiceImagen = 0;

// ----------------------------------------------------
// BASE DE CONOCIMIENTO MODULAR Y DETALLADA DE TAPSO
// ----------------------------------------------------
const modulosConocimiento = {
  lugares: {
    palabrasClaveGenericas: ["lugar", "lugares", "distrito", "distritos", "paraje", "parajes", "barrio", "barrios", "localidad", "localidades", "zona", "zonas"],
    preguntaGenerica: "¡En Tapso y sus alrededores hay varias zonas y parajes destacados! Tenemos **Colonia Achalco**, **Ayapaso**, **La Aguadita / Serranías**, el **Centro Cívico** y el **Barrio de la Estación**. ¿Te gustaría saber sobre alguno de ellos en especial?",
    subtemas: {
      achalco: {
        palabrasClave: ["achalco", "colonia achalco"],
        respuesta: "**Colonia Achalco:** Destacada por su actividad agropecuaria, el tradicional Festival de 'El Colono' y la Subcomisaría de Colonia de Achalco."
      },
      ayapaso: {
        palabrasClave: ["ayapaso", "aya paso"],
        respuesta: "**Ayapaso:** Paraje histórico catamarqueño cuya principal referencia es la histórica Iglesia de Nuestra Señora del Rosario."
      },
      la_aguadita: {
        palabrasClave: ["aguadita", "la aguadita", "serranias", "serranías"],
        respuesta: "**La Aguadita / Serranías:** Zona ideal para senderismo y turismo natural en las sierras de El Alto, famosa por sus vestigios de arte rupestre."
      },
      estacion: {
        palabrasClave: ["estacion", "estación", "vias", "vías", "ferrocarril"],
        respuesta: "**Barrio de la Estación:** Sector histórico en torno a las vías del ferrocarril, eje divisorio entre Catamarca y Santiago del Estero."
      },
      centro_civico: {
        palabrasClave: ["centro civico", "centro cívico", "plaza central"],
        respuesta: "**Centro Cívico:** Sector oeste (Catamarca) donde se ubica el Municipio, la plaza principal, el Punto Digital y las oficinas administrativas."
      }
    }
  },
  autoridades: {
    palabrasClaveGenericas: ["autoridades", "gobierno", "intendente", "comisionado", "quien gobierna", "quién gobierna"],
    preguntaGenerica: "Dado que Tapso limita entre dos provincias, la gestión se organiza por sectores. Podés consultar sobre la **Gestión Catamarca (Intendencia)** o la **Comisión Municipal (Santiago del Estero)**. ¿Sobre cuál te gustaría saber más?",
    subtemas: {
      catamarca: {
        palabrasClave: ["catamarca", "mario sosa", "intendente", "intendencia", "centro civico"],
        respuesta: "**Gestión Catamarca:** El sector catamarqueño (Dpto. El Alto) está administrado por el Municipio de Tapso, a cargo del Intendente **Dr. Mario Sosa** (Unión por la Patria) en el Centro Cívico."
      },
      santiago: {
        palabrasClave: ["santiago", "santiago del estero", "ruly vega", "comisionado"],
        respuesta: "**Comisión Santiago del Estero:** El sector santiagueño (Dpto. Choya) está bajo la responsabilidad del comisionado municipal **Ruly Vega**."
      }
    }
  },
  festivales: {
    palabrasClaveGenericas: ["festivales", "festival", "fiestas", "eventos", "peñas", "celebraciones"],
    preguntaGenerica: "¡En Tapso celebramos varias fechas importantes durante el año! Destacan el **Aniversario de Tapso**, el **Festival 'Unión de Pueblos'** y el **Festival de 'El Colono'**. ¿Te gustaría saber detalles de alguno en particular?",
    subtemas: {
      aniversario: {
        palabrasClave: ["aniversario", "cumpleaños", "15 de junio", "bicentenario"],
        respuesta: "**Aniversario de Tapso (15 de Junio):** Se festeja con desfiles cívicos, agrupaciones gauchas, espectáculos artísticos y peñas folclóricas."
      },
      union_pueblos: {
        palabrasClave: ["union de pueblos", "unión de pueblos"],
        respuesta: "**Festival 'Unión de Pueblos':** El encuentro folclórico insignia de la región que reúne músicos locales y provinciales."
      },
      el_colono: {
        palabrasClave: ["el colono", "colono"],
        respuesta: "**Festival de 'El Colono':** Se realiza en Colonia Achalco, celebrando las tradiciones rurales con música nativa y comidas típicas."
      }
    }
  },
  servicios: {
    palabrasClaveGenericas: ["punto digital", "tramites", "trámites", "internet", "anses", "cursos"],
    preguntaGenerica: "El **Punto Digital Tapso** ofrece varios servicios gratuitos: **Trámites online (ANSES, Boleto, etc.)**, **Cursos y Capacitaciones** y **Espacio de Entretenimiento / Cine**. ¿Sobre cuál de estos servicios querés consultar?",
    subtemas: {
      tramites: {
        palabrasClave: ["tramite", "trámite", "anses", "boleto", "mi argentina", "validar"],
        respuesta: "**Trámites Online:** En Punto Digital podés realizar de forma gratuita gestiones de ANSES, validación de Mi Argentina, Boleto Estudiantil y asesoramiento digital."
      },
      cursos: {
        palabrasClave: ["cursos", "capacitacion", "capacitación", "taller", "computacion", "computación"],
        respuesta: "**Cursos y Capacitaciones:** Se dictan talleres de alfabetización digital, informática para administración y habilidades tecnológicas."
      },
      entretenimiento: {
        palabrasClave: ["entretenimiento", "videojuegos", "juegos", "cine", "proyecciones"],
        respuesta: "**Entretenimiento:** Cuenta con una sala equipada con consolas de videojuegos para jóvenes y espacio de proyecciones audiovisuales."
      }
    }
  },
  deportes_turismo: {
    palabrasClaveGenericas: ["turismo", "deportes", "deporte", "actividades", "que hacer", "qué hacer"],
    preguntaGenerica: "Tapso tiene una oferta variada para disfrutar. Hay opciones de **Turismo e Historia (Museo e Iglesias)**, **Deportes (Pádel, Fútbol, Hockey)** y **Aventura (Mountain Bike y Rally)**. ¿Qué temática te interesa?",
    subtemas: {
      patrimonio: {
        palabrasClave: ["museo", "iglesia", "patrimonio", "histórico", "historico"],
        respuesta: "**Patrimonio Cultural:** Podés visitar la Iglesia principal de Tapso, el Museo Municipal (piezas arqueológicas y ferroviarias) y la histórica Iglesia de Ayapaso."
      },
      deportes_locales: {
        palabrasClave: ["padel", "pádel", "futbol", "fútbol", "hockey", "cancha"],
        respuesta: "**Deportes:** Contamos con la cancha de hockey de césped sintético, el Club Tapso FC y la nueva Liga de Pádel en el Complejo Deportivo."
      },
      aventura: {
        palabrasClave: ["rally", "mountain bike", "mtb", "senderismo"],
        respuesta: "**Deportes de Aventura:** Recorridos de Mountain Bike por senderos serranos y fechas del Rally Regional en nuestros caminos."
      }
    }
  },
  hosteria: {
    palabrasClaveGenericas: ["hosteria", "hostería", "alojamiento", "hospedaje", "hotel", "dormir"],
    preguntaGenerica: "La **Hostería Municipal de Tapso** está sobre la Ruta 157. Podés consultar sobre **Servicios y Comodidades**, **Contacto / Reservas** o **Piscina y Restaurante**. ¿Qué dato necesitás?",
    subtemas: {
      servicios_h: {
        palabrasClave: ["servicios", "habitaciones", "aire", "wifi", "estacionamiento"],
        respuesta: "**Servicios de Hostería:** Habitaciones con baño privado, aire acondicionado, TV de pantalla plana, Wi-Fi libre y estacionamiento."
      },
      contacto_h: {
        palabrasClave: ["contacto", "reserva", "reservar", "telefono", "teléfono", "precio"],
        respuesta: "**Reservas y Contacto:** Podés hacer tus consultas y reservas llamando directamente al **385 6096508**."
      },
      resto_piscina: {
        palabrasClave: ["restaurante", "bar", "pileta", "piscina", "comedor"],
        respuesta: "**Restaurante y Piscina:** Cuenta con servicio de comedor/bar y piscina al aire libre para visitantes y alojados."
      }
    }
  },
  policia: {
    palabrasClaveGenericas: ["policia", "policía", "seguridad", "comisaria", "comisaría", "destacamento"],
    preguntaGenerica: "La cobertura de seguridad depende del sector: tenemos la **Comisaría de Tapso (Catamarca)** y el **Destacamento Policial N° 15 (Santiago del Estero)**. ¿De cuál precisás información?",
    subtemas: {
      policia_catamarca: {
        palabrasClave: ["catamarca", "comisaria tapso", "comisaría tapso", "achalco"],
        respuesta: "**Policía de Catamarca:** En el sector oeste opera la Comisaría de Tapso con apoyo de la Subcomisaría de Colonia de Achalco."
      },
      policia_santiago: {
        palabrasClave: ["santiago", "destacamento 15", "frias", "frías"],
        respuesta: "**Policía de Santiago del Estero:** En el sector este funciona el Destacamento N° 15, en coordinación con la Comisaría Comunitaria N° 23 de Frías."
      }
    }
  },
  historia: {
    palabrasClaveGenericas: ["historia", "fundacion", "fundación", "origen", "nombre", "quichua"],
    preguntaGenerica: "Tapso posee una rica historia. Podés consultar sobre el **Significado del Nombre**, la **Fecha de Fundación / Bicentenario** o el **Origen Ferroviario**. ¿Qué te gustaría conocer?",
    subtemas: {
      nombre: {
        palabrasClave: ["nombre", "quichua", "significado"],
        respuesta: "**Origen del Nombre:** 'Tapso' proviene de un vocablo quichua que significa **'Franja Estrecha de Tierra'**."
      },
      fundacion: {
        palabrasClave: ["fundacion", "fundación", "fecha", "bicentenario", "200 años", "1826"],
        respuesta: "**Fundación y Bicentenario:** Fue fundada oficialmente el 15 de junio de 1826 y celebró su Bicentenario (200 años) el 19 de junio de 2026."
      },
      ferrocarril: {
        palabrasClave: ["tren", "vias", "vías", "ferrocarril"],
        respuesta: "**Origen Ferroviario:** La localidad nació y creció a la par del trazado de las líneas del ferrocarril, que marcaron su identidad."
      }
    }
  }
};

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
  cargarFechaActualWidget();

  const modal = document.getElementById("loginModal");
  const btnComenzar = document.getElementById("btnComenzar");
  const inputNombre = document.getElementById("nombreInput") || document.getElementById("nombre");

  if (modal) modal.style.display = "flex";

  if (btnComenzar) {
    btnComenzar.addEventListener("click", function() {
      playClick();
      
      if (inputNombre && inputNombre.value.trim() !== "") {
        usuarioNombre = inputNombre.value.trim();
      }
      
      if (modal) modal.style.display = "none";
      mostrarSaludoInicial();
      hablarTexto(`Bienvenido ${usuarioNombre}`);
    });
  }

  if (inputNombre) {
    inputNombre.addEventListener("keypress", function(e) {
      if (e.key === "Enter" && btnComenzar) {
        btnComenzar.click();
      }
    });
  }

  const inputMensaje = document.getElementById("mensaje");
  const btnEnviar = document.getElementById("btnEnviar");

  if (inputMensaje) {
    inputMensaje.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        responder();
      }
    });
  }

  if (btnEnviar) {
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
  if (!chatBox) return;

  chatBox.innerHTML = `
    <div class="chat-mensaje asistente">
      🤖 <strong>Asistente:</strong> ¡Hola <strong>${usuarioNombre}</strong>! Bienvenido/a al portal de Tapso. ¿En qué te puedo ayudar hoy?
    </div>
  `;
  mostrarSugerenciasIniciales();
}

function mostrarSugerenciasIniciales() {
  const contenedorChips = document.getElementById("sugerencias-container");
  if (!contenedorChips) return;

  contenedorChips.innerHTML = `
    <button class="chip-btn" onclick="enviarSugerencia('Lugares y Distritos')">📍 Lugares y Distritos</button>
    <button class="chip-btn" onclick="enviarSugerencia('Autoridades')">🏛️ Autoridades</button>
    <button class="chip-btn" onclick="enviarSugerencia('Ubicación')">📍 Ubicación</button>
    <button class="chip-btn" onclick="enviarSugerencia('Historia')">📜 Historia</button>
    <button class="chip-btn" onclick="enviarSugerencia('Policía')">👮 Policía</button>
    <button class="chip-btn" onclick="enviarSugerencia('Punto Digital')">💻 Punto Digital</button>
    <button class="chip-btn" onclick="enviarSugerencia('Hostería')">🏨 Hostería</button>
    <button class="chip-btn" onclick="enviarSugerencia('Festivales')">🎉 Festivales</button>
  `;
}

function responder() {
  const input = document.getElementById("mensaje");
  if (!input) return;

  const textoOriginal = input.value.trim();
  const texto = textoOriginal.toLowerCase();
  const chatBox = document.getElementById("chatBox");

  if (texto === "" || !chatBox) return;

  playSend();

  chatBox.innerHTML += `
    <div class="chat-mensaje usuario">
      👤 <strong>Tú:</strong> ${textoOriginal}
    </div>
  `;
  input.value = "";

  let respuesta = "";

  if (/^(hola|hols|buenas|buen|buenos|buenas noches|buenas tardes|que tal|como va|saludos)/i.test(texto)) {
    const saludos = [
      `¡Hola ${usuarioNombre}! ¿En qué puedo ayudarte hoy?`,
      `¡Buenas! Qué gusto saludarte, ${usuarioNombre}. ¿Qué consulta tenés?`,
      `¡Hola, ${usuarioNombre}! Contame, ¿sobre qué tema de Tapso te gustaría consultar?`
    ];
    respuesta = saludos[Math.floor(Math.random() * saludos.length)];
    esperandoEleccionSubtema = null;
  }
  else if (/^(chau|adios|nos vemos|hasta luego|que tengas buen dia|gracias|muchas gracias)/i.test(texto)) {
    const despedidas = [
      `¡Hasta luego, ${usuarioNombre}! Que tengas un excelente día.`,
      `¡De nada, ${usuarioNombre}! Quedo a tu disposición si necesitas algo más.`,
      `¡Nos vemos! Un saludo cordial de parte de la Municipalidad de Tapso.`
    ];
    respuesta = despedidas[Math.floor(Math.random() * despedidas.length)];
    esperandoEleccionSubtema = null;
  }
  else if (["ubicacion", "ubicación", "donde queda", "dónde queda", "como llegar", "cómo llegar", "mapa", "ruta 157"].some(kw => texto.includes(kw))) {
    respuesta = "Tapso cuenta con una particularidad geopolítica: se encuentra dividida entre dos provincias. El sector oeste pertenece al Departamento El Alto (Catamarca) y el sector este al Departamento Choya (Santiago del Estero). La línea de separación son las vías del ferrocarril. Se ubica estratégicamente sobre la Ruta Nacional N° 157.";
    esperandoEleccionSubtema = null;
  }
  else {
    let subtemaEncontrado = null;
    for (const modulo of Object.values(modulosConocimiento)) {
      for (const sub of Object.values(modulo.subtemas)) {
        if (sub.palabrasClave.some(kw => texto.includes(kw))) {
          subtemaEncontrado = sub.respuesta;
          break;
        }
      }
      if (subtemaEncontrado) break;
    }

    if (subtemaEncontrado) {
      respuesta = subtemaEncontrado;
      esperandoEleccionSubtema = null;
    }
    else {
      let moduloGenericoEncontrado = null;
      let claveModulo = null;

      for (const [key, modulo] of Object.entries(modulosConocimiento)) {
        if (modulo.palabrasClaveGenericas.some(kw => texto.includes(kw))) {
          moduloGenericoEncontrado = modulo.preguntaGenerica;
          claveModulo = key;
          break;
        }
      }

      if (moduloGenericoEncontrado) {
        respuesta = moduloGenericoEncontrado;
        esperandoEleccionSubtema = claveModulo;
      }
      else if (esperandoEleccionSubtema && /^(si|sí|bueno|dale|a ver|contame|obvio)/i.test(texto)) {
        respuesta = `¡Bárbaro! Escribime cuál de las opciones que te mencioné te gustaría conocer más a fondo.`;
      }
      else {
        respuesta = obtenerRespuestaDesconocida();
        esperandoEleccionSubtema = null;
      }
    }
  }

  setTimeout(() => {
    playReceive();
    chatBox.innerHTML += `
      <div class="chat-mensaje asistente">
        🤖 <strong>Asistente:</strong> ${formatearTexto(respuesta)}
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 300);
}

function formatearTexto(str) {
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function enviarSugerencia(palabra) {
  const input = document.getElementById("mensaje");
  if (input) {
    input.value = palabra;
    responder();
  }
}

function enviarMensaje() {
  responder();
}

function limpiarChat() {
  playClick();
  temaActual = null;
  contadorConsultasTema = 0;
  esperandoEleccionSubtema = null;
  mostrarSaludoInicial();
}

function toggleModo() {
  playClick();
  document.body.classList.toggle("dark-mode");
}

function toggleDarkMode() {
  toggleModo();
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

function abrirImagenUnica(src, caption) {
  playClick();
  galeriaActual = [{ src: src, caption: caption }];
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

// ----------------------------------------------------
// EVENTO: CIERRE CON LA TECLA ESC
// ----------------------------------------------------
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const modalGaleria = document.getElementById("galleryModal");
    if (modalGaleria && modalGaleria.style.display !== "none") {
      cerrarGaleria();
    }
  }
});