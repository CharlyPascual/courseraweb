	Meteor.startup(function(){
		//para que solo se ejecute la primera vez
		if (Images.find().count() == 0){	
			//busca el directorio PUBLIC
			for (var i=5;i<15;i++){
				Images.insert(
					{
      				img_src:"DSC026"+i+".JPG",
      				img_alt:"image number "+(i - 4)
   					}
				);	
			}// end of for insert images
			// count the images!
			console.log("startup.js says: "+Images.find().count());
		}// end of if have no images
	});