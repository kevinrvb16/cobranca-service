const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Servidor
let porta = 8094;
app.listen(porta, () => {
 console.log('Servidor em execução na porta: ' + porta);
});