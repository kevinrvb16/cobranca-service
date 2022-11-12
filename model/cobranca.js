const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CobrancaSchema = new Schema({
    vagaOcupada: {
        type: Number, 
        required: [true, 'CPF Obrigatório']},
    cobrancaCreditos: {
        type: Number, 
        required: [true, 'Pontos Obrigatório']},
    tempoOcupacao: {
        type: String,
        required: [true, 'Tempo de Ocupação Obrigatório']},
});
// Exportar o modelo
module.exports = mongoose.model('cobranca', CobrancaSchema);