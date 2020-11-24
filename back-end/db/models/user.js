'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { 
        id, 
        userName, 
        email,
        artistName,
        isArtist,
        genre,
        bio,
        imgUrl } = this; // context will be the User instance
      return { 
        id, 
        userName, 
        email,
        artistName,
        isArtist,
        genre,
        bio,
        imgUrl };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            userName: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ userName, email, password, artistName, isArtist, genre, bio, imgUrl }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        userName,
        email,
        hashedPassword,
        artistName,
        isArtist,
        genre,
        bio,
        imgUrl
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      User.hasMany(models.Follower, { foreignKey: "userId" });
      User.hasMany(models.Follower, { foreignKey: "followingId" });
      User.hasMany(models.Album, { foreignKey: "artistId", as: 'album' });
    }
  };
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        // validate: {
        //   len: [60, 60],
        // },
      },
      artistName: {
        allowNull: true,
        type: DataTypes.STRING(50)
      },
        isArtist: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
        bio: {
          allowNull: true,
          type: DataTypes.TEXT
      },
        genre: {
          allowNull: true,
          type: DataTypes.STRING(50),
      },
        imgUrl: {
          allowNull: true,
          type: DataTypes.STRING(100)
      },

    },

    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};