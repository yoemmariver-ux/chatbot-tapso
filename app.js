const express = require('express');
const app = express();
const dialogflow = require('dialogflow');

// Cliente de sesión con tu clave
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: 'keys/dialogflow-key.json'
});

// Ejemplo de función para enviar un mensaje al agente
async function sendMessage(text) {
  const sessionPath = sessionClient.sessionPath('tu-project-id', 'mi-sesion');
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: 'es',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log('Respuesta del bot:', responses[0].queryResult.fulfillmentText);
}
// Servidor en puerto 3000
app.listen(3000, () => {
  console.log('Servidor backend escuchando en http://localhost:3000');
});
