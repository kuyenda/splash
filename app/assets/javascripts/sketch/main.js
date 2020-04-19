var app = {}

app.init = function(sketchData, codeData) {
	app.sketch = sketchData;
	app.code = codeData;
	console.log(this);
	this.initEditor();
}

app.initEditor = function() {
	engine.editor = ace.edit('exampleEditor');
	engine.editor.setOptions({
		mode: "ace/mode/javascript",
		enableLiveAutocompletion: true,
		enableSnippets: true,
		fontSize: 18,
	});
	engine.editor.setTheme("ace/theme/monokai");
	engine.editor.getSession().setMode('ace/mode/javascript');
	engine.editor.getSession().setTabSize(2);
}

var engine = {
	init: function(obj) {
		$('#textSizeSlider').change(function() {
			engine.editor.setOptions({
				fontSize: $(this).val() + 'px'
			})
		});
		// Button
		$('#runButton').click(function() {
			engine.runExample();

		});
		$('#runButton-m').click(function() {
			engine.runExample();
		});
		$('#resetButton').click(function() {
			engine.resetExample();
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
			engine.saveExample();
		});
		$('#optionsButton').click(function() {});


		// Example Frame
		if ($('#isMobile-displayButton').length !== 0) {
			//it mobile

			$('#isMobile-displayButton').click(function() {

				$('#exampleFrame').show();
				$('#exampleFrame').ready(function() {
					// alert('exampleFrame load')
					engine.loadExample(true);
				});
			});
		} else {
			$('#exampleFrame').on("load", function() {
				engine.loadExample(false);
			});
		}

		// Capture clicks
		// $.ajax({
		// 		type: "GET",
		// 		url: obj,
		// 		dataType: 'text'
		// 	})
		// 	.done(function(data) {
		// 		engine.loadLib();
		// 		engine.resetData = data;
		// 		engine.showExample();
		// 	})
		engine.loadLib();
		engine.resetData = data;
		engine.showExample();
	},
	loadLib: function() {
		var script_tag = document.createElement('script');
		script_tag.setAttribute('src', 'https://cdn.jsdelivr.net/npm/p5@0.5.16/lib/p5.min.js');
		$('#exampleFrame').contents().find("body").appendChild(script_tag);
	},
	showExample: function(norender) {
		engine.editor.getSession().setValue(engine.resetData);

		//resize height of editor
		// var rows = engine.editor.getSession().$rowLengthCache.length;
		// var lineH = engine.editor.renderer.lineHeight;
		// $('#exampleEditor').height(rows * lineH + 'px');

		if (engine.resetData.indexOf('<!DOCTYPE html>') !== -1) {
			engine.editor.getSession().setMode('ace/mode/html');
		}

		if (norender) {
			$('iframe').hide();
			$('#resetButton').hide();
			$('#runButton').hide();
			$('#copyButton').hide();
		} else {
			engine.runExample();
			$('#exampleDisplay').show();
		}
	},
	// display iframe
	runExample: function() {
		$('#exampleFrame').attr('src', $('#exampleFrame').attr('src'));
		engine.resizeExample();
	},
	resetExample: function() {
		engine.showExample();
	},
	// load script into iframe
	loadExample: function(isMobile) {

		var exampleCode = engine.editor.getSession().getValue();
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
		var code = engine.editor.getSession().getValue();
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