'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    followingId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
  }, {});
  Follower.associate = function(models) {
    Follower.belongsTo(models.User, { foreignKey: "userId", as:"user"}, { onDelete: "cascade", hooks:true });
    Follower.belongsTo(models.User, { foreignKey: "followingId", as:"following"}, { onDelete: "cascade", hooks:true });
  };
  return Follower;
};