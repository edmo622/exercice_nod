const Validation = require("../class/Validation")
const Utilisateur = require("../models/Utilisateurs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()
const creercategorie = async (req, res) => {
    try {
    const { DESCRIPTION} = req.body
    const data = {
        ...req.body,
        }
        const validation = new Validation(data, {
            DESCRIPTION: {
                required: true,
                alpha: true,
                length: [2, 20]
                },
            }, {
                DESCRIPTION: {
                required: "Ce champ est obligatoire",
                alpha: "Le nom doit contenir des caractères alphanumériques",
                length: "Le nom doit comporter entre 2 et 20 caractères"
                }
            })
            await validation.run()
            const isValid = await validation.isValidate()
            if(!isValid) {
            const errors = await validation.getErrors()
            return res.status(422).json({
            message: "La validation des données a echouée",
            data: errors
            })
            }
    const nouveaucat = await Utilisateur.create({
    DESCRIPTION: DESCRIPTION
    })
    res.status(200).json({
    message: "Nouvel categorie créé avec succès",
    data: nouveaucat
    })
    } catch (error) {
    console.log(error)
    res.status(500).send("Erreur interne du serveur")
    }
   }

   const cat = async (req, res) => {
    try {
    const utilisateurs = await Utilisateur.findAll()
    res.status(200).json(utilisateurs)
    } catch (error) {
    res.status(500).send("Erreur interne du serveur")
    }
   }

   
module.exports = {
creercategorie,
cat

}
   