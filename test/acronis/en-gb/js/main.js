(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":11}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":12}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":13}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":14}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":15}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":5}],8:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":4}],9:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/get-iterator":2,"../core-js/is-iterable":3}],10:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":1}],11:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":22,"../../modules/es6.array.from":72,"../../modules/es6.string.iterator":76}],12:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":70,"../modules/es6.string.iterator":76,"../modules/web.dom.iterable":77}],13:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/core.is-iterable":71,"../modules/es6.string.iterator":76,"../modules/web.dom.iterable":77}],14:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":22,"../../modules/es6.object.assign":74}],15:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":22,"../../modules/es6.object.define-property":75}],16:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],17:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],18:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":38}],19:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":61,"./_to-iobject":63,"./_to-length":64}],20:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":21,"./_wks":68}],21:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],22:[function(require,module,exports){
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],23:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":48,"./_property-desc":55}],24:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":16}],25:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],26:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":30}],27:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":31,"./_is-object":38}],28:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],29:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":22,"./_ctx":24,"./_global":31,"./_hide":33}],30:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],31:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],32:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],33:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":26,"./_object-dp":48,"./_property-desc":55}],34:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":31}],35:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":26,"./_dom-create":27,"./_fails":30}],36:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":21}],37:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":44,"./_wks":68}],38:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],39:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":18}],40:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":33,"./_object-create":47,"./_property-desc":55,"./_set-to-string-tag":57,"./_wks":68}],41:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":29,"./_has":32,"./_hide":33,"./_iter-create":40,"./_iterators":44,"./_library":45,"./_object-gpo":51,"./_redefine":56,"./_set-to-string-tag":57,"./_wks":68}],42:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":68}],43:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],44:[function(require,module,exports){
module.exports = {};

},{}],45:[function(require,module,exports){
module.exports = true;

},{}],46:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":30,"./_iobject":36,"./_object-gops":50,"./_object-keys":53,"./_object-pie":54,"./_to-object":65}],47:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":18,"./_dom-create":27,"./_enum-bug-keys":28,"./_html":34,"./_object-dps":49,"./_shared-key":58}],48:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":18,"./_descriptors":26,"./_ie8-dom-define":35,"./_to-primitive":66}],49:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":18,"./_descriptors":26,"./_object-dp":48,"./_object-keys":53}],50:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],51:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":32,"./_shared-key":58,"./_to-object":65}],52:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":19,"./_has":32,"./_shared-key":58,"./_to-iobject":63}],53:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":28,"./_object-keys-internal":52}],54:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],55:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],56:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":33}],57:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":32,"./_object-dp":48,"./_wks":68}],58:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":59,"./_uid":67}],59:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":31}],60:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":25,"./_to-integer":62}],61:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":62}],62:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],63:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":25,"./_iobject":36}],64:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":62}],65:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":25}],66:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":38}],67:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],68:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":31,"./_shared":59,"./_uid":67}],69:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":20,"./_core":22,"./_iterators":44,"./_wks":68}],70:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":18,"./_core":22,"./core.get-iterator-method":69}],71:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"./_classof":20,"./_core":22,"./_iterators":44,"./_wks":68}],72:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":23,"./_ctx":24,"./_export":29,"./_is-array-iter":37,"./_iter-call":39,"./_iter-detect":42,"./_to-length":64,"./_to-object":65,"./core.get-iterator-method":69}],73:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":17,"./_iter-define":41,"./_iter-step":43,"./_iterators":44,"./_to-iobject":63}],74:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":29,"./_object-assign":46}],75:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":26,"./_export":29,"./_object-dp":48}],76:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":41,"./_string-at":60}],77:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":31,"./_hide":33,"./_iterators":44,"./_wks":68,"./es6.array.iterator":73}],78:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

},{"./_getNative":131,"./_root":168}],79:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":138,"./_hashDelete":139,"./_hashGet":140,"./_hashHas":141,"./_hashSet":142}],80:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":151,"./_listCacheDelete":152,"./_listCacheGet":153,"./_listCacheHas":154,"./_listCacheSet":155}],81:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":131,"./_root":168}],82:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":156,"./_mapCacheDelete":157,"./_mapCacheGet":158,"./_mapCacheHas":159,"./_mapCacheSet":160}],83:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

},{"./_getNative":131,"./_root":168}],84:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":131,"./_root":168}],85:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_ListCache":80,"./_stackClear":169,"./_stackDelete":170,"./_stackGet":171,"./_stackHas":172,"./_stackSet":173}],86:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":168}],87:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":168}],88:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":131,"./_root":168}],89:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],90:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],91:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isIndex = require('./_isIndex'),
    isTypedArray = require('./isTypedArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

},{"./_baseTimes":111,"./_isIndex":146,"./isArguments":180,"./isArray":181,"./isBuffer":183,"./isTypedArray":191}],92:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],93:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],94:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

},{"./_baseAssignValue":98,"./eq":178}],95:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":178}],96:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keys = require('./keys');

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;

},{"./_copyObject":122,"./keys":192}],97:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keysIn = require('./keysIn');

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;

},{"./_copyObject":122,"./keysIn":193}],98:[function(require,module,exports){
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":126}],99:[function(require,module,exports){
var Stack = require('./_Stack'),
    arrayEach = require('./_arrayEach'),
    assignValue = require('./_assignValue'),
    baseAssign = require('./_baseAssign'),
    baseAssignIn = require('./_baseAssignIn'),
    cloneBuffer = require('./_cloneBuffer'),
    copyArray = require('./_copyArray'),
    copySymbols = require('./_copySymbols'),
    copySymbolsIn = require('./_copySymbolsIn'),
    getAllKeys = require('./_getAllKeys'),
    getAllKeysIn = require('./_getAllKeysIn'),
    getTag = require('./_getTag'),
    initCloneArray = require('./_initCloneArray'),
    initCloneByTag = require('./_initCloneByTag'),
    initCloneObject = require('./_initCloneObject'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isMap = require('./isMap'),
    isObject = require('./isObject'),
    isSet = require('./isSet'),
    keys = require('./keys');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });

    return result;
  }

  if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });

    return result;
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;

},{"./_Stack":85,"./_arrayEach":89,"./_assignValue":94,"./_baseAssign":96,"./_baseAssignIn":97,"./_cloneBuffer":116,"./_copyArray":121,"./_copySymbols":123,"./_copySymbolsIn":124,"./_getAllKeys":128,"./_getAllKeysIn":129,"./_getTag":136,"./_initCloneArray":143,"./_initCloneByTag":144,"./_initCloneObject":145,"./isArray":181,"./isBuffer":183,"./isMap":186,"./isObject":187,"./isSet":189,"./keys":192}],100:[function(require,module,exports){
var isObject = require('./isObject');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;

},{"./isObject":187}],101:[function(require,module,exports){
var castPath = require('./_castPath'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_castPath":114,"./_toKey":175}],102:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isArray = require('./isArray');

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

},{"./_arrayPush":93,"./isArray":181}],103:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":86,"./_getRawTag":133,"./_objectToString":166}],104:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./_baseGetTag":103,"./isObjectLike":188}],105:[function(require,module,exports){
var getTag = require('./_getTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;

},{"./_getTag":136,"./isObjectLike":188}],106:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":149,"./_toSource":176,"./isFunction":184,"./isObject":187}],107:[function(require,module,exports){
var getTag = require('./_getTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;

},{"./_getTag":136,"./isObjectLike":188}],108:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

},{"./_baseGetTag":103,"./isLength":185,"./isObjectLike":188}],109:[function(require,module,exports){
var isPrototype = require('./_isPrototype'),
    nativeKeys = require('./_nativeKeys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

},{"./_isPrototype":150,"./_nativeKeys":163}],110:[function(require,module,exports){
var isObject = require('./isObject'),
    isPrototype = require('./_isPrototype'),
    nativeKeysIn = require('./_nativeKeysIn');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;

},{"./_isPrototype":150,"./_nativeKeysIn":164,"./isObject":187}],111:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],112:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":86,"./_arrayMap":92,"./isArray":181,"./isSymbol":190}],113:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],114:[function(require,module,exports){
var isArray = require('./isArray'),
    isKey = require('./_isKey'),
    stringToPath = require('./_stringToPath'),
    toString = require('./toString');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

},{"./_isKey":147,"./_stringToPath":174,"./isArray":181,"./toString":197}],115:[function(require,module,exports){
var Uint8Array = require('./_Uint8Array');

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

},{"./_Uint8Array":87}],116:[function(require,module,exports){
var root = require('./_root');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

},{"./_root":168}],117:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;

},{"./_cloneArrayBuffer":115}],118:[function(require,module,exports){
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;

},{}],119:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;

},{"./_Symbol":86}],120:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

},{"./_cloneArrayBuffer":115}],121:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],122:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    baseAssignValue = require('./_baseAssignValue');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

},{"./_assignValue":94,"./_baseAssignValue":98}],123:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbols = require('./_getSymbols');

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;

},{"./_copyObject":122,"./_getSymbols":134}],124:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbolsIn = require('./_getSymbolsIn');

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;

},{"./_copyObject":122,"./_getSymbolsIn":135}],125:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":168}],126:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":131}],127:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],128:[function(require,module,exports){
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbols = require('./_getSymbols'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

},{"./_baseGetAllKeys":102,"./_getSymbols":134,"./keys":192}],129:[function(require,module,exports){
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbolsIn = require('./_getSymbolsIn'),
    keysIn = require('./keysIn');

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;

},{"./_baseGetAllKeys":102,"./_getSymbolsIn":135,"./keysIn":193}],130:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":148}],131:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":106,"./_getValue":137}],132:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":167}],133:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":86}],134:[function(require,module,exports){
var arrayFilter = require('./_arrayFilter'),
    stubArray = require('./stubArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;

},{"./_arrayFilter":90,"./stubArray":195}],135:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    getPrototype = require('./_getPrototype'),
    getSymbols = require('./_getSymbols'),
    stubArray = require('./stubArray');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;

},{"./_arrayPush":93,"./_getPrototype":132,"./_getSymbols":134,"./stubArray":195}],136:[function(require,module,exports){
var DataView = require('./_DataView'),
    Map = require('./_Map'),
    Promise = require('./_Promise'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap'),
    baseGetTag = require('./_baseGetTag'),
    toSource = require('./_toSource');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_DataView":78,"./_Map":81,"./_Promise":83,"./_Set":84,"./_WeakMap":88,"./_baseGetTag":103,"./_toSource":176}],137:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],138:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":162}],139:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],140:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":162}],141:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":162}],142:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":162}],143:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],144:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer'),
    cloneDataView = require('./_cloneDataView'),
    cloneRegExp = require('./_cloneRegExp'),
    cloneSymbol = require('./_cloneSymbol'),
    cloneTypedArray = require('./_cloneTypedArray');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;

},{"./_cloneArrayBuffer":115,"./_cloneDataView":117,"./_cloneRegExp":118,"./_cloneSymbol":119,"./_cloneTypedArray":120}],145:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    getPrototype = require('./_getPrototype'),
    isPrototype = require('./_isPrototype');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;

},{"./_baseCreate":100,"./_getPrototype":132,"./_isPrototype":150}],146:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],147:[function(require,module,exports){
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;

},{"./isArray":181,"./isSymbol":190}],148:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],149:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":125}],150:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],151:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],152:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":95}],153:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":95}],154:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":95}],155:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":95}],156:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":79,"./_ListCache":80,"./_Map":81}],157:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":130}],158:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":130}],159:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":130}],160:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":130}],161:[function(require,module,exports){
var memoize = require('./memoize');

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

},{"./memoize":194}],162:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":131}],163:[function(require,module,exports){
var overArg = require('./_overArg');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

},{"./_overArg":167}],164:[function(require,module,exports){
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

},{}],165:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

},{"./_freeGlobal":127}],166:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],167:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],168:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":127}],169:[function(require,module,exports){
var ListCache = require('./_ListCache');

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;

},{"./_ListCache":80}],170:[function(require,module,exports){
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

},{}],171:[function(require,module,exports){
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

},{}],172:[function(require,module,exports){
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

},{}],173:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    Map = require('./_Map'),
    MapCache = require('./_MapCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

},{"./_ListCache":80,"./_Map":81,"./_MapCache":82}],174:[function(require,module,exports){
var memoizeCapped = require('./_memoizeCapped');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;

},{"./_memoizeCapped":161}],175:[function(require,module,exports){
var isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;

},{"./isSymbol":190}],176:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],177:[function(require,module,exports){
var baseClone = require('./_baseClone');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;

},{"./_baseClone":99}],178:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],179:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":101}],180:[function(require,module,exports){
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":104,"./isObjectLike":188}],181:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],182:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./isFunction":184,"./isLength":185}],183:[function(require,module,exports){
var root = require('./_root'),
    stubFalse = require('./stubFalse');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

},{"./_root":168,"./stubFalse":196}],184:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":103,"./isObject":187}],185:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],186:[function(require,module,exports){
var baseIsMap = require('./_baseIsMap'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;

},{"./_baseIsMap":105,"./_baseUnary":113,"./_nodeUtil":165}],187:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],188:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],189:[function(require,module,exports){
var baseIsSet = require('./_baseIsSet'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;

},{"./_baseIsSet":107,"./_baseUnary":113,"./_nodeUtil":165}],190:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":103,"./isObjectLike":188}],191:[function(require,module,exports){
var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

},{"./_baseIsTypedArray":108,"./_baseUnary":113,"./_nodeUtil":165}],192:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeys = require('./_baseKeys'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

},{"./_arrayLikeKeys":91,"./_baseKeys":109,"./isArrayLike":182}],193:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeysIn = require('./_baseKeysIn'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

},{"./_arrayLikeKeys":91,"./_baseKeysIn":110,"./isArrayLike":182}],194:[function(require,module,exports){
var MapCache = require('./_MapCache');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;

},{"./_MapCache":82}],195:[function(require,module,exports){
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

},{}],196:[function(require,module,exports){
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

},{}],197:[function(require,module,exports){
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":112}],198:[function(require,module,exports){
/**
  stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
  @version v3.3.2
  @link https://github.com/dollarshaveclub/stickybits#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
  @license MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybits = factory());
}(this, (function () { 'use strict';

  /*
    STICKYBITS 💉
    --------
    > a lightweight alternative to `position: sticky` polyfills 🍬
    --------
    - each method is documented above it our view the readme
    - Stickybits does not manage polymorphic functionality (position like properties)
    * polymorphic functionality: (in the context of describing Stickybits)
      means making things like `position: sticky` be loosely supported with position fixed.
      It also means that features like `useStickyClasses` takes on styles like `position: fixed`.
    --------
    defaults 🔌
    --------
    - version = `package.json` version
    - userAgent = viewer browser agent
    - target = DOM element selector
    - noStyles = boolean
    - offset = number
    - parentClass = 'string'
    - scrollEl = window || DOM element selector
    - stickyClass = 'string'
    - stuckClass = 'string'
    - useStickyClasses = boolean
    - verticalPosition = 'string'
    --------
    props🔌
    --------
    - p = props {object}
    --------
    instance note
    --------
    - stickybits parent methods return this
    - stickybits instance methods return an instance item
    --------
    nomenclature
    --------
    - target => el => e
    - props => o || p
    - instance => item => it
    --------
    methods
    --------
    - .definePosition = defines sticky or fixed
    - .addInstance = an array of objects for each Stickybits Target
    - .getClosestParent = gets the parent for non-window scroll
    - .getOffsetTop = gets the element offsetTop from the top level of the DOM
    - .computeScrollOffsets = computes scroll position
    - .toggleClasses = older browser toggler
    - .manageState = manages sticky state
    - .removeClass = older browser support class remover
    - .removeInstance = removes an instance
    - .cleanup = removes all Stickybits instances and cleans up dom from stickybits
  */
  var Stickybits =
  /*#__PURE__*/
  function () {
    function Stickybits(target, obj) {
      var o = typeof obj !== 'undefined' ? obj : {};
      this.version = '3.3.2';
      this.userAgent = window.navigator.userAgent || 'no `userAgent` provided by the browser';
      this.props = {
        customStickyChangeNumber: o.customStickyChangeNumber || null,
        noStyles: o.noStyles || false,
        stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
        parentClass: o.parentClass || 'js-stickybit-parent',
        scrollEl: document.querySelector(o.scrollEl) || window,
        stickyClass: o.stickyClass || 'js-is-sticky',
        stuckClass: o.stuckClass || 'js-is-stuck',
        stickyChangeClass: o.stickyChangeClass || 'js-is-sticky--change',
        useStickyClasses: o.useStickyClasses || false,
        verticalPosition: o.verticalPosition || 'top'
      };
      var p = this.props;
      /*
        define positionVal
        ----
        -  uses a computed (`.definePosition()`)
        -  defined the position
      */

      p.positionVal = this.definePosition() || 'fixed';
      var vp = p.verticalPosition;
      var ns = p.noStyles;
      var pv = p.positionVal;
      this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;
      if (!('length' in this.els)) this.els = [this.els];
      this.instances = [];

      for (var i = 0; i < this.els.length; i += 1) {
        var el = this.els[i];
        var styles = el.style; // set vertical position

        styles[vp] = vp === 'top' && !ns ? p.stickyBitStickyOffset + "px" : '';
        styles.position = pv !== 'fixed' ? pv : '';

        if (pv === 'fixed' || p.useStickyClasses) {
          var instance = this.addInstance(el, p); // instances are an array of objects

          this.instances.push(instance);
        }
      }

      return this;
    }
    /*
      setStickyPosition ✔️
      --------
      —  most basic thing stickybits does
      => checks to see if position sticky is supported
      => defined the position to be used
      => stickybits works accordingly
    */


    var _proto = Stickybits.prototype;

    _proto.definePosition = function definePosition() {
      var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
      var test = document.head.style;

      for (var i = 0; i < prefix.length; i += 1) {
        test.position = prefix[i] + "sticky";
      }

      var stickyProp = test.position ? test.position : 'fixed';
      test.position = '';
      return stickyProp;
    };
    /*
      addInstance ✔️
      --------
      — manages instances of items
      - takes in an el and props
      - returns an item object
      ---
      - target = el
      - o = {object} = props
        - scrollEl = 'string'
        - verticalPosition = number
        - off = boolean
        - parentClass = 'string'
        - stickyClass = 'string'
        - stuckClass = 'string'
      ---
      - defined later
        - parent = dom element
        - state = 'string'
        - offset = number
        - stickyStart = number
        - stickyStop = number
      - returns an instance object
    */


    _proto.addInstance = function addInstance(el, props) {
      var _this = this;

      var item = {
        el: el,
        parent: el.parentNode,
        props: props
      };
      this.isWin = this.props.scrollEl === window;
      var se = this.isWin ? window : this.getClosestParent(item.el, item.props.scrollEl);
      this.computeScrollOffsets(item);
      item.parent.className += " " + props.parentClass;
      item.state = 'default';

      item.stateContainer = function () {
        return _this.manageState(item);
      };

      se.addEventListener('scroll', item.stateContainer);
      return item;
    };
    /*
      --------
      getParent 👨‍
      --------
      - a helper function that gets the target element's parent selected el
      - only used for non `window` scroll elements
      - supports older browsers
    */


    _proto.getClosestParent = function getClosestParent(el, match) {
      // p = parent element
      var p = match;
      var e = el;
      if (e.parentElement === p) return p; // traverse up the dom tree until we get to the parent

      while (e.parentElement !== p) {
        e = e.parentElement;
      } // return parent element


      return p;
    };
    /*
      --------
      getOffsetTop
      --------
      - a helper function that gets the offsetTop of the element
      - from the top level of the DOM
    */


    _proto.getOffsetTop = function getOffsetTop(el) {
      var offsetTop = 0;

      do {
        offsetTop = el.offsetTop + offsetTop;
      } while (el = el.offsetParent);

      return offsetTop;
    };
    /*
      computeScrollOffsets 📊
      ---
      computeScrollOffsets for Stickybits
      - defines
        - offset
        - start
        - stop
    */


    _proto.computeScrollOffsets = function computeScrollOffsets(item) {
      var it = item;
      var p = it.props;
      var el = it.el;
      var parent = it.parent;
      var isCustom = !this.isWin && p.positionVal === 'fixed';
      var isBottom = p.verticalPosition !== 'bottom';
      var scrollElOffset = isCustom ? this.getOffsetTop(p.scrollEl) : 0;
      var stickyStart = isCustom ? this.getOffsetTop(parent) - scrollElOffset : this.getOffsetTop(parent);
      var stickyChangeOffset = p.customStickyChangeNumber !== null ? p.customStickyChangeNumber : el.offsetHeight;
      it.offset = scrollElOffset + p.stickyBitStickyOffset;
      it.stickyStart = isBottom ? stickyStart - it.offset : 0;
      it.stickyChange = it.stickyStart + stickyChangeOffset;
      it.stickyStop = isBottom ? stickyStart + parent.offsetHeight - (it.el.offsetHeight + it.offset) : stickyStart + parent.offsetHeight;
      return it;
    };
    /*
      toggleClasses ⚖️
      ---
      toggles classes (for older browser support)
      r = removed class
      a = added class
    */


    _proto.toggleClasses = function toggleClasses(el, r, a) {
      var e = el;
      var cArray = e.className.split(' ');
      if (a && cArray.indexOf(a) === -1) cArray.push(a);
      var rItem = cArray.indexOf(r);
      if (rItem !== -1) cArray.splice(rItem, 1);
      e.className = cArray.join(' ');
    };
    /*
      manageState 📝
      ---
      - defines the state
        - normal
        - sticky
        - stuck
    */


    _proto.manageState = function manageState(item) {
      // cache object
      var it = item;
      var e = it.el;
      var p = it.props;
      var state = it.state;
      var start = it.stickyStart;
      var change = it.stickyChange;
      var stop = it.stickyStop;
      var stl = e.style; // cache props

      var ns = p.noStyles;
      var pv = p.positionVal;
      var se = p.scrollEl;
      var sticky = p.stickyClass;
      var stickyChange = p.stickyChangeClass;
      var stuck = p.stuckClass;
      var vp = p.verticalPosition;
      /*
        requestAnimationFrame
        ---
        - use rAF
        - or stub rAF
      */

      var rAFStub = function rAFDummy(f) {
        f();
      };

      var rAF = !this.isWin ? rAFStub : window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || rAFStub;
      /*
        define scroll vars
        ---
        - scroll
        - notSticky
        - isSticky
        - isStuck
      */

      var tC = this.toggleClasses;
      var scroll = this.isWin ? window.scrollY || window.pageYOffset : se.scrollTop;
      var notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck');
      var isSticky = scroll <= start && state === 'sticky';
      var isStuck = scroll >= stop && state === 'sticky';
      /*
        Unnamed arrow functions within this block
        ---
        - help wanted or discussion
        - view test.stickybits.js
          - `stickybits .manageState  `position: fixed` interface` for more awareness 👀
      */

      if (notSticky) {
        it.state = 'sticky';
        rAF(function () {
          tC(e, stuck, sticky);
          stl.position = pv;
          if (ns) return;
          stl.bottom = '';
          stl[vp] = p.stickyBitStickyOffset + "px";
        });
      } else if (isSticky) {
        it.state = 'default';
        rAF(function () {
          tC(e, sticky);
          if (pv === 'fixed') stl.position = '';
        });
      } else if (isStuck) {
        it.state = 'stuck';
        rAF(function () {
          tC(e, sticky, stuck);
          if (pv !== 'fixed' || ns) return;
          stl.top = '';
          stl.bottom = '0';
          stl.position = 'absolute';
        });
      }

      var isStickyChange = scroll >= change && scroll <= stop;
      var isNotStickyChange = scroll < change || scroll > stop;
      var stub = 'stub'; // a stub css class to remove

      if (isNotStickyChange) {
        rAF(function () {
          tC(e, stickyChange);
        });
      } else if (isStickyChange) {
        rAF(function () {
          tC(e, stub, stickyChange);
        });
      }

      return it;
    };

    _proto.update = function update() {
      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];
        this.computeScrollOffsets(instance);
      }

      return this;
    };
    /*
      removes an instance 👋
      --------
      - cleanup instance
    */


    _proto.removeInstance = function removeInstance(instance) {
      var e = instance.el;
      var p = instance.props;
      var tC = this.toggleClasses;
      e.style.position = '';
      e.style[p.verticalPosition] = '';
      tC(e, p.stickyClass);
      tC(e, p.stuckClass);
      tC(e.parentNode, p.parentClass);
    };
    /*
      cleanup 🛁
      --------
      - cleans up each instance
      - clears instance
    */


    _proto.cleanup = function cleanup() {
      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];
        instance.props.scrollEl.removeEventListener('scroll', instance.stateContainer);
        this.removeInstance(instance);
      }

      this.manageState = false;
      this.instances = [];
    };

    return Stickybits;
  }();
  /*
    export
    --------
    exports StickBits to be used 🏁
  */


  function stickybits(target, o) {
    return new Stickybits(target, o);
  }

  return stickybits;

})));

},{}],199:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = [{
   "locale": "en-gb",
   "machine_name": "acronis_true_image2018",
   "segment": "consumer",
   "perpetual": {
      "buy": {
         "ATI2018-STANDARD-1": {
            "abbr": "ATI2018-STANDARD-1",
            "cb_id": 204069,
            "price": 34.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image 2018 1 Computer",
            "amount": 1,
            "year": "perpetual"
         },
         "ATI2018-STANDARD-3": {
            "abbr": "ATI2018-STANDARD-3",
            "cb_id": 204070,
            "price": 55.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image 2018 3 Computers",
            "amount": 3,
            "year": "perpetual"
         },
         "ATI2018-STANDARD-5": {
            "abbr": "ATI2018-STANDARD-5",
            "cb_id": 204071,
            "price": 69.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image 2018 5 Computers",
            "amount": 5,
            "year": "perpetual"
         }
      },
      "upgrade": {
         "ATI2018-STANDARD-1-UPG": {
            "abbr": "ATI2018-STANDARD-1-UPG",
            "cb_id": 204080,
            "price": 20.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image 2018 1 Computer - Upgrade from older version",
            "amount": 1,
            "year": "perpetual"
         },
         "ATI2018-STANDARD-3-UPG": {
            "abbr": "ATI2018-STANDARD-3-UPG",
            "cb_id": 204081,
            "price": 41.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image 2018 3 Computer - Upgrade from older version",
            "amount": 3,
            "year": "perpetual"
         },
         "ATI2018-STANDARD-5-UPG": {
            "abbr": "ATI2018-STANDARD-5-UPG",
            "cb_id": 204082,
            "price": 55.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image 2018 5 Computer - Upgrade from older version",
            "amount": 5,
            "year": "perpetual"
         },
         "ATI2018-STANDARD-1-3-UPG": {
            "abbr": "ATI2018-STANDARD-1-3-UPG",
            "cb_id": 204083,
            "price": 20.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image 2018 3 Computer - Upgrade",
            "amount": 3,
            "year": "perpetual"
         },
         "ATI2018-STANDARD-1-5-UPG": {
            "abbr": "ATI2018-STANDARD-1-5-UPG",
            "cb_id": 204084,
            "price": 34.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image 2018 5 Computer - Upgrade",
            "amount": 5,
            "year": "perpetual"
         },
         "ATI2018-STANDARD-3-5-UPG": {
            "abbr": "ATI2018-STANDARD-3-5-UPG",
            "cb_id": 204085,
            "price": 13.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image 2018 5 Computer - Upgrade",
            "amount": 5,
            "year": "perpetual"
         }
      }
   },
   "subscription": {
      "upgrade": {
         "CLOUD-50GB-1Y": {
            "abbr": "CLOUD-50GB-1Y",
            "cb_id": 178945,
            "price": 1.49,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis Cloud Storage - 50 GB, 1 year",
            "amount": 50,
            "year": 1
         },
         "CLOUD-100GB-1Y": {
            "abbr": "CLOUD-100GB-1Y",
            "cb_id": 178946,
            "price": 2.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis Cloud Storage - 100 GB, 1 year",
            "amount": 100,
            "year": 1
         },
         "CLOUD-250GB-1Y": {
            "abbr": "CLOUD-250GB-1Y",
            "cb_id": 178947,
            "price": 6.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis Cloud Storage - 250 GB, 1 year",
            "amount": 250,
            "year": 1
         },
         "CLOUD-500GB-1Y": {
            "abbr": "CLOUD-500GB-1Y",
            "cb_id": 178948,
            "price": 13.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis Cloud Storage - 500 GB, 1 year",
            "amount": 500,
            "year": 1
         },
         "CLOUD-1000GB-1Y": {
            "abbr": "CLOUD-1000GB-1Y",
            "cb_id": 178949,
            "price": 29.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis Cloud Storage - 1 TB, 1 year",
            "amount": 1000,
            "year": 1
         },
         "ATI2018-ADVANCED-1-250-UPG": {
            "abbr": "ATI2018-ADVANCED-1-250-UPG",
            "cb_id": 204074,
            "price": 20.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 1 Computer + 250 GB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 1,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-1-500-UPG": {
            "abbr": "ATI2018-ADVANCED-1-500-UPG",
            "cb_id": 204075,
            "price": 34.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 1 Computer + 500 GB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 1,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-3-250-UPG": {
            "abbr": "ATI2018-ADVANCED-3-250-UPG",
            "cb_id": 204076,
            "price": 41.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image  Advanced Subscription 3 Computers + 250 GB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 3,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-3-500-UPG": {
            "abbr": "ATI2018-ADVANCED-3-500-UPG",
            "cb_id": 204077,
            "price": 55.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image  Advanced Subscription 3 Computers + 500 GB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 3,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-5-250-UPG": {
            "abbr": "ATI2018-ADVANCED-5-250-UPG",
            "cb_id": 204078,
            "price": 55.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image  Advanced Subscription 5 Computers + 250 GB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 5,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-5-500-UPG": {
            "abbr": "ATI2018-ADVANCED-5-500-UPG",
            "cb_id": 204079,
            "price": 69.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image  Advanced Subscription 5 Computers + 500 GB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 5,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-STANDARD-PREMIUM-1-1024-UPG": {
            "abbr": "ATI2018-STANDARD-PREMIUM-1-1024-UPG",
            "cb_id": 204105,
            "price": 48.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Premium Subscription 1 Computer + 1 TB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 1,
            "year": 1
         },
         "ATI2018-STANDARD-PREMIUM-3-1024-UPG": {
            "abbr": "ATI2018-STANDARD-PREMIUM-3-1024-UPG",
            "cb_id": 204106,
            "price": 69.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Premium Subscription 3 Computers + 1 TB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 3,
            "year": 1
         },
         "ATI2018-STANDARD-PREMIUM-5-1024-UPG": {
            "abbr": "ATI2018-STANDARD-PREMIUM-5-1024-UPG",
            "cb_id": 204107,
            "price": 76.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Premium Subscription 5 Computers + 1 TB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 5,
            "year": 1
         },
         "ATI2018-PREMIUM-1-1024-UPG": {
            "abbr": "ATI2018-PREMIUM-1-1024-UPG",
            "cb_id": 204108,
            "price": 48.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Premium Subscription 1 Computer + 1 TB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 1,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-PREMIUM-3-1024-UPG": {
            "abbr": "ATI2018-PREMIUM-3-1024-UPG",
            "cb_id": 204109,
            "price": 69.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Premium Subscription 3 Computers + 1 TB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 3,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-PREMIUM-5-1024-UPG": {
            "abbr": "ATI2018-PREMIUM-5-1024-UPG",
            "cb_id": 204110,
            "price": 76.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Premium Subscription 5 Computers + 1 TB Acronis Cloud Storage - 1 year subscription upgrade",
            "amount": 5,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-1-50-RENEW": {
            "abbr": "ATI2018-ADVANCED-1-50-RENEW",
            "cb_id": 204148,
            "price": 27.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 1 Computer + 50 GB Acronis Cloud Storage - 1 year subscription renewal",
            "amount": 1,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-3-50-RENEW": {
            "abbr": "ATI2018-ADVANCED-3-50-RENEW",
            "cb_id": 204149,
            "price": 48.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 3 Computers + 50 GB Acronis Cloud Storage - 1 year subscription renewal",
            "amount": 3,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-5-50-RENEW": {
            "abbr": "ATI2018-ADVANCED-5-50-RENEW",
            "cb_id": 204150,
            "price": 55.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 5 Computers + 50 GB Acronis Cloud Storage - 1 year subscription renewal",
            "amount": 5,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         }
      },
      "buy": {
         "ATI2018-PREMIUM-1-1024": {
            "abbr": "ATI2018-PREMIUM-1-1024",
            "cb_id": 204045,
            "price": 69.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Premium Subscription 1 Computer + 1 TB Acronis Cloud Storage - 1 year subscription",
            "amount": 1,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-PREMIUM-3-1024": {
            "abbr": "ATI2018-PREMIUM-3-1024",
            "cb_id": 204050,
            "price": 104.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Premium Subscription 3 Computers + 1 TB Acronis Cloud Storage - 1 year subscription",
            "amount": 3,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-PREMIUM-5-1024": {
            "abbr": "ATI2018-PREMIUM-5-1024",
            "cb_id": 204056,
            "price": 111.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Premium Subscription 5 Computers + 1 TB Acronis Cloud Storage - 1 year subscription",
            "amount": 5,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-1-250": {
            "abbr": "ATI2018-ADVANCED-1-250",
            "cb_id": 204062,
            "price": 34.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 1 Computer + 250 GB Acronis Cloud Storage - 1 year subscription",
            "amount": 1,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-1-500": {
            "abbr": "ATI2018-ADVANCED-1-500",
            "cb_id": 204063,
            "price": 48.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 1 Computer + 500 GB Acronis Cloud Storage - 1 year subscription",
            "amount": 1,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-3-250": {
            "abbr": "ATI2018-ADVANCED-3-250",
            "cb_id": 204064,
            "price": 55.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 3 Computers + 250 GB Acronis Cloud Storage - 1 year subscription",
            "amount": 3,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-3-500": {
            "abbr": "ATI2018-ADVANCED-3-500",
            "cb_id": 204065,
            "price": 69.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 3 Computers + 500 GB Acronis Cloud Storage - 1 year subscription",
            "amount": 3,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-5-250": {
            "abbr": "ATI2018-ADVANCED-5-250",
            "cb_id": 204066,
            "price": 69.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 5 Computers + 250 GB Acronis Cloud Storage - 1 year subscription",
            "amount": 5,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         },
         "ATI2018-ADVANCED-5-500": {
            "abbr": "ATI2018-ADVANCED-5-500",
            "cb_id": 204067,
            "price": 83.99,
            "store": 882,
            "currency": "GBP",
            "product_name": "Acronis True Image Advanced Subscription 5 Computers + 500 GB Acronis Cloud Storage - 1 year subscription",
            "amount": 5,
            "year": 1,
            "recommendation": "free-parallels-toolbox"
         }
      }
   }
}];

},{}],200:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrueImageCalculator = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TrueImageCalculator = exports.TrueImageCalculator = function () {
  function TrueImageCalculator(source) {
    (0, _classCallCheck3.default)(this, TrueImageCalculator);

    this.source = (0, _cloneDeep2.default)(source);

    this.state = {
      standard: {
        price: 49.99,
        computerCount: 1
      },
      advanced: {
        price: 49.99,
        computerCount: 1,
        storage: 250,
        storageUnit: 'GB'
      },
      premium: {
        price: 99.99,
        computerCount: 1,
        storage: 1,
        storageUnit: 'TB'
      }
    };
    this.defineCurrency();
  }

  (0, _createClass3.default)(TrueImageCalculator, [{
    key: '_updateState',
    value: function _updateState(option, newState) {
      var field = option.toLowerCase();
      this.state[field] = (0, _extends3.default)({}, this.state[field], newState);
    }
  }, {
    key: 'getLocale',
    value: function getLocale() {
      return (0, _get2.default)(this.source, '[0].locale', '');
    }
  }, {
    key: 'defineCurrency',
    value: function defineCurrency() {
      var locale = this.getLocale();
      return _config.currencyList[locale] || _config.currencyList.default;
    }
  }, {
    key: 'updateComputerQuantity',
    value: function updateComputerQuantity(option, quantity) {
      return this._updateState(option, {
        computerCount: quantity
      });
    }
  }, {
    key: 'updateStorage',
    value: function updateStorage(option, volume, unit) {
      return this._updateState(option, {
        storage: volume,
        storageUnit: unit
      });
    }
  }, {
    key: 'getCouponByProductName',
    value: function getCouponByProductName(option, productName) {
      var couponPath = option === 'standard' ? '[1].perpetual.buy[\'' + productName + '\'].coupon_code' : '[1].subscription.buy[\'' + productName + '\'].coupon_code';

      var coupon = (0, _get2.default)(this.source, couponPath, 0);
      return coupon;
    }
  }, {
    key: 'getDefaultParamUrl',
    value: function getDefaultParamUrl(productName) {
      var locale = this.getLocale();
      return '/' + locale + '/buy/id/' + productName + '/';
    }
  }, {
    key: 'getChoseParamWithCoupon',
    value: function getChoseParamWithCoupon(coupon, productName) {
      var defaultUrl = this.getDefaultParamUrl(productName);
      return coupon ? defaultUrl + '?coupon=' + coupon : defaultUrl;
    }
  }, {
    key: 'getChosenParamsUrl',
    value: function getChosenParamsUrl(option, optionType) {
      var _state$option = this.state[option],
          storage = _state$option.storage,
          storageUnit = _state$option.storageUnit,
          computerCount = _state$option.computerCount;

      var additionalStorage = storage - 1;
      var optionUppercase = option.toUpperCase();
      var productName = void 0,
          coupon = void 0;

      var restKeyPart = optionType === 'buy' ? '' : '-UPG';

      switch (option) {
        case 'standard':
          productName = 'ATI2018-' + optionUppercase + '-' + computerCount;
          coupon = this.getCouponByProductName(option, productName);
          return this.getChoseParamWithCoupon(coupon, '' + productName + restKeyPart);

        case 'advanced':
          productName = 'ATI2018-' + optionUppercase + '-' + computerCount + '-' + storage;
          coupon = this.getCouponByProductName(option, productName);
          return this.getChoseParamWithCoupon(coupon, '' + productName + restKeyPart);

        case 'premium':
          productName = 'ATI2018-' + optionUppercase + '-' + computerCount + '-1024';
          coupon = this.getCouponByProductName(option, productName);
          var defaultUrl = this.getDefaultParamUrl('' + productName + restKeyPart);
          var couponPart = '?coupon=' + coupon;

          if (additionalStorage) {
            return coupon ? defaultUrl + 'CLOUD-1000GB-1Y|' + additionalStorage + '/' + couponPart : defaultUrl + 'CLOUD-1000GB-1Y|' + additionalStorage + '/';
          }

          return coupon ? '' + defaultUrl + couponPart : defaultUrl;

        default:
          return '';
      }
    }
  }, {
    key: '_getPricePath',
    value: function _getPricePath(option, optionType) {
      var optionUppercase = option.toUpperCase();
      var licenceType = option === 'standard' ? 'perpetual' : 'subscription';

      return function (restKeyPart) {
        var restPathPart = optionType === 'buy' ? '' + restKeyPart : restKeyPart + '-UPG';
        return '[0].' + licenceType + '.' + optionType + '[\'ATI2018-' + restPathPart + '\'].price';
      };
    }
  }, {
    key: '_getDiscountPricePath',
    value: function _getDiscountPricePath(option, optionType) {
      var optionUppercase = option.toUpperCase();
      var licenceType = option === 'standard' ? 'perpetual' : 'subscription';

      return function (restKeyPart) {
        var restPathPart = optionType === 'buy' ? '' + restKeyPart : restKeyPart + '-UPG';
        return '[1].' + licenceType + '.' + optionType + '[\'ATI2018-' + restPathPart + '\'].discount_absolute';
      };
    }
  }, {
    key: '_getCompQuantityPricePath',
    value: function _getCompQuantityPricePath(option, value) {
      var optionUppercase = option.toUpperCase();
      var getPath = this._getPricePath(option);

      switch (option) {
        case 'standard':
          return getPath(optionUppercase + '-' + value);
        case 'advanced':
          return getPath(optionUppercase + '-' + value + '-250');
        case 'premium':
          return getPath(optionUppercase + '-' + value + '-1024');
        default:
          return '';
      }
    }

    // за 1 доп. TB

  }, {
    key: '_getAdditionalStoragePrice',
    value: function _getAdditionalStoragePrice() {
      var path = '[0].subscription.upgrade[\'CLOUD-1000GB-1Y\'].price';
      return (0, _get2.default)(this.source, path, 0);
    }
  }, {
    key: 'calcComputerQuantityPriceDelta',
    value: function calcComputerQuantityPriceDelta(option, value, optionType) {
      var getPath = this._getPricePath(option, optionType);
      var base = this._getCompQuantityPricePath(option, 1);
      var current = this._getCompQuantityPricePath(option, value);

      var basePrice = (0, _get2.default)(this.source, base, 0);
      var currentPrice = (0, _get2.default)(this.source, current, 0);
      var delta = currentPrice - basePrice;

      return Math.round(delta * 100) / 100;
    }
  }, {
    key: 'calcStoragePriceDeltaAdvanced',
    value: function calcStoragePriceDeltaAdvanced(option, value, optionType) {
      var optionUppercase = option.toUpperCase();
      var getPath = this._getPricePath(option, optionType);

      var base = getPath(optionUppercase + '-1-250');
      var current = getPath(optionUppercase + '-1-' + value);

      var basePrice = (0, _get2.default)(this.source, base, 0);
      var currentPrice = (0, _get2.default)(this.source, current, 0);

      return Math.round((currentPrice - basePrice) * 100) / 100;
    }
  }, {
    key: 'calcStoragePriceDeltaPremium',
    value: function calcStoragePriceDeltaPremium(option, value) {
      if (value === 1) return 0;

      var basePrice = this._getAdditionalStoragePrice();
      var currentPrice = basePrice * (value - 1);
      return Math.round(currentPrice * 100) / 100;
    }
  }, {
    key: 'calcPriceDeltas',
    value: function calcPriceDeltas() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var option = config.option,
          type = config.type,
          value = config.value,
          optionType = config.optionType;


      if (type === 'computerCount') return this.calcComputerQuantityPriceDelta(option, value, optionType);

      switch (option) {
        case 'advanced':
          return this.calcStoragePriceDeltaAdvanced(option, value, optionType);
        case 'premium':
          return this.calcStoragePriceDeltaPremium(option, value);
        default:
          return 0;
      }
    }
  }, {
    key: 'calcSavings',
    value: function calcSavings(price, discountPrice) {
      var savings = price - discountPrice;
      return Math.round(savings * 100) / 100;
    }
  }, {
    key: 'calcPrice',
    value: function calcPrice(option, optionType) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _state$option2 = this.state[option],
          storage = _state$option2.storage,
          storageUnit = _state$option2.storageUnit,
          computerCount = _state$option2.computerCount;

      var optionUppercase = option.toUpperCase();

      var withDiscount = config.withDiscount;

      var getPath = withDiscount ? this._getDiscountPricePath(option, optionType) : this._getPricePath(option, optionType);

      switch (option) {
        case 'standard':
          var pathStandard = getPath(optionUppercase + '-' + computerCount);
          return (0, _get2.default)(this.source, pathStandard, 0);

        case 'advanced':
          var pathAdvanced = getPath(optionUppercase + '-' + computerCount + '-' + storage);
          return (0, _get2.default)(this.source, pathAdvanced, 0);

        case 'premium':
          var additionalStorage = storage - 1;
          var additionalStoragePrice = this._getAdditionalStoragePrice();

          var pathSingle = getPath(optionUppercase + '-' + computerCount + '-1024');
          var priceSingle = (0, _get2.default)(this.source, pathSingle, 0);

          if (additionalStorage === 0) return priceSingle;
          if (withDiscount && !priceSingle) return 0;

          var premiumPrice = priceSingle + additionalStoragePrice * additionalStorage;
          return Math.round(premiumPrice * 100) / 100;

        default:
          return 0;
      }
    }
  }]);
  return TrueImageCalculator;
}();

},{"../config":203,"babel-runtime/helpers/classCallCheck":6,"babel-runtime/helpers/createClass":7,"babel-runtime/helpers/extends":8,"lodash/cloneDeep":177,"lodash/get":179}],201:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrueImageDomController = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TrueImageDomController = exports.TrueImageDomController = function () {
  function TrueImageDomController(selector, calculator) {
    (0, _classCallCheck3.default)(this, TrueImageDomController);

    this.columnSelector = '.js-calculator-option';
    this.priceSelector = '.js-calculator-price';
    this.pricePreviousSelector = '.js-calculator-previous-price';
    this.pricePreviousContainerSelector = '.js-calculator-previous-price-container';
    this.priceSavingsSelector = '.js-calculator-price-savings';
    this.selectSelector = '.js-calculator-select';
    this.priceDeltaSelector = '.js-select-prefix';
    this.selectWrapperSelector = '.js-select-wrapper';
    this.selectValueSelector = '.js-select-value';
    this.selectButtonSelector = '.js-select-button';

    this.$el = $(selector);
    this.$columns = this.$el.find(this.columnSelector);
    this.calc = calculator;

    // обновить все цены при инициализации
    this.updateColumnPrices();

    // слушать изменения в селектах
    this.listenToUpdate();

    // создать лейблы с разницами в ценах
    this.createPriceDeltas();

    // изменить урлы кнопок «добавить в корзину»
    this.updateButtonUrls();

    $(this.selectSelector).trigger('change');
  }

  (0, _createClass3.default)(TrueImageDomController, [{
    key: '_getOptionOfElement',
    value: function _getOptionOfElement($el) {
      // standard || advanced || premium
      return $el.attr('data-option');
    }
  }, {
    key: '_getTypeOfElement',
    value: function _getTypeOfElement($el) {
      // storage || computerCount
      return $el.attr('data-type');
    }
  }, {
    key: '_getTypeOfOption',
    value: function _getTypeOfOption($el) {
      // buy || upgrade
      return $el.attr('data-option-type');
    }
  }, {
    key: 'createPriceDeltas',
    value: function createPriceDeltas() {
      var self = this;
      $(this.priceDeltaSelector).each(function () {
        var $this = $(this);
        var $column = $this.closest(self.columnSelector);
        var $select = $this.closest(self.selectWrapperSelector).find(self.selectSelector);

        var option = self._getOptionOfElement($column);
        var type = self._getTypeOfElement($select);
        var value = $this.siblings(self.selectValueSelector).html();
        var optionType = self._getTypeOfOption($column);

        var delta = self.calc.calcPriceDeltas({ option: option, type: type, value: value, optionType: optionType });

        if (delta) $this.html('+ ' + self.calc.defineCurrency() + delta);
      });
    }
  }, {
    key: 'updateColumnPrices',
    value: function updateColumnPrices() {
      var self = this;
      this.$columns.each(function () {
        var $this = $(this);
        var option = self._getOptionOfElement($this);
        var optionType = self._getTypeOfOption($this);

        var price = self.calc.calcPrice(option, optionType);
        var discountPrice = self.calc.calcPrice(option, optionType, {
          withDiscount: true
        });

        if (!discountPrice) return $this.find(self.priceSelector).html(price);

        $this.find(self.pricePreviousContainerSelector).addClass('active');
        $this.find(self.pricePreviousSelector).html(price);
        $this.find(self.priceSelector).html(discountPrice);

        var savings = self.calc.calcSavings(price, discountPrice);
        $this.find(self.priceSavingsSelector).html('Save £' + savings);
      });
    }
  }, {
    key: 'updateColumnPrice',
    value: function updateColumnPrice(column, price, selector) {
      column.find('' + selector).html(price);
    }
  }, {
    key: 'updateButtonUrls',
    value: function updateButtonUrls() {
      var self = this;
      this.$columns.each(function () {
        var $this = $(this);
        var option = self._getOptionOfElement($this);
        var optionType = self._getTypeOfOption($this);
        var $button = $this.find(self.selectButtonSelector);
        $button.attr('href', self.calc.getChosenParamsUrl(option, optionType));
      });
    }
  }, {
    key: 'updateButtonUrl',
    value: function updateButtonUrl(option, button, optionType) {
      button.attr('href', this.calc.getChosenParamsUrl(option, optionType));
    }
  }, {
    key: 'changeActiveColumn',
    value: function changeActiveColumn(selector) {
      $(this.columnSelector).removeClass('active');
      $(selector).addClass('active');
    }
  }, {
    key: 'calcPrice',
    value: function calcPrice() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var option = config.option,
          type = config.type,
          value = config.value,
          optionType = config.optionType,
          withDiscount = config.withDiscount;

      if (type === 'computerCount') {
        this.calc.updateComputerQuantity(option, value);
      } else {
        var _value$split = value.split(' '),
            _value$split2 = (0, _slicedToArray3.default)(_value$split, 2),
            volume = _value$split2[0],
            unit = _value$split2[1];

        this.calc.updateStorage(option, volume, unit);
      }
      return this.calc.calcPrice(option, optionType, { withDiscount: withDiscount });
    }
  }, {
    key: 'listenToUpdate',
    value: function listenToUpdate() {
      var _this = this;

      $(this.selectSelector).on('change', function (e) {
        var $select = $(e.target);
        var $column = $select.closest(_this.columnSelector);
        var $button = $column.find(_this.selectButtonSelector);

        var option = _this._getOptionOfElement($column);
        var type = _this._getTypeOfElement($select);
        var optionType = _this._getTypeOfOption($column);
        var value = $select.val(); // '250 GB' || '1 TB'

        var price = _this.calcPrice({ option: option, type: type, value: value, optionType: optionType });
        var discountPrice = _this.calcPrice({ option: option, type: type, value: value, optionType: optionType, withDiscount: true });

        _this.changeActiveColumn($column);
        _this.updateButtonUrl(option, $button, optionType);

        if (!discountPrice) return _this.updateColumnPrice($column, price, _this.priceSelector);

        $column.find(_this.pricePreviousContainerSelector).addClass('active');
        _this.updateColumnPrice($column, price, _this.pricePreviousSelector);
        _this.updateColumnPrice($column, discountPrice, _this.priceSelector);

        var savings = _this.calc.calcSavings(price, discountPrice);
        $column.find(_this.priceSavingsSelector).html('Save £' + savings);
      });

      $(this.columnSelector).on('click', function (e) {
        var $column = e.target.closest(_this.columnSelector);
        _this.changeActiveColumn($column);
      });
    }
  }]);
  return TrueImageDomController;
}();

},{"babel-runtime/helpers/classCallCheck":6,"babel-runtime/helpers/createClass":7,"babel-runtime/helpers/slicedToArray":9}],202:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showCertainBlockOnMenuClick = exports.checkUrlHash = undefined;

var _utils = require('./utils');

var _sliders = require('./sliders');

var _detectOS = require('./detectOS');

/**
 * makes the extended features appear without animation using special class
 * @return
 */
function showElementWithoutAnimation() {
  var selector = '.js-features-expand-container';
  $(selector).addClass('active active-no-animation');
  setTimeout(function () {
    $(selector).removeClass('active-no-animation');
  }, 100);
  setTimeout(function () {
    $(selector).addClass('active-sticky');
  }, 100);
}

/**
 * shows certain features by clicking on corresponding link, scrolls to the container block
 * features set depends on url hash
 * @param {String} urlHash 
 * @return
 */
function showFilteredItemsWithScroll(urlHash) {
  showElementWithoutAnimation();
  $('[href="#' + urlHash + '"]').click();
  (0, _utils.scrollToTheElement)(".js-features-expand-container");
}

/**
 * shows certain block by clicking on corresponding link
 * block set depends on url hash
 * @param {String} urlHash 
 * @return
 */
function showCertainBlock(urlHash) {
  //console.log(urlHash);
  $('[href="#' + urlHash + '"]').click();
  //console.log($(`[href="#${urlHash}"]`));
  if (urlHash === 'personal' || urlHash === 'business' || urlHash === 'cloud') {
    // setTimeout(() => $(window).trigger(`updateSwipers-${urlHash}`), 0)
  }
}

/** 
 * calls the matching function based on url hash
 * @return
*/
var checkUrlHash = exports.checkUrlHash = function checkUrlHash() {
  var urlHash = location.hash.replace('#', '');
  if (!urlHash) return;

  var determineFunctionBasedOnUrl = {
    'expandedFeatures': showElementWithoutAnimation,
    'new': showFilteredItemsWithScroll.bind(null, urlHash),
    'cloudBackup': showFilteredItemsWithScroll.bind(null, urlHash),
    'backup': showFilteredItemsWithScroll.bind(null, urlHash),
    'mobileBackup': showFilteredItemsWithScroll.bind(null, urlHash),
    'try': showCertainBlock.bind(null, urlHash),
    'buy': showCertainBlock.bind(null, urlHash),
    'upgrade': showCertainBlock.bind(null, urlHash),
    'help': showCertainBlock.bind(null, urlHash),
    'personal': showCertainBlock.bind(null, urlHash),
    'business': showCertainBlock.bind(null, urlHash),
    'cloud': showCertainBlock.bind(null, urlHash)
  };

  var func = determineFunctionBasedOnUrl[urlHash];
  if (!func) return;

  func();
};

var showCertainBlockOnMenuClick = exports.showCertainBlockOnMenuClick = function showCertainBlockOnMenuClick() {
  var $menuSplitBtns = $('.js-menu-split-btn');

  $menuSplitBtns.each(function () {
    var self = $(this);
    var block = self.attr('data-split');
    self.on('click', function (e) {
      $('.js-split-btn[href="#' + block + '"]').click();
    });
  });
};

//export default checkUrlHash

},{"./detectOS":205,"./sliders":214,"./utils":217}],203:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trueImageDataSourceUrl = exports.currencyList = exports.swiperConfig = exports.defaultSwiperConfig = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function addActiveClass($el) {
//   $el.addClass('active')
// }

// Swipers config:
var defaultSwiperConfig = exports.defaultSwiperConfig = {
  loop: false,
  slidesPerView: 'auto',
  pagination: {
    clickable: true,
    el: '.swiper-pagination'
  },
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  observer: true,
  observeParents: true

};

var reviewsAndArticlesConfig = (0, _extends3.default)({}, (0, _cloneDeep2.default)(defaultSwiperConfig), {
  spaceBetween: 11,
  slidesPerView: 3,
  slidesPerColumn: 1,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next'
  },
  breakpoints: {
    950: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 1
    }
  },
  on: {
    touchStart: function touchStart() {
      var $parent = $(this)[0].$el;
      $parent.addClass('active');
    }
  }

  // Clone deep is needed to prevent multiple swipers 
  // from sharing common nav settings
  // ... — copies only first deep level of object
});var swiperConfig = exports.swiperConfig = {
  reviews: (0, _cloneDeep2.default)(reviewsAndArticlesConfig),
  articles: (0, _cloneDeep2.default)(reviewsAndArticlesConfig),
  resources: (0, _cloneDeep2.default)(defaultSwiperConfig),
  solutions: (0, _extends3.default)({}, (0, _cloneDeep2.default)(defaultSwiperConfig), {
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 11
      },
      500: {
        slidesPerView: 1,
        spaceBetween: 11
      }
    }
  }),
  relevant: (0, _extends3.default)({}, (0, _cloneDeep2.default)(defaultSwiperConfig), {
    spaceBetween: 16
  })

  // true image calculator config

};var currencyList = exports.currencyList = {
  'en-us': '$',
  'en-gb': '£',
  'default': '$'

  // true image data loaing

  //export const trueImageDataSourceUrl = `https://www.acronis.com/en-us/api/v1/price/?locale=en-gb&machine_name=acronis_true_image2018_promo,acronis_true_image2018`

};var trueImageDataSourceUrl = exports.trueImageDataSourceUrl = 'https://www.acronis.com/en-us/api/v1/price/?locale=en-gb&machine_name=acronis_true_image2018';

},{"babel-runtime/helpers/extends":8,"lodash/cloneDeep":177}],204:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var detectIE = exports.detectIE = function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
};

},{}],205:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var isMac = function isMac() {
  return (/Mac\sOS|Macintosh/ig.test(navigator.userAgent)
  );
};
var determineLink = exports.determineLink = function determineLink() {
  var $btn = $('.js-trial-version-download');
  var winLink = 'https://download.acronis.com/AcronisTrueImage2018_web.exe';
  var macLink = 'https://download.acronis.com/AcronisTrueImage2018.dmg';

  // const winLink = 'https://andieelmes.ru/test/acronis/win.exe'
  // const macLink = 'https://andieelmes.ru/test/acronis/mac.dmg'

  var attr = isMac() ? macLink : winLink;
  $btn.attr('href', attr);
};

var determineOsType = exports.determineOsType = function determineOsType() {
  var $osTypeTexts = $('.js-os-types');
  var os = isMac() ? 'mac' : 'pc';
  $osTypeTexts.find('.js-os-type').removeClass('active');
  $osTypeTexts.find('[data-os="' + os + '"]').addClass('active');
};

var startDownload = exports.startDownload = function startDownload() {
  determineLink();
  determineOsType();
  $(document).ready(function () {
    window.location = $('.js-trial-version-download').attr('href');
  });
};

},{}],206:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterItemsBasedOnCategory = undefined;

var _sliders = require('./sliders');

var _detectOS = require('./detectOS');

var _utils = require('./utils');

/**
 * Sorts among `items` with 'data-category' attribute. 
 * When a `btn` with href is clicked, only `items` with the same data-catagory are shown
 * @param {Object} selectors
 *  @field {String} btn selector 
 *  @field {String} container selector
 *  @field {String} items selector
 * @param {Object} config
 * @return
 */
var filterItemsBasedOnCategory = exports.filterItemsBasedOnCategory = function filterItemsBasedOnCategory() {
  var selectors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var btn = selectors.btn,
      container = selectors.container,
      items = selectors.items;


  var $btn = $(btn);
  var $container = $(container);
  var $items = $(items);

  var attachCallback = function attachCallback(element) {
    var $el = $(element);
    var btnCategory = $el.attr('href').replace('#', '');

    $el.on('click', function (e) {

      $btn.removeClass('active');
      $el.addClass('active');
      filterItems(btnCategory);
      $(window).trigger('resize');

      setTimeout(function () {
        return $(window).trigger('updateSwipers-' + btnCategory);
      }, 0);
    });
  };

  var filterItems = function filterItems(btnCategory) {
    $items.addClass('is-hidden');
    var category = '[data-category~="' + btnCategory + '"]';
    var $sortedItems = $container.find(category);
    $sortedItems.removeClass('is-hidden');
    if (!$sortedItems.hasClass('js-sort-no-scroll-animation')) (0, _utils.smoothScroll)($sortedItems);
    $(window).trigger('resize');
  };

  $btn.each(function (index, el) {
    return attachCallback(el);
  });
};

},{"./detectOS":205,"./sliders":214,"./utils":217}],207:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHeightWatchers = undefined;

var _stretchHeight = require('./stretchHeight');

var initHeightWatchers = exports.initHeightWatchers = function initHeightWatchers() {

  // always

  (0, _stretchHeight.watchEqualHeights)('.js-relevant-product-titles');
  (0, _stretchHeight.watchEqualHeights)('.js-relevant-product-desc');

  // only when width is wider than 768
  (0, _stretchHeight.watchEqualHeights)('.js-calculator-info', {
    breakpoint: 768,
    narrower: -1,
    wider: 0
  });

  (0, _stretchHeight.watchEqualHeights)('.js-calculator-features-top', {
    breakpoint: 768,
    narrower: -1,
    wider: 0
  });

  (0, _stretchHeight.watchEqualHeights)('.js-calculator-title', {
    breakpoint: 768,
    narrower: -1,
    wider: 0
  });
  (0, _stretchHeight.watchEqualHeights)('.js-calculator-selects', {
    breakpoint: 768,
    narrower: -1,
    wider: 0
  });

  (0, _stretchHeight.watchEqualHeights)('.js-calculator-content', {
    breakpoint: 900,
    narrower: -1,
    wider: 0
  });

  (0, _stretchHeight.watchEqualHeights)('.js-calculator-upgrade', {
    breakpoint: 768,
    narrower: -1,
    wider: 0
  });

  (0, _stretchHeight.watchEqualHeights)('.js-product-two', {
    breakpoint: 500,
    narrower: -1,
    wider: 2
  });

  (0, _stretchHeight.watchEqualHeights)('.js-resource-item', {
    breakpoint: 768,
    narrower: 0,
    wider: 2
  });

  (0, _stretchHeight.watchEqualHeights)('.js-split-article', {
    breakpoint: 800,
    narrower: 0,
    wider: 2
  });

  (0, _stretchHeight.watchEqualHeights)('.js-main-page-article-card', {
    breakpoint: 1000,
    narrower: 2,
    wider: -1
  });

  function chooseProductClassOnWidth() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var selector = config.selector,
        classNameStart = config.classNameStart,
        classNameFinish = config.classNameFinish,
        breakpoint = config.breakpoint;

    var $selector = $(selector);
    var $window = $(window);

    function applyHandlers() {
      var width = $window.width();
      if (width >= breakpoint) $selector.addClass(classNameFinish).removeClass(classNameStart);else $selector.removeClass(classNameFinish).addClass(classNameStart);
    }

    applyHandlers();
    $window.resize(function () {
      return applyHandlers();
    });
  }

  chooseProductClassOnWidth({
    selector: '.js-product-infrastructure',
    classNameStart: 'js-product-two-infrastructure',
    classNameFinish: 'js-product-three-infrastructure',
    breakpoint: 500
  });

  chooseProductClassOnWidth({
    selector: '.js-product-files',
    classNameStart: 'js-product-two-files',
    classNameFinish: 'js-product-three-files',
    breakpoint: 500
  });

  chooseProductClassOnWidth({
    selector: '.js-product-backup',
    classNameStart: 'js-product-two-backup',
    classNameFinish: 'js-product-three-backup',
    breakpoint: 500
  });
};

},{"./stretchHeight":216}],208:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSmoothScrolls = undefined;

var _utils = require('./utils');

var initSmoothScrolls = exports.initSmoothScrolls = function initSmoothScrolls() {
  $('.js-smooth-scroll').on('click', function (e) {
    var selector = $(this).attr('href');
    (0, _utils.smoothScroll)(selector);
  });

  $('.js-scroll-to-calculator').on('click', function (e) {
    var selector = $(this).attr('href').replace('#', '');
    var calculator = $('.js-calculator-container');

    $('.js-calculator-type[href="#' + selector + '"]').click();
    var $el = calculator.find('#' + selector);
    (0, _utils.smoothScroll)($el);
  });
};

},{"./utils":217}],209:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initStickyFill = undefined;

var _sticky = require('./sticky');

var _sticky2 = _interopRequireDefault(_sticky);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initStickyFill = exports.initStickyFill = function initStickyFill() {
  var stickyFill = new _sticky2.default({
    element: '.js-sidebar-sticky',
    container: '.js-features-expand-container',
    breakpoint: 768
  });

  /**
   * handles animation of a features block.
   */
  function expandFeatures() {
    var containerSelector = '.js-features-expand-container';
    var $container = $(containerSelector);
    var featuresSelector = '.js-features-container';
    var activeClassName = 'active';
    var activeStickyClassName = 'active-sticky';
    var activeNoAnimationClassName = 'active-no-animation';

    $('.js-features-expand-btn').on('click', function () {
      if (!$container.hasClass(activeStickyClassName)) {
        $container.addClass(activeClassName);
        (0, _utils.scrollToTheElement)(featuresSelector);
        setTimeout(function () {
          $container.addClass(activeStickyClassName);
          stickyFill.update();
        }, 2000);

        $(window).trigger('resize');
        return;
      }

      $container.addClass(activeNoAnimationClassName);
      $container.removeClass(activeStickyClassName);
      $(window).trigger('resize');

      setTimeout(function () {
        $container.removeClass(activeNoAnimationClassName);
        $(window).trigger('resize');
        $container.removeClass(activeClassName);
        setTimeout(function () {
          (0, _utils.scrollToTheElement)(featuresSelector);
        }, 700);
      }, 100);
      stickyFill.destroy();
    });
  }

  expandFeatures();

  $('.js-sort-items-btn').on('click', function () {
    stickyFill.update();
    (0, _utils.smoothScroll)('.js-features-expand-container');
  });
};

},{"./sticky":215,"./utils":217}],210:[function(require,module,exports){
'use strict';

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

var _sliders = require('./sliders');

var _initHeightWatchers = require('./initHeightWatchers');

var _utils = require('./utils');

var _filter = require('./filter');

var _checkUrlHash = require('./checkUrlHash');

var _ATI_data = require('./ATI_data.js');

var _ATI_data2 = _interopRequireDefault(_ATI_data);

var _config = require('./config');

var _trueImageCalculator = require('./business/trueImageCalculator');

var _trueImageDomController = require('./business/trueImageDomController');

var _initSmoothScrolls = require('./initSmoothScrolls');

var _initStickyFill = require('./initStickyFill');

var _detectOS = require('./detectOS');

var _mobileMenu = require('./mobileMenu');

var _stickybits = require('stickybits');

var _stickybits2 = _interopRequireDefault(_stickybits);

var _detectIE = require('./detectIE');

var _search = require('./search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _select2.default)(); /**
                          * Global deps, included in html:
                          * - jquery;
                          * - selectric;
                          * - swiper;
                          */

// if (!$('.all').hasClass('js-split-page')) {
//   initReviewsSlider()
//   initResourcesSlider()
//   initArticlesSlider()
// }

// else {
//   // console.log(1);
//   initArticlesSlider()
// }

(0, _sliders.initReviewsSlider)();
(0, _sliders.initResourcesSlider)();
(0, _sliders.initArticlesSlider)();
(0, _sliders.initRelevantSlider)();
(0, _sliders.initSolutionsSlider)();

(0, _initHeightWatchers.initHeightWatchers)();

(0, _utils.toggleParentClassOnClick)('.js-open-content-btn', '.js-open-content-container', 'active');

(0, _utils.toggleParentClassOnClick)('.js-popup-btn', '.js-popup-container', 'active');

(0, _utils.toggleParentClassOnClick)('.js-mobile-menu-btn', '.js-mobile-menu-container', 'active');

$('.js-open-region-popup').on('click', function () {
  $('.js-popup-container').addClass('active');
});

(0, _filter.filterItemsBasedOnCategory)({
  btn: '.js-sort-items-btn',
  container: '.js-sort-items',
  items: '.js-sort-item'
});

(0, _filter.filterItemsBasedOnCategory)({
  btn: '.js-calculator-type',
  container: '.js-calculator-container',
  items: '.js-calculator-item'
});

(0, _filter.filterItemsBasedOnCategory)({
  btn: '.js-feature-type',
  container: '.js-feature-container',
  items: '.js-feature-item'
});

(0, _filter.filterItemsBasedOnCategory)({
  btn: '.js-split-btn',
  container: '.js-split-container',
  items: '.js-split-item'
});

(0, _checkUrlHash.checkUrlHash)();
(0, _checkUrlHash.showCertainBlockOnMenuClick)();

$('.js-clear-hash').on('click', function () {
  (0, _utils.clearHash)();
  (0, _utils.clearFilters)();
});

$.ajax({
  url: _config.trueImageDataSourceUrl
}).done(function (data) {
  // потом подключаем его и прикручиваем к форме:
  var trueImageCalc = new _trueImageCalculator.TrueImageCalculator(data);

  // инициализируем ДОМ-контроллер
  // цены считаются и выводятся в конструкторе
  var trueImageDomControl = new _trueImageDomController.TrueImageDomController('.js-true-image-calculator', trueImageCalc);
}).fail(function (e) {
  console.error(e);
  console.log('для примера берем локальные данные, так как cross domain запрещен');
  var trueImageCalc = new _trueImageCalculator.TrueImageCalculator(_ATI_data2.default);
  // инициализируем ДОМ-контроллер
  // цены считаются и выводятся в конструкторе
  var trueImageDomControl = new _trueImageDomController.TrueImageDomController('.js-true-image-calculator', trueImageCalc);
});

(0, _initSmoothScrolls.initSmoothScrolls)();

(0, _initStickyFill.initStickyFill)();

(0, _detectOS.determineLink)();
(0, _detectOS.determineOsType)();

(0, _mobileMenu.toggleMobileMenu)();

// $(window).on('resize', function(){
//   toggleMobileMenu()
// })


function makeStickySplitMenu() {
  var $elements = $('.js-split-menu');
  if (!$elements.length) return false;

  var $window = $(window);
  var width = $window.width();

  var sticky = (0, _stickybits2.default)('.js-split-menu');
  $window.on('resize', function () {
    if (width <= 768) sticky.cleanup();
  });
}

makeStickySplitMenu();

if ((0, _detectIE.detectIE)()) {
  $('html').addClass('is-ie');
}

(0, _search.toggleSearch)();

},{"./ATI_data.js":199,"./business/trueImageCalculator":200,"./business/trueImageDomController":201,"./checkUrlHash":202,"./config":203,"./detectIE":204,"./detectOS":205,"./filter":206,"./initHeightWatchers":207,"./initSmoothScrolls":208,"./initStickyFill":209,"./mobileMenu":211,"./search":212,"./select":213,"./sliders":214,"./utils":217,"stickybits":198}],211:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleMobileMenu = undefined;

var _utils = require('./utils');

var toggleMobileMenu = exports.toggleMobileMenu = function toggleMobileMenu() {
  var $selector = $('.js-mobile-menu-item-btn');
  var $container = $('.all');

  var parentSelector = '.js-mobile-menu-item-container';
  var className = 'active';
  var width = $(window).width();

  $selector.on('click', function () {
    var self = $(this);
    var $parent = self.closest(parentSelector);

    if ($parent.hasClass(className)) {
      $parent.removeClass(className);
      if (width < 950) (0, _utils.smoothScroll)($container);
      return;
    }
    $(parentSelector).removeClass(className);
    $parent.addClass(className);
    if (width < 950) (0, _utils.smoothScroll)(self);
  });
};

},{"./utils":217}],212:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * adds class 'active' when input is clicked
 * when body is clicked and the input field is empty, the input field closes
 */
var toggleSearch = exports.toggleSearch = function toggleSearch() {

  var formSelector = '.js-search-form';
  var inputSelector = '.js-search-input';
  var className = 'active';
  var $input = $(inputSelector);
  var $activeInput = $input.last();

  $input.on('click, focus', function () {
    $activeInput = $(this);
    $activeInput.closest(formSelector).addClass(className);
  });
  $('body').on('click', function (e) {
    if ($(formSelector).hasClass(className) && !$(e.target).parents(formSelector).length && !$activeInput.val().length) {
      $(formSelector).removeClass(className);
    }
  });
};

},{}],213:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Custom selects init

var initSelect = function initSelect() {
  var selector = '.js-calculator-select';
  var $selects = $(selector);
  if (!$selects.length) return false;

  $selects.selectric({
    optionsItemBuilder: function optionsItemBuilder(itemData) {
      var showDelta = $(itemData.element).closest(selector).attr('data-show-delta-price');

      var tpl = showDelta ? itemData.text + '<span class="calculator-select__prefix js-select-prefix"></span> <span class="calculator-select__value is-hidden js-select-value">' + itemData.value + '</span>' : itemData.text;

      return tpl;
    }
  });
};

exports.default = initSelect;

},{}],214:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRelevantSlider = exports.initSolutionsSlider = exports.initResourcesSlider = exports.initArticlesSlider = exports.initReviewsSlider = undefined;

var _utils = require('./utils');

var _config = require('./config');

/**
 * Initializes swiper instance with specific config depending on slider type
 * @param {String} type path of className of given slider element
 * @return {Swiper} instance of Swiper
 */
// Swiper sliders init

var initSwiperInstance = function initSwiperInstance(type) {
  var clsnm = '.js-' + type + '-slider';
  if (!(0, _utils.elementExists)(clsnm)) return false;

  var element = clsnm + ' .swiper-container';
  var settings = _config.swiperConfig[type];
  return new Swiper(element, settings);
};

/**
 * Destroys given swiper instance
 * removes inited class name from element
 * @param {Swiper} swiper 
 * @return {Null}
 */
var destroySwiperInstance = function destroySwiperInstance(swiper, selector) {
  if (!swiper) return null;
  swiper.destroy();

  $('.js-' + selector + '-slider').removeAttr('style').find('.swiper-slide').removeAttr('style');

  return null;
};

/**
 * Creates instance of swiper 
 * and binds update event to window for updation
 * @param {Object} config
 *  @arg {String} swiperSelector is className of the slider
 *  @arg {String} filterCategory is container selector, when the btn with href="#filterCategory" is clicked, only containers with that data-category are shown
 * @return {Object}
 */
var SimpleSwiperFactory = function SimpleSwiperFactory(_ref) {
  var swiperSelector = _ref.swiperSelector,
      filterCategory = _ref.filterCategory;

  var swiper = initSwiperInstance(swiperSelector);

  $(window).on('updateSwipers-' + filterCategory, function () {
    destroySwiperInstance(swiper, swiperSelector);
    swiper = initSwiperInstance(swiperSelector);
    swiper.update();
  });

  return swiper;
};

var initReviewsSlider = exports.initReviewsSlider = function initReviewsSlider() {
  var instance = new SimpleSwiperFactory({
    swiperSelector: 'reviews',
    filterCategory: 'business'
  });
};

var initArticlesSlider = exports.initArticlesSlider = function initArticlesSlider() {
  var instance = new SimpleSwiperFactory({
    swiperSelector: 'articles',
    filterCategory: 'personal'
  });
};

var initResourcesSlider = exports.initResourcesSlider = function initResourcesSlider() {
  var type = 'resources';
  var swiper = null;

  var _init = function _init() {
    swiper = $(window).width() < 768 ? swiper || initSwiperInstance(type) : destroySwiperInstance(swiper, type);
  };

  _init();
  $(window).resize(function () {
    return _init();
  });
};

var initSolutionsSlider = exports.initSolutionsSlider = function initSolutionsSlider() {
  var type = 'solutions';
  var swiper = null;

  var _init = function _init() {
    swiper = $(window).width() < 768 ? swiper || initSwiperInstance(type) : destroySwiperInstance(swiper, type);
  };

  _init();
  $(window).resize(function () {
    return _init();
  });
};

var initRelevantSlider = exports.initRelevantSlider = function initRelevantSlider() {
  var type = 'relevant';
  var swiper = null;

  var _init = function _init() {
    swiper = $(window).width() < 950 ? swiper || initSwiperInstance(type) : destroySwiperInstance(swiper, type);
  };

  _init();
  $(window).resize(function () {
    return _init();
  });
};

},{"./config":203,"./utils":217}],215:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * makes element fixed inside its container if window width is more than breakpoint
 */
var StickyFill = function StickyFill() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck3.default)(this, StickyFill);

  this.calculateLimits = function () {
    var windowHeight = _this.$window.height();
    var containerHeight = _this.$container.height();
    _this.elHeight = Math.min(_this.initialElHeight, windowHeight);
    _this.topLimit = _this.$container.offset().top - 27;
    _this.bottomLimit = containerHeight + _this.topLimit - windowHeight + 27;
    _this.finalPositionTop = containerHeight - windowHeight;
  };

  this.freezeHeight = function () {
    (0, _utils.clearStyles)(_this.$el);
    _this.$el.outerHeight(_this.elHeight);
  };

  this.handleScroll = function () {
    var scrollTop = _this.$window.scrollTop();
    var windowHeight = _this.$window.height();
    var isHigher = scrollTop < _this.topLimit;
    var isLower = scrollTop > _this.bottomLimit;
    var isInBetween = !isHigher && !isLower;

    if (isInBetween) {
      (0, _utils.clearStyles)(_this.$el);
      _this.freezeHeight();
      _this.$container.removeClass('is-sticky-bottom');
      _this.$el.removeClass('is-sticky-bottom').addClass('is-sticky');
    } else if (isLower) {
      _this.$container.addClass('is-sticky-bottom');

      _this.$el.removeClass('is-sticky').addClass('is-sticky-bottom').css({ top: _this.finalPositionTop });
    } else {
      (0, _utils.clearStyles)(_this.$el);
      _this.freezeHeight();
      _this.$container.removeClass('is-sticky-bottom');
      _this.$el.removeClass('is-sticky is-sticky-bottom');
    }
  };

  this.calculateMetrics = function () {
    if (!_this.checkInited()) return;
    _this.calculateLimits();
    _this.freezeHeight();
  };

  this.watchWidth = function () {
    var width = _this.$window.width();
    if (width <= _this.breakpoint) _this.destroy();else _this.init();
  };

  this.checkInited = function () {
    return !!_this.$el && !!_this.$container && !!_this.$container.length;
  };

  this.update = function () {
    _this.calculateMetrics();
    _this.$window.trigger('resize');
  };

  this.init = function () {
    _this.$window.on('scroll', _this.handleScroll);
    _this.$window.on('resize', _this.calculateMetrics);
  };

  this.destroy = function () {
    _this.initialisation = false;
    (0, _utils.clearStyles)(_this.$el);
    _this.$container.removeClass('is-sticky-bottom');
    _this.$el.removeClass('is-sticky is-sticky-bottom');

    _this.$window.off('scroll', _this.handleScroll);
    _this.$window.off('resize', _this.calculateMetrics);
  };

  var element = config.element,
      container = config.container,
      breakpoint = config.breakpoint;

  if (!element || !container) return;

  this.$el = $(element);
  this.$container = $(container);
  this.$window = $(window);

  this.breakpoint = breakpoint;

  this.topLimit = 0;
  this.bottomLimit = 0;
  this.finalPositionTop = 0;
  this.elHeight = this.$el.outerHeight();
  this.initialElHeight = this.$el.outerHeight();

  this.calculateMetrics();

  this.init();
  this.watchWidth();
  this.$window.on('load', this.calculateMetrics);
  this.$window.on('resize', this.watchWidth);
};

exports.default = StickyFill;

},{"./utils":217,"babel-runtime/helpers/classCallCheck":6}],216:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchEqualHeights = exports.makeEqualHeight = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Forces elements heights to be equal
 * @param {String} className 
 * @param {Number} itemsInARow 
 * @return
 */
var makeEqualHeight = exports.makeEqualHeight = function makeEqualHeight(className, itemsInARow) {

  (0, _utils.clearStyles)(className);
  var $items = $(className);
  if (!itemsInARow) {

    var heights = $items.map(function () {
      return $(this).height();
    }).get();

    var maxHeight = Math.max.apply(Math, (0, _toConsumableArray3.default)(heights));
    $items.height(maxHeight);
    return;
  }

  var maxInRow = 0,
      rowIndex = 0,
      last = $items.length - 1;

  function setHeight(rowIndex, height) {
    $(className + '[data-row="' + rowIndex + '"]').height(height);
  }

  function changeHeight(index, element) {
    var $el = $(element);

    if (index % itemsInARow === 0) {
      setHeight(rowIndex, maxInRow);
      maxInRow = 0;
      rowIndex++;
    }

    $el.attr('data-row', rowIndex);

    maxInRow = Math.max(maxInRow, $el.height());

    if (index === last) {
      setHeight(rowIndex, maxInRow);
    }
  }

  $items.each(changeHeight);
};

/**
 * Listens to window resize and remakes equals heights on specified elements 
 * depending on window width and given breakpoints
 * 
 * if breakpoint === 0, we dont need to watch for resize
 * wider and narrower are numbers:
 * - 0< if shouldnt make equal height
 * - 0  if only 1 row
 * - >0 count of items in row
 * 
 * @param {String} selector 
 * @param {Object} options 
 * @return
 */
// Works with elements heights

var watchEqualHeights = exports.watchEqualHeights = function watchEqualHeights(selector) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var $window = $(window);
  var _options$breakpoint = options.breakpoint,
      breakpoint = _options$breakpoint === undefined ? 0 : _options$breakpoint,
      narrower = options.narrower,
      wider = options.wider;

  if (!$(selector).length) return false;
  if (!breakpoint) {
    makeEqualHeight(selector);

    $window.resize(function () {
      return makeEqualHeight(selector);
    });
    return;
  }

  function applyHandlers() {
    var width = $window.width();
    if (width <= breakpoint && narrower >= 0) makeEqualHeight(selector, narrower);else if (width > breakpoint && wider >= 0) makeEqualHeight(selector, wider);else (0, _utils.clearStyles)(selector);
  }

  applyHandlers();
  $window.resize(function () {
    return applyHandlers();
  });
};

},{"./utils":217,"babel-runtime/helpers/toConsumableArray":10}],217:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Common utilities

/**
 * Checks if element exists on page
 * @param {String} selector 
 * @return {Bool}
 */
var elementExists = exports.elementExists = function elementExists(selector) {
  return !!$(selector).length;
};

/**
 * Clear all styles of given DOM node
 * @param {String} selector 
 * @return
 */
var clearStyles = exports.clearStyles = function clearStyles(selector) {
  return $(selector).attr('style', '');
};

/**
 * Toggles class of element's parent on click
 * @param {String} selector 
 * @param {String} parentSelector 
 * @param {String} className 
 * @return
 */
var toggleParentClassOnClick = exports.toggleParentClassOnClick = function toggleParentClassOnClick(selector, parentSelector, className) {
  return $(selector).on('click', function () {

    $(this).closest(parentSelector).toggleClass(className);
  });
};

/**
 * clears location hash and prevents page scrolling
 * @return
 */
var clearHash = exports.clearHash = function clearHash() {
  var $window = $(window);
  var sct = $window.scrollTop();
  location.hash = '';
  $window.scrollTop(sct);
};

/**
 * scrolls window to given element
 * @param {String} element selector
 * @return
 */
var scrollToTheElement = exports.scrollToTheElement = function scrollToTheElement(element) {
  var $window = $(window);
  var elementOffset = $(element).offset().top;
  $window.scrollTop(elementOffset);
};

/**
 * removes filtering in expanded features
 * @return
 */
var clearFilters = exports.clearFilters = function clearFilters() {
  $('.js-sort-item').removeClass('is-hidden');
  $('.js-sort-items-btn').removeClass('active');
};

/**
 * scrolls smoothly to the element
 * @param {String} selector 
 */
var smoothScroll = exports.smoothScroll = function smoothScroll(selector) {
  $('html, body').animate({
    scrollTop: $(selector).offset().top
  });
};

},{}]},{},[210]);
