const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const Client = sequelize.define('utilisateurs', {
    ID_CLIENT: {
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
    TELEPHONE: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ADRESSE: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

}, {
    freezeTableName: true,
    tableName: 'clients',
    timestamps: false
})


module.exports = Client