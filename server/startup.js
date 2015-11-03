Meteor.startup(function () {
  Messages._ensureIndex({ "room": 1});
});
