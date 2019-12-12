$(document).on('ready turbolinks:load', function() {
	$('#mobile-menu-btn').on('click', function() {
		$('#mobile-menu').toggleClass('open');
		$('.hamburger').toggleClass('is-active');
	});
	if (!window.et_player) {
		window.et_player = {
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
				this.history_player.src = "/assets/" + this.playlist[this.rand(this.playlist.length)];
				this.history_player.loop = true;
				setTimeout(() => this.history_player.play(), 200);
			},
		}
	}
});