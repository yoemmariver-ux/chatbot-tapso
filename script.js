// CARGA Y CONFIGURACIÓN DE EFECTOS DE SONIDO UI
const sndClick = new Audio('sounds/click.mp3');
const sndSend = new Audio('sounds/send.mp3');
const sndReceive = new Audio('sounds/receive.mp3');

sndClick.volume = 0.2;
sndSend.volume = 0.3;
sndReceive.volume = 0.3;

function playClick() {
  sndClick.currentTime = 0;
  sndClick.play().catch(() => {});
}

function playSend() {
  sndSend.currentTime = 0;
  sndSend.play().catch(() => {});
}

function playReceive() {
  sndReceive.currentTime = 0;
  sndReceive.play().catch(() => {});
}

// VARIABLE DE MEMORIA PARA EL HILO DE CONVERSACIÓN
let contextoActual = null; // Guardará el último tema: 'muni', 'policia', 'futbol', 'puntodigital', 'hosteria', 'historia', 'tramites'

// GALERÍAS DE FOTOS
const galerias = {
  tapsofc: [
    { src: "images/tapsofc.jpg", caption: "Club Tapso FC - Escudo Oficial" },
    { src: "images/tapsofc1.jpg", caption: "Club Tapso FC - Banner Institucional" },
    { src: "images/tapsofc2.jpg", caption: "Club Tapso FC - Plantel de Jugadores" }
  ],
  hosteria: [
    { src: "images/hosteria.jpg", caption: "La histórica hostería de Tapso - Fachada de ingreso" },
    { src: "images/hosteria1.jpg", caption: "La histórica hostería de Tapso - Vista exterior lateral" },
    { src: "images/hosteria2.jpg", caption: "La histórica hostería de Tapso - Interior y comedor" },
    { src: "images/hosteria3.jpg", caption: "La histórica hostería de Tapso - Sala de estar con TV" },
    { src: "images/hosteria4.jpg", caption: "La histórica hostería de Tapso - Habitaciones" }
  ],
  festival: [
    { src: "images/festival.jpg", caption: "Festival Unión de Pueblos - Escenario y cartelera principal" }
  ],
  padel: [
    { src: "images/padel-tapso.jpg", caption: "Liga de Pádel Tapso - Afiche Oficial e información de torneo" }
  ]
};

let galeriaActual = [];
let indiceActual = 0;

// MODAL DE BIENVENIDA
window.onload = function() {
  const modal = document.getElementById("loginModal");
  const btnComenzar = document.getElementById("btnComenzar");
  const nombreInput = document.getElementById("nombre");

  modal.style.display = "flex";

  btnComenzar.onclick = function() {
    iniciarSesion();
  };

  nombreInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      iniciarSesion();
    }
  });

  function iniciarSesion() {
    const nombre = nombreInput.value.trim();
    if (nombre !== "") {
      playReceive();
      modal.style.display = "none";
      const chatBox = document.getElementById("chatBox");
      chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ¡Hola <strong>${nombre}</strong>! Bienvenido al portal de Tapso.<br>¿Sobre qué tema necesitas información hoy?</p>`;
      chatBox.innerHTML += `
        <div class="sugerencias-container">
          <button class="chip-btn" onclick="enviarSugerencia('Municipalidad')">🏛️ Muni / Municipio</button>
          <button class="chip-btn" onclick="enviarSugerencia('Policia')">👮 Policía</button>
          <button class="chip-btn" onclick="enviarSugerencia('Tapso FC')">⚽ Fútbol (Tapso FC)</button>
          <button class="chip-btn" onclick="enviarSugerencia('Punto Digital')">💻 Punto Digital</button>
          <button class="chip-btn" onclick="enviarSugerencia('Hostería')">🏨 Hostería</button>
          <button class="chip-btn" onclick="enviarSugerencia('Historia')">📜 Historia</button>
          <button class="chip-btn" onclick="enviarSugerencia('Trámites')">📄 Trámites</button>
        </div>
      `;
    } else {
      playClick();
      alert("Por favor, ingresa tu nombre para continuar.");
    }
  }
};

// GALERÍA
function abrirGaleria(clave) {
  playClick();
  if (galerias[clave] && galerias[clave].length > 0) {
    galeriaActual = galerias[clave];
    indiceActual = 0;
    mostrarImagenGaleria();
    document.getElementById("galleryModal").style.display = "flex";
  }
}

function mostrarImagenGaleria() {
  const imgElement = document.getElementById("imgGaleria");
  const captionElement = document.getElementById("captionGaleria");
  imgElement.src = galeriaActual[indiceActual].src;
  captionElement.textContent = `${galeriaActual[indiceActual].caption} (${indiceActual + 1}/${galeriaActual.length})`;
}

function cambiarImagen(direccion) {
  playClick();
  indiceActual += direccion;
  if (indiceActual < 0) indiceActual = galeriaActual.length - 1;
  else if (indiceActual >= galeriaActual.length) indiceActual = 0;
  mostrarImagenGaleria();
}

function cerrarGaleria() {
  playClick();
  document.getElementById("galleryModal").style.display = "none";
}

document.addEventListener("keydown", function(event) {
  const modal = document.getElementById("galleryModal");
  if (modal.style.display === "flex") {
    if (event.key === "ArrowLeft") cambiarImagen(-1);
    if (event.key === "ArrowRight") cambiarImagen(1);
    if (event.key === "Escape") cerrarGaleria();
  }
});

// ENVÍO DE MENSAJES Y SUGERENCIAS
function enviarSugerencia(texto) {
  document.getElementById("mensaje").value = texto;
  enviarMensaje();
}

document.getElementById("btnEnviar").onclick = enviarMensaje;

document.getElementById("mensaje").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    enviarMensaje();
  }
});

function enviarMensaje() {
  const mensajeInput = document.getElementById("mensaje");
  const mensaje = mensajeInput.value.trim();
  
  if (mensaje !== "") {
    playSend();
    const chatBox = document.getElementById("chatBox");
    
    chatBox.innerHTML += `<p>👤 <strong>Tú:</strong> ${mensaje}</p>`;
    mensajeInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
    
    const respuesta = obtenerRespuestaConHilo(mensaje);
    
    setTimeout(() => {
      playReceive();
      chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ${respuesta}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);
  }
}

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "");
}

// LÓGICA DE RESPUESTA CON SEGUIMIENTO DE HILO (CONTEXTO)
function obtenerRespuestaConHilo(mensaje) {
  const msg = normalizarTexto(mensaje);

  // 1. MUNICIPALIDAD / MUNI
  if (msg.includes("muni") || msg.includes("municipio") || msg.includes("municipalidad") || msg.includes("intendente") || msg.includes("mario sosa")) {
    contextoActual = "muni";
    return "La **Municipalidad de Tapso** es encabezada por el intendente Mario Sosa. El edificio central atiende de lunes a viernes de 8:00 a 12:00 hs y de 17:00 a 20:00 hs. ¿Querés saber sobre trámites, secretarías o ubicación?";
  }

  // 2. POLICÍA
  if (msg.includes("policia") || msg.includes("comisaria") || msg.includes("seguridad") || msg.includes("patrulla")) {
    contextoActual = "policia";
    return "La **Comisaría de Tapso** brinda servicio de prevención y guardia las 24 hs. Se ubica en la zona central del pueblo. ¿Necesitás realizar alguna exposición civil o trámite policial?";
  }

  // 3. FÚTBOL / TAPSO FC
  if (msg.includes("futbol") || msg.includes("tapsofc") || msg.includes("tapso fc") || msg.includes("cancha") || msg.includes("equipo")) {
    contextoActual = "futbol";
    return "El **Club Tapso FC** representa al pueblo en los torneos locales y regionales. También contás con las actividades de la Liga de Pádel en el Complejo Deportivo. ¿Querés ver fotos o saber de los entrenamientos?";
  }

  // 4. PUNTO DIGITAL
  if (msg.includes("punto digital") || msg.includes("computacion") || msg.includes("curso") || msg.includes("internet") || msg.includes("excel") || msg.includes("word")) {
    contextoActual = "puntodigital";
    return "El **Punto Digital Tapso** ofrece cursos gratuitos de informática, capacitaciones laborales, acceso libre a internet y apoyo en trámites online. ¿Te gustaría conocer los horarios o los cursos disponibles?";
  }

  // 5. HOSTERÍA
  if (msg.includes("hosteria") || msg.includes("hospedaje") || msg.includes("alojamiento") || msg.includes("turismo")) {
    contextoActual = "hosteria";
    return "La **Histórica Hostería de Tapso** es un punto emblemático del pueblo, ideal para eventos culturales y alojamiento de visitantes. Podés ver las fotos en la sección 'Conocé Tapso'. ¿Querés saber más de sus instalaciones?";
  }

  // 6. HISTORIA / BICENTENARIO
  if (msg.includes("historia") || msg.includes("fundacion") || msg.includes("bicentenario") || msg.includes("200 anos") || msg.includes("origen")) {
    contextoActual = "historia";
    return "Tapso fue fundado en **1826** y se encamina a celebrar su Bicentenario en 2026. Es una comunidad con profunda raíz ferroviaria y cultural en El Alto, Catamarca.";
  }

  // 7. TRÁMITES
  if (msg.includes("tramite") || msg.includes("tramites") || msg.includes("carnet") || msg.includes("licencia") || msg.includes("gestion")) {
    contextoActual = "tramites";
    return "Para realizar **trámites municipales** (licencias, tasas, certificaciones) podés dirigirte a la Municipalidad en horario de mañana (8:00 a 12:00 hs). En el Punto Digital también se asesora con trámites online (ANSES, AFIP, etc.).";
  }

  // --- HILO DE CONVERSACIÓN (SEGUIMIENTO SEGÚN EL CONTEXTO) ---
  if (contextoActual === "muni") {
    if (msg.includes("horario") || msg.includes("cuando") || msg.includes("abre")) {
      return "El horario de la **Municipalidad** es de Lunes a Viernes de 8:00 a 12:00 hs y de 17:00 a 20:00 hs.";
    }
    if (msg.includes("donde") || msg.includes("ubicacion") || msg.includes("queda")) {
      return "La Municipalidad está ubicada en el centro de Tapso, departamento El Alto, Catamarca.";
    }
  }

  if (contextoActual === "policia") {
    if (msg.includes("donde") || msg.includes("ubicacion") || msg.includes("queda")) {
      return "La Comisaría está ubicada en el casco céntrico de Tapso, sobre la avenida principal.";
    }
    if (msg.includes("horario") || msg.includes("atencion")) {
      return "La Comisaría tiene guardia permanente activa las 24 horas.";
    }
  }

  if (contextoActual === "puntodigital") {
    if (msg.includes("donde") || msg.includes("ubicacion")) {
      return "El Punto Digital funciona dentro de las instalaciones municipales de Tapso.";
    }
    if (msg.includes("curso") || msg.includes("que hay")) {
      return "Hay cursos de alfabetización digital, procesador de texto (Word), planillas de cálculo (Excel) y capacitaciones administrativas con certificación.";
    }
  }

  if (contextoActual === "futbol") {
    if (msg.includes("foto") || msg.includes("imagenes") || msg.includes("ver")) {
      abrirGaleria('tapsofc');
      return "¡Te abrí la galería del **Club Tapso FC** para que veas las fotos!";
    }
  }

  if (contextoActual === "hosteria") {
    if (msg.includes("foto") || msg.includes("ver") || msg.includes("imagenes")) {
      abrirGaleria('hosteria');
      return "¡Aquí tenés las fotos de la **Hostería de Tapso**!";
    }
  }

  // Respuesta por defecto si no detecta tema ni hilo
  return "Entiendo. Podés preguntarme específicamente sobre **muni**, **policía**, **fútbol (Tapso FC)**, **Punto Digital**, **hostería**, **historia** o **trámites**.";
}

function limpiar() {
  playClick();
  contextoActual = null; // Reinicia la memoria del hilo
  document.getElementById("chatBox").innerHTML = "";
}

function toggleDarkMode() {
  playClick();
  document.body.classList.toggle("dark-mode");
}