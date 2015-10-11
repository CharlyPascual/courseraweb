function coursera(){

	var counter = 0;
	var colortext;
	$(".option").click(function(){
		//depending your option choose
		var id = $(this).attr("id");
		counter = parseInt(id.slice(-1)); //last digit
		$("#image").attr('src', 'img/img_'+counter+'1.png');
		//menu border
		$("#option"+counter).addClass("bordering");
		//color text
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
		//load text
		$("div.texter").load("text/test"+counter+".html").addClass("h2").css("color",colortext);		
	});
}


