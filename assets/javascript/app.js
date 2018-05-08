
//
$(document).ready(function(){ 

	var gifArray = ["cat","bat","dog","fish", "shark", "falcon", "skunk", "goldfish", "chicken", "chinchilla", "parrot", "falcon", "rabbit", "chicken", "chinchilla", "parrot", "falcon", "rabbit"];

	function prependNewButton(newGif){ 
        var createButton = $('<button>')
        createButton.attr('type', "button");
        createButton.addClass('gif');
        createButton.attr('data-name', newGif);
        createButton.text(newGif);
        
        // use .prepend to locate new button at the beginigng, use append to place button last
        $('#buttonsView').append(createButton);
		};

        // This function will displat the Gif array

		function renderButtons(){ 
    	for (var i = 0; i < gifArray.length; i++){
        prependNewButton(gifArray[i])
		}
	};

    function displayGifInfo(){

    	$('#gifView').empty();
        var gif = $(this).attr('data-name');

        // we will call query and limit search to 10
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

       
        // Can also use .done(function(response) {
 
        $.ajax({url: queryURL, method: 'GET'}).then(function(response) {

        	var results = response.data;
                 // console.log(gifs)
        	for (var i = 0; i < results.length; i++) {
        		var gifDiv = $('<div>');
                 // Creating a paragraph tag with the result item's rating
        		var p = $('<p>');
                // Creating an image tag
                var gifImage = $('<img>');
                var gifStill = response.data[i].images.fixed_height_still.url;
                var gifAnimate = results[i].images.fixed_height.url
                var rating = response.data[i].rating;
                

                gifImage.addClass('gifToggle');
                // Giving the image tag an src attribute of a proprty pulled off the
              // result item
                gifImage.attr('data-still', gifStill);
                gifImage.attr('data-animate', gifAnimate);
                gifImage.attr('data-state', 'still');
                gifImage.attr('src', gifStill);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(gifImage);
                gifDiv.prepend(rating);
                gifDiv.prepend('Rating: ')	   

                // Prepending the gifDiv to the "#gifsView" div in the HTML       	

            	$('#gifView').prepend(gifDiv);
        	}
        }); 
    }
	
    function gifState () {
		var state = $(this).attr('data-state');

	 	if (state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    };



	renderButtons();
	
	$('#searchButton').on('click', function(){
		$('#gif-input').text('');
		$('#gifView').empty();

		
	

       // Perfoming an AJAX GET request to our queryURL

		$.ajax({
	            url: queryURL,
	            method: 'GET'
	        })
        // After the data from the AJAX request comes back
	        .then(function(response) {
	        	console.log(response);

             // Saving results
	        	var results = response.data;

	        	for (var i = 0; i < results.length; i++) {
	        		var gifDiv = $('<div>');
	        		var gifImage = $('<img>');
	        		var p = $('<p>');
                    var gifStill = response.data[i].images.fixed_height_still.url;
                    var gifAnimate = results[i].images.fixed_height.url;

                    gifImage.addClass('gifToggle');

                    gifImage.attr('data-still', gifStill);
                    gifImage.attr('data-animate', gifAnimate);
                    gifImage.attr('data-state', 'still');
                    gifImage.attr('src', gifStill);

                    gifDiv.prepend(gifImage);
                    gifDiv.append(p);
                    

	            	$('#gifView').prepend(gifDiv);
	            	

	            }

	            if (results.length == 0) {
	            	$('#gifView').text("No gifs found")
	            };

	        });


		return false;
	});

    //clistener for on click button to show stills
    // listener for still to animate Gif

	$(document).on('click', '.gif', displayGifInfo);
	$(document).on('click', '.gifToggle', gifState);
});