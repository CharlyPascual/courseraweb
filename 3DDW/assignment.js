// put your javascript code here
// 

var category_template, photos_template, photo_template, slideshow_template;



// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
}

$(document).ready(function(){


	// compile all of our templates ready for use
	////
	var source   = $("#category-template").html();
	category_template = Handlebars.compile(source);

	$("#category-tab").click(function () {

		console.log("category-tab");
		// displays the albums template
		showTemplate(category_template, animals_data);
	});
});






 