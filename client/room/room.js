Meteor.subscribe("users");

var userSearchTerm = new ReactiveVar();

Template.ChatRoom.helpers({
  messages: function() {
    var roomId = FlowRouter.getParam('_id');
    if (Session.get('userSearchTerm') != '' || Session.get('userSearchTerm') != undefined) {
      var count = Messages.find({'room': roomId, username:Session.get("userSearchTerm")}, {fullDate:0, date:0}, {sort: {fulldate:1}}).count();
      if (count > 0) {
        return Messages.find({'room': roomId, username:Session.get("userSearchTerm")}, {fullDate:0, date:0}, {sort: {fulldate:1}});
      } else {
        return Messages.find({'room': roomId}, {fullDate:0, date:0}, {sort: {fulldate:1}});
      }
    } else {
      return Messages.find({'room': roomId}, {fullDate:0, date:0}, {sort: {fulldate:1}});
    }
  },
  isCurrentUser: function() {
    return this.email === Meteor.user().emails[0].address;
  },
  users: function() {
    return Meteor.users.find({username: Session.get("userSearchTerm")});
  }
});

Template.ChatRoom.events({
  'submit .new-message': function(event) {
    event.preventDefault();
    var roomId = FlowRouter.getParam('_id');
    Meteor.call('updateChatRoomMessages',event.target.message.value, roomId);

    event.target.message.value = '';
  },
  'keyup .userSearch': function(event){
    userSearchTerm = event.target.value;
    Session.set('userSearchTerm', userSearchTerm);
  },
  'submit form': function(event) {
    // Necessary so that the page doesn't refresh if the user
    // accidentally presses Enter.
    event.preventDefault();
  }
})

Template.ChatRoom.onRendered(function() {
  var windowH = $(window).height();
  // A magic number to correct for the menu height and the bottom form.
  var CORRECTION = 150;
  $('div.chat').css('max-height', windowH - CORRECTION);
})

Template.ChatRoom.onCreated(function() {
    let self = this;
    self.autorun(function(){
      self.subscribe('messages', FlowRouter.getParam('_id'));
    });
})
