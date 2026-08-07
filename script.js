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

    // Respuestas con variantes
    if (mensaje.includes("fundacion") || mensaje.includes("origen") || mensaje.includes("historia")) {
      respuesta.textContent = "Tapso fue fundado en 1826.";
    }
    else if (mensaje.includes("aniversario") || mensaje.includes("cumpleaños")) {
      respuesta.textContent = "Tapso celebra su aniversario cada 12 de agosto.";
    }
    else if (mensaje.includes("ubicacion") || mensaje.includes("donde esta") || mensaje.includes("mapa") || mensaje.includes("provincia") || mensaje.includes("lugar")) {
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
    else if (mensaje.includes("hospital") || mensaje.includes("salud") || mensaje.includes("clinica") || mensaje.includes("hosp")) {
      respuesta.textContent = "El hospital local brinda atención médica básica y emergencias.";
    }
    else if (mensaje.includes("comisaria") || mensaje.includes("policia") || mensaje.includes("seguridad") || mensaje.includes("comi")) {
      respuesta.textContent = "La Comisaría de Tapso se encuentra en el centro del pueblo, cerca de la Municipalidad.";
    }
    else if (mensaje.includes("fiesta") || mensaje.includes("patronal") || mensaje.includes("festival") || mensaje.includes("celebracion")) {
      respuesta.textContent = "Tapso celebra la Fiesta Patronal en honor a San Roque.";
    }
    else if (mensaje.includes("habitantes") || mensaje.includes("poblacion") || mensaje.includes("cantidad de gente")) {
      respuesta.textContent = "Tapso tiene alrededor de 882 habitantes según el censo 2010.";
    }
    else if (mensaje.includes("hosteria") || mensaje.includes("hotel") || mensaje.includes("alojamiento") || mensaje.includes("hospedaje") || mensaje.includes("posada")) {
      respuesta.textContent = "La Hostería de Tapso en Catamarca es un alojamiento ubicado en la localidad de Tapso, en el departamento El Alto.";
    }
    else if (mensaje.includes("punto digital") || mensaje.includes("digital") || mensaje.includes("tecnologia") || mensaje.includes("tic") || mensaje.includes("internet")) {
      respuesta.textContent = "El Punto Digital de Tapso pertenece al programa impulsado por la Secretaría de Innovación Pública.";
    }
    else if (mensaje.includes("distritos") || mensaje.includes("localidades") || mensaje.includes("lugares") || mensaje.includes("tapso")) {
      respuesta.textContent = "La jurisdicción de Tapso comprende: Tapso, Achalco, Ayapaso, Simogasta, Colonia Achalco, Los Morteros, Choya Viejo, La Calera, La Chilca, La Puerta de Molle Yaco, Pozo Grande y Albigasta.";
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
