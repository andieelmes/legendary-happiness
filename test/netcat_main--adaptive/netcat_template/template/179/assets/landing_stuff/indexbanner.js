$(function(){
	
	// ! init button waves
	
	function initWavesButtons() {
		
		if ($('.indexbanner-btn').length) Waves.attach('.indexbanner-btn', ['waves-button']);
		Waves.init();
		
	};
	
	initWavesButtons();
	
	
	// ! rocket
	
	function initRocket() {
		
		var $btn = $('.indexbanner-btn'),
			$wrap = $('.indexbanner-btn-wrapper'),
			$rocket = $('.indexbanner-rocket'),
			
			rotated = 360,
			intrvl;
		
		$btn.on('mouseenter', function(){
			
			intrvl = setInterval(function(){
				$rocket.animate({
					transform: 'rotate('+rotated+'deg)'
				}, 10);
				rotated -= 1;
				if (rotated <= 1) rotated = 360;
			}, 12);
			
		}).on('mouseleave', function(){
			
			clearInterval(intrvl);
			
		})
		
	};
	
	initRocket();
	
});