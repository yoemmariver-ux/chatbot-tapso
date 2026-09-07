document.addEventListener("DOMContentLoaded", () => {
  let nombreUsuario = prompt("¡Hola! Soy el asistente virtual de Tapso. ¿Cuál es tu nombre?");
  if (!nombreUsuario || nombreUsuario.trim() === "") {
    nombreUsuario = "Usuario";
  }

  const chat = document.getElementById("chat");
  const entrada = document.getElementById("entrada");
  const btnEnviar = document.getElementById("btnEnviar");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const toggleBtn = document.getElementById("toggleModo");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
  });

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

    if (mensaje === "historia" || coincide(mensaje, ["fundacion","origen"])) {
      respuesta.textContent = "Tapso fue fundado el 15 de junio de 1826. Se ubica entre Catamarca y Santiago del Estero, con una rica tradición cultural y comunitaria.";
    }
    else if (mensaje === "hosteria" || coincide(mensaje, ["alojamiento","hotel","hospedaje"])) {
      respuesta.textContent = "La Hostería Tapso se encuentra en Av. Virgen del Valle 4234. 🕒 Horarios: Check-in desde las 14:00, check-out hasta las 10:00. 🚫 No se admiten mascotas. Ofrece habitaciones cómodas y entorno rural tranquilo, ideal para familias y visitantes.";
    }
    else if (coincide(mensaje, ["info","informacion","municipio","tapso"])) {
      respuesta.textContent = "Tapso es un municipio del departamento El Alto, Catamarca, con alrededor de 1.001 habitantes. El intendente actual es Mario Sosa. Se celebran fiestas patronales en honor a San Roque y festivales folclóricos como la Fiesta de la Quebrada y el Festival Unión de Pueblos.";
    }
    else if (coincide(mensaje, ["fiesta","festival","evento","celebracion"])) {
      respuesta.textContent = "Tapso celebra la Fiesta Patronal en honor a San Roque cada agosto. Además, en enero se realiza la Fiesta de la Quebrada y en junio el Festival Unión de Pueblos.";
    }
    else if (coincide(mensaje, ["turismo","atractivos","lugares","visitar","que ver"])) {
      respuesta.textContent = "En Tapso podés visitar la Iglesia de La Quebrada, el Museo Histórico Cultural abierto todos los días de 8:00 a 20:00, y disfrutar de la naturaleza en la zona serrana de Molle Yaco.";
    }
    else if (coincide(mensaje, ["comida","gastronomia","platos","cocina","bebida"])) {
      respuesta.textContent = "La gastronomía típica de Tapso incluye empanadas catamarqueñas, locro, humita en chala y tamales. En bebidas, se disfruta la aloja de algarroba y vinos regionales.";
    }
    else if (coincide(mensaje, ["futbol","tapso fc","club atletico tapso","equipo"])) {
      respuesta.textContent = "⚽ Tapso FC participa en el Torneo Regional Federal Amateur. Actualmente ocupa la posición 4 de su grupo, con un 17% de victorias. Ha marcado 6 goles y recibido 16 en la temporada. Su último triunfo fue 1–0 frente a Sportivo Villa Dolores.";
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
