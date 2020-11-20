'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const albums = await queryInterface.bulkInsert(
      "Albums",
      [
        {
          title: 'Better Than Gravy',
          releaseDate: new Date('2020','10','10'),
          imgUrl: 'https://i.imgur.com/1ha3QYY.jpg',
          description: 'The best album of all time',
          credits: 'All composed by: Mr. Fox',
          artistId: 11,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Forget the Milk',
          releaseDate: new Date('2020','4','23'),
          imgUrl: 'https://i.imgur.com/pwge5ae.jpg',
          description: 'Heavy synth pop that explores a picture of life with higher priorities',
          credits: 'Synth: Dexter, Cowbell: Ferrel',
          artistId: 12,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 3 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/XgP0AhO.jpg',
          description: 'consectetur adipiscing elit. Aenean tincidunt varius elit et condimentum. Aliquam tempor ultricies dignissim. Suspendisse maximus, nisi a aliquam sagittis, nibh mi tincidunt eros, ac tempus libero diam id massa. In porttitor placerat velit, eget maximus augue euismod eu. Vestibulum eget semper justo, eu cursus dui. Donec nec ipsum eleifend, ornare erat non, condimentum lacus. Mauris in est ex.',
          credits: 'faucibus justo a, pulvinar urna. Mauris maximus, magna a varius hendrerit, ligula sapien viverra lacus, sed efficitur tortor justo at leo. ',
          artistId: 13,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 4 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/9zHruXF.jpg',
          description: 'Vestibulum eget semper justo, eu cursus dui. Donec nec ipsum eleifend, ornare erat non, condimentum lacus. Mauris in est ex. Mauris tempus suscipit ex, et viverra nisi ultrices consequat. Aliquam consequat porta urna, dictum sollicitudin metus efficitur vel. Cras et tortor dapibus, tincidunt nisi non, consectetur ante.',
          credits: 'Sed in porta tellus, ac pretium elit. Proin sollicitudin ex imperdiet, pellentesque ipsum in, iaculis elit.',
          artistId: 14,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 5 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/LOH0nuT.jpg',
          description: 'Proin a magna placerat, faucibus justo a, pulvinar urna. Mauris maximus, magna a varius hendrerit, ligula sapien viverra lacus, sed efficitur tortor justo at leo. Aliquam at enim tempor ex egestas posuere a at leo. Nunc libero sem, imperdiet id purus eu, aliquam congue quam. Nunc euismod congue laoreet. Aliquam erat volutpat. ',
          credits: 'Ut in velit purus. Nullam sit amet tellus lacinia, sollicitudin libero pretium, fermentum augue. Donec eget diam quis libero pulvinar vehicula.',
          artistId: 15,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 6 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/DYjtn5i.jpg',
          description: 'Nunc libero sem, imperdiet id purus eu, aliquam congue quam. Nunc euismod congue laoreet. Aliquam erat volutpat. Proin egestas finibus ligula, in sollicitudin ipsum dictum ultrices. Sed rutrum libero at commodo finibus. Aenean porttitor sem at lacus auctor congue.',
          credits: 'Nullam quis auctor leo, et facilisis urna. ',
          artistId: 16,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 7 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/e8KHZLg.jpg',
          description: 'Ut vitae velit at ligula rutrum tincidunt nec et dolor. Donec enim elit, suscipit eu molestie ut, suscipit sit amet leo. Nunc porttitor dictum fringilla. Mauris laoreet nulla justo.',
          credits: 'Etiam eu justo eu est vestibulum faucibus. Quisque hendrerit mauris at pretium viverra. Praesent luctus elit quis nisi pharetra eleifend.',
          artistId: 17,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 8 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/0YAcvbb.jpg',
          description: 'Praesent vestibulum interdum elit, quis lobortis ligula commodo sit amet. Fusce gravida vehicula sem, non varius orci. Phasellus sed sem eget purus accumsan ultrices id sed tellus.',
          credits: 'Proin blandit efficitur felis, a rutrum nisl. Sed ante lacus, tincidunt a justo egestas, convallis auctor dui. Interdum et malesuada fames.',
          artistId: 18,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 9 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/Ip22Z37.jpg',
          description: 'Maecenas interdum sapien eget pulvinar pharetra. Donec consequat nisi nisl. Vestibulum tristique est ut nisi congue, vehicula mollis ex facilisis. Aenean dui purus, bibendum vitae malesuada quis, vehicula mollis augue.',
          credits: 'Phasellus auctor dolor et pellentesque egestas. Cras in lacus eu leo ultrices sodales eu sed nisl. Morbi posuere nibh vel leo fringilla, sit amet semper velit sodales.',
          artistId: 19,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 10 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/dqG5rk8.jpg',
          description: 'Aenean pellentesque placerat vulputate. Integer eget nulla vitae ante vehicula imperdiet. Nam sed pharetra ligula, quis ultricies ligula. Proin scelerisque a leo at congue.',
          credits: 'Nulla facilisi. Suspendisse a aliquet urna.',
          artistId: 20,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },




        {
          title: 'Artist 11 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/XgP0AhO.jpg',
          description: 'consectetur adipiscing elit. Aenean tincidunt varius elit et condimentum. Aliquam tempor ultricies dignissim. Suspendisse maximus, nisi a aliquam sagittis, nibh mi tincidunt eros, ac tempus libero diam id massa. In porttitor placerat velit, eget maximus augue euismod eu. Vestibulum eget semper justo, eu cursus dui. Donec nec ipsum eleifend, ornare erat non, condimentum lacus. Mauris in est ex.',
          credits: 'faucibus justo a, pulvinar urna. Mauris maximus, magna a varius hendrerit, ligula sapien viverra lacus, sed efficitur tortor justo at leo. ',
          artistId: 21,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 12 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/9zHruXF.jpg',
          description: 'Vestibulum eget semper justo, eu cursus dui. Donec nec ipsum eleifend, ornare erat non, condimentum lacus. Mauris in est ex. Mauris tempus suscipit ex, et viverra nisi ultrices consequat. Aliquam consequat porta urna, dictum sollicitudin metus efficitur vel. Cras et tortor dapibus, tincidunt nisi non, consectetur ante.',
          credits: 'Sed in porta tellus, ac pretium elit. Proin sollicitudin ex imperdiet, pellentesque ipsum in, iaculis elit.',
          artistId: 22,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 13 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/LOH0nuT.jpg',
          description: 'Proin a magna placerat, faucibus justo a, pulvinar urna. Mauris maximus, magna a varius hendrerit, ligula sapien viverra lacus, sed efficitur tortor justo at leo. Aliquam at enim tempor ex egestas posuere a at leo. Nunc libero sem, imperdiet id purus eu, aliquam congue quam. Nunc euismod congue laoreet. Aliquam erat volutpat. ',
          credits: 'Ut in velit purus. Nullam sit amet tellus lacinia, sollicitudin libero pretium, fermentum augue. Donec eget diam quis libero pulvinar vehicula.',
          artistId: 23,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 14 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/DYjtn5i.jpg',
          description: 'Nunc libero sem, imperdiet id purus eu, aliquam congue quam. Nunc euismod congue laoreet. Aliquam erat volutpat. Proin egestas finibus ligula, in sollicitudin ipsum dictum ultrices. Sed rutrum libero at commodo finibus. Aenean porttitor sem at lacus auctor congue.',
          credits: 'Nullam quis auctor leo, et facilisis urna. ',
          artistId: 24,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 15 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/e8KHZLg.jpg',
          description: 'Ut vitae velit at ligula rutrum tincidunt nec et dolor. Donec enim elit, suscipit eu molestie ut, suscipit sit amet leo. Nunc porttitor dictum fringilla. Mauris laoreet nulla justo.',
          credits: 'Etiam eu justo eu est vestibulum faucibus. Quisque hendrerit mauris at pretium viverra. Praesent luctus elit quis nisi pharetra eleifend.',
          artistId: 25,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 16 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/0YAcvbb.jpg',
          description: 'Praesent vestibulum interdum elit, quis lobortis ligula commodo sit amet. Fusce gravida vehicula sem, non varius orci. Phasellus sed sem eget purus accumsan ultrices id sed tellus.',
          credits: 'Proin blandit efficitur felis, a rutrum nisl. Sed ante lacus, tincidunt a justo egestas, convallis auctor dui. Interdum et malesuada fames.',
          artistId: 26,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 17 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/Ip22Z37.jpg',
          description: 'Maecenas interdum sapien eget pulvinar pharetra. Donec consequat nisi nisl. Vestibulum tristique est ut nisi congue, vehicula mollis ex facilisis. Aenean dui purus, bibendum vitae malesuada quis, vehicula mollis augue.',
          credits: 'Phasellus auctor dolor et pellentesque egestas. Cras in lacus eu leo ultrices sodales eu sed nisl. Morbi posuere nibh vel leo fringilla, sit amet semper velit sodales.',
          artistId: 27,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 18 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/dqG5rk8.jpg',
          description: 'Aenean pellentesque placerat vulputate. Integer eget nulla vitae ante vehicula imperdiet. Nam sed pharetra ligula, quis ultricies ligula. Proin scelerisque a leo at congue.',
          credits: 'Nulla facilisi. Suspendisse a aliquet urna.',
          artistId: 28,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 19 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/9zHruXF.jpg',
          description: 'Vestibulum eget semper justo, eu cursus dui. Donec nec ipsum eleifend, ornare erat non, condimentum lacus. Mauris in est ex. Mauris tempus suscipit ex, et viverra nisi ultrices consequat. Aliquam consequat porta urna, dictum sollicitudin metus efficitur vel. Cras et tortor dapibus, tincidunt nisi non, consectetur ante.',
          credits: 'Sed in porta tellus, ac pretium elit. Proin sollicitudin ex imperdiet, pellentesque ipsum in, iaculis elit.',
          artistId: 29,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Artist 20 Album',
          releaseDate: null,
          imgUrl: 'https://i.imgur.com/LOH0nuT.jpg',
          description: 'Proin a magna placerat, faucibus justo a, pulvinar urna. Mauris maximus, magna a varius hendrerit, ligula sapien viverra lacus, sed efficitur tortor justo at leo. Aliquam at enim tempor ex egestas posuere a at leo. Nunc libero sem, imperdiet id purus eu, aliquam congue quam. Nunc euismod congue laoreet. Aliquam erat volutpat. ',
          credits: 'Ut in velit purus. Nullam sit amet tellus lacinia, sollicitudin libero pretium, fermentum augue. Donec eget diam quis libero pulvinar vehicula.',
          artistId: 30,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );

    return albums;
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Albums', null, {});
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
