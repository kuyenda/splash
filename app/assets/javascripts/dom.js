$(function() {
	$('#mobile-menu-btn').on('click', function() {
		$('#mobile-menu').toggleClass('open');
		$('.hamburger').toggleClass('is-active');
	});
})

// new Chartist.Line('.ct-chart', {
// 	labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
// 	series: [
// 		[1, 1, 1, 2, 1, 1, 1]
// 	]
// }, {
// 	high: 5,
// 	low: 0,
// 	onlyInteger: true,
// 	showArea: true,
// 	ticks: ['One', 'Two', 'Three'],
// });

(() => {
	var dataScope = $('#dataff')
	if (dataScope) {
		var t = $.parseJSON(dataScope.attr('data-w'))
		dataScope.append(t.name)
	}
})();