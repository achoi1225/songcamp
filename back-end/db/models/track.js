'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    albumId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Albums' }
    },
    allowDownload: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    trackUrl: {
      allowNull: true,
      type: DataTypes.STRING(100)
    },
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.Album, { foreignKey: "albumId" }, { onDelete: "cascade", hooks:true });
  };
  return Track;
};