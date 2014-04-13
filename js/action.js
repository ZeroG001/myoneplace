

//Note Objects

//This function allows me to escape text







/* NoteForm Object
// object defines what happents when a user creates a note. In the future I would like to attach this to an agent directory.
*/
var noteForm = {};

noteForm.escapeHTML = function (text) {
	return $("<div></div>").text(text).html();
}

// Function "Clear Contents" no return value
// Clears the contents of Input and TextArea fields
noteForm.clearContents = function() {
	$('.problem-title').val("");
	$('.problem-detail').val("");
	$('.problem-detail').height("20px");
	$('.problem-detail').css("display","none");
	$('.problem-options').css("display","none");
}



// Function "sendInfoAJAX" sends the info using AJAX. Uses POST to send the info.
// One requred arguement containint a string. String must be using var=val& format. validate the text down th line 
noteForm.addInfoAJAX = function(noteTitle, noteDetails, noteColor){
	$.post(
		"resources/add_note.php",
		{
			title: noteTitle,
			detail: noteDetails,
			color: noteColor

		},

		function(data, status){
			
			console.log("AJAX request was successful. Returning data");
			noteForm.addNote(noteTitle, noteDetails, noteColor, data);
			console.log(data);
			// AJAX request was successful

		}).fail(function(){

			console.log("There was an issue with the ajax request. Perhaps there is no connection to the server or the page requested is not present");
			// Do Something is there is a failure
		});
}

noteForm.addNote = function(noteTitle, noteDetails, noteColor, noteId){

	var html =  "<div id='"+noteId+"'class='item note-container'>"
					+"<div class='note-wrapper' style='background-color:"+noteColor+"'>"
				+"<div class='note-title'>"+noteForm.escapeHTML(noteTitle)+"</div>" //Title is generated here
				+"<div class='note-detail'>"+noteForm.escapeHTML(noteDetails)+"</div>" //not details are generated here
				+"<div class='note-options'> Color | <button class='edit-note-modal btn btn-default btn-sm' data-toggle='modal' data-target='#myModal'>Edit</button>|" 
				+"<button class='btn btn-default btn-sm btn-sm delete-note'> Delete </button> </div>"
				+"</div>"
				+"</div>"


				console.log("Returning HTML data for new note!");
				console.log(noteForm.escapeHTML(noteTitle));
				console.log(noteForm.escapeHTML(noteDetails));

				$('.saved-note').prepend(html).masonry('reloadItems');;


			


				

			// This has been Temporaily Taken out. Trying to make it so that when you hover over a note, the options appear
			// This function does not work but its in the works!
			// 	$('.note-container').hover(function(){
					
			// 		$(this, "note-wrapper note-options").css("visibility", "visible");


			// },function(){
			// 	$(this,"note-wrapper note-options").css("visibility", "hidden");
			// });



				$('.note-container').click(function(e){
					var thisId = $(this).attr("id");
					var thisTitle = $(".note-title", this);
					var thisDetail = $(".note-detail", this);

					if($(e.target).is('.delete-note')) {
						console.log("removing note. Remove note ID " + thisId);
						note.removeInfoAJAX(thisId);

						$(this).remove();
					}

					if($(e.target).is('.edit-note-modal')) {
						
						var modalTextarea = $(".edit-problem-detail");
						var modalInput = $(".edit-problem-title");

						modalTextarea.val(thisDetail.text());
						modalInput.val(thisTitle.text());


						$('.save-note').unbind().click(function(){
							//Use AJAX to update the note.
							note.editNote(modalInput.val(),modalTextarea.val(),thisId);

							//Have the changes reflect on the page immidietly
							thisTitle.text(modalInput.val()).html();
							thisDetail.text(modalTextarea.val()).html();
						});

						//This make it so that when the user clicks on EDIT, the width of the textarea is the correct size.
						setTimeout(function(){
						modalTextarea.trigger('autosize.resize');
						},200);
					}//Save note end!

					
				});




}

noteForm.showContents = function(){
 	$('.problem-detail').show();
	$('.problem-options').show();	
}

noteForm.changeColor = function(){
	$(".color-dropdown-list li").click(function() {
	var $noteBackground = $(this).attr("id");
	$(".problem-container, .problem-title, .problem-detail").css('background-color', $noteBackground);
	});
}


// NoteForm object End

/* Note Object 
// The Note object defines the content of the behaviour or notes once they have been created
*/

var note = {};

note.removeInfoAJAX = function(noteId){

$.post("resources/remove_note.php",
	{
		id: noteId //Enter note id here.!;
	},
	 function(data,status){
	 	console.log("the data removeInfoAJAX got was ID " + noteId);
	 	console.log("AJAX request was successful. Returning data");

}).fail(function(){

	alert("The note was not able to delete because there is no connection to the database.");
});

}

note.editNote = function(noteTitle, noteDetails, noteId){
	//When the user clicks on the note, a modal in the middle of the screen.
	//If th modal does not work out then have it so that you can edit the note then and there.

	$.post(
		"resources/edit_note.php",
		{
			title: noteTitle,
			detail: noteDetails,
			note_id: noteId
		},

		function(data, status){
			
			console.log("AJAX request was successful. Returning data");
			
			// AJAX request was successful

		}).fail(function(){

			console.log("There was an issue with the ajax request. Perhaps there is no connection to the server or the page requested is not present");
			// Do Something is there is a failure
		});
}


//Note 


//This will clear the contents of each input box and hide the textarea box.
//Just like in google keep

// 						====== DOCUMENT GET READY! =================



$(document).ready(function () {

	

	//
	/* Jquery plugin that autosizes textareas (thanks github) */
	$('.problem-detail').autosize();
	$('.edit-problem-detail').autosize();
/* Dependency please do not remove */

/*Masion*/




	// This function I found on stack overflow that converts RGB values to Hex.
	function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

//When a user clicks a color for the main form, the color changes
	noteForm.changeColor();

    //When the user clicks on the input box, the rest shows.
	$('.problem-title').click(function(){
			noteForm.showContents();
	});



	//The notes (if any) loaded onto page using AJAX line below.
	$('.saved-note').load("resources/get_note.php", function(){



		$('.note-container').click(function(e){
					//Gathering info for this note 
					var thisId = $(this).attr("id");
					var thisTitle = $(".note-title", this);
					var thisDetail = $(".note-detail", this);
					console.log("Gathering note info this note... " + thisId + " " + thisTitle.html() + " " + thisDetail.html());


					//If you click on the delete button the button is removed.
					if($(e.target).is('.delete-note')) {
						console.log("removing note. Remove note ID " + thisId);
						note.removeInfoAJAX(thisId);

						$(this).remove();
					}

					//When edit is clicked. Information is sent to modal.
					if($(e.target).is('.edit-note-modal')) {

						var modalTextarea = $(".edit-problem-detail");
						var modalInput = $(".edit-problem-title");
						
						modalTextarea.val(thisDetail.text());
						modalInput.val(thisTitle.text());

						
						//Within Modal. When save is clicked
						//AJAX is used to update note in database
						//The changes are reflected on the main list of notes.
						//$.text().html() is used alot to escape characters.
						$('.save-note').unbind().click(function(){

							note.editNote(modalInput.val(),modalTextarea.val(),thisId);
							thisTitle.text(modalInput.val()).html();
							thisDetail.text(modalTextarea.val()).html();
						});
						//This make it so that when the user clicks on EDIT, the width of the textarea is the correct size.
						setTimeout(function(){
						modalTextarea.trigger('autosize.resize');
						},200);
					}//Save note end!

					
				});


	});// Ajax load end
	





	

// When the user clicks the done button or anywhere outside of the textarea and input, the note will submit.
// - If nothing is entered, the information will not submit
// - The information will automatically clear itself.

$("body, .problem-container").click(function(e){
	

	// If anything within the problem container is clicked. Nothing will be submitted.
	if($(e.target).is(':not(.problem-container,.problem-container > *, .color-dropdown-button, .color-dropdown-list, .color-dropdown-list > *)')) {

		if ($('.problem-title').val() == "" && $('.problem-detail').val() == "") {

			noteForm.clearContents();

			} else {

	var problem_detail = $('.problem-detail').val();
	var problem_title = $('.problem-title').val();
	var problem_color = (rgb2hex($('.problem-container').css("background-color")));

	
	// =============== ajax start ================

			noteForm.addInfoAJAX(problem_title, problem_detail, problem_color);

	/* ============== AJAX END ================ */

			noteForm.clearContents();
				
		}// Else statement end

		}// Target if statement end

	}); // Input submtit end.

$(".showOffCanvas").click(function(){
	$(".offCanvasLeft").toggleClass("active");
	console.log("Check to see if it worked.");
});


//When the user clicks the agent search buttons. a side pane window comes up. from the right
//Here I am using javascript to call a css animation 

}); //=========== End of Document.ready ==========

$(document).ajaxComplete(function(){
	var container = $('.saved-note');
	container.masonry({
	columnWidth: 260,
	itemSelector: '.item',
	isFitWidth: true
});

});