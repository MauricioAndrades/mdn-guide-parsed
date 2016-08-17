function mdn_html() {
	var arr = [];

	function _Tag(tag, text, href) {
		this.tag = tag;
		this.text = text;
		this.link = href;
	}

(function() {
	$("ol.toggle-container > li> a").each(function () {
		var _text = $(this).attr('title');
		var _tag = $(this).find('code').text();
		if (_tag === "") {
			_tag = $(this).text();
		}
		var _href = $(this).prop('href');
		var obj = new _Tag(_tag, _text, _href);
		arr.push(obj);
	})
}
}());
