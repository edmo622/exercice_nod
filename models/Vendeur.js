const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const Vendeur = sequelize.define('utilisateurs', {
    ID_VENDEUR: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    NOM: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    PRENOM: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    IMAGE: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },


    ID_PROFIL: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    EMAIL: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    MODE_DE_PASSE: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    TELEPHONE: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    ADRESSE: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    tableName: 'vendeurs',
    timestamps: false
})
module.exports = Vendeur