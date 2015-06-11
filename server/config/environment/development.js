'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://dapperdingo:dapperpw@ds037812.mongolab.com:37812/legacy'
    // uri: 'mongodb://localhost',  //#DD: Used for local hosting versus online MongoDB
    // port: 27017									//#DD: Used for local hosting versus online MongoDB
  },

  seedDB: false //#DD: Changing to false prevents DB from populating with premade data
};
