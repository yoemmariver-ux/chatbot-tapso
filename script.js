// Carga inicial y Modal de bienvenida
window.onload = function() {
  const modal = document.getElementById("loginModal");
  const btnComenzar = document.getElementById("btnComenzar");
  const nombreInput = document.getElementById("nombre");

  // Asegura que el modal esté visible al cargar
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

// Eventos para enviar mensajes en el Chat
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
    
    // Obtener y mostrar la respuesta del asistente
    const respuesta = obtenerRespuesta(mensaje);
    setTimeout(() => {
      chatBox.innerHTML += `<p>🤖 <strong>Asistente:</strong> ${respuesta}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll hacia abajo
    }, 400);

    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Función para normalizar texto (quita tildes, mayúsculas y signos)
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remueve tildes
    .replace(/[^a-z0-9\s]/g, "");    // Remueve signos de puntuación y símbolos
}

// Lógica de Preguntas y Respuestas con Variantes
function obtenerRespuesta(mensaje) {
  const msgLimpio = normalizarTexto(mensaje);

  // 1. Horarios de atención
  if (
    msgLimpio.includes("horario") || 
    msgLimpio.includes("horarios") || 
    msgLimpio.includes("abre") || 
    msgLimpio.includes("atienden") || 
    msgLimpio.includes("atencion")
  ) {
    return "El municipio atiende de lunes a viernes de 8:00 a 12:00 hs y de 17:00 a 20:00 hs.";
  }

  // 2. Ubicación del municipio
  if (
    msgLimpio.includes("ubicacion") || 
    msgLimpio.includes("ubicado") || 
    msgLimpio.includes("donde queda") || 
    msgLimpio.includes("direccion") || 
    msgLimpio.includes("donde esta")
  ) {
    return "La Municipalidad de Tapso se encuentra en Tapso, departamento El Alto, provincia de Catamarca.";
  }

  // 3. Cursos de informática / Punto Digital
  if (
    msgLimpio.includes("word") || 
    msgLimpio.includes("excel") || 
    (msgLimpio.includes("inscrib") && msgLimpio.includes("curso")) ||
    (msgLimpio.includes("anot") && msgLimpio.includes("curso")) ||
    (msgLimpio.includes("cursos") && msgLimpio.includes("punto digital"))
  ) {
    return "Podés acercarte al Punto Digital o comunicarte con el área de Cultura y Educación del municipio para anotarte. Allí se dictan clases de Word, Excel y capacitaciones digitales.";
  }

  // 5. Liga de pádel (Priorizada antes que generalidades de cultura)
  if (
    msgLimpio.includes("padel") || 
    msgLimpio.includes("torneo de padel") || 
    msgLimpio.includes("liga de padel")
  ) {
    return "La inscripción cuesta $20.000. Podés llamar al 📞 3854419555 para consultas y anotarte. Cupos limitados. Se juega en la cancha de pádel del Complejo Deportivo de Tapso.";
  }

  // 6. Servicios del Punto Digital (General)
  if (
    msgLimpio.includes("servicios") && msgLimpio.includes("punto digital") ||
    msgLimpio.includes("punto digital")
  ) {
    return "El Punto Digital ofrece clases de Word, Excel, acceso a internet, capacitaciones y acompañamiento en trámites digitales.";
  }

  // 4. Actividades culturales
  if (
    msgLimpio.includes("actividades culturales") || 
    msgLimpio.includes("eventos") || 
    msgLimpio.includes("cultura") || 
    msgLimpio.includes("festivales")
  ) {
    return "Se organizan talleres, festivales como la “Unión de Pueblos”, y actividades deportivas en el Complejo Deportivo.";
  }

  // 7. Aniversario de Tapso
  if (
    msgLimpio.includes("aniversario") || 
    msgLimpio.includes("cumple anos") || 
    msgLimpio.includes("cumpleanos") || 
    msgLimpio.includes("bicentenario") || 
    msgLimpio.includes("200 anos")
  ) {
    return "Tapso celebra sus 200 años en 2026, con actividades especiales y eventos conmemorativos.";
  }

  // Mensaje por defecto cuando no entiende la consulta
  return "Lo siento, no entendí bien tu consulta. Podés preguntarme sobre los horarios del municipio, ubicación, inscripciones a cursos de informática, la liga de pádel, eventos culturales o sobre el Punto Digital.";
}

// Funciones auxiliares
function limpiar() {
  document.getElementById("chatBox").innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}