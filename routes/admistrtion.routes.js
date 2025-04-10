const express = require("express");
const admistrtion_routes = express.Router("");
const categorie_controller = require("../controllers/categorie.controller");
const clients_controller = require("../controllers/Client.controller");
const produit_controller = require("../controllers/Produits.controller");
const profil_controller = require("../controllers/profil");
const vendeur_controller = require("../controllers/Vendeur.controller");
admistrtion_routes.post("/categorie", categorie_controller.creercategorie);
admistrtion_routes.post("/client", clients_controller.creerclient);
admistrtion_routes.post("/produit", produit_controller.creerproduit);
admistrtion_routes.post("/profil", profil_controller.creerprofil);
admistrtion_routes.post("/vendeur", vendeur_controller.creerVendeur);
admistrtion_routes.get("/list_user",  vendeur_controller.user);
admistrtion_routes.get("/list_cat",  categorie_controller.cat);
admistrtion_routes.get("/list_pro",  produit_controller.produit);
admistrtion_routes.get("/list_profill",  profil_controller.prolll);
admistrtion_routes.get("/liste_client", clients_controller.clien);





module.exports = admistrtion_routes