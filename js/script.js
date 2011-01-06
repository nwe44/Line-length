/* Author: 

*/


var ll = {}

ll.countCharacters = function (){

	var mySample = document.getElementById('sample');
	var allMyCharacters = mySample.getElementsByTagName('b');
	var i = allMyCharacters.length;
	var myLines = 0;
	var myLineOffset = 0;
	var currentOffset = {};
	var myAverageLineLength = 0;
	var currentCharacterWidth = 0;
	while(i--) { 
		currentOffset = $(allMyCharacters[i]).offset();
		currentCharacterWidth =  $(allMyCharacters[i]).width();
		if(currentOffset.top != myLineOffset && currentCharacterWidth > 0){
			console.log("myLineOffset: " + myLineOffset + " vs " + "currentOffset.top: " +currentOffset.top );
			myLineOffset = currentOffset.top;
			myLines++;
			$(allMyCharacters[i]).after("<span class='pipe'>|</span>");
		}
	}

	
	myAverageLineLength = parseInt(allMyCharacters.length / myLines);
	$('#counter').html("Characters: " + allMyCharacters.length + "<br /> line(s):" + myLines + "<br />Average line length: " + myAverageLineLength);
}



$(document).ready(function() { 
	ll.countCharacters();
});
















