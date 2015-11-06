Meteor.publish('chat_rooms', function () {
  return ChatRooms.find({},{sort:{username:1}});
});

Meteor.publish('messages', function () {
  return Messages.find({});
});

Meteor.publish("usernames", function(argument){
  return Meteor.users.find();
});
