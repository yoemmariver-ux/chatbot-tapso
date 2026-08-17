document.addEventListener("DOMContentLoaded", () => {
  // Preguntar nombre al inicio
  let nombreUsuario = prompt("¡Hola! Soy el asistente virtual de Tapso. ¿Cuál es tu nombre?");
  if (!nombreUsuario || nombreUsuario.trim() === "") {
    nombreUsuario = "Usuario";
  }

  const chat = document.getElementById("chat");
  const entrada = document.getElementById("entrada");
  const btnEnviar = document.getElementById("btnEnviar");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const toggleBtn = document.getElementById("toggleModo");

  // Modo claro/oscuro
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
  });

  // Mensaje inicial
  const saludo = document.createElement("div");
  saludo.className = "mensaje-bot";
  saludo.textContent = "Encantado de atenderte, " + nombreUsuario + ". ¿En qué puedo ayudarte?";
  chat.appendChild(saludo);

  const respuestasNoInfo = [
    "Lo siento, no tengo esa información.",
    "No cuento con datos sobre eso.",
    "Esa información no está disponible en este momento.",
    "Disculpa, no encontré respuesta para tu consulta."
  ];

  function enviarMensaje() {
    const mensaje = entrada.value.toLowerCase().trim();
    if (mensaje === "") return;

    const mensajeUsuario = document.createElement("div");
    mensajeUsuario.className = "mensaje-usuario";
    mensajeUsuario.textContent = mensaje;
    chat.appendChild(mensajeUsuario);

    const respuesta = document.createElement("div");
    respuesta.className = "mensaje-bot";

    // Respuestas con variantes
    if (mensaje.includes("fundacion") || mensaje.includes("origen") || mensaje.includes("historia")) {
      respuesta.textContent = "Tapso fue fundado en 1826.";
    }
    else if (mensaje.includes("aniversario") || mensaje.includes("cumpleaños")) {
      respuesta.textContent = "Tapso celebra su aniversario cada 12 de agosto.";
    }
    else if (mensaje.includes("ubicacion") || mensaje.includes("donde esta") || mensaje.includes("mapa") || mensaje.includes("provincia")) {
      respuesta.textContent = "Tapso está ubicado en el límite entre Catamarca y Santiago del Estero.";
    }
    else if (mensaje.includes("intendente")) {
      respuesta.textContent = "El intendente actual de Tapso es el Dr. Mario Alberto Sosa.";
    }
    else if (mensaje.includes("autoridades") || mensaje.includes("gobierno") || mensaje.includes("funcionarios")) {
      respuesta.textContent = "Las autoridades de Tapso son el intendente Dr. Mario Alberto Sosa y el Secretario de Gobierno Pedro 'Dante' Villalba.";
    }
    else if (mensaje.includes("municipalidad") || mensaje.includes("ayuntamiento") || mensaje.includes("municipio") || mensaje.includes("muni")) {
      respuesta.textContent = "La Municipalidad de Tapso está frente a la plaza principal.";
    }
    else if (mensaje.includes("escuela") || mensaje.includes("colegio") || mensaje.includes("educacion") || mensaje.includes("instituto") || mensaje.includes("cole")) {
      respuesta.textContent = "Tapso cuenta con la Escuela Primaria N° 277 'Nicolás Avellaneda' y la Escuela Secundaria N° 71 'Dr. Miguel Ángel Arévalo'.";
    }
    else if (mensaje.includes("hospital") || mensaje.includes("salud