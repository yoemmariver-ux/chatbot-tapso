// Preguntar nombre al inicio
let nombreUsuario = prompt("¡Hola! Soy el asistente virtual de Tapso. ¿Cuál es tu nombre?");
if (!nombreUsuario || nombreUsuario.trim() === "") {
  nombreUsuario = "Usuario";
}

document.addEventListener("DOMContentLoaded", () => {
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

    if (mensaje.includes("fundacion") || mensaje.includes("origen") || mensaje.includes("historia")) {
      respuesta.textContent = "Tapso fue fundado en 1826.";
    }
    else if (mensaje.includes("aniversario") || mensaje.includes("cumpleaños")) {
      respuesta.textContent = "Tapso celebra su aniversario cada 12 de agosto.";
    }
    else if (mensaje.includes("ubicacion") || mensaje.includes("donde esta") || mensaje.includes("mapa") || mensaje.includes("provincia")) {
      respuesta.textContent = "Tapso está ubicado en el límite entre Catamarca y Santiago del Estero.";
    }
    else {
      respuesta.textContent = respuestasNoInfo[Math.floor(Math.random() * respuestasNoInfo.length)];
    }

    chat.appendChild(respuesta);
    entrada.value = "";
    chat.scrollTop = chat.scrollHeight;
  }

  btnEnviar.addEventListener("click", enviarMensaje);
  entrada.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarMensaje();
    }
  });

  btnLimpiar.addEventListener("click", () => {
    chat.innerHTML = "";
    nombreUsuario = prompt("¡Hola! Soy el asistente virtual de Tapso. ¿Cuál es tu nombre?");
    if (!nombreUsuario || nombreUsuario.trim() === "") {
      nombreUsuario = "Usuario";
    }
    const saludo = document.createElement("div");
    saludo.className = "mensaje-bot";
    saludo.textContent = "Encantado de atenderte, " + nombreUsuario + ". ¿En qué puedo ayudarte?";
    chat.appendChild(saludo);
  });
});
