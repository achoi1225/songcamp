'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const genres = await queryInterface.bulkInsert(
    "Genres",
      [
        {
          type: "Acoustic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Alternative",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Ambient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Blues",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Classical",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Country",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Electronic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Experimental",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Folk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Funk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Jazz",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Pop",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Punk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "R&B/Soul",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Reggae",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Rock",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Hip-Hop/Rap",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );

    return genres;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
