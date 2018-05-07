$(document).ready(function(){ 

	var gifArray = ["cat","bat","dog","fish", "shark", "falcon", "skunk", "goldfish", "chicken", "chinchilla", "parrot", "falcon", "rabbit", "chicken", "chinchilla", "parrot", "falcon", "rabbit"];

	function appendNewButton(newGif){ 
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
        appendNewButton(gifArray[i])
		}
	};

    function displayGifInfo(){

    	$('#gifView').empty();
        var gif = $(this).attr('data-name');

        // we will call query and limit search to 10
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        // This can be done in-line or using multy lines as used in class
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {
        		var gifDiv = $('<div>');
        		var p = $('<p>');
                var gifImage = $('<img>');
                var gifStill = response.data[i].images.fixed_height_still.url;
                var gifAnimate = results[i].images.fixed_height.url
                var rating = response.data[i].rating;

                gifImage.addClass('gifToggle');
                gifImage.attr('data-still', gifStill);
                gifImage.attr('data-animate', gifAnimate);
                gifImage.attr('data-state', 'still');
                gifImage.attr('src', gifStill);

                gifDiv.append(p);
                gifDiv.append(gifImage);
                gifDiv.prepend(rating);
                gifDiv.prepend('Rating: ')	           	

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

		var gifSearch = $('#gif-input').val().trim();
		gifArray.push(gifSearch);
		appendNewButton(gifSearch);

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
	            url: queryURL,
	            method: 'GET'
	        })
	        .done(function(response) {
	        	console.log(response);

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

                    gifDiv.append(gifImage);
                    gifDiv.append(p);
                    

	            	$('#gifView').prepend(gifDiv);
	            	gifState ();

	            }

	            if (results.length == 0) {
	            	$('#gifView').text("No gifs found")
	            };

	        });


		return false;
	});

	$(document).on('click', '.gif', displayGifInfo);
	$(document).on('click', '.gifToggle', gifState);
});