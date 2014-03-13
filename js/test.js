$(document).ready(function(){
	$('.problem').keyup(function (event) {
		console.log(event.which);

		if (event.which == 13) {
			$('body').append("<p> hello </p>");
		};
	});

});