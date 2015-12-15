

	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({},{sort:{up:-1}});
		}
	});

	//Acount system
	Accounts.ui.config({ //configuracion del paquete accounts-ui
    requestPermissions: {
      // facebook: ['user_likes']
    },
    requestOfflineToken: {
      // google: true
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
  });


	/////
	// template events 
	/////
	var nUp   = 0;
	var nDown = 0;
	Template.website_item.events({
		
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			if (Meteor.user()) {
				console.log("Up voting website with id "+website_id);
				if (Websites.findOne({_id:website_id,down_users:Meteor.userId()})) {
					Websites.update({_id:website_id},
						{"$unset":{down_users:Meteor.userId()},
						"$addToSet":{up_users:Meteor.userId()},
						"$inc":{up:1,down:-1}
						});
				}
				else if (Websites.findOne({_id:website_id,up_users:Meteor.userId()})) {
				}
				else{ // not in up vote
					Websites.update({_id:website_id}, // add to up_users
						{"$addToSet":{up_users:Meteor.userId()},
						"$inc":{up:1,countUp:1},

						});
				}
			};
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);
			if (Meteor.user()) { //fxf
				if (Websites.findOne({_id:website_id,down_users:Meteor.userId()})) {
					Websites.update({_id:website_id},
						{"$unset":{down_users:Meteor.userId()},
						"$addToSet":{up_users:Meteor.userId()},
						"$inc":{up:1,down:-1}
						});
				}
				else if (Websites.findOne({_id:website_id,up_users:Meteor.userId()})) {
				}
				else{ // not in up vote
					Websites.update({_id:website_id}, // add to up_users
						{"$addToSet":{up_users:Meteor.userId()},
						"$inc":{up:-1,countDown:1}
						});
				}
			};
			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){
			var title, url, description;
			//  put your website saving code in here!	
			title       = event.target.title.value;
			url         = event.target.url.value;
			description = event.target.description.value;
			console.log("The url they entered is: "+title+" "+url);
			if (Meteor.user()) {
				Websites.insert({
					title:title,
					url:url,
					description:description,
					createdOn:new Date(),
					createdBy:Meteor.user()._id,
				});
			};
			return false;// stop the form submit from reloading the page
		}
	});




