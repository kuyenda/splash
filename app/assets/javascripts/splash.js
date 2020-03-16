$(document).on('ready turbolinks:load', function() {
	/* ------------------------------------------------------ */
	// Highlight code block if exists
	/* ------------------------------------------------------ */
	if ($('code').length > 0) {
		Prism.highlightAll()
	}
	$('[data-toggle="tooltip"]').tooltip()
	/* ------------------------------------------------------ */
	// Switch elements' class with data-target, data-by
	/* ------------------------------------------------------ */
	window.switchBy = function(element, targets, bys) {
		for (var i = 0; i < targets.length; i++) {
			$(targets[i]).toggleClass(by[i]);
		}
	};
	$("[data-switch]").click(function(e) {
		var targets, bys;
		e.preventDefault();
		targets = $(this).data("switch").split(" ");
		by = $(this).data("by").split(" ");
		return switchBy(this, targets, bys);
	});
	/* ------------------------------------------------------ */
	// Ajax appending
	/* ------------------------------------------------------ */
	window.injectContent = function(element, url, to) {
		$.get(url, function(data) {
			$(to).append(data);
		})
	}
	$("[data-get]").one("click", function(e) {
		e.preventDefault();
		var getUrl = $(this).data("get");
		var to = $(this).data("to");
		return injectContent(this, getUrl, to);
	});
	/* ------------------------------------------------------ */
	// Load Player
	/* ------------------------------------------------------ */
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