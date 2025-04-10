const Validation = require("../class/Validation")
const Utilisateur = require("../models/Produits")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()
const creerproduit = async (req, res) => {
    try {
        const { DESCRIPTION, ID_CATEGORI, PRIX_UNITAIRE } = req.body
        const data = {
            ...req.body,
        }
      
        const validation = new Validation(data, {
            DESCRIPTION: {
                required: true,
                alpha: true,
                length: [2, 20]
            },
            ID_CATEGORI: {
                required: true,
                number: true,
              
            },
            PRIX_UNITAIRE: {
                required: true,
                number: true,
                length: [2, 20]
            },
          
        }, {
            DESCRIPTION: {
                required: "Ce champ est obligatoire",
                alpha: "Le nom doit contenir des caractères alphanumériques",
                length: "Le nom doit comporter entre 2 et 20 caractères"
            },
            ID_CATEGORI: {
                required: "Ce champ est obligatoire",
                number: "Le nom doit contenir des caractères alphanumériques"
        
            },
            PRIX_UNITAIRE: {
                required: "Ce champ est obligatoire",
                number: "Le nom doit contenir des caractères alphanumériques",
                length: "Le nom doit comporter entre 2 et 20 caractères"
            }
           
        })
        // return  console.log(data);
        await validation.run()
        const isValid = await validation.isValidate()
        if (!isValid) {
            const errors = await validation.getErrors()
            return res.status(422).json({
                message: "La validation des données a echouée",
                data: errors
            })
        }
        const nouveaucat = await Utilisateur.create({
            DESCRIPTION: DESCRIPTION,
            ID_CATEGORI: ID_CATEGORI,
            PRIX_UNITAIRE: PRIX_UNITAIRE
        })
        res.status(200).json({
            message: "Nouvel produit créé avec succès",
            data: nouveaucat
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Erreur interne du serveur")
    }
}
const produit = async (req, res) => {
    try {
    const utilisateurs = await Utilisateur.findAll()
    res.status(200).json(utilisateurs)
    } catch (error) {
    res.status(500).send("Erreur interne du serveur")
    }
   }

module.exports = {
    creerproduit,
    produit
}

