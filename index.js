// Chargement du module express
const express = require('express');
// Instanciation d'un objet express
const app = express();
// Définition du port d'écoute
const port = process.env.PORT||8080;

// Définition de la route GET /parkings
app.get('/parkings', (req,res) => {
    res.send('Liste des parkings');
});

// Lancement du serveur sur le port d'écoute défini
app.listen(port, () =>{
    console.log(`Démarrage du serveur 127.0.0.1:${port}`);
});
