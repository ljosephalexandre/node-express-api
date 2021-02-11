// Chargement du module express
const express = require('express');
// Instanciation d'un objet express
const app = express();
// Définition du port d'écoute
const port = process.env.PORT||8080;
// Chargement du fichier parkings.json dans ma constante parkings
const parkings = require('./parkings.json');

// Définition de la route GET /parkings
app.get('/parkings', (req,res) => {
    res.status(200).json(parkings);
});

// Lancement du serveur sur le port d'écoute défini
app.listen(port, () =>{
    console.log(`Démarrage du serveur 127.0.0.1:${port}`);
});
