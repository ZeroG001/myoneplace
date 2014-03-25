/* Jquery plugin that autosizes textareas (thanks github) */
	$('.problem-detail').autosize();
/* Dependency please do not remove */

//Note Objects




/* NoteForm Object
// object defines what happents when a user creates a note. In the future I would like to attach this to an agent directory.
*/

var noteForm = {};

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
noteForm.sendInfoAJAX = function(){
	$.post(
		"resources/add_note.php",
		{
			title: "Hello",
			detail: "I am saying hello"
		},

		function(data, status){
			alert(status + data);
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

<<<<<<< HEAD
=======
//Note 


//This will clear the contents of each input box and hide the textarea box.
//Just like in google keep

note.addNote =

>>>>>>> 517d27cbaacf47e6e95353d824537f19912f9762

//When the ussr click the input box. the program will expand the textarea box
note.showContents = function(){

}

note.deleteNote = function(){

}

//Adds note to the main page
note.addNote = function(textarea){

	var inputValue = $("<h1></h1>").text("<h1> Hello </h1>").html();
	var textareaValue;
	var html =  "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-4 note-container'>"
					+"<div id='' class='note-wrapper'>"
				+"<div class='note-title'><strong> </strong></div>" //Title is generated here
				+"<div class='note-detail'><pre>"+inputValue+"</pre></div>" //not details are generated here
				+"<div class='note-options'> Color | Archive | <button class='delete-note'> Delete </button> </div>"
				+"</div>"
				+"</div>";

				console.log("returning html");

				return html;

}

//Submits Note to the datdabase using Ajax
note.submitNote = function(){

}

//Allows you to edit the note by clicking it. Much like they do in google keep
note.editNote = function(){

}

//This will initialize the note by creating the skeleton for each note.
note.init = function(){

}


alert(note.contents);





$(document).ready(function () {
	

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
	
	// =============== ajax start =================

<<<<<<< HEAD
=======
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange=function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// document.getElementById("status-container").innerHTML = xhr.responseText;

			alert(xhr.responseText);
			//Put actions on what to do affter the DATA has AJAXed.

			$('.saved-note').prepend(note.addNote);

			// Escape Input
				// $('.saved-note > div:first-child > .note-wrapper > .note-detail').text(problem_detail);
				// $('.saved-note > div:first-child > .note-wrapper > .note-title strong').text(problem_title);
>>>>>>> 517d27cbaacf47e6e95353d824537f19912f9762


	noteForm.sendInfoAJAX();


	/* ============== AJAX END ================ */



				// Clear Contents of input boxes
				$('.problem-title').val("");
				$('.problem-detail').val("");
				$('.problem-detail').height("20px");
				$('.problem-detail').css("display","none");
				$('.problem-options').css("display","none");


				//Porblem. Trying to make it so th1at when you hover ove a box, the option box appears.
				
			}// Else statement end

				$('.delete-note').click(function(){

			alert("You have clicked this button");
				$('.note-container', this).remove();


		// var xhr = new HMLHttpRequest();
		// xhr.onreadystatechange=function(){
		// 	if(xhr.readyState == 4 && xhr.status == 200) {


		// 	}
		// }
		// xhr.open("POST", "resources/remove_note.php", true);
		// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		// xhr.send("var=something&var=something");

	

	});

		}// Target if statement end

	}); // Input submtit end.


	// When th note is removedd


	

}); //=========== End of Document.ready ==========