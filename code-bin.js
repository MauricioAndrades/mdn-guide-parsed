function mdn_html() {
    var arr = [];

    function _Tag(tag, text, href) {
        this.tag = tag;
        this.text = text;
        this.link = href;
    }
    $("ol.toggle-container > li> a").each(function() {
        var _text = $(this).attr('title');
        var _tag = $(this).find('code').text();
        if (_tag === "") {
            _tag = $(this).text();
        }
        var _href = $(this).prop('href');
        var obj = new _Tag(_tag, _text, _href);
        arr.push(obj);
    })
};

function mdn_node() {
    var arr = [];

    // ({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {})
    function _Tag(tag, text, href, type, warning) {
        this.tag = tag;
        this.text = text;
        this.link = href;
        this.type = type;
        if(warning !== null) {
            this.warning = warning;
        }
    }

    $("ol.toggle-container > li > a").each(function() {
        var _type = 'none';
        var _warning = null;
        var _tag = $(this).find('code').text();

        var _parent = ($(this)[0].parentNode.parentNode.parentNode);

        if($(_parent).find('strong').text() === 'Properties') {
            _tag = 'Node.' + _tag;
            _type = 'Property';
        }

        if($(_parent).find('strong').text() === 'Methods') {
            _tag = 'Node.' + _tag;
            _type = 'Method';
        }

        if($(this).parent().find('span.sidebar-icon > span').attr('title').length > 0) {
            _warning = $(this).parent().find('span.sidebar-icon > span').attr('title');
        }


        var _text = $(this).attr('title');

        if (_tag === "") {
            _tag = $(this).text();
        }

        var _href = $(this).prop('href');

        var obj = new _Tag(_tag, _text, _href, _type, _warning);

        arr.push(obj);
    })
};
