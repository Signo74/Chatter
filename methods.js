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
    var formattedDate = formatDate();
    var formattedTime = formatTime();
    var username = 'anonymous';

    if (Meteor.user() != null) {
      username = Meteor.user().emails[0].address;
      username = username.slice(0, username.indexOf('@'));
    }

    Messages.insert({date: formattedDate, time: formattedTime, username: username, message: message, room: roomId});
  }
})

// Parses a new Date() object into DD-MM-YYYY string format.
function formatDate() {
  var formattedDate = '';
  var date = new Date();

  formattedDate += date.getDate();
  formattedDate += '-';
  formattedDate += date.getMonth();
  formattedDate += '-';
  formattedDate += date.getFullYear();

  return formattedDate;
}

// Parses a new Date() object into HH:MM:SS string format.
function formatTime() {
  var formattedDate = '';
  var date = new Date();

  formattedDate += date.getHours();
  formattedDate += ':';
  formattedDate += date.getMinutes();
  formattedDate += ':';
  formattedDate += date.getSeconds();

  return formattedDate;
}
