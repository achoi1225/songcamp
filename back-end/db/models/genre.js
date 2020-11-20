'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    type: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
  }, {});

  Genre.associate = function(models) {
    // Genre.hasMany(models.User, {foreignKey: "genreId"});
  }
  return Genre;
};