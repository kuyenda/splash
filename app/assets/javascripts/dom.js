$(function() {
	$('#mobile-menu-btn').on('click', function() {
		$('#mobile-menu').toggleClass('open');
		$('.hamburger').toggleClass('is-active');
	});
})
if (!window.et_player) {
	window.et_player = {
		history_player: undefined,
		playlist: [
			'Lena Raine-Awake.mp3',
		],
		rand: function(max) {
			return Math.floor(Math.random() * Math.floor(max));
		},
		play: function(player) {
			if (this.history_player) {
				this.history_player.pause();
			}
			if (this.playlist.length == 0) {
				return;
			}
			this.history_player = player
			this.history_player.src = "/assets/" + this.playlist[this.rand(this.playlist.length)];
			this.history_player.loop = true;
			setTimeout(() => this.history_player.play(), 200);
		},
	}
}
$(document).on('turbolinks:load', function() {
	// Prism.highlightAll();
});
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