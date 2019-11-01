$(function() {
	// $('.para').hide();
	// $('.para').fadeIn(1000);
	// $('#para').append('<div class="codeblock"><h3>2. start a simple http server</h3><pre class="language-ruby"><code class="language-python">python -m http.server 3000</code></pre></div>');
	// $('#code1').load("codes/ex.rb");
	$('#mobile-menu-btn').on('click', function() {
		$('#mobile-menu').toggleClass('open');
		$('.hamburger').toggleClass('is-active');
	});
})

new Chartist.Line('.ct-chart', {
	labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
	series: [
		[1, 1, 1, 2, 1, 1, 1]
	]
}, {
	high: 5,
	low: 0,
	onlyInteger: true,
	showArea: true,
	ticks: ['One', 'Two', 'Three'],
});