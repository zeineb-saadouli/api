const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");

const PORT = 3000;

//Charger les variables d'environnement
dotenv.config({ path: "./config/.env" });

//Initialisation de l'application
const app = express();
app.use(express.json());

//Routes

//GET
app.get('/getall', async (req, res) => {
    try {
      const users = await User.find();// recuperer toute la bd
      res.status(200).json(users); // return users avec un statut 200 "succés"
    } catch (err) {
      res.status(500).json({ message: err.message }); //erreur serveur
    }
  });

//POST
app.post("/user", async (req, res) => {
    try {
      const user = new User(req.body); // creer un nouvel user à partir des données envoyées dans la requête
      await user.save(); // sauvegarder user dans la bd
      res.status(201).json(user); // return l'utilisateur créé avec un code 201 (créé)
    } catch (err) {
      res.status(400).json({ error: err.message }); //erreur client
    }
  });


//PUT (update by id)
app.put('/user/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });// id récupéré a partie depuis les params de l'url et assignner l'update
      res.status(200).json(updatedUser); //retourner user updated
    } catch (err) {
      res.status(400).json({ message: err.message });// erreur client
    }
  });


//DELETE par id
app.delete('/user/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);// delete user by id
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });//confirmer la supression
    } catch (err) {
      res.status(500).json({ message: err.message }); //erreur serveur
    }
  });

//Connecter la BD
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


//lancer le serveur
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});