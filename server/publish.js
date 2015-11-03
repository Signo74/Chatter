Meteor.publish('chat_rooms', function () {
  return ChatRooms.find({},{sort:{username:1}});
});

Meteor.publish('messages', function () {
  return Messages.find({});
});
