function coursera(){var a=0,e;$(".option").click(function(){var t=$(this).attr("id");switch(a=parseInt(t.slice(-1)),$("#image").attr("src","img/img_"+a+"1.png"),$("#option"+a).addClass("bordering"),a){case 1:e="lightblue";break;case 2:e="red";break;case 3:e="green";break;case 4:e="gray"}$("div.texter").load("text/test"+a+".html").addClass("h2").css("color",e)})}