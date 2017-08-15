// Wait for window load
$(window).load(function () {
	// Animate loader off screen
	setTimeout(function () {
		$(".myLoader").fadeOut("slow");;
	}, 2000);
});
