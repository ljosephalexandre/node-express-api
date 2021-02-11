// Chargement du module express
const express = require('express');
// Instanciation d'un objet express
const app = express();
// Définition du port d'écoute
const port = process.env.PORT||8080;
// Chargement du fichier parkings.json dans ma constante parkings
const parkings = require('./parkings.json');

// Ajout du middleware
app.use(express.json);

// Définition de la route GET /parkings
app.get('/parkings', (req,res) => {
    res.status(200).json(parkings);
});

//Définition de la route GET /parkings/:id
app.get('/parkings/:id', (req,res) => {
    // On récupère l'id passé en paramètre dans ma route
    const id = parseInt(req.params.id);
    // On charge l'objet parking correspondant à l'id passé en paramètre dans l'objet parking
    const parking = parkings.find(parking => parking.id === id);
    // En cas de succès on renvoie l'objet parking (au format JSON) 
    // lors de la consultation de la route paramétrée
    res.status(200).json(parking);
});

// Lancement du serveur sur le port d'écoute défini
app.listen(port, () =>{
    console.log(`Démarrage du serveur 127.0.0.1:${port}`);
});
