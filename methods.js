Meteor.methods({
  craeteChatRoom: function(name, isPublic) {
    var username = '';
    if (Meteor.user() != null) {
      username = Meteor.user().emails[0].address;
    }
    ChatRooms.insert({
      name: name,
      public: isPublic,
      createdOn: new Date(),
      createdBy: username
    })
  },
  updateChatRoomMessages: function(message, roomId) {
    var date = new Date();
    var formattedDate = '';
    var username = 'anonymous';

    formattedDate += date.getDate();
    formattedDate += '-';
    formattedDate += date.getMonth();
    formattedDate += '-';
    formattedDate += date.getFullYear();

    console.log(Meteor.user());

    if (Meteor.user() != null) {
      username = Meteor.user().emails[0].address;
      username = username.slice(0, username.indexOf('@'));
    }

    Messages.insert({date: formattedDate, username: username, message: message, room: roomId});
  }
})
