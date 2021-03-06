var hellaArray = ['Vape','Hoverboard','Records','Glasses','Mustache','Avocado Toast','Coffee','Beards','Bikes','EDM','Totes','FOMO'];

function addingMoreButtons(){
	$('#hellaButtons').empty();
	for (var i=0; i < hellaArray.length; i++){
		var hipButtons = $('<button>');
		hipButtons.text(hellaArray[i]);
		hipButtons.addClass('btn');
		hipButtons.attr('value', hellaArray[i]);
		$('#hellaButtons').append(hipButtons);
	};
};

addingMoreButtons();


$(document).on('click', 'input#addMore', function(event){
	event.preventDefault();
	var addButton = $('#hella-input').val().trim();

	console.log(addButton)
	hellaArray.push(addButton);
	console.log(hellaArray);
	addingMoreButtons();
	$('#hella-input').val('');
});
console.log(hellaArray);

var url = "https://api.giphy.com/v1/gifs/search?api_key=5ac4fb712bdb4b6f9dc8f599a9fc218f";

//Requests specific button value for GIPHY API
$(document).on('click', 'button.btn', function(){

	//emptys gif place area
	$('#pix-place').empty();

	var clickedVal = $(this).val()
	console.log(clickedVal)

	//takes text value in button and uses that for q
	url += "&" + $.param({
		'q': clickedVal,
		'limit': 10
	})
	//Response for GIPHY API
	$.ajax({
		url: url,
		method: "GET"
	}).done(function(response){
		console.log(response.data[0]);
		for (var j=0; j < response.data.length; j++){
			//object call for ratings
			var getRating = response.data[j].rating;
			//object call for fixed_height_still.url
			var getPixStill = response.data[j].images.fixed_height_still.url;
			//object call for fixed_height.url
			var getPixMoving = response.data[j].images.fixed_height.url;
			//relevant tags
			var spanStuff = $('<div class="polaroid fade-in-pix">');
			var ratingDiv = $('<div class="rates">');
			var gifTag = $('<img>');

			//adds attributes to imgs
			gifTag.addClass('gif-click');
			gifTag.attr('src', getPixStill);
			gifTag.data('current-status', 'still');
			gifTag.data('animated', getPixMoving);
			gifTag.data('still', getPixStill);

			//appends gifs+ratings to DOM
			ratingDiv.append('Rating: ' + getRating);
			spanStuff.append(gifTag);
			spanStuff.append(ratingDiv);
			$('#pix-place').append(spanStuff);
		}//for loop
	})//done function(response)
}); // btn click

//event delegation? https://stackoverflow.com/questions/16893043/jquery-click-event-not-working-after-adding-class
$('#pix-place').on('click', 'img.gif-click' ,function(){
	console.log('clickity');

	//pulls data of data-current-status
	var state = $(this).data('current-status');

	//why is there a delay? prob due to lag to retrieve gif
	if(state === 'still'){

		//changes src to data-animated + current-status to animated
		var animationOn = $(this).data('animated');
		$(this).attr('src', animationOn);
		$(this).data('current-status', 'animated');

	} else if(state === 'animated'){ 

		//changes src to data-still + current-status to still
		var animationOff = $(this).data('still');
		$(this).attr('src', animationOff);
		$(this).data('current-status', 'still');
	};
});//document click img.gif-click
