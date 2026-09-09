// CONFIGURACIÓN DE LAS GALERÍAS DE FOTOS
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

// Carga inicial y Modal de bienvenida
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
      modal.style.display = "none";
      const chatBox = document.getElementById("chatBox");
      chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ¡Hola <strong>${nombre}</strong>! Bienvenido al portal de Tapso. ¿En qué puedo ayudarte hoy?</p>`;
    } else {
      alert("Por favor, ingresa tu nombre para continuar.");
    }
  }
};

// FUNCIONES DE LA GALERÍA
function abrirGaleria(clave) {
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
  indiceActual += direccion;
  if (indiceActual < 0) {
    indiceActual = galeriaActual.length - 1; // Vuelve a la última foto
  } else if (indiceActual >= galeriaActual.length) {
    indiceActual = 0; // Vuelve a la primera foto
  }
  mostrarImagenGaleria();
}

function cerrarGaleria() {
  document.getElementById("galleryModal").style.display = "none";
}

// Navegación por teclado en la galería
document.addEventListener("keydown", function(event) {
  const modal = document.getElementById("galleryModal");
  if (modal.style.display === "flex") {
    if (event.key === "ArrowLeft") cambiarImagen(-1);
    if (event.key === "ArrowRight") cambiarImagen(1);
    if (event.key === "Escape") cerrarGaleria();
  }
});

// Eventos para enviar mensajes en el chat
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
    const chatBox = document.getElementById("chatBox");
    
    // Mostrar mensaje del usuario
    chatBox.innerHTML += `<p>👤 <strong>Tú:</strong> ${mensaje}</p>`;
    mensajeInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Obtener y mostrar la respuesta del asistente
    const respuesta = obtenerRespuesta(mensaje);
    
    setTimeout(() => {
      chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ${respuesta}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 300);
  }
}

// Función para normalizar texto (quita tildes y mayúsculas)
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "");
}

// Lógica de Preguntas y Respuestas del Bot
function obtenerRespuesta(mensaje) {
  const msg = normalizarTexto(mensaje);

  // 1. Intendente / Autoridades
  if (
    msg.includes("intendente") || 
    msg.includes("gobierna") || 
    msg.includes("autoridad") || 
    msg.includes("mario sosa")
  ) {
    return "El intendente actual de Tapso es **Mario Sosa**. La municipalidad cuenta con sus secretarías y áreas de Cultura, Educación, Deportes y Producción.";
  }

  // 2. Policía / Comisaría
  if (
    msg.includes("policia") || 
    msg.includes("comisaria") || 
    msg.includes("patrulla")
  ) {
    return "La comisaría de Tapso se encuentra en el centro del pueblo.";
  }

  // 3. Localidades específicas
  const localidades = [
    "achalco", "ayapaso", "simogasta", "colonia achalco", 
    "los morteros", "choya viejo", "la calera", "la chilca", 
    "puerta de molle yaco", "pozo grande", "albigasta"
  ];

  for (let loc of localidades) {
    if (msg.includes(loc)) {
      return `**${loc.toUpperCase()}** forma parte de la jurisdicción de la Municipalidad de Tapso.`;
    }
  }

  // 4. Distritos / Localidades
  if (
    msg.includes("distrito") || 
    msg.includes("localidad") || 
    msg.includes("barrio") || 
    msg.includes("zona") || 
    msg.includes("lugares pertenecen")
  ) {
    return "La jurisdicción de Tapso comprende los siguientes distritos y localidades: **Tapso, Achalco, Ayapaso, Simogasta, Colonia Achalco, Los Morteros, Choya Viejo, La Calera, La Chilca, La Puerta de Molle Yaco, Pozo Grande y Albigasta**.";
  }

  // 5. Hostería
  if (msg.includes("hosteria")) {
    return "La histórica hostería de Tapso es un espacio cultural y turístico del pueblo, donde se realizan eventos, reuniones y actividades comunitarias.";
  }

  // 6. Historia / Fundación / Bicentenario
  if (
    msg.includes("historia") || 
    msg.includes("fundo") || 
    msg.includes("fundacion") || 
    msg.includes("significa tapso") || 
    msg.includes("bicentenario") || 
    msg.includes("200 anos")
  ) {
    return "Tapso fue fundado en 1826 y en 2026 celebra su bicentenario. Es un pueblo con dos siglos de historia, orgullo y futuro.";
  }

  // 7. Horarios de atención
  if (
    msg.includes("horario") || 
    msg.includes("abre") || 
    msg.includes("atienden") || 
    msg.includes("atencion")
  ) {
    return "El municipio atiende de lunes a viernes de 8:00 a 12:00 hs y de 17:00 a 20:00 hs.";
  }

  // 8. Ubicación del municipio
  if (
    msg.includes("ubicacion") || 
    msg.includes("ubicado") || 
    msg.includes("donde queda") || 
    msg.includes("direccion") || 
    msg.includes("donde esta")
  ) {
    return "La Municipalidad de Tapso se encuentra en Tapso, departamento El Alto, provincia de Catamarca.";
  }

  // 9. Liga de Pádel
  if (
    msg.includes("padel") || 
    msg.includes("torneo") || 
    msg.includes("liga")
  ) {
    return "La inscripción cuesta $20.000. Se juega en la cancha de pádel del Complejo Deportivo de Tapso. Consultas e inscripciones al 📞 3854415855.";
  }

  // 10. Punto Digital / Cursos
  if (
    msg.includes("punto digital") || 
    msg.includes("word") || 
    msg.includes("excel") || 
    msg.includes("curso") || 
    msg.includes("capacitacion")
  ) {
    return "El Punto Digital de Tapso ofrece clases de Word, Excel, acceso a internet, capacitaciones, acompañamiento en trámites digitales y actividades educativas.";
  }

  // 11. Eventos / Cultura / Festivales
  if (
    msg.includes("actividades") || 
    msg.includes("evento") || 
    msg.includes("cultura") || 
    msg.includes("festival") || 
    msg.includes("union de pueblos")
  ) {
    return "Se realizan talleres, festivales como la “Unión de Pueblos”, actividades deportivas en el Complejo Deportivo y celebraciones del aniversario.";
  }

  // 12. Consultas generales sobre Municipalidad
  if (
    msg.includes("muni") || 
    msg.includes("municipalidad") || 
    msg.includes("municipio") || 
    msg.includes("ayuntamiento")
  ) {
    return "La Municipalidad de Tapso se encuentra en Tapso, departamento El Alto, Catamarca. Atiende de Lunes a Viernes de 8:00 a 12:00 y de 17:00 a 20:00 hs.";
  }

  // Mensaje por defecto
  return "Lo siento, no entendí bien tu consulta. Podés preguntarme sobre el **intendente (Mario Sosa)**, **horarios**, **ubicación**, **policía**, **distritos**, **Punto Digital**, la **liga de pádel** o **actividades culturales**.";
}

// Funciones auxiliares
function limpiar() {
  document.getElementById("chatBox").innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}