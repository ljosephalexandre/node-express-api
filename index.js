// Chargement du module express
const express = require('express');
// Instanciation d'un objet express
const app = express();
// Définition du port d'écoute
const port = process.env.PORT||8080;
// Chargement du fichier parkings.json dans ma constante parkings
const parkings = require('./parkings.json');

// Ajout du middleware
app.use(express.json());

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

// Définition de la route POST /parkings
app.post('/parkings', (req, res) => {
    // On envoie les données d'un nouveau parking pour les ajouter à notre liste de parkings existante
    parkings.push(req.body);
    // En cas de succès on renvoie la liste d'objet parking actualisée(au format JSON) 
    res.status(200).json(parkings);
});

// Définition de la route PUT /parkings
app.put('/parkings/:id', (req, res) => {
    // On récupère l'id passé en paramètre dans ma route
    const id = parseInt(req.params.id);
    // On charge l'objet parking correspondant à l'id passé en paramètre dans l'objet parking
    let parking = parkings.find(parking => parking.id === id);
    // On modifie les propriétés de l'objet
    parking.name = req.body.name;
    parking.city = req.body.city;
    parking.type = req.body.type;
    // En cas de succès on renvoie l'objet parking mis à jour (au format JSON) 
    // lors de la consultation de la route paramétrée
    res.status(200).json(parking);
});

// Définition de la route DELETE /parkings
app.delete('/parkings/:id', (req, res) => {
    // On récupère l'id passé en paramètre dans ma route
    const id = parseInt(req.params.id);
    // On charge l'objet parking correspondant à l'id passé en paramètre dans l'objet parking
    let parking = parkings.find(parking => parking.id === id);
    //On supprime le parking sélectionné de la liste de parkings
    parkings.slice(parkings.indexOf(parking),1);
    // En cas de succès on renvoie l'objet parking mis à jour (au format JSON) 
    // lors de la consultation de la route paramétrée
    res.status(200).json(parkings);
});

// Lancement du serveur sur le port d'écoute défini
app.listen(port, () => {
    console.log(`Démarrage du serveur 127.0.0.1:${port}`);
});
