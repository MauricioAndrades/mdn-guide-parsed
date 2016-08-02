/** devtools script. Use with JQuery */

function mdn_node() {
  var arr = [];
  arr[0] = window.location.href;
  var _warning, _type, _name, _parent, _description, _href;
  var _sub = [];
  var _sub_obj = {};
  var obj = {};
  var pre_str = 'Array.';

  function _Tag(name, description, href, type, warning) {
    this.name = name;
    if (description !== null) {
      this.desc = description;
    }
    this.href = href;
    if (type !== null) {
      this.type = type;
    }
    if (warning !== null) {
      this.warning = warning;
    }
  }

$('ol.toggle-container > li > a').each(function () {
    _name = $(this).find('code').text();

    if (_name === '') { _name = $(this).text(); }

    _description = $(this).attr('title') || null;
    _type = null;
    _parent = ($(this)[0].parentNode.parentNode.parentNode);
    _warning = $(this).parent().find('span.sidebar-icon > span').attr('title') || null;
    _href = $(this).prop('href');

    if ($(_parent).find('strong').text() === 'Properties') {
      _name = _name;
      _type = 'Property';
    }

    /** log: for inspection */
    /*for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(obj);
      }
    }*/

    if ($(_parent).find('strong').text() === 'Methods') {
      _name = _name;
      _type = 'Method';
    }

    if ($(_parent).find('strong').text() === 'Related pages for DOM') {
      _sub_obj = new _Tag(_name, _description, _href, _type, _warning);
      _sub.push(_sub_obj);
    }

    obj = new _Tag(_name, _description, _href, _type, _warning);
    arr.push(obj);
  });
  return arr;
}

var results = mdn_node();
/** in context of window */

if (typeof copy === 'function') copy(results);
