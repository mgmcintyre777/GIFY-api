"use strict";
const buttonLabels = ["dog", "cat", "batman", "javascript", "happy", "meme"];
const maxImages = 10;
const $div_buttonsArea = $("#buttons_area");
const $div_gifsArea = $("#gifs_area");

$div_buttonsArea.append(generateButtons());

function generateButtons(){

	return buttonLabels.map(function(label){

		return $("<button type='button'>")
			.addClass("btn btn-primary btn-sm mt-1 mr-1")
			.attr("label", label)
			.html(label)
			.css( 'cursor', 'pointer' )
			.on("click", onClick_labelButton);

	});
}

function generateImageDivs(imageData){

	return imageData.map(function(data){

		var $img_gif = $("<img>")
			.attr("src", data.images.fixed_height_still.url)
			.attr("still_url", data.images.fixed_height_still.url)
			.attr("animate_url", data.images.fixed_height.url)
			.css('cursor', 'pointer')
			.on("click", onClick_gifImage);

		var $p_rating = $("<p>")
			.html("Rating: " + data.rating.toUpperCase());

		var $div_gif = $("<div>")
			.append($img_gif)
			.append($p_rating);

		return $div_gif;
	});
}

function getGiffy(searchTerm){
	var qryURL = "https://api.giphy.com/v1/gifs/search?q=" 
		+ searchTerm + "&limit=" + maxImages
		+ "&api_key=mZy8a9OzcJUm6UDmN9T2MjZVPF5Kn6hH";

	$.ajax({url: qryURL, method: 'GET'}).done(
		function(response){
			$div_gifsArea.empty();
			$div_gifsArea.append(generateImageDivs(response.data));			
		}
	);
}

function onClick_addButton(){


}

function onClick_gifImage(){	
	var isPaused = ($(this).attr("src") === $(this).attr("still_url"));
	isPaused ? 
		$(this).attr("src", $(this).attr("animate_url")) :
		$(this).attr("src", $(this).attr("still_url"));
}

function onClick_labelButton() {
	getGiffy($(this).attr("label"));	
}