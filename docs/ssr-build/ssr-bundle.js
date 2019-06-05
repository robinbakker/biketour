module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "08CI":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"listitem":"listitem__An2Sj","question":"question__2Ru_V","listitem--bonus":"listitem--bonus__1QBfo","answer":"answer__3Vgqi","answerphoto":"answerphoto__rOwj9","showrealanswers":"showrealanswers__2J1JN","realanswer":"realanswer__14Rvg"};

/***/ }),

/***/ "CjKo":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"error":"error__1ISu_"};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ./routes/bike-tour/style.css
var bike_tour_style = __webpack_require__("pczT");
var bike_tour_style_default = /*#__PURE__*/__webpack_require__.n(bike_tour_style);

// CONCATENATED MODULE: ./utils/geolocation.js
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
// CONCATENATED MODULE: ./utils/idb-keyval.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
    function Store() {
        var dbName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'keyval-store';
        var storeName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'keyval';

        _classCallCheck(this, Store);

        this.storeName = storeName;
        this._dbp = new Promise(function (resolve, reject) {
            var openreq = indexedDB.open(dbName, 1);
            openreq.onerror = function () {
                return reject(openreq.error);
            };
            openreq.onsuccess = function () {
                return resolve(openreq.result);
            };
            // First time setup: create an empty object store
            openreq.onupgradeneeded = function () {
                openreq.result.createObjectStore(storeName);
            };
        });
    }

    Store.prototype._withIDBStore = function _withIDBStore(type, callback) {
        var _this = this;

        return this._dbp.then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction(_this.storeName, type);
                transaction.oncomplete = function () {
                    return resolve();
                };
                transaction.onabort = transaction.onerror = function () {
                    return reject(transaction.error);
                };
                callback(transaction.objectStore(_this.storeName));
            });
        });
    };

    return Store;
}();

var store = void 0;
function getDefaultStore() {
    if (!store) store = new Store();
    return store;
}
function get(key) {
    var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getDefaultStore();

    var req = void 0;
    return store._withIDBStore('readonly', function (store) {
        req = store.get(key);
    }).then(function () {
        return req.result;
    });
}
function set(key, value) {
    var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getDefaultStore();

    return store._withIDBStore('readwrite', function (store) {
        store.put(value, key);
    });
}
function del(key) {
    var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getDefaultStore();

    return store._withIDBStore('readwrite', function (store) {
        store.delete(key);
    });
}
function clear() {
    var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDefaultStore();

    return store._withIDBStore('readwrite', function (store) {
        store.clear();
    });
}
function keys() {
    var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDefaultStore();

    var keys = [];
    return store._withIDBStore('readonly', function (store) {
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // And openKeyCursor isn't supported by Safari.
        (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {
            if (!this.result) return;
            keys.push(this.result.key);
            this.result.continue();
        };
    }).then(function () {
        return keys;
    });
}


// CONCATENATED MODULE: ./routes/bike-tour/index.js


function bike_tour__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var bike_tour__ref = Object(preact_min["h"])(
	'p',
	null,
	'Fietsknooppunt 20 volgen.',
	Object(preact_min["h"])('br', null),
	Object(preact_min["h"])(
		'strong',
		null,
		'Let op:'
	),
	' gevaarlijke oversteek.'
);

var _ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Bij knooppunt 20: volg de route naar knooppunt 46.'
);

var _ref3 = Object(preact_min["h"])(
	'p',
	null,
	'Je nadert nu een hoge mast.'
);

var _ref4 = Object(preact_min["h"])(
	'p',
	null,
	'Blijf knooppunt 46 volgen'
);

var _ref5 = Object(preact_min["h"])(
	'p',
	null,
	'Je komt nu langs strandslag 21. Ga even het strand op!'
);

var _ref6 = Object(preact_min["h"])(
	'p',
	null,
	'Vervolg daarna je weg.',
	Object(preact_min["h"])('br', null),
	'Je passeert nu strandslag 22. Deze laat je rechts liggen.'
);

var _ref7 = Object(preact_min["h"])(
	'p',
	null,
	'Je gaat nu over een wildrooster en komt in een begrazingsgebied. De kans bestaat nu dat je Schotse Hooglanders tegenkomt. Nee, dat zijn geen mannen in kilt.'
);

var _ref8 = Object(preact_min["h"])(
	'p',
	null,
	'Ga rechtsaf richting knooppunt 08.',
	Object(preact_min["h"])('br', null),
	'Je rijdt nu door een gebied waar jaren terug drie grote branden veel natuur heeft verwoest. Kale boomstammen herinneren hier nog aan.'
);

var _ref9 = Object(preact_min["h"])(
	'p',
	null,
	'Je gaat nu weer over een wildrooster. Je bent weer veilig.',
	Object(preact_min["h"])('br', null),
	'Meteen rechts passeer je \u201CDe Kerf\u201D. Stop hier en fiets een stukje het pad af. Je komt nu bij een uitzichtpunt.'
);

var _ref10 = Object(preact_min["h"])(
	'p',
	null,
	'Ga terug naar het fietspad en vervolg je weg.'
);

var _ref11 = Object(preact_min["h"])(
	'p',
	null,
	'Bij T-splitsing linksaf.'
);

var _ref12 = Object(preact_min["h"])(
	'p',
	null,
	'Stop bij ANWB-paddenstoel 20641/001.'
);

var _ref13 = Object(preact_min["h"])(
	'p',
	null,
	'Je vervolgt de weg richting Bergen (Blijdesteinweg).'
);

var _ref14 = Object(preact_min["h"])(
	'p',
	null,
	'Onderweg aan de linkerzijde passeer je een bankje.'
);

var _ref15 = Object(preact_min["h"])(
	'p',
	null,
	'Verderop linksaf knooppunt 48 blijven volgen.'
);

var _ref16 = Object(preact_min["h"])(
	'p',
	null,
	'Je nadert nu Bergen. Bij bergen hoort wintersport, maar Bergen is ook een kunstenaarsdorp. Aan de linkerzijde kom je straks bij een kunstskibaan.'
);

var _ref17 = Object(preact_min["h"])(
	'strong',
	null,
	'Omkeren'
);

var _ref18 = Object(preact_min["h"])('br', null);

var _ref19 = Object(preact_min["h"])(
	'p',
	null,
	'1e Weg rechtsaf richting Schoorl aan Zee (Lovinkslaan). Dus ',
	Object(preact_min["h"])(
		'strong',
		null,
		'niet'
	),
	' knooppunt 47 volgen. Je komt nu langs twee boshuisjes.'
);

var _ref20 = Object(preact_min["h"])(
	'p',
	null,
	'Bij ANWB-paddenstoel 22915/001 rechtsaf richting Schoorl aan Zee.'
);

var _ref21 = Object(preact_min["h"])(
	'p',
	null,
	'Je volgt nu weer knooppunt 47.'
);

var _ref22 = Object(preact_min["h"])(
	'p',
	null,
	'Rechtsaf knooppunt 47 richting Schoorl. Je komt nu weer langs een boshuisje.'
);

var _ref23 = Object(preact_min["h"])(
	'p',
	null,
	'Aan het eind van de weg ligt links \u201CDe Berenkuil\u201D.'
);

var _ref24 = Object(preact_min["h"])(
	'p',
	null,
	'Ga nu rechtsaf naar knooppunt 45 richting Schoorl, \u201CBuitencentrum Schoorlse Duinen\u201D.'
);

var _ref25 = Object(preact_min["h"])(
	'p',
	null,
	'Ga bij knooppunt 45 linksaf richting knooppunt 21.'
);

var _ref26 = Object(preact_min["h"])(
	'p',
	null,
	'Na 150 meter aan de linkerzijde bevindt zich \u201CBuitencentrum  Schoorlse Duinen\u201D. Hier kan je als je tijd hebt binnen even een kijkje nemen. Je kunt hier ook naar het toilet.'
);

var _ref27 = Object(preact_min["h"])(
	'p',
	null,
	'Na het bezoekerscentrum de weg vervolgen richting knooppunt 21.'
);

var _ref28 = Object(preact_min["h"])(
	'p',
	null,
	'Na enige tijd kom je in Groet langs een kerkje.'
);

var _ref29 = Object(preact_min["h"])(
	'p',
	null,
	'Vervolg de weg.'
);

var _ref30 = Object(preact_min["h"])(
	'p',
	null,
	'Aan het einde rechtsaf richting knooppunt 73.'
);

var _ref31 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'Let op:'
	),
	' gevaarlijke oversteek!'
);

var _ref32 = Object(preact_min["h"])(
	'p',
	null,
	'Linksaf richting Camperduin (dus niet meer het knooppunt 73 volgen).'
);

var _ref33 = Object(preact_min["h"])(
	'p',
	null,
	'Rechtsaf fietspad naar Camperduin volgen. Recht voor je zie je een stolpboerderij.'
);

var _ref34 = Object(preact_min["h"])(
	'p',
	null,
	'Vervolg het fietspad naar Camperduin. Ga rechtdoor over de rotonde.'
);

var _ref35 = Object(preact_min["h"])(
	'p',
	null,
	'Je komt weer aan in Camperduin.'
);

var _ref36 = Object(preact_min["h"])(
	'div',
	{ 'class': 'align-center' },
	Object(preact_min["h"])(
		preact_router_es["Link"],
		{ href: '/vragenlijst', 'class': 'btn btn--secondary' },
		'Vragenoverzicht'
	)
);

var _ref37 = Object(preact_min["h"])(
	'p',
	null,
	'Deze puzzeltocht is met zorg samengesteld. Over de uitslag van deze puzzeltocht kan niet worden gediscussieerd. \uD83D\uDE04'
);

var bike_tour_BikeTour = function (_Component) {
	_inherits(BikeTour, _Component);

	function BikeTour() {
		var _temp, _this, _ret;

		bike_tour__classCallCheck(this, BikeTour);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.scrollTimer = null, _this.state = {
			currentLocationIndex: 0,
			locationError: '',
			answers: {},
			locations: [{
				id: 'loc01',
				lat: 52.725749,
				lon: 4.641993,
				isChecked: false
			}, {
				id: 'loc02',
				lat: 52.712090,
				lon: 4.641132,
				isChecked: false
			}, {
				id: 'loc03',
				lat: 52.701075,
				lon: 4.637669,
				isChecked: false
			}, {
				id: 'loc04',
				lat: 52.697475,
				lon: 4.638750,
				isChecked: false
			}, {
				id: 'loc05',
				lat: 52.69953111,
				lon: 4.642188,
				isChecked: false
			}, {
				id: 'loc06', //Kerf
				lat: 52.686718,
				lon: 4.644994,
				isChecked: false
			}, {
				id: 'loc07', // T
				lat: 52.681578,
				lon: 4.646415,
				isChecked: false
			}, {
				id: 'loc08', // ANWB
				lat: 52.682233,
				lon: 4.665733,
				isChecked: false
			}, {
				id: 'loc09', // Bankje
				lat: 52.682317,
				lon: 4.674060,
				isChecked: false
			}, {
				id: 'loc10', // Il primo
				lat: 52.679661,
				lon: 4.692098,
				isChecked: false
			}, {
				id: 'loc11', // Lovinkslaan
				lat: 52.682560,
				lon: 4.678517,
				isChecked: false
			}, {
				id: 'loc12', // ANWB
				lat: 52.682192,
				lon: 4.672303,
				isChecked: false
			}, {
				id: 'loc13', // Berenkuil
				lat: 52.697479,
				lon: 4.669915,
				isChecked: false
			}, {
				id: 'loc14', // Berenkuil2
				lat: 52.698195,
				lon: 4.670946,
				isChecked: false
			}, {
				id: 'loc15', // Buitencentrum
				lat: 52.705245,
				lon: 4.688404,
				isChecked: false
			}, {
				id: 'loc16', // Kerkje
				lat: 52.720401,
				lon: 4.668490,
				isChecked: false
			}, {
				id: 'loc17', // Fietspad
				lat: 52.723000,
				lon: 4.659935,
				isChecked: false
			}, {
				id: 'loc18', // Finish
				lat: 52.726292,
				lon: 4.643022,
				isChecked: false
			}]
		}, _this.handleScroll = function (ev) {
			if (_this.scrollTimer !== null) {
				clearTimeout(_this.scrollTimer);
			}
			var self = _this;
			_this.scrollTimer = setTimeout(function () {
				//determine locationIndex
				var locIndex = Math.round(ev.target.scrollLeft / ev.target.offsetWidth);
				self.setState({ currentLocationIndex: locIndex });
			}, 150);
		}, _this.getMyLocation = function () {
			if (window && navigator && navigator.geolocation) {
				var self = _this;
				navigator.geolocation.getCurrentPosition(function (pos) {
					// Geo success! Try to find the matching location card
					if (!pos || !pos.coords) {
						self.locationNotFoundError();
						return;
					}
					var foundLocation = null;
					self.state.locations.forEach(function (loc) {
						var curDist = getDistanceFromLatLonInKm(loc.lat, loc.lon, pos.coords.latitude, pos.coords.longitude);
						if (curDist <= .15) {
							// within 150 metres
							if (foundLocation == null || foundLocation.dist > curDist) {
								foundLocation = {
									dist: curDist,
									loc: loc
								};
							}
						}
					});
					if (foundLocation != null) {
						window.location.href = '#' + foundLocation.loc.id;
					} else {
						self.locationNotFoundError();
					}
				}, self.locationNotFoundError, {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				});
			}
		}, _this.locationNotFoundError = function () {
			var self = _this;
			_this.setState({ locationError: 'Sorry, geen locatie gevonden... :(' });
			setTimeout(function () {
				self.setState({ locationError: '' });
			}, 5000);
		}, _this.goNext = function () {
			if (_this.state.currentLocationIndex + 1 < _this.state.locations.length) {
				var newIndex = _this.state.currentLocationIndex + 1;
				_this.setState({ currentLocationIndex: newIndex });
				if (window) {
					window.location.href = '#' + _this.state.locations[newIndex].id;
				}
			}
		}, _this.goPrev = function () {
			if (_this.state.currentLocationIndex > 0) {
				var newIndex = _this.state.currentLocationIndex - 1;
				_this.setState({ currentLocationIndex: newIndex });
				if (window) {
					window.location.href = '#' + _this.state.locations[newIndex].id;
				}
			}
		}, _this.focusField = function () {
			document.getElementsByClassName('js-footer-nav')[0].classList.add('is-hidden');
		}, _this.saveData = function (AEvent) {
			var thisElm = AEvent.target;
			var tempAnswers = _this.jsonCopy(_this.state.answers);
			var answer = tempAnswers[thisElm.id];
			if (thisElm) {
				if (!answer && thisElm.value || answer && answer != thisElm.value) {
					tempAnswers[thisElm.id] = thisElm.value;
					_this.setState({ answers: tempAnswers });
					set('answers', tempAnswers);
				}
			}
			document.getElementsByClassName('js-footer-nav')[0].classList.remove('is-hidden');
		}, _this.saveImage = function (AItemID, AUrl) {
			var tempAnswers = _this.jsonCopy(_this.state.answers);
			var answer = tempAnswers[AItemID];
			if (!answer && AUrl || answer && answer != AUrl) {
				tempAnswers[AItemID] = AUrl;
				_this.setState({ answers: tempAnswers });
				set('answers', tempAnswers);
				_this.saveNewPhoto(AItemID, AUrl);
			}
		}, _this.saveNewPhoto = function (AItemID, AUrl) {
			var photoData = {
				itemid: AItemID,
				url: AUrl
			};
			var newPostKey = firebase.database().ref().child('cGhvdG9z').push().key;

			var updates = {};
			updates['/cGhvdG9z/' + newPostKey] = photoData;

			return firebase.database().ref().update(updates);
		}, _this.jsonCopy = function (ASrc) {
			return ASrc ? JSON.parse(JSON.stringify(ASrc)) : {};
		}, _this.getQuestion = function (ANumber, AQuestion, ACssClass, ANrKeyboard, AIsTel) {
			var answerValue = _this.state.answers ? _this.state.answers['txtQ' + ANumber] : null;
			answerValue = answerValue ? answerValue : '';
			return Object(preact_min["h"])(
				'fieldset',
				{ 'class': bike_tour_style_default.a.fieldset + (ACssClass ? ' ' + bike_tour_style_default.a[ACssClass] : '') },
				Object(preact_min["h"])(
					'label',
					{ 'for': 'txtQ' + ANumber, 'class': bike_tour_style_default.a.question },
					ANumber,
					'. ',
					AQuestion
				),
				Object(preact_min["h"])('input', { id: 'txtQ' + ANumber, type: AIsTel ? 'tel' : 'text', value: answerValue, inputmode: ANrKeyboard ? 'numeric' : AIsTel ? 'tel' : 'text', pattern: ANrKeyboard ? '[0-9]*' : '', onFocus: _this.focusField.bind(_this), onBlur: _this.saveData.bind(_this), autocomplete: 'off', 'class': bike_tour_style_default.a.text })
			);
		}, _this.getBonusQuestion = function (ANumber, AQuestion, ACssClass, AHideField, ANrKeyboard, AUploadButton) {
			var answerValue = _this.state.answers ? _this.state.answers['txtQB' + ANumber] : null;
			var answerPhoto = _this.state.answers ? _this.state.answers['uploadedImage' + ANumber] : null;
			answerValue = answerValue ? answerValue : '';
			return Object(preact_min["h"])(
				'fieldset',
				{ 'class': bike_tour_style_default.a.fieldset + ' ' + bike_tour_style_default.a.fieldsetbonus + (ACssClass ? ' ' + bike_tour_style_default.a[ACssClass] : '') },
				Object(preact_min["h"])(
					'label',
					{ 'for': 'txtQB' + ANumber, 'class': bike_tour_style_default.a.question },
					AQuestion
				),
				AHideField ? null : Object(preact_min["h"])('input', { id: 'txtQB' + ANumber, type: 'text', value: answerValue, inputmode: ANrKeyboard ? 'numeric' : 'text', pattern: ANrKeyboard ? '[0-9]*' : '', onFocus: _this.focusField.bind(_this), onBlur: _this.saveData.bind(_this), autocomplete: 'off', 'class': bike_tour_style_default.a.text }),
				AUploadButton ? Object(preact_min["h"])(
					'div',
					{ 'class': 'uploadbutton' },
					Object(preact_min["h"])('input', { type: 'hidden', role: 'uploadcare-uploader', id: 'uploadedImage' + ANumber, 'data-public-key': 'eb1e8c95296b78b5c18d', 'data-locale': 'nl', 'data-preview-step': 'false', 'data-tabs': 'camera file url', 'data-images-only': true })
				) : null,
				answerPhoto ? Object(preact_min["h"])('img', { src: answerPhoto, 'class': bike_tour_style_default.a.answerphoto, alt: 'Foto' }) : null
			);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	BikeTour.prototype.componentDidMount = function componentDidMount() {
		if (document) {
			document.body.className = 'bike-tour';
		}

		var self = this;
		get('answers').then(function (val) {
			return self.setState({
				answers: val
			});
		});

		if (window) {
			var _self = this;
			var scrollContainer = document.getElementsByTagName('article')[0];
			if (scrollContainer) {
				scrollContainer.addEventListener('scroll', _self.handleScroll);
				if (window.location.hash) {
					var locID = window.location.hash.substr(1);
					var locIndex = 0;
					document.querySelectorAll('article > div').forEach(function (item, i) {
						if (item.id == locID) {
							locIndex = i;
							_self.setState({ currentLocationIndex: locIndex });
						}
					});
					scrollContainer.scrollLeft = locIndex * scrollContainer.offsetWidth + 10;
				}
			}
		}
	};

	BikeTour.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': bike_tour_style_default.a.biketour },
			this.state.locationError ? Object(preact_min["h"])(
				'div',
				{ id: bike_tour_style_default.a.locationerrormessage },
				Object(preact_min["h"])(
					'div',
					null,
					this.state.locationError
				)
			) : null,
			Object(preact_min["h"])(
				'div',
				{ id: bike_tour_style_default.a.footernav, 'class': 'js-footer-nav' },
				Object(preact_min["h"])(
					'button',
					{ id: bike_tour_style_default.a.buttonprev, 'class': bike_tour_style_default.a['loc' + this.state.currentLocationIndex], onClick: this.goPrev },
					'Vorige'
				),
				Object(preact_min["h"])('button', { id: bike_tour_style_default.a.buttonloc, onClick: this.getMyLocation, title: 'Mijn locatie' }),
				Object(preact_min["h"])(
					'button',
					{ id: bike_tour_style_default.a.buttonnext, 'class': bike_tour_style_default.a['loc' + this.state.currentLocationIndex], onClick: this.goNext },
					'Volgende'
				)
			),
			Object(preact_min["h"])(
				'h2',
				{ 'class': bike_tour_style_default.a.pagecaption + ' page-title icon icon--bike-tour' },
				'Fietspuzzeltocht'
			),
			Object(preact_min["h"])(
				'article',
				{ 'class': bike_tour_style_default.a.touritemwrapper + ' page-content' },
				Object(preact_min["h"])(
					'div',
					{ id: 'loc01', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'0 KM'
						),
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-20.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 20' }),
						bike_tour__ref,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear }),
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-46.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 46' }),
						_ref2,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear }),
						this.getQuestion(1, 'Hoe heet deze weg?')
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc02', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'2,6 KM'
						),
						_ref3,
						this.getQuestion(2, 'Welk telefoonnummer moet je bellen bij een calamiteit?', '', false, true),
						this.getBonusQuestion(1, 'Wat is de zonecode van de grote parkeerplaats?', 'padding-bottom', false, true),
						this.getBonusQuestion(2, 'Benaderingsvraag: hoeveel auto’s kunnen hier (normaal) parkeren?', 'margin-bottom', false, true),
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-46.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 46' }),
						_ref4,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear })
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc03', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'4,0 KM'
						),
						_ref5,
						this.getQuestion(3, 'Wat is het nummer van de aanwezige strandpaal?', 'padding-bottom', true),
						this.getBonusQuestion(3, 'Waar staat paal 1 overigens?', 'padding-bottom'),
						this.getBonusQuestion(4, 'Waar staan de letters HHNK voor?'),
						_ref6
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc04', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'4,6 KM'
						),
						_ref7,
						this.getQuestion(4, 'Hoeveel spijlen heeft dit wildrooster?', '', true)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc05', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'5,0 KM'
						),
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-08.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 08' }),
						_ref8,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear })
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc06', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'6,7 KM'
						),
						_ref9,
						this.getQuestion(5, 'Hoeveel treden is het naar boven?', 'padding-bottom', true),
						this.getBonusQuestion(5, 'Boven gekomen tref je een plateau met een verrekijker. Wat is hier welkom?', 'padding-bottom'),
						this.getBonusQuestion(6, 'Maak een foto van tenminste 3 personen uit je eigen groep. Elk persoon meer uit je eigen groep is een bonuspunt extra.', '', true, false, true),
						_ref10
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc07', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'7,3 KM'
						),
						_ref11
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc08', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'8,7 KM'
						),
						_ref12,
						this.getQuestion(6, 'Als je van hieruit naar elke plaats heen en weer zou moeten rijden, hoeveel bedraagt dan het aantal afgelegde kilometers?'),
						_ref13
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc09', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'10,1 KM'
						),
						_ref14,
						this.getQuestion(7, 'Welk nummer heeft dit bankje en door wie is dit bankje aangeboden?', 'padding-bottom'),
						this.getBonusQuestion(7, 'Maak een foto van jullie eigen groep, gezeten op dit bankje.', 'margin-bottom', true, false, true),
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-48.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 48' }),
						_ref15,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear })
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc10', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'11,1 KM'
						),
						_ref16,
						this.getQuestion(8, 'Hoe heet deze wintersportlocatie?', 'padding-bottom'),
						this.getBonusQuestion(8, 'Er wordt hier ook getraind door een schaatstrainingsgroep. Wat is hiervan de naam?', 'margin-bottom'),
						Object(preact_min["h"])(
							'p',
							{ 'class': bike_tour_style_default.a.returnarrow },
							_ref17,
							_ref18,
							'Om veiligheidsredenen gaan we dezelfde weg terug richting Schoorl aan Zee.'
						)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc11', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'12,6 KM'
						),
						_ref19,
						this.getQuestion(9, 'Wat zijn de namen van deze twee huisjes respectievelijk?')
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc12', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'13,7 KM'
						),
						_ref20,
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-47.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 47' }),
						_ref21,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear })
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc13', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'14,2 KM'
						),
						_ref22,
						this.getQuestion(10, 'Wat is de naam van dit huisje?'),
						_ref23
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc14', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'16,0 KM'
						),
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-45.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 45' }),
						_ref24,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear }),
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-21.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 21' }),
						_ref25,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear })
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc15', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'18,0 KM'
						),
						_ref26,
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-21.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 21' }),
						_ref27,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear })
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc16', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'20,2 KM'
						),
						_ref28,
						this.getQuestion(11, 'Hoe heet dit kerkje?', 'padding-bottom'),
						this.getBonusQuestion(9, 'Uit welk jaar dateert het?', 'padding-bottom'),
						this.getBonusQuestion(10, 'Welk beeld staat er op het grasveld voor deze kerk?'),
						_ref29,
						Object(preact_min["h"])('img', { src: './assets/fietsbordje-73.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 73' }),
						_ref30,
						Object(preact_min["h"])(
							'div',
							{ 'class': bike_tour_style_default.a.signcross },
							Object(preact_min["h"])('img', { src: './assets/fietsbordje-73.svg', 'class': bike_tour_style_default.a.sign, alt: 'Knooppunt 73' })
						),
						_ref31,
						_ref32,
						Object(preact_min["h"])('div', { 'class': bike_tour_style_default.a.clear })
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc17', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'21,4 KM'
						),
						_ref33,
						this.getQuestion(12, 'Wat is de kleur van het dak?', '', true),
						_ref34
					)
				),
				Object(preact_min["h"])(
					'div',
					{ id: 'loc18', 'class': bike_tour_style_default.a.navitem },
					Object(preact_min["h"])(
						'div',
						{ 'class': bike_tour_style_default.a.card },
						Object(preact_min["h"])(
							'h3',
							{ 'class': bike_tour_style_default.a.kmtitle },
							Object(preact_min["h"])('span', { 'class': bike_tour_style_default.a.pointer }),
							'23 KM'
						),
						_ref35,
						Object(preact_min["h"])('hr', { 'class': bike_tour_style_default.a.line + ' ' + bike_tour_style_default.a.finishline }),
						this.state.answers ? _ref36 : null,
						_ref37
					)
				)
			)
		);
	};

	return BikeTour;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/bike-tour-results/style.css
var bike_tour_results_style = __webpack_require__("08CI");
var bike_tour_results_style_default = /*#__PURE__*/__webpack_require__.n(bike_tour_results_style);

// CONCATENATED MODULE: ./routes/bike-tour-results/index.js


function bike_tour_results__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function bike_tour_results__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function bike_tour_results__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var bike_tour_results__ref = Object(preact_min["h"])(
	'h2',
	{ 'class': 'page-title' },
	'Vragenlijst'
);

var bike_tour_results_BikeTourResults = function (_Component) {
	bike_tour_results__inherits(BikeTourResults, _Component);

	function BikeTourResults() {
		var _temp, _this, _ret;

		bike_tour_results__classCallCheck(this, BikeTourResults);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = bike_tour_results__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getQuestion = function (ANumber, AQuestion, ARealAnswer) {
			var answerValue = _this.state.answers ? _this.state.answers['txtQ' + ANumber] : null;
			answerValue = answerValue ? answerValue : '';
			return Object(preact_min["h"])(
				'li',
				{ 'class': bike_tour_results_style_default.a.listitem, value: ANumber },
				Object(preact_min["h"])(
					'span',
					{ 'class': bike_tour_results_style_default.a.question },
					AQuestion
				),
				Object(preact_min["h"])(
					'span',
					{ 'class': bike_tour_results_style_default.a.answer },
					answerValue ? answerValue : '[geen antwoord ingevuld]'
				),
				Object(preact_min["h"])(
					'span',
					{ 'class': bike_tour_results_style_default.a.realanswer },
					ARealAnswer
				)
			);
		}, _this.getBonusQuestion = function (ANumber, AQuestion, ARealAnswer) {
			var answerValue = _this.state.answers ? _this.state.answers['txtQB' + ANumber] : null;
			var answerPhoto = _this.state.answers ? _this.state.answers['uploadedImage' + ANumber] : null;
			answerValue = answerValue ? answerValue : '';
			return Object(preact_min["h"])(
				'li',
				{ 'class': bike_tour_results_style_default.a.listitem + ' ' + bike_tour_results_style_default.a['listitem--bonus'], value: ANumber },
				Object(preact_min["h"])(
					'span',
					{ 'class': bike_tour_results_style_default.a.question },
					AQuestion
				),
				Object(preact_min["h"])(
					'span',
					{ 'class': bike_tour_results_style_default.a.answer },
					answerValue ? answerValue : answerPhoto ? '' : '[geen antwoord ingevuld]'
				),
				answerPhoto ? Object(preact_min["h"])('img', { src: answerPhoto, 'class': bike_tour_results_style_default.a.answerphoto, alt: 'Foto' }) : null,
				Object(preact_min["h"])(
					'span',
					{ 'class': bike_tour_results_style_default.a.realanswer },
					ARealAnswer
				)
			);
		}, _temp), bike_tour_results__possibleConstructorReturn(_this, _ret);
	}

	BikeTourResults.prototype.componentDidMount = function componentDidMount() {
		if (document) {
			document.body.className = 'bike-tour-results';
		}

		var self = this;
		get('answers').then(function (val) {
			return self.setState({
				answers: val
			});
		});
	};

	BikeTourResults.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': bike_tour_results_style_default.a.biketourresults },
			Object(preact_min["h"])(
				'article',
				null,
				bike_tour_results__ref,
				Object(preact_min["h"])(
					'label',
					{ 'for': bike_tour_results_style_default.a.showrealanswers, 'class': 'btn btn--secondary' },
					'Bekijk oplossingen'
				),
				Object(preact_min["h"])('input', { id: bike_tour_results_style_default.a.showrealanswers, 'aria-hidden': 'true', type: 'checkbox' }),
				this.state.answers ? Object(preact_min["h"])(
					'ol',
					null,
					this.getQuestion(1, 'Hoe heet deze weg?', 'Harger Zeeweg'),
					this.getQuestion(2, 'Welk telefoonnummer moet je bellen bij een calamiteit?', '088-6620301'),
					this.getBonusQuestion(1, 'Wat is de zonecode van de grote parkeerplaats?', '50600'),
					this.getBonusQuestion(2, 'Benaderingsvraag: hoeveel auto’s kunnen hier (normaal) parkeren?', '1500 (zie ook het bord bij de rotonde)'),
					this.getQuestion(3, 'Wat is het nummer van de aanwezige strandpaal?', '20 750'),
					this.getBonusQuestion(3, 'Waar staat paal 1 overigens?', 'Huisduinen (Den Helder)'),
					this.getBonusQuestion(4, 'Waar staan de letters HHNK voor?', 'Hoogheemraadschap Hollands Noorderkwartier'),
					this.getQuestion(4, 'Hoeveel spijlen heeft dit wildrooster?', '18', true),
					this.getQuestion(5, 'Hoeveel treden is het naar boven?', '49'),
					this.getBonusQuestion(5, 'Boven gekomen tref je een plateau met een verrekijker. Wat is hier welkom?', 'Zeewater'),
					this.getBonusQuestion(6, 'Maak een foto van tenminste 3 personen uit je eigen groep. Elk persoon meer uit je eigen groep is een bonuspunt extra.', ''),
					this.getQuestion(6, 'Als je van hieruit naar elke plaats heen en weer zou moeten rijden, hoeveel bedraagt dan het aantal afgelegde kilometers?', '55,4 km'),
					this.getQuestion(7, 'Welk nummer heeft dit bankje en door wie is dit bankje aangeboden?', 'SC91 en Rotary Langedijk/Geestmerambacht'),
					this.getBonusQuestion(7, 'Maak een foto van jullie eigen groep, gezeten op dit bankje.', ''),
					this.getQuestion(8, 'Hoe heet deze wintersportlocatie?', 'Il Primo'),
					this.getBonusQuestion(8, 'Er wordt hier ook getraind door een schaatstrainingsgroep. Wat is hiervan de naam?', 'Chronos'),
					this.getQuestion(9, 'Wat zijn de namen van deze twee huisjes respectievelijk?', '\'t Boshuis, Sylvestris'),
					this.getQuestion(10, 'Wat is de naam van dit huisje?', 'De blauwe reiger'),
					this.getQuestion(11, 'Hoe heet dit kerkje?', 'Het witte kerkje'),
					this.getBonusQuestion(9, 'Uit welk jaar dateert het?', '1575'),
					this.getBonusQuestion(10, 'Welk beeld staat er op het grasveld voor deze kerk?', 'De wasvrouwen'),
					this.getQuestion(12, 'Wat is de kleur van het dak?', 'Oranje', true)
				) : null
			)
		);
	};

	return BikeTourResults;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/bike-tour-info/style.css
var bike_tour_info_style = __webpack_require__("tGjH");
var bike_tour_info_style_default = /*#__PURE__*/__webpack_require__.n(bike_tour_info_style);

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// CONCATENATED MODULE: ./routes/bike-tour-info/index.js


function bike_tour_info__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function bike_tour_info__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function bike_tour_info__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var bike_tour_info__ref = Object(preact_min["h"])('img', { src: './assets/biketour-header.jpg', loading: 'lazy', 'class': 'fullwidth', alt: 'Duinfoto' });

var bike_tour_info__ref2 = Object(preact_min["h"])(
	'h2',
	{ 'class': 'page-title' },
	'Fietspuzzeltocht info'
);

var bike_tour_info__ref3 = Object(preact_min["h"])(
	'p',
	null,
	'Dit is een fietspuzzeltocht door Camperduin/Groet/Schoorl.',
	Object(preact_min["h"])('br', null),
	'De tocht begint links van de keerlus voor de strandopgang van Camperduin, op het fietspad bij het bord \u201CWelkom in de Schoorlse Duinen\u201D (',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://www.google.com/maps/place/Heereweg,+1871+GL+Schoorl/@52.7256783,4.6407209,18z/data=!3m1!4b1!4m5!3m4!1s0x47cf5bbc1556638b:0x5d508fc020d173d4!8m2!3d52.7258434!4d4.6416425', target: '_blank', rel: 'noopener' },
		'zie hier'
	),
	').'
);

var bike_tour_info__ref4 = Object(preact_min["h"])(
	'p',
	null,
	'De fietstocht gaat voor het grootste deel over fietspaden door het natuurgebied \u201CDe Schoorlse Duinen\u201D en heeft een lengte van 23 km. Wegen met overig verkeer hebben wij zoveel als mogelijk gemeden. Wij verwachten dat eenieder zich aan de regels houdt, de natuur met respect behandelt en niet onnodig van fiets- en wandelpaden afwijkt. Let op met zand vol gewaaide fietspaden (de zgn. \u201Cwandelende duinen\u201D). Dat kan voor onaangename verrassingen zorgen. Ze worden met regelmaat schoongeveegd. Maar je zult het maar net zien als er pas een storm is geweest.'
);

var bike_tour_info__ref5 = Object(preact_min["h"])(
	'p',
	null,
	'De antwoorden op de vragen zijn te vinden op, langs of zeer nabij de route.',
	Object(preact_min["h"])('br', null),
	'Let dus goed op!'
);

var bike_tour_info__ref6 = Object(preact_min["h"])(
	'p',
	{ 'class': 'p-icon p-icon--star' },
	'Voor enkele vragen zijn bonuspunten te verdienen.'
);

var bike_tour_info__ref7 = Object(preact_min["h"])(
	'p',
	null,
	'De antwoorden die je invult worden alleen op je eigen apparaat opgeslagen en er worden verder geen gegevens gedeeld of cookies geplaatst. Aan het eind kan je zelf je antwoorden controleren/nakijken. \uD83D\uDE09'
);

var bike_tour_info__ref8 = Object(preact_min["h"])(
	'div',
	{ 'class': 'align-center' },
	Object(preact_min["h"])(
		match["Link"],
		{ href: '/gatochfietsen', 'class': 'btn btn--primary btn-margin icon icon--bike btn-icon' },
		'Start fietstocht'
	)
);

var bike_tour_info_BikeTourInfo = function (_Component) {
	bike_tour_info__inherits(BikeTourInfo, _Component);

	function BikeTourInfo() {
		bike_tour_info__classCallCheck(this, BikeTourInfo);

		return bike_tour_info__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	BikeTourInfo.prototype.componentDidMount = function componentDidMount() {
		if (document) {
			document.body.className = 'bike-tour-info';
		}
	};

	BikeTourInfo.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': bike_tour_info_style_default.a.biketour },
			bike_tour_info__ref,
			Object(preact_min["h"])(
				'article',
				{ 'class': bike_tour_info_style_default.a.article },
				bike_tour_info__ref2,
				Object(preact_min["h"])(
					'div',
					{ 'class': bike_tour_info_style_default.a.articlecontent },
					bike_tour_info__ref3,
					bike_tour_info__ref4,
					bike_tour_info__ref5,
					bike_tour_info__ref6,
					bike_tour_info__ref7
				),
				bike_tour_info__ref8
			)
		);
	};

	return BikeTourInfo;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/error/style.css
var error_style = __webpack_require__("CjKo");
var error_style_default = /*#__PURE__*/__webpack_require__.n(error_style);

// CONCATENATED MODULE: ./routes/error/index.js


function error__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function error__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function error__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var error__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Oeps'
);

var error__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Deze pagina is er stiekem toch niet...'
);

var error__ref3 = Object(preact_min["h"])(
	'a',
	{ href: '/' },
	'\xAB Weg hier'
);

var error_Error = function (_Component) {
	error__inherits(Error, _Component);

	function Error() {
		error__classCallCheck(this, Error);

		return error__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Error.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': error_style_default.a.error },
			error__ref,
			error__ref2,
			error__ref3
		);
	};

	return Error;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js


function header__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function header__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function header__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var header_Header = function (_Component) {
	header__inherits(Header, _Component);

	function Header() {
		header__classCallCheck(this, Header);

		return header__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Header.prototype.render = function render(_ref) {
		var ishome = _ref.ishome;

		return Object(preact_min["h"])(
			'header',
			{ 'class': header_style_default.a.header },
			ishome ? Object(preact_min["h"])(
				match["Link"],
				{ 'class': header_style_default.a.start + ' icon icon--bike', href: '/gatochfietsen', title: 'Start fietstocht' },
				'Go'
			) : Object(preact_min["h"])(
				match["Link"],
				{ 'class': header_style_default.a.info, href: '/', title: 'info' },
				'i'
			)
		);
	};

	return Header;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









//import { get, set, del } from '../utils/idb-keyval';

var app__ref = Object(preact_min["h"])(bike_tour_info_BikeTourInfo, { path: '/' });

var app__ref2 = Object(preact_min["h"])(bike_tour_BikeTour, { path: '/gatochfietsen' });

var app__ref3 = Object(preact_min["h"])(bike_tour_results_BikeTourResults, { path: '/vragenlijst' });

var app__ref4 = Object(preact_min["h"])(error_Error, { type: '404', 'default': true });

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			isHome: true
		}, _this.handleRoute = function (e) {
			return new Promise(function ($return, $error) {
				if (e.url === '/') {
					_this.setState({ isHome: true });
				} else {
					_this.setState({ isHome: false });
				}
				if (typeof window !== 'undefined' && typeof document !== 'undefined' && window) {
					window.scrollTo(0, 0);
				}
				return $return();
			});
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}

	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			Object(preact_min["h"])(header_Header, { ishome: this.state.isHome }),
			Object(preact_min["h"])(
				preact_router_es["Router"],
				{ onChange: this.handleRoute.bind(this) },
				app__ref,
				app__ref2,
				app__ref3,
				app__ref4
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    null != e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "pczT":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"mylocation":"mylocation__1GXSR","footernav":"footernav__1LF9q","locationerrormessage":"locationerrormessage__X_MqL","fadeOut":"fadeOut__B-6kE","pagecaption":"pagecaption__1b5R5","buttonprev":"buttonprev__2VgY7","buttonnext":"buttonnext__1Ivic","buttonloc":"buttonloc__198xw","loc0":"loc0__3N_f7","loc1":"loc1__m3OSH","loc2":"loc2__6BbBz","loc3":"loc3__2pYBv","loc4":"loc4__2-gEK","loc5":"loc5__1ftG1","loc6":"loc6__5GDFC","loc7":"loc7__5Iw4B","loc8":"loc8__1L87A","loc9":"loc9__Wr94f","loc10":"loc10__1VFYB","loc11":"loc11__v9XPP","loc12":"loc12__30KHp","loc13":"loc13__2X8EB","loc14":"loc14__1wOes","loc15":"loc15__1grcb","loc16":"loc16__1Azrw","loc17":"loc17__V5IM5","touritemwrapper":"touritemwrapper__1XwoF","navitem":"navitem__1kBDI","card":"card__2H5UQ","kmtitle":"kmtitle__3H9Nc","sign":"sign__na5Gl","fieldset":"fieldset__3376A","pointer":"pointer__2Bvik","signcross":"signcross__1UVD6","fieldsetbonus":"fieldsetbonus__10V8M","fieldsetnote":"fieldsetnote__1mCnQ","padding-bottom":"padding-bottom__3KoLY","margin-bottom":"margin-bottom__2d9go","text":"text__38VnB","question":"question__3fgKy","answerphoto":"answerphoto__2AL8K","returnarrow":"returnarrow__1h3J-","line":"line__1Sp2I","lunchline":"lunchline__1Ae7s","finishline":"finishline__3TqSo","clear":"clear__19pGk"};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "tGjH":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"article":"article__1h1Mc"};

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2MqSo","start":"start__1cBhn","info":"info__1X7yV"};

/***/ })

/******/ });