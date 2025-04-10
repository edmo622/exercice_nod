const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const Produit = sequelize.define('utilisateurs', {
    ID_PRODUIT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    DESCRIPTION: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ID_CATEGORI: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    PRIX_UNITAIRE: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
 

}, {
    freezeTableName: true,
    tableName: 'produits',
    timestamps: false
})


module.exports = Produit