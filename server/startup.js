Meteor.startup(function () {
  Messages._ensureIndex({'room': 'text', 'message':'text'},{background:1});
  Meteor.users._ensureIndex({'username': 'text'},{background:1});
});
