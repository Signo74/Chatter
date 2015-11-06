Meteor.subscribe('chat_rooms');

Template.Lobby.helpers({
  chatRooms: function() {
    if (Meteor.user()) {
      return ChatRooms.find();
    } else {
      return ChatRooms.find({public:true});
    }
  }
});

Template.Lobby.events({
  'submit .addChatRoom': function(event) {
    event.preventDefault();
    var name = event.target.name.value;
    var isPublic = true;

    if (Meteor.user()) {
      isPublic = false;
    }

    Meteor.call('craeteChatRoom', name, isPublic);
    event.target.name.value = '';
  },
  'click .joinRoom': function(event) {
    event.preventDefault();
    var roomId = event.target.value;
    Session.set('room', roomId);

    Router.go('join-room', {_id: roomId});
  }
});
