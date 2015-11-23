Meteor.methods({
  // Chat room related methods.
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
    var email = '';
    var fullDate = new Date();

    if (Meteor.user() != null) {
      username = Meteor.user().username;
      email = Meteor.user().emails[0].address;
    }

    Messages.insert({fullDate: fullDate, date: formattedDate, time: formattedTime, username: username, email:email, message: message, room: roomId});
  },
  updateUserRooms: function(room) {
    var roomsActivity = [];
    var existingIndex;
    roomsActivity = Meteor.user().activity;

    for (var i = 0 ; i < roomsActivity.length ; i++) {
      if (roomsActivity[i].room === room) {
        existingIndex = i;
        break;
      }
    }

    if (existingIndex != undefined) {
      roomsActivity[existingIndex].lastSeen = new Date();
    } else {
      var activity = {
        room: room,
        lastSeen: new Date()
      }

      roomsActivity.push(activity);
    }

    Meteor.users.update({_id:Meteor.user()._id}, {$set: {activity:roomsActivity}})
  },
  // Messages related methods
  returnUnreadMessagesPerRoom: function(room) {
    var lastSeenArr = Meteor.user().activity;
    var lastSeen;
    var count;

    if (lastSeenArr != undefined) {
      for (var i = 0 ; i < lastSeenArr.length ; i++) {
        if (lastSeenArr[i].room === room) {
          count = Messages.find({fullDate: { $lt:lastSeenArr[i].lastSeen}, room:room}).count();
          return count;
        }
      }
    } else {
      return;
    }
  },
  // User related methods
  updateUserData: function(userData) {
    
    Meteor.users.update({_id:Meteor.user()._id},{})
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
