
function enviarMensaje() {
  const entrada = document.getElementById("entrada").value.toLowerCase().trim();
  const chat = document.getElementById("chat");

  let respuesta = "";

  // Diccionario de temas y palabras clave
  const temas = {
    tapso: {
      keywords: ["tapso", "contame de tapso", "informacion de tapso", "sobre tapso", "que es tapso", "donde queda tapso"],
      respuesta: "Tapso es una localidad fundada en 1826, ubicada entre Catamarca y Santiago del Estero, con 882 habitantes según el censo 2010. Su gentilicio es tapseño/a y se accede por la Ruta Nacional 157."
    },
    autoridades: {
      keywords: ["autoridades", "intendente", "quien es el intendente", "secretario de gobierno", "gobierno municipal", "maximas autoridades"],
      respuesta: "Las máximas autoridades de la Municipalidad de Tapso son el Dr. Mario Alberto Sosa (Intendente Municipal) y Pedro 'Dante' Villalba (Secretario de Gobierno / Intendente Suplente)."
    },
    distritos: {
      keywords: ["distritos", "barrios", "jurisdiccion", "localidades"],
      respuesta: "La jurisdicción de Tapso incluye los distritos de Achalco, Ayapaso, Simogasta, Colonia Achalco, Los Morteros, Choya Viejo y La Calera."
    },
    cultura: {
      keywords: ["fiesta", "festival", "eventos", "cultura"],
      respuesta: "Tapso celebra el Festival Folclórico Unión de Pueblos en enero y la Fiesta de La Quebrada en junio."
    },
    poblacion: {
      keywords: ["habitantes", "poblacion", "censo"],
      respuesta: "Según el censo 2010, Tapso tiene 882 habitantes: 691 en Santiago del Estero y 191 en Catamarca."
    },
    sismos: {
      keywords: ["sismo", "terremoto", "actividad sísmica"],
      respuesta: "La región de Tapso presenta sismicidad frecuente de baja intensidad, con antecedentes de terremotos importantes en 1817, 1966, 1973 y 2004."
    }
  };

  // Buscar coincidencia en los temas
  let encontrado = false;
  for (const tema in temas) {
    for (const palabra of temas[tema].keywords) {
      if (entrada.includes(palabra)) {
        respuesta = temas[tema].respuesta;
        encontrado = true;
        break;
      }
    }
    if (encontrado) break;
  }

  // Si no encontró nada, respuesta genérica
  if (!encontrado) {
    respuesta = "Soy TapsoBot, tu asistente virtual. Preguntame lo que quieras sobre el municipio.";
  }

  // Mostrar mensajes en el chat
  chat.innerHTML += `<div class="user-msg">${entrada}</div>`;
  chat.innerHTML += `<div class="bot-msg">${respuesta}</div>`;

  document.getElementById("entrada").value = "";
}
=======
function enviarMensaje() {
  const entrada = document.getElementById("entrada").value.toLowerCase().trim();
  const chat = document.getElementById("chat");

  let respuesta = "";

  // Diccionario de temas y palabras clave
  const temas = {
    tapso: {
      keywords: ["tapso", "contame de tapso", "informacion de tapso", "sobre tapso", "que es tapso", "donde queda tapso"],
      respuesta: "Tapso es una localidad fundada en 1826, ubicada entre Catamarca y Santiago del Estero, con 882 habitantes según el censo 2010. Su gentilicio es tapseño/a y se accede por la Ruta Nacional 157."
    },
    autoridades: {
      keywords: ["autoridades", "intendente", "quien es el intendente", "secretario de gobierno", "gobierno municipal", "maximas autoridades"],
      respuesta: "Las máximas autoridades de la Municipalidad de Tapso son el Dr. Mario Alberto Sosa (Intendente Municipal) y Pedro 'Dante' Villalba (Secretario de Gobierno / Intendente Suplente)."
    },
    distritos: {
      keywords: ["distritos", "barrios", "jurisdiccion", "localidades"],
      respuesta: "La jurisdicción de Tapso incluye los distritos de Achalco, Ayapaso, Simogasta, Colonia Achalco, Los Morteros, Choya Viejo y La Calera."
    },
    cultura: {
      keywords: ["fiesta", "festival", "eventos", "cultura"],
      respuesta: "Tapso celebra el Festival Folclórico Unión de Pueblos en enero y la Fiesta de La Quebrada en junio."
    },
    poblacion: {
      keywords: ["habitantes", "poblacion", "censo"],
      respuesta: "Según el censo 2010, Tapso tiene 882 habitantes: 691 en Santiago del Estero y 191 en Catamarca."
    },
    sismos: {
      keywords: ["sismo", "terremoto", "actividad sísmica"],
      respuesta: "La región de Tapso presenta sismicidad frecuente de baja intensidad, con antecedentes de terremotos importantes en 1817, 1966, 1973 y 2004."
    }
  };

  // Buscar coincidencia en los temas
  let encontrado = false;
  for (const tema in temas) {
    for (const palabra of temas[tema].keywords) {
      if (entrada.includes(palabra)) {
        respuesta = temas[tema].respuesta;
        encontrado = true;
        break;
      }
    }
    if (encontrado) break;
  }

  // Si no encontró nada, respuesta genérica
  if (!encontrado) {
    respuesta = "Soy TapsoBot, tu asistente virtual. Preguntame lo que quieras sobre el municipio.";
  }

  // Mostrar mensajes en el chat
  chat.innerHTML += `<div class="user-msg">${entrada}</div>`;
  chat.innerHTML += `<div class="bot-msg">${respuesta}</div>`;

  document.getElementById("entrada").value = "";
}
>>>>>>> 410c6764a90078770e7e545a33659d47df621bab
