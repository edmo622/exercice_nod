const express = require('express');
// const categorie = require('./routes/admistrtion.routes');
const app = express();
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const auth_routes = require('./routes/auth/auth.routes');
const bindUser = require('./middlewares/bindUser');
const admistrtion_routes = require('./routes/admistrtion.routes');
// 1. importation du fichier contenant les routes uploads

// app.use(fileUpload());
dotenv.config()
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// Middleware spécifique à une route
app.use("*", bindUser)
app.use('/', admistrtion_routes)
app.use('/auth', auth_routes)
// 2. enregistrement du nouveau middleware pour les routes upload
app.listen(port, () => {
 console.log(`Serveur écoutant sur le port ${port}`);
});
