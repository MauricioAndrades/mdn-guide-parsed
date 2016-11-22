//
//    api:
//
// .clear()    empties storage
// .each()     loops storage (key, value) pairs
// .fetch()    get a value by key
// .has()      checks if there is a key set
// .ls()       lists all keys 
// .raw()      string value actually stored
// .reload()   reads in serialized data
// .rm()       removes key(s)
// .set()      setup value(s)
// .type()     storage type used 'localStorage/globalStorage/userData'
// .valid()    is storage engine setup correctly
//
;
((function(name, def, glob, doc) {
  // add 'store' id to globals
  this[name] = def(glob, doc);
}).call(this, "store", function(glob, doc) {
  // private (function) store version
  var stclient;
  var driver = {
    // obj  : storage_native{},
    // type : storage_type
  };
  var engine = {   
  // read  : (func),
  // write : (func)
  };
  var _ = {
    a: Array.prototype,
    del: function(node) {
      // , ...fields
      _.slc(arguments, 1).forEach(function(field) {
        delete this[field];
      }, node);
      return node;
    },
    each: function(array, callback, context) {
      context || (context = array);
      array.some(function() {
        return false === callback.apply(context, arguments);
      });
      return array;
    },
    hasown: Function.prototype.call.bind(Object.prototype.hasOwnProperty),
    jsdc: JSON.parse,
    // decode
    jsec: JSON.stringify,
    // encode 
    keys: Object.keys,
    // shimed .keys
    ns: "storage5",
    // single property name to keep serialized storage data under
    object: null,
    // parsed storage data 
    slc: Function.prototype.call.bind(Array.prototype.slice),
    test: {
      isemptyobj: function(node) {
        for (var x in node)
          return false;
        return true;
      },
      isplainobj: function(node) {
        return '[object Object]' == Object.prototype.toString.call(node);
      },
    },
    testval: 'storage' + Math.random(),
    // test value for implementation check
    rig: function(target, items) {
      for (var field in items)
        if (items.hasOwnProperty(field))
          target[field] = items[field];
      return target;
    },
    clone: function(node) {
      return _.jsdc(_.jsec(node));
    },
    puts: function() {
      engine.write(_.jsec(_.object));
    },
  };
  stclient = function storage5() {
    return arguments.length ? storage5.set.apply(storage5, arguments) : storage5.fetch();
  };
  // _init on load|ready
  window.addEventListener('load', _init, false);
  return _.rig(stclient, {
    clear: function() {
      return _.object = {},
        _.puts(),
        this;
    },
    each: function(callback, context) {
      context || (context = this.fetch());
      _.each(this.ls(), function(field) {
        return callback.call(context, field, this.fetch(field));
      }, this);
      return this;
    },
    fetch: function(key) {
      return (arguments.length) ? _.object[key] : _.clone(_.object);
    },
    has: function(name) {
      return _.hasown(_.object, name);
    },
    ls: function() {
      return _.keys(_.object);
    },
    raw: function() {
      return engine.read();
    },
    reload: _load,
    rm: function() {
      _.del.apply(null, _.a.concat.apply([_.object], arguments));
      return _.puts(),
        this;
    },
    set: function(input, value) {
      var len = arguments.length;
      var flag = 1;
      if (len) {
        if (_.test.isplainobj(input)) {
          _.keys(input).forEach(function(field) {
            _.object[field] = input[field];
          });
        } else {
          if (1 < len)
            _.object[input] = value;
          else
            flag = 0;
        }
        flag && _.puts();
      }
      return this;
    },
    type: function() {
      return driver.type || null;
    },
    valid: function() {
      return !_.test.isemptyobj(driver);
    },
  });

  function _init() {
    var flag = 0;
    var stnative;
    if ("localStorage" in glob) {
      try {
        if ((stnative = glob["localStorage"])) {
          // inits localStorage 
          _initlocst(stnative, driver, engine);
          flag = 1;
        }
      } catch (e) {}
    }
    if (!flag) {
      if ("globalStorage" in glob) {
        try {
          if ((stnative = glob["globalStorage"])) {
            // inits globalStorage
            _initglobst(stnative, driver, engine);
            flag = 1;
          }
        } catch (e) {}
      }
      if (!flag) {
        // inits userDataStorage
        _initusrdatast(doc.createElement(_.ns), driver, engine);
      }
    }
    // parse serialized storage data
    _load();
  }

  function _initlocst(stnative, driver, engine) {
    stnative[_.testval] = _.testval;
    if (_.testval === stnative[_.testval]) {
      try {
        stnative.removeItem(_.testval);
      } catch (e) {
        try {
          delete stnative[_.testval];
        } catch (e) {}
      }
      driver.obj = stnative;
      driver.type = "localStorage";
      engine.read = function() {
        return driver.obj[_.ns];
      };
      engine.write = function(stringvalue) {
        driver.obj[_.ns] = stringvalue;
        return stringvalue;
      };
    }
  }

  function _initglobst(stnative, driver, engine) {
    var host = glob.location.hostname;
    driver.obj = (/localhost/i).test(host) ? stnative["localhost.localdomain"] : stnative[host];
    driver.type = "globalStorage";
    engine.read = function() {
      return driver.obj[_.ns];
    };
    engine.write = function(stringvalue) {
      driver.obj[_.ns] = stringvalue;
      return stringvalue;
    };
  }

  function _initusrdatast(node, driver, engine) {
    try {
      node.id = _.ns;
      node.style.display = "none";
      node.style.behavior = "url('#default#userData')";
      doc.getElementsByTagName("head")[0].appendChild(node);
      node.load(_.ns);
      node.setAttribute(_.testval, _.testval);
      node.save(_.ns);
      if (_.testval === node.getAttribute(_.testval)) {
        try {
          node.removeAttribute(_.testval);
          node.save(_.ns);
        } catch (e) {}
        driver.obj = node;
        driver.type = "userData";
        engine.read = function() {
          return driver.obj.getAttribute(_.ns);
        };
        engine.write = function(stringvalue) {
          driver.obj.setAttribute(_.ns, stringvalue);
          driver.obj.save(_.ns);
          return stringvalue;
        };
      }
    } catch (e) {
      doc.getElementsByTagName("head")[0].removeChild(node);
    }
    node = null;
  }

  function _load() {
    try {
      _.object = _.jsdc((engine.read() || engine.write("{}")));
    } catch (e) {
      _.object = {};
    }
  }
}, window, document));
