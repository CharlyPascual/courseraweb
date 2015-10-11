function coursera(){

	var counter = 0;
	var colortext;
	$(".option").click(function(){
		//depending your option choose
		var id = $(this).attr("id");
		counter = parseInt(id.slice(-1)); //last digit is used
		$("#image").attr('src', 'img/img_'+counter+'1.png');
		
		//menu bordering
		//http://stackoverflow.com/questions/12687085/jquery-remove-class-if-other-element-is-clicked
		$(".option").removeClass("bordering");
		$(this).addClass("bordering");

		//coloured text
		switch(counter){
		case 1:
		colortext = "lightblue";
		break;
		case 2:
		colortext = "red";
		break;
		case 3:
		colortext = "green";
		break;
		case 4:
		colortext = "gray";
		break;
		}
		//load text from external file with "load" function
		$("div.texter").load("text/test"+counter+".html").addClass("h2").css("color",colortext);		
	});
}
