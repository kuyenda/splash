var app = {}

app.init = function() {
	var url = window.location.href
	$.getJSON(url, function(json, textStatus) {
		app.data = json
		app.initFrame();
		app.initEditor();
		app.initEvents();
	});
	console.log(this);
}

app.initEvents = function() {
	$("[href='#frameTab']").click(function(event) {
		app.excuteScripts();
	});
	$('a[data-toggle="tab"]').on('shown', function(e) {
		localStorage['selectedTab'] = $(e.target).attr('href');
	})
	var selectedTab = localStorage['selectedTab'];
	if (selectedTab) $('a[href="' + selectedTab + '"]').tab('show');
}

app.initFrame = function() {
	// RELEASE MEMORY
	if (app.frame) {
		app.frame.remove();
		app.frame = null;
		$('#frameTab').append($('<iframe id="frame">/'))
	}
	app.frame = $("#frame")
	// app.frame.height("calc(100% - 8px)");
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

app.saveScripts = function() {
	$.ajax({
		url: app.data.url,
		type: "POST",
		data: {
			digit: window._p5jsExampleDigits,
			code: code,
		},
		success: function(data) {}
	});
}

var engine = {
	init: function(obj) {
		$('#textSizeSlider').change(function() {
			engine.editor.setOptions({
				fontSize: $(this).val() + 'px'
			})
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