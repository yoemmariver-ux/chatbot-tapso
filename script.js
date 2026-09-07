function login() {
  let nombre = document.getElementById("nombre").value;
  alert("Bienvenido " + nombre);
  document.getElementById("loginModal").style.display = "none";
}

// Simulación login Gmail
document.getElementById("gmailLogin").addEventListener("click", () => {
  alert("Login con Gmail exitoso (simulado)");
  document.getElementById("loginModal").style.display = "none";
});

// Respuestas precargadas
const respuestas = {
  "hola": "¡Hola! Encantado de ayudarte.",
  "muni": "Encantado de ayudarte desde la Municipalidad.",
  "policía": "Encantado de ayudarte desde la Policía.",
  "evento": "Consulta el calendario para ver los próximos eventos.",
};

function enviar() {
  let mensaje = document.getElementById("mensaje").value.toLowerCase();
  let chatBox = document.getElementById("chatBox");
  let respuesta = respuestas[mensaje] || "No entiendo, ¿podés repetir?";
  chatBox.innerHTML += "<p>👤 " + mensaje + "</p>";
  chatBox.innerHTML += "<p>🤖 " + respuesta + "</p>";
  document.getElementById("mensaje").value = "";
}

function limpiar() {
  document.getElementById("chatBox").innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
