const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Servidor
let porta = 8094;
app.listen(porta, () => {
 console.log('Servidor em execução na porta: ' + porta);
});

const Cobranca = require('./model/cobranca');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const dataBaseDB = "MinhaLOjaDB";
const collectionDB = "cobranca";
let db = null;

MongoClient.connect(uri, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        console.log('Erro ao conectar no banco de dados ' + dataBaseDB + '!');
        throw error;
    }
    db = client.db(dataBaseDB).collection(collectionDB);
    console.log('Conectado a base de dados: ' + dataBaseDB + '!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Retorna todas as cobrancas
app.get('/Cobranca', (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
        res.send(result);
    });
});

// Retorna uma cobranca associada a um numero de vaga
app.get('/Cobranca/:numeroVaga', (req, res) => {
    db.findOne({ "numeroVaga": req.params.numeroVaga }, (err, result) => {
        if (err) return console.log("Cobranca não encontrada")
    });
    res.send(result);
});

// Cria uma nova cobranca
app.post('/Cobranca', (req, res, next) => {
    const cobranca = new Cobranca({
        "numeroVaga": req.body.numeroVaga,
        "cobrancaCreditos": req.body.cobrancaCreditos,
        "tempoOcupacao": req.body.tempoOcupacao
    });
    db.insertOne(cobranca, (err, result) => {
        if (err) return console.log("Error: " + err);
        res.send('Cobranca cadastrada com sucesso no BD!');
    });
});

// Atualiza a cobranca de creditos e tempo de ocupação da vaga
app.put('/Cobranca/:numeroVaga', (req, res, next) => {
    db.updateOne({"numeroVaga": req.params.numeroVaga }, {
        $set: {
            "cobrancaCreditos": req.body.cobrancaCreditos,
            "tempoOcupacao": req.body.tempoOcupacao
        }
    }, (err, result) => {
        if (err) return console.log("Error: " + err);
        res.send('Cobranca atualizada com sucesso no BD!');
    });
});

// Remove a cobranca
app.delete('/Cobranca/:numeroVaga', (req, res, next) => {
    db.deleteOne({numeroVaga: req.params.numeroVaga },(err, result) => {
        if (err) return console.log("Error: " + err);
        res.send('Cobranca removida do BD!');
    });
});