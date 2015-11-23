FlowRouter.route('/', {
  name: 'lobby',
  action: function() {
    BlazeLayout.render('Jabber', { contacts: "Lobby"});
  }
});

FlowRouter.route('/join-room/:_id', {
  name: 'join-room',
  action: function(params, queryParams) {
    BlazeLayout.render('Jabber', { contacts: "Lobby", content: "ChatRoom" });
  }
});

FlowRouter.route('/profile/:_id', {
  name: 'profile',
  action: function() {
    BlazeLayout.render('Jabber', { contacts: "UserMenu", content: "UserProfile"});
  }
});

FlowRouter.notFound = {
    action: function() {
      BlazeLayout.render('Jabber', { content: "NotFound"});
    }
};
