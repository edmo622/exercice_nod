const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const profil = sequelize.define('utilisateurs', {
    ID_PROFIL: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    DESCRIPTION: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

}, {
    freezeTableName: true,
    tableName: 'profils',
    timestamps: false
})


module.exports = profil