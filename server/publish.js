Meteor.publish('chat_rooms', function () {
  return ChatRooms.find({},{name:1},{sort:{createdOn:1}});
});

Meteor.publish('messages', function (id) {
  return Messages.find({room:id});
});

Meteor.publish("users", function(argument){
  return Meteor.users.find();
});

Meteor.publish("activeUser", function(argument){
  return Meteor.users.find({_id:argument});
});
