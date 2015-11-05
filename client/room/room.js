Meteor.subscribe('messages');

Template.ChatRoom.helpers({
  messages: function() {
    return Messages.find({'room': this._id}, {fullDate:0, date:0}, {sort: {fulldate:1}});
  },
  isCurrentUser: function() {
    return this.email === Meteor.user().emails[0].address;
  }
});

Template.ChatRoom.events({
  'submit .new-message': function(event) {
    event.preventDefault();
    Meteor.call('updateChatRoomMessages',event.target.message.value, this._id);
  }
})

Template.ChatRoom.onRendered(function() {
  var windowH = $(window).height();
  // A magic number to correct for the menu height and the bottom form.
  var CORRECTION = 150;
  $('div.chat').css('max-height', windowH - CORRECTION);
})
