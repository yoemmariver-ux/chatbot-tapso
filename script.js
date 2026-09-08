// Modal de bienvenida
window.onload = function() {
  const modal = document.getElementById("loginModal");
  const btnComenzar = document.getElementById("btnComenzar");
  const nombreInput = document.getElementById("nombre");

  modal.style.display = "block";

  btnComenzar.onclick = function() {
    const nombre = nombreInput.value.trim();
    if (nombre !== "") {
      modal.style.display = "none";
      const chatBox = document.getElementById("chatBox");
      chatBox.innerHTML += `<p><strong>Bienvenido, ${nombre} 👋</strong></p>`;
    }
  };
};

// Chat básico
document.getElementById("btnEnviar").onclick = function() {
  const mensaje = document.getElementById("mensaje").value.trim();
  if (mensaje !== "") {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><strong>Tú:</strong> ${mensaje}</p>`;
    document.getElementById("mensaje").value = "";
  }
};

function limpiar() {
  document.getElementById("chatBox").innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
