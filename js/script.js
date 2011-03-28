/* Author: Nick Evans

ToDo
Improve line length calculation
design controls - maybe not as select boxes, but some sort of toggle button
test resizable usability
firefox not changing the background lines correctly
why does this matter -- link to elements of typographic style applied to the web
add typekit?
add footer to cope #sample being shorter than the window
add link to nick-evans.com
branding?
*/


var ll = {}

ll.countCharacters = function (newFontSize, myHeight){
	myHeight |= $('#sample').height();
	// remember, fonts are declared as percentages, we're using Yahoo css fonts
	// mozilla likes to do things like this, which makes sense to me.
	var lineHeight = newFontSize * (13/100) * 1.231;
	
	// webkit requires these shenanigans. 
	$('body').append('<div id="h-sample" style="font-size:' + newFontSize + '%;">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz</div>');
	var webkitLineHeight = $('#h-sample').height();
 	$('#h-sample').remove();

	var noOfLines = parseInt(myHeight) / parseInt(lineHeight);
	var mySample = document.getElementById('sample');
	var averageLineLength = parseInt(mySample.innerHTML.length / noOfLines);
	var comment =	(averageLineLength < 10)  ? ", joker.":
					(averageLineLength < 20)  ? ", watch out.":
					(averageLineLength < 35)  ? ", that's pretty tight.":
					(averageLineLength < 45)  ? ", getting snug.":
					(averageLineLength < 75)  ? ". ":
					(averageLineLength < 100) ? ", careful now.":
					(averageLineLength < 110) ? ", know what you're doing?":
					(averageLineLength < 120) ? ", seriously?":
					(averageLineLength < 150) ? ", having fun?":
												", ouch!";
					
	$('#counter').html("Your average line length is <strong>" + averageLineLength +"</strong> characters" +"<span class='comment'>" + comment+"</span>");
	var backgroundLineHeight = lineHeight * 2;
	var wekbkitBackgroundLineHeight = webkitLineHeight * 2;
	$('#decoration').css("background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px');
	$('#decoration').css("-moz-background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px');
	$('#decoration').css("-webkit-background-size", wekbkitBackgroundLineHeight  +'px ' + wekbkitBackgroundLineHeight  +'px');
	if(parseInt($('#sample').height()) + 130 < parseInt($(window).height())){
		$('#decoration').animate({'height': ($(window).height()-150) + "px"}, 1000);
	}else{
		$('#decoration').animate({'height': $('#sample').css('height')}, 1000);
	}
	
	$('#length').html('<span>' + $('#sample').css('width') + '</span>').css('width', $('#sample').css('width'));
	$('#sample-wrapper').css('width', $('#sample').css('width')).css('height', (parseInt($('#sample').css('height')) + lineHeight) + "px");
}
ll.behaviours = function(){
	$('#sample').resizable({
			grid: 10, 
			handles: 'e',
			containment: 'parent',
			resize: function(event, ui) { 
				$('#length').html('<span>' + $('#sample').css('width') + '</span>').css('width', $('#sample').css('width'));
				var lineHeight = parseInt($('#type-size').attr('value')) * (13/100) * 1.231;
				$('#sample-wrapper').css('width', $('#sample').css('width')).css('height', (parseInt($('#sample').css('height')) + lineHeight) + "px");
				$('.ui-resizable-e').css('width', ($('#sample').width() + 30)+"px");
				if($('#decoration').height() < $('#sample').height()){
					$('#decoration').css('height', $('#sample').css('height'));
				}
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
















