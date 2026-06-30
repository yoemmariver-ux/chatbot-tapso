function enviarMensaje() {
  const entrada = document.getElementById("entrada").value.toLowerCase().trim();
  const chat = document.getElementById("chat");

  let respuesta = "";

  // --- Información sobre Tapso ---
  if (
    entrada.includes("tapso") ||
    entrada.includes("contame de tapso") ||
    entrada.includes("informacion de tapso") ||
    entrada.includes("sobre tapso") ||
    entrada.includes("que es tapso") ||
    entrada.includes("donde queda tapso")
  ) {
    respuesta = "Tapso es una localidad fundada en 1826, ubicada entre Catamarca y Santiago del Estero, con 882 habitantes según el censo 2010. Su gentilicio es tapseño/a y se accede por la Ruta Nacional 157.";
  }

  // --- Autoridades municipales ---
  else if (
    entrada.includes("autoridades") ||
    entrada.includes("intendente") ||
    entrada.includes("quien es el intendente") ||
    entrada.includes("secretario de gobierno") ||
    entrada.includes("gobierno municipal") ||
    entrada.includes("maximas autoridades")
  ) {
    respuesta = "Las máximas autoridades de la Municipalidad de Tapso son el Dr. Mario Alberto Sosa (Intendente Municipal) y Pedro 'Dante' Villalba (Secretario de Gobierno / Intendente Suplente).";
  }

  // --- Distritos ---
  else if (
    entrada.includes("distritos") ||
    entrada.includes("barrios") ||
    entrada.includes("jurisdiccion")
  ) {
    respuesta = "La jurisdicción de Tapso incluye los distritos de Achalco, Ayapaso, Simogasta, Colonia Achalco, Los Morteros, Choya Viejo y La Calera.";
  }

  // --- Eventos y cultura ---
  else if (
    entrada.includes("fiesta") ||
    entrada.includes("festival") ||
    entrada.includes("eventos") ||
    entrada.includes("cultura")
  ) {
    respuesta = "Tapso celebra el Festival Folclórico Unión de Pueblos en enero y la Fiesta de La Quebrada en junio.";
  }

  // --- Demografía ---
  else if (
    entrada.includes("habitantes") ||
    entrada.includes("poblacion") ||
    entrada.includes("censo")
  ) {
    respuesta = "Según el censo 2010, Tapso tiene 882 habitantes: 691 en Santiago del Estero y 191 en Catamarca.";
  }

  // --- Sismicidad ---
  else if (
    entrada.includes("sismo") ||
    entrada.includes("terremoto") ||
    entrada.includes("actividad sísmica")
  ) {
    respuesta = "La región de Tapso presenta sismicidad frecuente de baja intensidad, con antecedentes de terremotos importantes en 1817, 1966, 1973 y 2004.";
  }

  // --- Respuesta genérica ---
  else {
    respuesta = "Soy TapsoBot, tu asistente virtual. Preguntame lo que quieras sobre el municipio.";
  }

  // Mostrar mensajes en el chat
  chat.innerHTML += `<div class="user-msg">${entrada}</div>`;
  chat.innerHTML += `<div class="bot-msg">${respuesta}</div>`;

  document.getElementById("entrada").value = "";
}
