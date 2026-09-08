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

// Eventos para enviar mensajes
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

// Función para normalizar texto (quita tildes, mayúsculas y símbolos)
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "");
}

// Lógica de Preguntas y Respuestas
function obtenerRespuesta(mensaje) {
  const msg = normalizarTexto(mensaje);

  // 1. Horarios de atención
  if (
    msg.includes("horario") || 
    msg.includes("abre") || 
    msg.includes("atienden") || 
    msg.includes("atencion")
  ) {
    return "El municipio atiende de lunes a viernes de 8:00 a 12:00 hs y de 17:00 a 20:00 hs.";
  }

  // 2. Ubicación
  if (
    msg.includes("ubicacion") || 
    msg.includes("ubicado") || 
    msg.includes("donde queda") || 
    msg.includes("direccion") || 
    msg.includes("donde esta")
  ) {
    return "La Municipalidad de Tapso se encuentra en Tapso, departamento El Alto, provincia de Catamarca.";
  }

  // 3. Cursos de informática
  if (
    msg.includes("word") || 
    msg.includes("excel") || 
    msg.includes("curso") || 
    msg.includes("capacitacion")
  ) {
    return "Podés acercarte al Punto Digital o comunicarte con el área de Cultura y Educación del municipio para anotarte. Allí se dictan clases de Word, Excel y capacitaciones digitales.";
  }

  // 4. Liga de pádel
  if (
    msg.includes("padel") || 
    msg.includes("torneo") || 
    msg.includes("liga")
  ) {
    return "La inscripción cuesta $20.000. Podés llamar al 📞 3854419555 para consultas y anotarte. Cupos limitados. Se juega en la cancha de pádel del Complejo Deportivo de Tapso.";
  }

  // 5. Punto Digital (Servicios / General)
  if (msg.includes("punto digital")) {
    return "El Punto Digital ofrece clases de Word, Excel, acceso a internet, capacitaciones y acompañamiento en trámites digitales. Podés acercarte para inscribirte en sus cursos.";
  }

  // 6. Actividades culturales / Eventos
  if (
    msg.includes("actividades") || 
    msg.includes("evento") || 
    msg.includes("cultura") || 
    msg.includes("festival")
  ) {
    return "Se organizan talleres, festivales como la “Unión de Pueblos”, y actividades deportivas en el Complejo Deportivo.";
  }

  // 7. Aniversario / Bicentenario
  if (
    msg.includes("aniversario") || 
    msg.includes("cumple") || 
    msg.includes("bicentenario") || 
    msg.includes("200")
  ) {
    return "Tapso celebra sus 200 años en 2026, con actividades especiales y eventos conmemorativos.";
  }

  // 8. Consultas generales sobre la municipalidad / muni
  if (
    msg.includes("muni") || 
    msg.includes("municipalidad") || 
    msg.includes("municipio")
  ) {
    return "La Municipalidad de Tapso atiende de Lunes a Viernes (8:00 a 12:00 y 17:00 a 20:00 hs). Podés consultarme por horarios, ubicación, Punto Digital, cursos o la liga de pádel.";
  }

  // Mensaje por defecto cuando no reconoce la palabra
  return "Lo siento, no entendí bien tu consulta. Podés preguntarme sobre los **horarios del municipio**, **ubicación**, **cursos del Punto Digital**, la **liga de pádel** o **actividades culturales**.";
}

// Funciones auxiliares
function limpiar() {
  document.getElementById("chatBox").innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}