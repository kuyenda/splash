$(document).ready(function() {
	$('.typography').find('a').removeClass().addClass('link o50 glow');
	$('.typography').find(`a[href="${location.href}"]`).removeClass().addClass('red red2h');
});