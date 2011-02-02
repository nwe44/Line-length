/* Author: Nick Evans

*/


var ll = {}

ll.countCharacters = function (newFontSize, myHeight){
	myHeight |= $('#sample').height();
	$('body').append('<div id="h-sample" style="font-size:' + newFontSize + '%;">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz</div>');
	var lineHeight = $('#h-sample').height();
 	$('#h-sample').remove();

	var noOfLines = parseInt(myHeight) / parseInt(lineHeight);
	var mySample = document.getElementById('sample');
	var averageLineLength = parseInt(mySample.innerHTML.length / noOfLines);
	var comment =	(averageLineLength < 10)  ? ", joker.":
					(averageLineLength < 20)  ? ", sure you can't make it a bit longer?":
					(averageLineLength < 40)  ? ", that's pretty snug.":
					(averageLineLength < 90)  ? ".":
					(averageLineLength < 100) ? ", careful now.":
					(averageLineLength < 110) ? ", sure you know what you're doing?":
					(averageLineLength < 120) ? ", really?":
					(averageLineLength < 150) ? ", having fun?":
												", ouch!";
								
	$('#counter').html("Your average line length is <strong>" + averageLineLength +"</strong>" +"<span class='comment'>" + comment+"</span>");
	var backgroundLineHeight = parseInt(lineHeight) * 2;
	$('#decoration').css("background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px');
	$('#decoration').css("-moz-background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px');
	$('#decoration').css("-webkit-background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px');
	$('#decoration').animate({'height': $('#sample').css('height')}, 1000);
	$('#length').html('<span>' + $('#sample').css('width') + '</span>').css('width', $('#sample').css('width'));
	$('#sample-wrapper').css('width', $('#sample').css('width')).css('height', $('#sample').css('height'));
}
ll.behaviours = function(){
	$('#sample').resizable({
			grid: 10, 
			handles: 'e',
			containment: 'parent',
			resize: function(event, ui) { 
			$('#length').html('<span>' + $('#sample').css('width') + '</span>').css('width', $('#sample').css('width'));
			$('#sample-wrapper').css('width', $('#sample').css('width')).css('height', $('#sample').css('height'));
			},
			stop: function(event, ui) { 
				var myHeight = $('#sample').css("width", $(this).attr('value') + "px").height();
				ll.countCharacters($('#type-size').attr('value'), myHeight);
			} 
	});

	$('#type-size').change(function(){
		var myHeight = $('#sample').css("font-size", $(this).attr('value') + "%").height();
		ll.countCharacters($(this).attr('value'), myHeight);
	});
	$('#fonts').change(function(){
		var myHeight = $('#sample').css("font-family","\"" + $(this).attr('value') + "\"").height();
		ll.countCharacters($('#type-size').attr('value'), myHeight);
	});
}
$(document).ready(function() { 
	ll.countCharacters(100);
	ll.behaviours();
});
















