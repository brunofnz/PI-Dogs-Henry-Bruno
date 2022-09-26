const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.JSON,
    },
    weight: {
      type: DataTypes.JSON,
    },
    yearsOfLife: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, { timestamps: false });
};
