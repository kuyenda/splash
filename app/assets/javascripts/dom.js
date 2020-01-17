$(document).on('ready turbolinks:load', function() {
	$('#mobile-menu-btn').on('click', function() {
		$('#mobile-menu').toggleClass('open');
		$('.hamburger').toggleClass('is-active');
	});
	$('#sketch-info-btn').on('click', function() {
		$('#sketch-info').toggleClass('open');
		$('#sketch-info-btn').toggleClass('opened');
	});
	$("button[data-editor-button='option']").click(function(event) {
		$('#sketchConfigPanel').toggleClass('active');
	});
	if (!window._splash_radio) {
		window._splash_radio = {
			history_player: undefined,
			playlist: [],
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
				this.history_player.src = this.playlist[this.rand(this.playlist.length)];
				this.history_player.loop = true;
				this.history_player.volume = 0.5;
				setTimeout(() => this.history_player.play(), 200);
			},
		}
	}
});