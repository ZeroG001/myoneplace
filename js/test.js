$(document).ready(function () {

	$('.problem-title').click(function(){
		$('.problem-detail').show();
	});

	$('.problem-detail').keyup(function (event){
		// var apples = $('.problem-detail').val().split(/(\n|\r)/);

		console.log($('.problem-detail').scrollTop());
		var topvalue = $('.problem-detail').scrollTop();
		var heightvalue = $(".problem-detail").height();
	
			$(".problem-detail").height(heightvalue+topvalue+"px");
			console.log("teok");

		// if (event.which == 13) {
		// 	$(".problem-detail").height(apples.length*19+"px");
		// }

		// if (event.which == 8) {
		// 	$(".problem-detail").height(apples.length*19+"px");
		// }
	});

	// var xhr = new XMLHttpRequest();

	// xhr.onreadystatechange = function() {
	// 	if (xhr.status == 200) {
	// 		document.getElementById("body").innerHTML = xhr.requestText
	// 	}
	// }

	// xhr.open("GET", "test.html", true);
	// xhr.send();

	$('.problem-submit').click(function() {

			
			$('.row').append("<div class='col-xs-6 col-sm-6 col-md-4 col-lg-4' style='border: 1px solid black'>" + $('.problem-detail').val() + "</div>");
		
	});

});