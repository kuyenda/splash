var examples = {
	init: function(file) {

		// Editor
		// ace.config.set('basePath', '/assets/brace');
		// ace.config.set('modePath', '/assets/brace/');
		// ace.config.set('themePath', '/assets/brace/');
		examples.editor = ace.edit('exampleEditor');
		examples.editor.getSession().setUseWorker(false);

		examples.editor.setOptions({
			mode: "ace/mode/javascript",
			maxLines: 25,
			fontSize: 18,
			fontFamily: 'Hack',
			autoScrollEditorIntoView: true,
		});
		examples.editor.setTheme("ace/theme/chaos");
		examples.editor.getSession().setMode('ace/mode/javascript');
		examples.editor.getSession().setTabSize(2);
		examples.dims = [];

		// Button

		$('#runButton').click(function() {
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
				url: file,
				dataType: 'text'
			})
			.done(function(data) {
				// $('#exampleSelector').hide();

				// parse and set frame size
				// var frameReg = /@frame (.*),(.*)/g;
				// var arr = data.split(frameReg);
				// if (arr.length > 2) {
				//  examples.dims[0] = arr[1];
				//  examples.dims[1] = arr[2];
				// }

				// render?
				var norender = data.indexOf('@norender') !== -1;

				// // parse and set name and description
				// var metaReg = new RegExp('\\* ', 'g');
				// var spaceReg = new RegExp(' ', 'g');

				// var startName = data.indexOf("@name") + 6;
				// var endName = data.indexOf("\n", startName);

				// var name = startName !== 5 ? data.substring(startName, endName) : '';

				// var startDesc = data.indexOf("@description") + 13;
				// var endDesc = data.indexOf("*/", startDesc);

				// var desc = startDesc !== 12 ? data.substring(startDesc, endDesc) : '';
				// desc = desc.replace(metaReg, '');

				// $('#example-name').html(name);
				// $('#example-desc').html(desc);

				// strip description and set code
				// var ind = data.indexOf('*/');
				// data = data.substring(ind + 3);
				examples.resetData = data;

				examples.showExample();
			})
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
			frame.style.height = parseInt(height) + 4 + "px";
		}, 400);
	}

}
if (typeof(window._p5jsExample) !== 'undefined') {
	examples.init(window._p5jsExample);
}