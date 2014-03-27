

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
noteForm.addInfoAJAX = function(noteTitle, noteDetails){
	$.post(
		"resources/add_note.php",
		{
			title: noteTitle,
			detail: noteDetails
		},

		function(data, status){
			
			console.log("AJAX request was successful. Returning data");
			noteForm.addNote(noteTitle, noteDetails, data);
			// AJAX request was successful

		}).fail(function(){

			console.log("There was an issue with the ajax request. Perhaps there is no connection to the server or the page requested is not present");
			// Do Something is there is a failure
		});
}

noteForm.addNote = function(noteTitle, noteDetails, noteId){

	var html =  "<div id='"+noteId+"' class='col-xs-12 col-sm-6 col-md-4 col-lg-4 note-container'>"
					+"<div class='note-wrapper'>"
				+"<div class='note-title'><strong>"+noteForm.escapeHTML(noteTitle)+"</strong></div>" //Title is generated here
				+"<div class='note-detail'>"+noteForm.escapeHTML(noteDetails)+"</div>" //not details are generated here
				+"<div class='note-options'> Color | Archive | <button class='delete-note'> Delete </button> </div>"
				+"</div>"
				+"</div>";

				console.log("Returning HTML data for new note!");
				console.log(noteForm.escapeHTML(noteTitle));
				console.log(noteForm.escapeHTML(noteDetails));
			

				$('.saved-note').prepend(html);

				$('.note-container').hover(function(){
					
					$(this, "note-wrapper note-options").css("visibility", "visible");


			},function(){
				$(this,"note-wrapper note-options").css("visibility", "hidden");
			});

				$('.note-container').click(function(e){
					var thisId = $(this).attr("id");

					if($(e.target).is('.delete-note')) {
						console.log("removing note. Remove note ID " + thisId);
						note.removeInfoAJAX(thisId);

						$(this).remove();
					}

					
				});

}

noteForm.showContents = function(){
 	$('.problem-detail').show();
	$('.problem-options').show();	
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



//Note 


//This will clear the contents of each input box and hide the textarea box.
//Just like in google keep

// 						====== DOCUMENT GET READY! =================

$(document).ready(function () {
	

	/* Jquery plugin that autosizes textareas (thanks github) */
	$('.problem-detail').autosize();
/* Dependency please do not remove */

	$('.problem-title').click(function(){
			noteForm.showContents();
	});

	

// When the user clicks the done button or anywhere outside of the textarea and input, the note will submit.
// - If nothing is entered, the information will not submit
// - The information will automatically clear itself.

$("body:not(input)").click(function(e){

	if($(e.target).is(':not(.problem-title, .problem-detail)')) {

		if ($('.problem-title').val() == "" && $('.problem-detail').val() == "") {

			noteForm.clearContents();

			} else {

	var problem_detail = $('.problem-detail').val();
	var problem_title = $('.problem-title').val();
	
	// =============== ajax start ================

			noteForm.addInfoAJAX(problem_title, problem_detail);

	/* ============== AJAX END ================ */

			noteForm.clearContents();
				
		}// Else statement end

		}// Target if statement end

	}); // Input submtit end.

}); //=========== End of Document.ready ==========