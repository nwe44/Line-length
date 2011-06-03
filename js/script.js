/*! 
 * Line measure 
 * http://nwe44.github.com/Line-length/
 * 
 * Copyright (c) 2011 Nicholas Evans
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses. 
 */


var ll = {
	// First we store some variables
	
	averageLineMeasure : null,

	lineHeight : null,

	selector : null,
	
	noOfCharacters : null,

	isWebKit : false,
	
	sampleHeight : null,
	
	measure : {

		getLineHeight : function(){

			// remember, fonts are declared as percentages (we're using Yahoo css fonts)
			// mozilla likes to do things like this, which makes sense to me.
			var fontSize = parseInt($('#type-size').attr('value'), 10);
			
			if(ll.isWebKit){ // ... but the above gives odd results in WebKit, as this isn't a feature to sniff, I'm happy doing a check for WebKit. 
				$('body').append('<div id="h-sample" style="font-size:' + fontSize + '%;">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz</div>');
				ll.lineHeight = $('#h-sample').height();
				$('#h-sample').remove();
			}else{
				ll.lineHeight = parseInt($('#type-size').attr('value'), 10) * (13/100) * 1.231;		
			}
		}, // end getLineHeight
		
		countCharacters : function(){
			var mySample = document.getElementById(ll.selector.substr(1));
			ll.noOfCharacters = mySample.innerHTML.length ;
			
		}, // end countCharacters
		
		lineMeasure : function (newFontSize, myHeight){

			myHeight |= $(ll.selector).height();
			
			// To Do: strip out the trailing line, possibly by counting the position of injected spans.
			var noOfLines = ll.sampleHeight / parseInt(ll.lineHeight, 10);

			ll.averageLineMeasure = parseInt(ll.noOfCharacters / noOfLines, 10);

		} // end lineMeasure		
	
	}, // end measure
	
	present : {
	
		comment : function () {

			var myComment = (ll.averageLineMeasure < 10)  ? ", joker.":
							(ll.averageLineMeasure < 20)  ? ", watch out.":
							(ll.averageLineMeasure < 35)  ? ", that's pretty tight.":
							(ll.averageLineMeasure < 45)  ? ", getting snug.":
							(ll.averageLineMeasure < 75)  ? ". ":
							(ll.averageLineMeasure < 100) ? ", careful now.":
							(ll.averageLineMeasure < 110) ? ", know what you're doing?":
							(ll.averageLineMeasure < 120) ? ", seriously?":
							(ll.averageLineMeasure < 150) ? ", having fun?":
														", ouch!";
														
			$('#characterCount').html(ll.averageLineMeasure + " ");

			$('#comment').html(myComment);

		}, // end comment
		
		decorate : function (lineHeight) {
				
			// Grab the line heights and adjust them to look visually correct
			var backgroundLineHeight = lineHeight * 2;
			
			// I'd like to declare background size in ems in css and just change typesize here, but webkit makes this impossible
			if(ll.isWebKit){
					$('#decoration').css("background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px')
							.css("-webkit-background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px');		
			}else{
				$('#decoration').css("background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px')
							.css("-moz-background-size", backgroundLineHeight  +'px ' + backgroundLineHeight  +'px');
			}
	
			// Change the body height to accomodate the text
			if(parseInt($(ll.selector).height(), 10) + 130 < parseInt($(window).height(), 10)){

				$('#decoration').animate({'height': ($(window).height()-150) + "px"}, 1000);

			}else{

				$('#decoration').animate({'height': $(ll.selector).css('height')}, 1000);

			}

		}, // end decorate
		
		
		// changes the shape of the grabber
		setRulerDimensions : function(){
			var sampleWidth = $(ll.selector).css('width');
			$('#length-span').html(sampleWidth).parent().css('width', sampleWidth);
			$('#sample-wrapper').css('width', sampleWidth).css('height', (parseInt($(ll.selector).css('height'), 10) + ll.lineHeight) + "px");
		} // end setRulerDimensions
	
	}, // end present


	logic : {
		assess : function () {
			
			// update the lineHeight
			ll.measure.getLineHeight();
		
			// Find out what we're working with
			ll.measure.lineMeasure();
			
			// update the comment
			ll.present.comment();
			
			// decorate the background
			ll.present.decorate(ll.lineHeight);
			
			// change the number on the slider, and the grabber shape
			ll.present.setRulerDimensions(ll.lineHeight);				
			
		} // end assess
	}, // end logic

	init : function(selector){
		// begin by defining our environment
		
		ll.selector = selector || '#sample';
		
		ll.sampleHeight = parseInt($(ll.selector).height(), 10);
		
		// find out the size of our sample
		ll.measure.countCharacters();
		
		// are we using webKit
		// I know browser sniffing is naughty, but this is a browser bug, so I reason this is acceptible
		ll.isWebkit = RegExp(" AppleWebKit/").test(navigator.userAgent);
		
		
		// setup behaviours
		$(ll.selector).resizable({
				grid: 10, 
				handles: 'e',
				containment: 'parent',
				resize: function(event, ui) { 
					ll.present.setRulerDimensions();
					$('.ui-resizable-e').css('width', ($(ll.selector).width() + 30)+"px");
					if($('#decoration').height() < $(ll.selector).height()){
						$('#decoration').css('height', $(ll.selector).css('height'));
					}
				},
				stop: function(event, ui) { 
					ll.sampleHeight = $(ll.selector).css("width", $(this).attr('value') + "px").height();
					ll.logic.assess();
				} 
		});
		$('#type-size').change(function(){
			ll.sampleHeight = $(ll.selector).css("font-size", $(this).attr('value') + "%").height();
			ll.logic.assess();
		});
		$('#fonts').change(function(){
			ll.sampleHeight = $(ll.selector).css("font-family","\"" + $(this).attr('value') + "\"").height();
			ll.logic.assess();
		});
		
		
		// check the initial setup
		ll.logic.assess();
	}// end init
};

$(document).ready(function() { 
	ll.init();
});
