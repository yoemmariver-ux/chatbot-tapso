document.addEventListener("DOMContentLoaded", () => {

  /* ====================================================
     1. MODAL DE LOGIN / NOMBRE DE USUARIO
     ==================================================== */
  const modalInicio = document.getElementById("modalInicio");
  const inputNombre = document.getElementById("inputNombre");
  const btnIngresar = document.getElementById("btnIngresar");
  let nombreUsuario = "Vecino/a";

  if (btnIngresar) {
    btnIngresar.addEventListener("click", () => {
      const valorInput = inputNombre.value.trim();
      if (valorInput !== "") {
        nombreUsuario = valorInput;
      }
      modalInicio.style.display = "none";
    });
  }

  /* ====================================================
     2. MODO OSCURO
     ==================================================== */
  const btnModoOscuro = document.getElementById("btnModoOscuro");
  if (btnModoOscuro) {
    btnModoOscuro.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        btnModoOscuro.textContent = "☀️ Modo";
      } else {
        btnModoOscuro.textContent = "🌙 Modo";
      }
    });
  }

  /* ====================================================
     3. ASISTENTE MUNICIPAL (CHAT)
     ==================================================== */
  const chatBox = document.getElementById("chatBox");
  const chatInput = document.getElementById("chatInput");
  const btnEnviar = document.getElementById("btnEnviar");
  const btnLimpiarChat = document.getElementById("btnLimpiarChat");

  function agregarMensaje(texto, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("chat-mensaje", tipo);
    divMensaje.textContent = texto;
    chatBox.appendChild(divMensaje);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function procesarConsulta(mensaje) {
    agregarMensaje(mensaje, "usuario");
    
    // Respuesta simulada del asistente
    setTimeout(() => {
      let respuesta = "Gracias por escribirnos. Para procesar tu solicitud adecuadamente, pods comunicarte con la mesa de entrada de la Municipalidad de Tapso.";
      const msgMinus = mensaje.toLowerCase();

      if (msgMinus.includes("horario")) {
        respuesta = "El horario de atencion municipal es de Lunes a Viernes de 07:00 a 13:00 hs.";
      } else if (msgMinus.includes("tramite") || msgMinus.includes("trámite")) {
        respuesta = "Podes realizar trámites de rentas, licencias y habilitaciones comerciales presencialmente en el municipio.";
      } else if (msgMinus.includes("contacto") || msgMinus.includes("telefono")) {
        respuesta = "Teléfono de contacto municipal: (383) 123-4567 | Punto Digital Tapso.";
      }

      agregarMensaje(respuesta, "asistente");
    }, 600);
  }

  if (btnEnviar && chatInput) {
    btnEnviar.addEventListener("click", () => {
      const txt = chatInput.value.trim();
      if (txt !== "") {
        procesarConsulta(txt);
        chatInput.value = "";
      }
    });

    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const txt = chatInput.value.trim();
        if (txt !== "") {
          procesarConsulta(txt);
          chatInput.value = "";
        }
      }
    });
  }

  window.enviarSugerencia = function(texto) {
    procesarConsulta(texto);
  };

  if (btnLimpiarChat) {
    btnLimpiarChat.addEventListener("click", () => {
      chatBox.innerHTML = `
        <div class="chat-mensaje asistente">
          ¡Hola! Soy el asistente virtual del Municipio de Tapso. ¿En qué puedo ayudarte hoy?
        </div>
      `;
    });
  }

  /* ====================================================
     4. GALERÍA LIGHTBOX (PANTALLA COMPLETA)
     ==================================================== */
  const modalGaleria = document.getElementById("modalGaleria");
  const imgGaleriaFull = document.getElementById("imgGaleriaFull");
  const captionGaleria = document.getElementById("captionGaleria");
  const btnCerrarGaleria = document.getElementById("btnCerrarGaleria");
  const btnPrevGaleria = document.getElementById("btnPrevGaleria");
  const btnNextGaleria = document.getElementById("btnNextGaleria");

  let imagenesGaleria = [];
  let indiceActual = 0;

  function actualizarGaleria() {
    const elem = imagenesGaleria[indiceActual];
    if (elem) {
      imgGaleriaFull.src = elem.src;
      captionGaleria.textContent = elem.dataset.caption || elem.alt || "";
    }
  }

  document.querySelectorAll(".gallery-trigger").forEach((img, index) => {
    imagenesGaleria.push(img);
    img.addEventListener("click", () => {
      indiceActual = index;
      actualizarGaleria();
      modalGaleria.style.display = "flex";
    });
  });

  if (btnCerrarGaleria) {
    btnCerrarGaleria.addEventListener("click", () => {
      modalGaleria.style.display = "none";
    });
  }

  if (btnPrevGaleria) {
    btnPrevGaleria.addEventListener("click", () => {
      indiceActual = (indiceActual - 1 + imagenesGaleria.length) % imagenesGaleria.length;
      actualizarGaleria();
    });
  }

  if (btnNextGaleria) {
    btnNextGaleria.addEventListener("click", () => {
      indiceActual = (indiceActual + 1) % imagenesGaleria.length;
      actualizarGaleria();
    });
  }

  if (modalGaleria) {
    modalGaleria.addEventListener("click", (e) => {
      if (e.target === modalGaleria) {
        modalGaleria.style.display = "none";
      }
    });
  }

  /* ====================================================
     5. OBTENER CLIMA EN VIVO DE TAPSO (OPEN-METEO)
     ==================================================== */
  async function obtenerClimaTapso() {
    const tempElem = document.getElementById("climaTemp");
    const iconoElem = document.getElementById("climaIcono");

    if (!tempElem || !iconoElem) return;

    // Coordenadas aproximadas de Tapso, Catamarca
    const lat = -28.32;
    const lon = -65.11;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      if (datos.current_weather) {
        const temp = Math.round(datos.current_weather.temperature);
        const code = datos.current_weather.weathercode;

        tempElem.textContent = `${temp}°C`;

        // Selección de emoji según código meteorológico
        if (code === 0) iconoElem.textContent = "☀️";
        else if (code >= 1 && code <= 3) iconoElem.textContent = "⛅";
        else if (code >= 45 && code <= 48) iconoElem.textContent = "🌫️";
        else if (code >= 51 && code <= 67) iconoElem.textContent = "🌧️";
        else if (code >= 80 && code <= 82) iconoElem.textContent = "🌦️";
        else if (code >= 95) iconoElem.textContent = "🌩️";
        else iconoElem.textContent = "🌤️";
      }
    } catch (error) {
      console.log("No se pudo obtener el clima:", error);
      tempElem.textContent = "--°C";
    }
  }

  obtenerClimaTapso();
});