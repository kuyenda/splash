var examples = {
	init: function(file) {
		examples.editor = ace.edit('exampleEditor');
		examples.editor.setOptions({
			mode: "ace/mode/javascript",
			// maxLines: 30,
			enableLiveAutocompletion: true,
			enableSnippets: true,
			fontSize: 18,
		});
		examples.editor.setTheme("ace/theme/monokai");
		examples.editor.getSession().setMode('ace/mode/javascript');
		examples.editor.getSession().setTabSize(2);

		$('#textSizeSlider').change(function() {
			examples.editor.setOptions({
				fontSize: $(this).val() + 'px'
			})
		});

		// Button
		$('#runButton').click(function() {
			examples.runExample();

		});
		$('#runButton-m').click(function() {
			examples.runExample();
		});
		$('#resetButton').click(function() {
			examples.resetExample();
		});
		$('#copyButton').click(function() {
			// don't know why we need this twice, or the setTimeout
			// guessing it's some interaction with the editor..
			document.querySelector('textarea').select();
			$('textarea')[0].select();
			document.execCommand('copy');
			setTimeout(function() {
				document.execCommand('copy');
			}, 200);
		});
		$('#saveButton').click(function() {
			examples.saveExample();
		});
		$('#optionsButton').click(function() {});


		// Example Frame
		if ($('#isMobile-displayButton').length !== 0) {
			//it mobile

			$('#isMobile-displayButton').click(function() {

				$('#exampleFrame').show();
				$('#exampleFrame').ready(function() {
					// alert('exampleFrame load')
					examples.loadExample(true);
				});
			});
		} else {
			$('#exampleFrame').on("load", function() {
				examples.loadExample(false);
			});
		}

		// Capture clicks
		$.ajax({
				type: "GET",
				url: file,
				dataType: 'text'
			})
			.done(function(data) {
				examples.loadLib();
				examples.resetData = data;
				examples.showExample();
			})
	},
	loadLib: function() {
		var script_tag = document.createElement('script');
		script_tag.setAttribute('src', 'https://cdn.jsdelivr.net/npm/p5@0.5.16/lib/p5.min.js');
		$('#exampleFrame').contents().find("body").appendChild(script_tag);
	},
	showExample: function(norender) {
		examples.editor.getSession().setValue(examples.resetData);

		//resize height of editor
		// var rows = examples.editor.getSession().$rowLengthCache.length;
		// var lineH = examples.editor.renderer.lineHeight;
		// $('#exampleEditor').height(rows * lineH + 'px');

		if (examples.resetData.indexOf('<!DOCTYPE html>') !== -1) {
			examples.editor.getSession().setMode('ace/mode/html');
		}

		if (norender) {
			$('iframe').hide();
			$('#resetButton').hide();
			$('#runButton').hide();
			$('#copyButton').hide();
		} else {
			examples.runExample();
			$('#exampleDisplay').show();
		}
	},
	// display iframe
	runExample: function() {
		$('#exampleFrame').attr('src', $('#exampleFrame').attr('src'));
		examples.resizeExample();
	},
	resetExample: function() {
		examples.showExample();
	},
	// load script into iframe
	loadExample: function(isMobile) {

		var exampleCode = examples.editor.getSession().getValue();
		if (exampleCode.indexOf('new p5()') === -1) {
			exampleCode += '\nnew p5();';
		}
		var userScript = $('#exampleFrame')[0].contentWindow.document.createElement('script');
		userScript.type = 'text/javascript';
		userScript.text = exampleCode;
		userScript.async = false;
		$('#exampleFrame')[0].contentWindow.document.body.appendChild(userScript);
	},
	resizeExample: function() {
		setTimeout(function() {
			var frame = document.getElementById('exampleFrame');
			var canvas = frame.contentWindow.document.getElementsByClassName('p5')[0];
			var height = frame.contentWindow.getComputedStyle(canvas).height;
			// $('#exampleFrame').height();
			frame.style.height = parseInt(height) - 4 + "px";
		}, 400);
	},
	saveExample: function() {
		var code = examples.editor.getSession().getValue();
		$.ajax({
			url: "/sketches/save",
			type: "POST",
			data: {
				digit: window._p5jsExampleDigits,
				code: code,
			},
			success: function(data) {}
		});
	}
}