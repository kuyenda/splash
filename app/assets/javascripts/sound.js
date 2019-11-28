if (!window.et_player) {
	window.et_player = {
		history_player: undefined,
		playlist: [
			// 'Disco Fries feat. Raquel Castro - You Make Me (Diviners Remix).ts',
			// 'Gareth Emery & Alastor ft. London Thor - Hands (Diviners Remix).ts',
			// 'James Carter - Give Me Your Love (Diviners Remix).ts',
			// 'Thousand Years (ft. Patrick Baker).ts',
			// 'Insomnia - Ashley Tisdale.mp3',
			// 'Steve Void Beauz - Hide And Seek.mp3',
			// 'HICARI Hannie Isaiah Dreads - Drama.mp3',
			// 'Elephante Anjulie - The In Between.mp3'
			'Daniel Olsén - Fighting Hearts.mp3'
		],
		rand: function(max) {
			return Math.floor(Math.random() * Math.floor(max));
		},
		play: function(player) {
			if (this.history_player) {
				this.history_player.pause();
			}
			this.history_player = player
			this.history_player.src = "/assets/" + this.playlist[this.rand(this.playlist.length)];
			this.history_player.loop = true;
			setTimeout(() => this.history_player.play(), 200);
		},
	}
}
(function(w) {
	var player = $('#player')
	if (player.length > 0) {
		w.et_player.play(player[0]);
	}
})(this);