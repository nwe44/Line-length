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


var ll = {
	getLineHeight : function(){
		// remember, fonts are declared as percentages (we're using Yahoo css fonts)
		// mozilla likes to do things like this, which makes sense to me.
		var fontSize = parseInt($('#type-size').attr('value'));
		
		// I know browser sniffing is naughty, but this is a browser bug
		if(WebKitDetect.isWebKit()){
			$('body').append('<div id="h-sample" style="font-size:' + fontSize + '%;">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz</div>');
			var lineHeight = $('#h-sample').height();
		 	$('#h-sample').remove();
		}else{
			var lineHeight = parseInt($('#type-size').attr('value')) * (13/100) * 1.231;		
		}
		return lineHeight;
	},
	setRulerWidth : function(lineHeight){
		var sampleWidth = $('#sample').css('width');
		$('#length-span').html(sampleWidth).parent().css('width', sampleWidth);
		$('#sample-wrapper').css('width', sampleWidth).css('height', (parseInt($('#sample').css('height')) + lineHeight) + "px");
	},
	countCharacters : function (newFontSize, myHeight){
		myHeight |= $('#sample').height();

		lineHeight = ll.getLineHeight();	
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
						
		$('#characterCount').html(averageLineLength);
		$('#comment').html(comment);
		
		// With the hard stuff done, let's do some decoration
		
		// Grab the line heights and adjust them to look visually correct
		var backgroundLineHeight = lineHeight * 2;
		
		// I'd like to declare background size in ems in css, and just change typesize here, but webkit makes this impossible
		if(WebKitDetect.isWebKit()){
				$('#decoration').css("background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px')
						.css("-webkit-background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px');		
		}else{
			$('#decoration').css("background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px')
						.css("-moz-background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px');
		}

		// Change the body height to accomodate the text
		if(parseInt($('#sample').height()) + 130 < parseInt($(window).height())){
			$('#decoration').animate({'height': ($(window).height()-150) + "px"}, 1000);
		}else{
			$('#decoration').animate({'height': $('#sample').css('height')}, 1000);
		}
		ll.setRulerWidth(lineHeight);
	},

	behaviours : function(){
		$('#sample').resizable({
				grid: 10, 
				handles: 'e',
				containment: 'parent',
				resize: function(event, ui) { 
					ll.setRulerWidth(ll.getLineHeight());
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
		$('.disqus-toggle').click(function(){
			$('#disqus-wrapper').slideToggle();
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
}
$(document).ready(function() { 
	ll.countCharacters(100);
	ll.behaviours();
});
















