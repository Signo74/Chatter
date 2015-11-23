Template.Lobby.helpers({
  chatRooms: function() {
    if (Meteor.user()) {
      return ChatRooms.find({},{name:1});
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

    Meteor.call('updateUserRooms', this._id);

    FlowRouter.go('/join-room/' + roomId);
  }
});

Template.ChatRoomsItem.helpers({
  new_messages: function(){
      var count;
      count =  Meteor.call('returnUnreadMessagesPerRoom', this._id);
      console.log('count result: ' + count);
      return count;
  }
});

Template.Lobby.onCreated(function() {
  let self = this;
  self.autorun(function(){
    self.subscribe('chat_rooms');
  });
})

Template.ChatRoomsItem.onCreated(function() {
    let self = this;
    console.log(`room id: ${this._id}`)
    self.autorun(function(){
      self.subscribe('messages');
      self.subscribe('chat_rooms');
    });
})
