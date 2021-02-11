// Chargement du module express
const express = require('express');
// Instanciation d'un objet express
const app = express();
// Définition du port d'écoute
const port = process.env.PORT||8080;
// Chargement du fichier parkings.json dans ma constante parkings
const parkings = require('./parkings.json');
const reservations = require('./reservations.json');

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
    console.log(parking.city);
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
    parkings.splice(parkings.indexOf(parking),1);
    // En cas de succès on renvoie l'objet parking mis à jour (au format JSON) 
    // lors de la consultation de la route paramétrée
    res.status(200).json(parkings);
});

//Définition de la route GET /parkings/:id/reservations
app.get('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id);
    const reservationsByParkingId = reservations.filter(
        reservationsByParkingId =>
            reservationsByParkingId.parkingId === id
    );

    res.status(200).json(reservationsByParkingId);
});

//Définition de la route GET /parkings/:id/reservations/:idReservation
app.get('/parkings/:id/reservations/:idReservation', (req, res) => {
    const id = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    const resaByParkIdAndIdResa = reservations.find(reservationsByParkingId => reservationsByParkingId.parkingId === id && reservationsByParkingId.id === idReservation);

    res.status(200).json(resaByParkIdAndIdResa);
});   

// Définition de la route POST /parkings/:id/reservations
app.post('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id);
    const reservationsByParkingId = reservations.filter(
        reservationsByParkingId => 
        reservationsByParkingId.parkingId === id
    );
       reservationsByParkingId.push(req.body);
        
    res.status(200).json(reservationsByParkingId);
});

// Définition de la route PUT /parkings/:id/reservations
app.put('/parkings/:id/reservations/:idReservation', (req, res) => {
    const id = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    let reservation = reservations.find(
        reservation => 
        reservation.parkingId === id 
        && 
        reservation.id === idReservation
    );
    
    reservation.parking =  req.body.parking;
    reservation.parkingId = req.body.parkingId;
    reservation.city = req.body.city;
    reservation.clientName = req.body.clientName;
    reservation.vehicle = req.body.vehicle;
    reservation.licensePlate = req.body.licensePlate;
    reservation.checkin = req.body.checkin;
    reservation.checkout = req.body.checkout;
        
    res.status(200).json(reservation);
});

// Définition de la route DELETE /parkings/:id/reservations
app.delete('/parkings/:id/reservations/:idReservation', (req, res) => {
    const id = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    let reservation = reservations.find(
        reservation => 
        reservation.parkingId === id 
        && 
        reservation.id === idReservation
    );
    
    reservations.splice(reservations.indexOf(reservation), 1);
        
    res.status(200).json(reservations);
});

// Lancement du serveur sur le port d'écoute défini
app.listen(port, () => {
    console.log(`Démarrage du serveur 127.0.0.1:${port}`);
});
