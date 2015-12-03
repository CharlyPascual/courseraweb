Images = new Mongo.Collection("images");
console.log("numero de imagenes: " + Images.find().count());
if (Meteor.isClient) {
  d = null;
    Template.eeee.helpers({
    myTimex : function () { 
      return d;
    }
  });
  Template.eeee.events({
    'click button': function (event) {
      console.log(event)
      d = Date();
      $(event.target).css("font-size","50px");
      console.log(d);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}