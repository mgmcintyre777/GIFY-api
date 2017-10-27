"use strict";

const buttonLabels = ["dog", "cat", "batman", "javascript", "happy", "turtle"];
const maxImages = 10;

const $div_buttonsArea = $("#buttons-area");
const $div_gifsArea = $("#gifs-area");
const $btn_inputButton = $("#input-button");
const $frm_inputTextbox = $("#input-textbox");

$div_buttonsArea.append(generateButtons(buttonLabels));
$btn_inputButton.on("click", onClick_addButton);

function generateButtons(labelsArray){

	return labelsArray.map(function(label){

		return $("<button type='button'>")
			.addClass("btn btn-primary btn-sm mt-1 mr-1")
			.attr("label", label)
			.html(label)
			.css('cursor', 'pointer')
			.on("click", onClick_labelButton);
	});
}

function generateImageDivs(imageData){

	return imageData.map(function(data){

		var $img_gif = $("<img>")
			.addClass("figure-img img-fluid rounded")
			.attr("src", data.images.fixed_height_still.url)
			.attr("still_url", data.images.fixed_height_still.url)
			.attr("animate_url", data.images.fixed_height.url)
			.css('cursor', 'pointer')
			.on("click", onClick_gifImage);

		var $p_rating = $("<figcaption>")
			.addClass("figure-caption")
			.html("Rating: " + data.rating.toUpperCase());

		var $div_gif = $("<figure>")
			.addClass("figure float-left mr-1")
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
	var input = $frm_inputTextbox.val().trim();
	if(input){
		$div_buttonsArea.append(generateButtons([input]));
		getGiffy(input);
	}
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