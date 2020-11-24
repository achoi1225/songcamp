'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const followers = await queryInterface.bulkInsert(
      "Followers",
      [
        {
          userId: 1,
          followingId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          followingId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          followingId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          followingId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          followingId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          followingId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          followingId: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          followingId: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          followingId: 19,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          followingId: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 1,
          followingId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 2,
          followingId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 3,
          followingId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 4,
          followingId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 5,
          followingId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 6,
          followingId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 7,
          followingId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
// =================================================================
        {
          userId: 21,
          followingId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          followingId: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );

    return followers;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Followers', null, {});
  }
};

// 'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     /*
//       Add altering commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkInsert('People', [{
//         name: 'John Doe',
//         isBetaMember: false
//       }], {});
//     */
//   },

//   down: (queryInterface, Sequelize) => {
//     /*
//       Add reverting commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkDelete('People', null, {});
//     */
//   }
// };
