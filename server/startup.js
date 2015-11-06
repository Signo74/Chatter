Meteor.startup(function () {
  Messages._ensureIndex({'room': 'text', 'message':'text'});
  Meteor.users._ensureIndex({'username': 'text'});
});
