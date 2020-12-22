(function(){
	function loadCSS(url){
	var loadStyles = document.createElement('link');
	loadStyles.rel = "stylesheet";
	loadStyles.href= url;
	document.head.appendChild(loadStyles);
	}
	loadCSS('./resources/css/font-awesome.min.css');
	loadCSS('https://fonts.googleapis.com/css?family=Roboto:400,500,700,500italic,300italic,300,400italic');
	}());

/*-----Slider----------*/
	
var $slider = $(".slider"), $bullets = $(".bullets");
function calculateHeight(){
	var height = $(".slide.active").outerHeight();
	$slider.height("714px");
}

$(window).resize(function() {
	calculateHeight();
	clearTimeout($.data(this, 'resizeTimer'));
});

function resetSlides(){
	$(".slide.inactive").removeClass("inactiveRight").removeClass("inactiveLeft");
}

function gotoSlide($activeSlide, $slide, className){
		$activeSlide.removeClass("active").addClass("inactive "+className);
		$slide.removeClass("inactive").addClass("active");
		calculateHeight();
		resetBullets();
		setTimeout(resetSlides, 300);
}

$(".next").on("click", function(){
		var $activeSlide = $(".slide.active"),
			$nextSlide = $activeSlide.next(".slide").length != 0 ? $activeSlide.next(".slide") : $(".slide:first-child");
			console.log($nextSlide);
			gotoSlide($activeSlide, $nextSlide, "inactiveLeft");
});
$(".previous").on("click",  function(){
		var $activeSlide = $(".slide.active"),
			$prevSlide = $activeSlide.prev(".slide").length != 0 ? $activeSlide.prev(".slide") : $(".slide:last-child");

			gotoSlide($activeSlide, $prevSlide, "inactiveRight");
});
$(document).on("click", ".bullet", function(){
	if($(this).hasClass("active")){
		return;
	}
	var $activeSlide = $(".slide.active");
	var currentIndex = $activeSlide.index();
	var targetIndex = $(this).index();
	console.log(currentIndex, targetIndex);
	var $theSlide = $(".slide:nth-child("+(targetIndex+1)+")");
	gotoSlide($activeSlide, $theSlide, currentIndex > targetIndex ? "inactiveRight" : "inactiveLeft");
})
function addBullets(){
	var total = $(".slide").length, index = $(".slide.active").index();
	for (var i=0; i < total; i++){
		var $bullet = $("<div>").addClass("bullet");
		if(i==index){
			$bullet.addClass("active");	
		}
		$bullets.append($bullet);
	}
}
function resetBullets(){
	$(".bullet.active").removeClass("active");
	var index = $(".slide.active").index()+1;
	console.log(index);
	$(".bullet:nth-child("+index+")").addClass("active");
}
addBullets();
calculateHeight();

/*----Form-----*/

function validateEmail(email) {
	if(!email) {
		return false
	}
	
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test(email);
}

$(document).ready(function() {
	$("#submitForm").on('click', function($event) {
		$event.preventDefault();
		if(!validateEmail($("#email").val())) {
			$(".Pufi__invalidMsg").css("visibility", "visible")
		} else {
			$(".Pufi__invalidMsg").css("visibility", "hidden")
		}
	})
})
