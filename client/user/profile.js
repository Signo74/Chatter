Meteor.subscribe("activeUser");
let emailsArr = new ReactiveArray();

Template.UserProfile.helpers({
  emails: function() {
    return emailsArr.list();
  }
})

Template.UserProfile.events({
  'click button': function(event) {
    event.preventDefault();
  },
  'submit': function() {
    // Update the user's details.
  },
  'click .newMail': function(event) {
    event.preventDefault();
    // Add a new email row to the form.
    let email ={
      address:'',
      verified:false
    }
    emailsArr.push(email);
  }
})

Template.UserProfile.onCreated(function() {
  let self = this;
  self.autorun(function(){
    self.subscribe('activeUser',Meteor.user()._id);
  });
})

Template.UserProfile.onRendered(function() {
  let arr = [];
  arr = Meteor.user().emails
  for(let i = 0 ; i < arr.length ; i++) {
    emailsArr.push(arr[i]);
  }
})

Template.UserProfile.onDestroyed(function() {
  emailsArr.length = 0;
})
