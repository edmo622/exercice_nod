const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const Utilisateurs = sequelize.define('utilisateurs', {
    ID_CATEGORI: {
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
    tableName: 'categorie',
    timestamps: false
})


module.exports = Utilisateurs