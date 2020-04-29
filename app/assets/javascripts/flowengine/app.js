var app = {}

app.init = function() {
	var url = window.location.href
	$.getJSON(url, function(json, textStatus) {
		app.data = json
		app.config = {}
		app.initEvents();
		app.initEditor();
		app.excuteScripts();
	});
	console.log(this);
}

app.initEvents = function() {
	app.config.focus = $('#appControls a:nth-child(2)');
	$('#appControls a').on('click', function(event) {
		app.config.focus = $(this);
		if (app.config.focus.attr("href") == "#frameTab") {
			var icon = app.config.focus.find('ion-icon');
			if (icon.get(0).name == icon.data("name-focus")) {
				animate(app.config.focus, 'rotateIn');
				app.excuteScripts();
				console.log("EXCUTED");
			}
			icon.get(0).name = icon.data("name-focus");
		} else {
			var icon = $('#appControls a:nth-child(2)').find('ion-icon')
			icon.get(0).name = icon.data("name");
		}
	});
	// for bootstrap 3 use 'shown.bs.tab', for bootstrap 2 use 'shown' in the next line
	// $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
	// 	// save the latest tab; use cookies if you like 'em better:
	// 	localStorage.setItem('lastTab', $(this).attr('href'));
	// });
	// // go to the latest tab, if it exists:
	// var lastTab = localStorage.getItem('lastTab');
	// if (lastTab) {
	// 	$('[href="' + lastTab + '"]').tab('show');
	// }
	// if (!localStorage.getItem('lastTab')) {
	// }
	app.config.focus.tab('show');
	// postScripts
	$('#saveForm').submit(function(e) {
		var inputs = [];
		for (var i = 0; i < app.data.codes.length; i++) {
			inputs.push($('#sketch_codes_attributes_' + i + '_code'));
			inputs[i].val(app.editor.getSession().getValue());
			console.log(inputs[i].val());
		}
	});
}

app.initFrame = function() {
	// RELEASE MEMORY
	if (app.frame) {
		app.frame.remove();
		app.frame = null;
	}
	$('#frameTab').append($('<iframe id="frame">/'))
	app.frame = $("#frame")
	// http://hemin.cn/jq/contents.html
	app.frame.contents().find("body").attr({
		style: "margin:0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);",
	});
}

app.initEditor = function() {
	app.editor = ace.edit('editor');
	app.editor.setOptions({
		mode: "ace/mode/javascript",
		enableLiveAutocompletion: true,
		enableSnippets: true,
		fontSize: 18,
	});
	app.editor.setTheme("ace/theme/monokai");
	app.editor.getSession().setMode('ace/mode/javascript');
	app.editor.getSession().setTabSize(2);
	var codes = app.data.codes.length > 0 ? app.data.codes : [{
		code: ""
	}];
	app.editor.getSession().setValue(codes[0].code);
}

app.injectAsset = function(base, html = "", attributes = {}) {
	// USING DOM
	// let asset = frame.contentWindow.document.createElement(base);
	// asset.innerHTML = html;
	// for (let key in attributes) {
	// 	asset.setAttribute(key, attributes[key]);
	// }
	// app.frame.get(0).contentWindow.document.body.appendChild(asset);
	// USING JQUERY
	let asset = $("<" + base + "/>");
	asset.html(html);
	asset.attr(attributes);
	app.frame.get(0).contentWindow.document.body.appendChild(asset.get(0));
}

app.injectAssets = function() {
	var scripts = [
		"https://cdn.jsdelivr.net/npm/p5@0.5.16/lib/p5.min.js",
	];
	for (var i = 0; i < scripts.length; i++) {
		app.injectAsset("script", "", {
			src: scripts[i]
		})
	}
}

app.excuteScripts = function() {
	app.initFrame();
	app.injectAssets();
	var code = app.editor.getSession().getValue();
	// USER SCRIPTS
	app.injectAsset('script', code.replace(/"/g, "\'"), {
		id: app.data.codes.indexOf(code),
	}, )
}

var engine = {
	init: function(obj) {
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
	},
}