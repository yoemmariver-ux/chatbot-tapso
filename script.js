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

  // Función de distancia de Levenshtein
  function distancia(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Función para verificar coincidencia aproximada
  function coincide(mensaje, variantes) {
    return variantes.some(v => distancia(mensaje, v) <= 2 || mensaje.includes(v));
  }

  function enviarMensaje() {
    const mensaje = entrada.value.toLowerCase().trim();
    if (mensaje === "") return;

    const mensajeUsuario = document.createElement("div");
    mensajeUsuario.className = "mensaje-usuario";
    mensajeUsuario.textContent = mensaje;
    chat.appendChild(mensajeUsuario);

    const respuesta = document.createElement("div");
    respuesta.className = "mensaje-bot";

    // Ejemplos de respuestas
    if (coincide(mensaje, ["fundacion","origen","historia"])) {
      respuesta.textContent = "Tapso fue fundado en 1826.";
    }
    else if (coincide(mensaje, ["aniversario","cumpleaños"])) {
      respuesta.textContent = "Tapso celebra su aniversario cada 12 de agosto.";
    }
    else if (coincide(mensaje, ["ubicacion","donde esta","mapa","provincia"])) {
      respuesta.textContent = "Tapso está ubicado en el límite entre Catamarca y Santiago del Estero.";
    }
    else if (coincide(mensaje, ["intendente"])) {
      respuesta.textContent = "El intendente actual de Tapso es el Dr. Mario Alberto Sosa.";
    }
    else if (coincide(mensaje, ["municipalidad","ayuntamiento","municipio","muni"])) {
      respuesta.textContent = "La Municipalidad de Tapso está frente a la plaza principal.";
    }
    else if (coincide(mensaje, ["hospital","salud","clinica","hosp"])) {
      respuesta.textContent = "El hospital local brinda atención médica básica y emergencias.";
    }
    else if (coincide(mensaje, ["fiesta","patronal","festival","celebracion"])) {
      respuesta.textContent = "Tapso celebra la Fiesta Patronal en honor a San Roque.";
    }
    else if (coincide(mensaje, ["habitantes","poblacion"])) {
      respuesta.textContent = "Tapso tiene alrededor de 882 habitantes según el censo 2010.";
    }
    else if (coincide(mensaje, [
      "localidades","distritos","lugares","lista","info","informacion"
    ])) {
      respuesta.textContent =
        "La jurisdicción de Tapso comprende:\n" +
        "- Tapso: cabecera municipal.\n" +
        "- Achalco: zona rural agrícola.\n" +
        "- Ayapaso: paraje ganadero.\n" +
        "- Simogasta: localidad cultural.\n" +
        "- Colonia Achalco: asentamiento agrícola.\n" +
        "- Los Morteros: comunidad rural.\n" +
        "- Choya Viejo: paraje histórico.\n" +
        "- La Calera: producción de cal.\n" +
        "- La Chilca: área rural.\n" +
        "- La Puerta de Molle Yaco: acceso serrano.\n" +
        "- Pozo Grande: comunidad rural.\n" +
        "- Albigasta: localidad cercana con vínculos históricos.";
    }
    else if (coincide(mensaje, ["albigasta"])) {
      respuesta.textContent = "Albigasta es una localidad cercana con vínculos históricos con Tapso.";
    }
    else {
      respuesta.textContent = respuestasNoInfo[Math.floor(Math.random() * respuestasNoInfo.length)];
    }

    chat.appendChild(respuesta);
    entrada.value = "";
    chat.scrollTop = chat.scrollHeight;
  }

  // Eventos de botones y teclado
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
}); // ← cierre de DOMContentLoaded
