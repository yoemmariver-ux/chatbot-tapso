function enviarMensaje() {
  const entrada = document.getElementById("entrada").value.toLowerCase();
  const chat = document.getElementById("chat");

  let respuesta = "";

  // Respuestas predefinidas sobre Tapso
  if (entrada.includes("tapso")) {
    respuesta = "Tapso es una localidad fundada en 1826, ubicada entre Catamarca y Santiago del Estero, con 882 habitantes según el censo 2010. Su gentilicio es tapseño/a y se accede por la Ruta Nacional 157.";
  } else if (entrada.includes("autoridades") || entrada.includes("intendente")) {
    respuesta = "Las máximas autoridades de la Municipalidad de Tapso son el Dr. Mario Alberto Sosa (Intendente Municipal) y Pedro 'Dante' Villalba (Secretario de Gobierno / Intendente Suplente).";
  } else {
    respuesta = "Soy TapsoBot, tu asistente virtual. Preguntame lo que quieras sobre el municipio.";
  }

  // Mostrar mensaje en el chat
  chat.innerHTML += `<div class="user-msg">${entrada}</div>`;
  chat.innerHTML += `<div class="bot-msg">${respuesta}</div>`;

  document.getElementById("entrada").value = "";
}
