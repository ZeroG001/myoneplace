/*
 *  @param STRING 
 *  @param INT
 *
 *  Takes the array, searches a word in the array the appends
 *  it to the body. Right now you have to type the full word.
 *  for it to work.
 *
 * TODO
 * Show all individuals with that name 
 */

var employee_directory = new Object();


/*Function employee_directory.livesearch
    @   Returns Array
    @   Array properties: .FirstName .LastName .password .UserID
    */

employee_directory.livesearch = function search_array(word, arr) {
    //Create a reg expression that will search for a person in the array. Make is not case sensitve.
    //Have the function return a new array containing only the search results.
    //Display the results on the page.
    var express = new RegExp(word, "i");

    var new_arr = jQuery.grep(all_people.people, function (a, i) {
        var combine = a.FirstName + " " + a.LastName;
        if ((a.FirstName.match(express) || a.LastName.match(express) || combine.match(express))) {
            return true;
        }
    });
    return new_arr;
} //End Search_array function


employee_directory.show_results = function (result_array) {

    

    if (result_array.length < 100) {

    /*
        
        This commented code tells you how many results were found. I took this out because it was getting in the way of the search results.

    $(".result_wrapper p").remove();
    $(".result_wrapper").append("<p>"+ result_array.length +" Found</p>");*/

        for (i = 0; i < result_array.length; i++) {
            $(".result_wrapper").append("<div class='result_agent' id='" + i + "'><img src='http://" + result_array[i].PhotoURL + "'<h3>" + result_array[i].FirstName + " " + result_array[i].LastName + "</h3></div>");
           // $(".result_agent").fadeTo("slow", 1);
        }
    } else {
        $(".main_wrapper").append("<div class='nothing'></div>");

    } //End Display

}

//Got this code from stack_overflow, this logic is a little above my head, but im glad it works.
employee_directory.fancy_textbox =  function() {
    function tog(v){return v?'addClass':'removeClass';} 

$(document).on('input', '.search_agent', function(){
    $(this)[tog(this.value)]('x');
}).on('mousemove', '.x', function( e ){
    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');   
}).on('click', '.onX', function(){
    $(this).removeClass('x onX').val('');
});
}


// --------------------------------------------- Document.ready -------------------------------------------------------

$(document).ready(function () {

    $(window).resize(function(){
    if($(window).width() > 720){
        event.preventDefault();
        
       
       $(".left_side").css("visibility", "visible");
       $("body").css("overflow-y", "scroll");
    }
});



    //Click and slide function. When you clikc the 3 bars at the stop you get this cool sliding effect. Hope it works on mobiles....
    $(".menu_button").click(function(){


        if($(".main_header, .right_side").hasClass("move_left")) {
            $("body").css("overflow-y", "scroll");
           var buffer_animation = $(".main_header, .right_side").removeClass("move_left");
            setTimeout(function(){
                $(".left_side").css("visibility", "hidden"); 
                
            },500);
           
        } else {
            clearTimeout(buffer_animation);
            $(".left_side").css("visibility", "visible");
            $("body").css("overflow-y", "hidden");
        $(".main_header, .right_side").addClass("move_left");
    }



    
       /* $(".left_side").stop();
        var toggleWidth = $(".left_side").css("left") == "-272px" ? "0" : "-272px";
                    $(".left_side").animate({
                left : toggleWidth
                    }, 300);
*/
                });  
$(".right_side").click(function(){
if($(".right_side").css("left") != "auto") {
        $(".menu_button").click();
    } else {
        return false;
    }

});
    


//textbox animation
employee_directory.fancy_textbox();
//textbox animation end.


    var test = $(".search_agent").keyup(function (event) {
        var arr = [];
        event.preventDefault();



        var result_array = employee_directory.livesearch($(".search_agent").val(), arr, $(".select_office").val());


      var delayed_search = setTimeout(function(){
        //Its important you leave this .remove() method here...I may need to change this around\
        $(".result_agent").remove();
        employee_directory.show_results(result_array);


        /*
        * Click Event

        *When a user clicks one of the result boxes, the boxes id is stored in a variable "selected_item". this variable is used reference particular
        *items with the result_array. 


        */
        $(".result_agent").click(function (event) {
            event.preventDefault();
            var selected_item = $(this).attr("id");
            $(".full_agent_details").remove();
            $(".right_side").append("<div class='full_agent_details'></div>");


            setTimeout(function(){$(".full_agent_details").addClass("float_in");}, 250);
           //This provides the fancy sliding animation
           /*   $(".full_agent_details").css("left", "-" + $(".full_agent_details").css("width"));
            $(".full_agent_details").animate({
                left : "0"
            }, 300);
            */

            // End

            //Get rid of this soon .go funtion

            $(".full_agent_details").append("<h2>" + result_array[selected_item].FirstName + " " + result_array[selected_item].LastName + "</h2>"
        
                +"<div class='agent_details_photo'><img src='http://" + result_array[selected_item].PhotoURL + "'/></div>"
                +"<div class='agent_details_text'>"
                + "<p> <span class='agent_details_text_header'>Office </span>" + result_array[selected_item].OfficeName + "</p>"
                + "<p> <span class='agent_details_text_header'>Office Phone </span>" + result_array[selected_item].OfficePhoneNumber + "</p>"
                + "<p> <span class='agent_details_text_header'>Personal Phone </span>" + result_array[selected_item].PhoneNumber + "</p>"
                + "<p> <span class='agent_details_text_header'>Mobile Phone </span>" + result_array[selected_item].MobileNumber + "</p>"
                + "<p> <span class='agent_details_text_header'>Email </span>" + result_array[selected_item].EmailAddress + "</p>"
                + "<p> <span class='agent_details_text_header'>Agent Website </span> <a href='" + result_array[selected_item].AgentURL + "'>"+ result_array[selected_item].AgentURL +"</a></p>"
                + "<p> <span class='agent_details_text_header'>Login ID </span>" + result_array[selected_item].UserID + "</p>"
                + "<p> <span class='agent_details_text_header'>Lisence Number </span>" + result_array[selected_item].MLSID + "</p>"
                + "<p> <span class='agent_details_text_header'>Last Four! </span> " + result_array[selected_item].Password + "</p>"
                +"</div>"

                );
        });

},500);

$(".search_agent").keyup(function(){
    clearTimeout(delayed_search);
});         
    });


                

});