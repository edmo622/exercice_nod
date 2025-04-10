const UtilisateurUpload = require("../class/uploads/UtilisateurUpload")
const IMAGES_DESTINATIONS = require("../constants/IMAGES_DESTINATIONS")
const path = require("path")
const Validation = require("../class/Validation")
const Utilisateur = require("../models/Vendeur")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()

const creerVendeur = async (req, res) => {
    try {
    const { NOM, PRENOM, ID_PROFIL, EMAIL, MODE_DE_PASSE,TELEPHONE,ADRESSE } = req.body
    // console.log(req.body);
    const { IMAGE } = req.files || {}
    const data = {
    ...req.body,
    ...req.files
    }
    const validation = new Validation(data, {
    NOM: {
    required: true,
    alpha: true,
    length: [2, 20]
    },
    PRENOM: {
    required: true,
    alpha: true,
    length: [2, 20]
    },
    ID_PROFIL: {
    required: true,
    number: true,
    // exists: "profils,ID_PROFIL"
    },
    IMAGE: {
    required: true,
    image: 2000000
    },
    EMAIL: {
    required: true,
    email: true,
    unique: "vendeurs,EMAIL"
    },
    MODE_DE_PASSE: {
    required: true,
    length: [8]
    }
    ,
    TELEPHONE: {
    required: true,
    length: [8]
    },
    ADRESSE: {
    required: true,
    alpha: true,
    length: [2, 20]
    }
    }, {
    ADRESSE: {
    required: "Ce champ est obligatoire",
    alpha: "Le nom doit contenir des caractères alphanumériques",
    length: "Le nom doit comporter entre 2 et 20 caractères"
    },
    NOM: {
        required: "Ce champ est obligatoire",
        alpha: "Le nom doit contenir des caractères alphanumériques",
        length: "Le nom doit comporter entre 2 et 20 caractères"
        },
    PRENOM: {
    required: "Ce champ est obligatoire",
    alpha: "Le prénom doit contenir des caractères alphanumériques",
    length: "Le prénom doit comporter entre 2 et 20 caractères"
    },
    ID_PROFIL: {
    required: "Le profil est obligatoire",
    number: "Ce champ doit contenir un nombre valide",
    exists: "Le profil n'existe pas"
    },
    IMAGE: {
    required: "L'image de l'utilisateur est obligatoire",
    image: "L'image est valide",
    size: "Image trop volumineuse (max: 2Mo)"
    },
    EMAIL: {
    required: "L'email est obligatoire",
    email: "Email invalide",
    unique: "Email déjà utilisé"
    },
    MODE_DE_PASSE: {
    required: "Le mot de passe est obligatoire",
    length: "Le mot de passe doit contenir au moins 8 caracteres"
    },
    TELEPHONE: {
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
    const utilisateurUpload = new UtilisateurUpload()
    const fichier = await utilisateurUpload.upload(IMAGE)
    const imageUrl = `${req.protocol}://${req.get("host")}${IMAGES_DESTINATIONS.utilisateurs}${path.sep}${fichier.fileInfo.fileName}`
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(MODE_DE_PASSE, salt)
    console.log(NOM,PRENOM,ID_PROFIL,imageUrl,EMAIL,password);
    const nouveauUtilisateur = await Utilisateur.create({
    NOM: NOM,
    PRENOM: PRENOM,
    ID_PROFIL: ID_PROFIL,
    IMAGE: imageUrl,
    EMAIL: EMAIL,
    TELEPHONE:TELEPHONE,
    ADRESSE: ADRESSE,
    MODE_DE_PASSE: password
    })
    const payload = {
    ID_UTILISATEUR: nouveauUtilisateur.toJSON().ID_UTILISATEUR
    }
    const accessToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: 259200 })
    const { MOT_DE_PASSE: mdp, ...public } = nouveauUtilisateur.toJSON()
    res.status(200).json({
    message: "Nouvel utilisateur créé avec succès",
    data: {
    ...public,
   token: accessToken
    }
    })
    } catch (error) {
    console.log(error)
    res.status(500).send("Erreur interne du serveur")
    }
   }

   const user = async (req, res) => {
    try {
    const utilisateurs = await Utilisateur.findAll()
    res.status(200).json(utilisateurs)
    } catch (error) {
    res.status(500).send("Erreur interne du serveur")
    }
   }
   
module.exports = {
creerVendeur,
user
}
   