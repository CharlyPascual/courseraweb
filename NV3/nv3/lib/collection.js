//base de datos
Images = new Mongo.Collection("images"); //"imagess" no tiene que ver con ningun otro parametro

//Aplica seguridad a la coleccion Images

Images.allow({
	insert: function (userId, doc) {
		//test si el usuario se ha logado
		if (Meteor.user()) {
			console.log(doc);
			//test que el usuario no nos esta hackenado
			//con el ID dde otro usuario
			if (userId != doc.createdBy) {
				return false;
			} else{ //el usuario esta logado y la imagen es suya
				return true;
			};
		} else{//el usuario no esta logado
			return false;
		};
	},
	//una mejora seria bloquear cuando un usuario quisiera añadir mas de
	//8 imagens por ejemplo
	update: function (userId, doc, fields, modifier) {
		return true;
	},
	remove: function (userId, doc) {
		 return true;
	},
	// fetch: ['owner'],
	// transform: function () {
	// 		 return true;
	// }
	
});