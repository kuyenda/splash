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
	// Animate.css
	/* ------------------------------------------------------ */
	window.animate = function(selector, animationName, callback) {
		var node = typeof(selector) == "string" ? $(selector) : selector;
		node.addClass('animated ' + animationName);
		node.on('animationend', function(event) {
			node.removeClass('animated ' + animationName);
			if (typeof callback === 'function') callback();
			node.off('animationend');
		});
	};
	// window.animateCSS = function(element, animationName, callback) {
	// 	const node = document.querySelector(element)
	// 	node.classList.add('animated', animationName)

	// 	function handleAnimationEnd() {
	// 		node.classList.remove('animated', animationName)
	// 		node.removeEventListener('animationend', handleAnimationEnd)

	// 		if (typeof callback === 'function') callback()
	// 	}

	// 	node.addEventListener('animationend', handleAnimationEnd)
	// };
});