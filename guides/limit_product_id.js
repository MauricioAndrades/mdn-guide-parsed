(function() {
    var product_limit = 5;
    var udo_keys = ['product_id', '_cprod'];
    udo_keys.forEach(function(key, i) {
        if (typeof(b[key]) === 'undefined') {
            return;
        }
        b[key] = (b[key] && Object.prototype.toString.call(b[key]) === '[object Array]' && b[key].length > product_limit) ? b[key].slice(0, product_limit) : b[key];
    });
})();

var limit = function(udo_keys, amount) {
    if (typeof udo_keys === "string") udo_keys = udo_keys.split(',').map(function(o) {
        return o.trim();
    });
    udo_keys.forEach(function(key, i) {
        if (typeof(b[key]) === 'undefined') {
            return;
        }
        b[key] = (b[key] && Object.prototype.toString.call(b[key]) === '[object Array]' && b[key].length > amount) ? b[key].slice(0, amount) : b[key];
    });
}

limit('product_id, _cprod', 10);
