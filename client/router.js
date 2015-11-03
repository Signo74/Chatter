Router.configure({
    layoutTemplate: 'Chatter'
});

Router.route('/', {
  name: 'lobby',
  template: 'Lobby'
});

Router.route('join-room/:_id', {
  name: 'join-room',
  template: 'ChatRoom',
  data: function() {
    var id = this.params._id;
    return ChatRooms.findOne({_id:id});
  }
});
