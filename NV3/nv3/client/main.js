 //////////////////
 //scroll infinito
 //////////////////
 ///
 //crear una variable de session para que sea utilizada en el filtro de "images:function ()"
  Session.set("imageLimit", 8);
   //detectar evento scroll
  //detectar cuando el scroll es hacia abajo
  lastScrollTop = 0;
  $(window).scroll(function  (event) {
   
    //testea si estamos cerca del final de la pagina
    if ($(window).scrollTop() + $(window).height() > $(document).height() -100) {
       //donde estamos en la pagina
       var scrollTop = $(this).scrollTop();
       console.log("scrollTop :"+scrollTop);
       if (scrollTop > lastScrollTop) {
        console.log("down the page");
          //ahora estamos al final de la pagina, por lo que visualizamos 4 imagenes mas
          Session.set("imageLimit", Session.get("imageLimit") + 8);
        }
        //tiene que comprobar el estado de la posicion del scroll con el anterior
        //por eso es la siguiente operacion
        lastScrollTop = scrollTop;
    } 
  
  });
  Accounts.ui.config({ //configuracion del paquete accounts-ui
    requestPermissions: {
      // facebook: ['user_likes']
    },
    requestOfflineToken: {
      // google: true
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
  });
   //ambos images tienen que ve con la plantilla images
   //ordena de mayor a menor rating: -1
   Template.images.helpers({
    images:function () { //muestra la imagenes filtradas o no ( recogidas por Seeeion.set mas abajo)
      if (Session.get("userFilter")) {
        return Images.find({createdBy:Session.get("userFilter")}, {sort:{createdOn: -1,rating: -1}});
      } else{}; //"limit" es otro tipo de operacion que utiliza "sort"
         return Images.find({}, {sort:{createdOn: -1,rating: -1}, limit:Session.get("imageLimit")});
    }, // Se utiliza para saber si las imgenes estan filtradas o no
    //si, si lo estan se muestra el {{#if filtering_images}} del html
    filtering_images:function () {
       if (Session.get("userFilter")) {
        return true;
       }else{
        return false;
       }
    },//muestra el usuario por el que estan filtradas las imagenes
    getFilterUser:function  () {
        if (Session.get("userFilter")) {
          var user = Meteor.users.findOne({_id:Session.get("userFilter")});
        return user.username;
       }else{
        return false;
       }
    },//muestro el usuario que cargo la imagen
    getUser:function (user_id) {
      //ojo aqui utilizo otra manera de saber el usuario "Meteor.users.findOne"
      var user = Meteor.users.findOne({_id:user_id});
      if (user) {
        return user.username;     
      } else{
        return "webMaster";
      };
    }
 });

   Template.body.helpers({
     username: function () {
     if (Meteor.user()) {
       return Meteor.user().username;
     } else{
      return "anon";
     }; 
     
     },
   });
   /////
   //eventos plantilla images
   /////
   Template.images.events({
    // 'click .js-bg':function(event){
    //   $(event.target).css("background", "red");
    // },
    'click .js-del-image':function(event){
      var image_id = this._id;
      console.log(image_id);
      $("#"+image_id).hide("slow", function  (event) {
         Images.remove({"_id" : image_id});
      });   
    },
    'click .js-rate-image':function(event){
      //numero de estrellas puntuadas
      var rating = $(event.currentTarget).data('userrating');
      console.log(rating);
      // Este id hace referencia a {{> starsRating id='rating' 
      // class='mystar js-rate-image' mutable=true id=_id }}
      var image_id = this.id;
      console.log(image_id);
      //el primer argumento del update es para indicar que queremos
      //cambiar
      //El segundo indica como lo queremos cambiar
      Images.update({_id:image_id},
                    {$set: {rating:rating}} )
    }, //Boton para ejecutar la caja modal
    'click .js-show-image-form':function(event) {
      $("#image_add_form_id").modal("show");
    }, //boton para filtrar por usuario, fijando una variable de sesion con key,value
    //en este caso ("userfilter",this.createdBy)
    'click .js-set-user-filter':function(event) {
      Session.set("userFilter", this.createdBy);
    },//boton para dejar de filtrar imagenes,
    'click .js-unset-user-filter':function  (event) {
      Session.set("userFilter", undefined);
       
    }
   });
   //////
   //eventos plantilla image_add_form
   //////
   Template.image_add_form.events({
    'submit .js-add-image':function(event) {
      var img_src, img_alt; //recoje los valores del formularios
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      console.log("source: "+img_src,"alt: "+img_alt);
      if (Meteor.user()){
      Images.insert({ //y los insrta en Mongo
          img_src:img_src,
          img_alt:img_alt,
          createdOn:new Date(),
          createdBy:Meteor.user()._id //incluyo el id del usuario
        });
      }
       $("#image_add_form_id").modal("hide"); //ocultar la caja modal
      return false; //para que el submit no se comporte por defecto cargando la pagina
    },
   })
