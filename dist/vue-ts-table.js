(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("vue-class-component"), require("vue-property-decorator"));
	else if(typeof define === 'function' && define.amd)
		define("vue-ts-table", ["vue", "vue-class-component", "vue-property-decorator"], factory);
	else if(typeof exports === 'object')
		exports["vue-ts-table"] = factory(require("vue"), require("vue-class-component"), require("vue-property-decorator"));
	else
		root["vue-ts-table"] = factory(root["vue"], root["vue-class-component"], root["vue-property-decorator"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColumnOptions = exports.VueTsTable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Table = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TsTablePlugin = function () {
    function TsTablePlugin() {
        _classCallCheck(this, TsTablePlugin);
    }

    _createClass(TsTablePlugin, null, [{
        key: 'install',
        value: function install(V) {
            V.component('vue-ts-table', _Table.VueTsTable);
        }
    }]);

    return TsTablePlugin;
}();

exports.default = TsTablePlugin;
exports.VueTsTable = _Table.VueTsTable;
exports.ColumnOptions = _Table.ColumnOptions;
/*
* The plugin is automatically installed when loaded in browser (not as module).
*/

if (typeof window !== 'undefined' && window['Vue']) {
    window['Vue'].use(TsTablePlugin);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VueTsTable = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _vueClassComponent = __webpack_require__(1);

var _vueClassComponent2 = _interopRequireDefault(_vueClassComponent);

var _vuePropertyDecorator = __webpack_require__(2);

var _pagination = __webpack_require__(5);

var _default = __webpack_require__(8);

var _default2 = _interopRequireDefault(_default);

var _style = __webpack_require__(9);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var dataTypes = {};
var coreDataTypes = __webpack_require__(12);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = coreDataTypes.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var compName = key.replace(/^\.\//, '').replace(/\.js/, '');
        dataTypes[compName] = coreDataTypes(key).default;
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var VueTsTable = function (_Vue) {
    _inherits(VueTsTable, _Vue);

    function VueTsTable() {
        _classCallCheck(this, VueTsTable);

        // ##### data #####
        var _this2 = _possibleConstructorReturn(this, (VueTsTable.__proto__ || Object.getPrototypeOf(VueTsTable)).apply(this, arguments));

        _this2.currentPage = 1;
        _this2.currentPerPage = 10;
        _this2.sortColumn = -1;
        _this2.sortType = 'asc';
        _this2.globalSearchTerm = '';
        _this2.columnFilters = {};
        _this2.filteredRows = [];
        _this2.timer = undefined;
        _this2.forceSearch = false;
        _this2.sortChanged = false;
        _this2.dataTypes = dataTypes || {};
        return _this2;
    }

    _createClass(VueTsTable, [{
        key: "created",
        value: function created() {
            if (this.customTypes) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Object.keys(this.customTypes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var t = _step2.value;

                        this.dataTypes[t] = this.customTypes[t];
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }
    }, {
        key: "pageChanged",
        value: function pageChanged(pagination) {
            this.currentPage = pagination.currentPage;
            this.$emit('pageChanged', { currentPage: this.currentPage, total: Math.floor(this.rows.length / this.currentPerPage) });
        }
    }, {
        key: "perPageChanged",
        value: function perPageChanged(pagination) {
            this.currentPerPage = pagination.currentPerPage;
        }
    }, {
        key: "sort",
        value: function sort(index) {
            if (!this.isSortableColumn(index)) {
                return;
            }
            if (this.sortColumn === index) {
                this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortType = 'asc';
                this.sortColumn = index;
            }
            this.sortChanged = true;
        }
    }, {
        key: "click",
        value: function click(row, index) {
            if (this.onClick) {
                this.onClick(row, index);
            }
        }
    }, {
        key: "searchTable",
        value: function searchTable() {
            if (this.searchTrigger === 'enter') {
                this.forceSearch = true;
                this.sortChanged = true;
            }
        }
        // field can be:
        // 1. function
        // 2. regular property - ex: 'prop'
        // 3. nested property path - ex: 'nested.prop'

    }, {
        key: "collect",
        value: function collect(obj, field) {
            // utility function to get nested property
            function dig(obj, selector) {
                var result = obj;
                var splitter = selector.split('.');
                for (var i = 0; i < splitter.length; i++) {
                    if (typeof result === 'undefined') {
                        return undefined;
                    } else {
                        result = result[splitter[i]];
                    }
                }
                return result;
            }
            if (typeof field === 'function') {
                return field(obj);
            } else if (typeof field === 'string') {
                return dig(obj, field);
            } else {
                return undefined;
            }
        }
    }, {
        key: "collectFormatted",
        value: function collectFormatted(obj, column) {
            var value = this.collect(obj, column.field);
            if (value === undefined) return '';
            // lets format the resultant data
            var type = this.dataTypes[column.type] || _default2.default;
            return type.format(value, column);
        }
    }, {
        key: "formattedRow",
        value: function formattedRow(row) {
            var formattedRow = {};
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var col = _step3.value;

                    if (col.field) {
                        formattedRow[col.field] = this.collectFormatted(row, col);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return formattedRow;
        }
        // Check if a column is sortable.

    }, {
        key: "isSortableColumn",
        value: function isSortableColumn(index) {
            var sortable = this.columns[index].sortable;
            var isSortable = typeof sortable === 'boolean' ? sortable : this.sortable;
            return isSortable;
        }
        // Get classes for the given header column.

    }, {
        key: "getHeaderClasses",
        value: function getHeaderClasses(column, index) {
            var isSortable = this.isSortableColumn(index);
            var classes = Object.assign({}, this.getClasses(index, 'th'), {
                'sorting': isSortable,
                'sorting-desc': isSortable && this.sortColumn === index && this.sortType === 'desc',
                'sorting-asc': isSortable && this.sortColumn === index && this.sortType === 'asc'
            });
            return classes;
        }
        // Get classes for the given column index & element.

    }, {
        key: "getClasses",
        value: function getClasses(index, element) {
            var _columns$index = this.columns[index],
                type = _columns$index.type,
                custom = _columns$index[element + 'Class'];

            var dtype = this.dataTypes[type] || _default2.default;
            var isRight = dtype.isRight;
            if (this.rtl) isRight = true;
            var classes = _defineProperty({
                'right-align': isRight,
                'left-align': !isRight
            }, custom, !!custom);
            return classes;
        }
        // since vue doesn't detect property addition and deletion, we
        // need to create helper function to set property etc

    }, {
        key: "updateFilters",
        value: function updateFilters(column, value) {
            var _this = this;
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                _this.$set(_this.columnFilters, column.field, value);
            }, 400);
        }
        // method to filter rows

    }, {
        key: "filterRows",
        value: function filterRows() {
            var _this3 = this;

            var computedRows = JSON.parse(JSON.stringify(this.rows));
            // we need to preserve the original index of rows so lets do that
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = computedRows.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _step4$value = _slicedToArray(_step4.value, 2),
                        index = _step4$value[0],
                        row = _step4$value[1];

                    row.originalIndex = index;
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            if (this.hasFilterRow) {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    var _loop = function _loop() {
                        var col = _step5.value;

                        if (col.filterable && _this3.columnFilters[col.field]) {
                            computedRows = computedRows.filter(function (row) {
                                // If column has a custom filter, use that.
                                if (col.filter) {
                                    return col.filter(_this3.collect(row, col.field), _this3.columnFilters[col.field]);
                                } else {
                                    // Use default filters
                                    var type = _this3.dataTypes[col.type] || _default2.default;
                                    return type.filterPredicate(_this3.collect(row, col.field), _this3.columnFilters[col.field]);
                                }
                            });
                        }
                    };

                    for (var _iterator5 = this.columns[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        _loop();
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }
            }
            this.filteredRows = computedRows;
        }
        // get column's defined placeholder or default one

    }, {
        key: "getPlaceholder",
        value: function getPlaceholder(column) {
            var placeholder = column.placeholder || 'Filter ' + column.label;
            return placeholder;
        }
    }, {
        key: "getCurrentIndex",
        value: function getCurrentIndex(index) {
            return (this.currentPage - 1) * this.currentPerPage + index + 1;
        }
    }, {
        key: "getRowStyleClass",
        value: function getRowStyleClass(row) {
            var classes = '';
            classes += this.onClick ? 'clickable' : '';
            var rowStyleClasses = void 0;
            if (typeof this.rowStyleClass === 'function') {
                rowStyleClasses = this.rowStyleClass(row);
            } else {
                rowStyleClasses = this.rowStyleClass;
            }
            if (rowStyleClasses) {
                classes += ' ' + rowStyleClasses;
            }
            return classes;
        }
    }, {
        key: "onColumnFilters",
        value: function onColumnFilters() {
            this.filterRows();
        }
    }, {
        key: "onRowsChange",
        value: function onRowsChange() {
            this.filterRows();
        }
        // computed

    }, {
        key: "mounted",
        value: function mounted() {
            this.filteredRows = JSON.parse(JSON.stringify(this.rows));
            // we need to preserve the original index of rows so lets do that
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.filteredRows.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var _step6$value = _slicedToArray(_step6.value, 2),
                        index = _step6$value[0],
                        row = _step6$value[1];

                    row.originalIndex = index;
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            if (this.perPage) {
                this.currentPerPage = this.perPage;
            }
            // take care of default sort on mount
            if (this.defaultSortBy) {
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = this.columns.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var _step7$value = _slicedToArray(_step7.value, 2),
                            index = _step7$value[0],
                            _col = _step7$value[1];

                        if (_col.field === this.defaultSortBy.field) {
                            this.sortColumn = index;
                            this.sortType = this.defaultSortBy.type || 'asc';
                            this.sortChanged = true;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }
            }
        }
    }, {
        key: "searchTerm",
        get: function get() {
            return this.externalSearchQuery != null ? this.externalSearchQuery : this.globalSearchTerm;
        }
        //

    }, {
        key: "globalSearchAllowed",
        get: function get() {
            if (this.globalSearch && !!this.globalSearchTerm && this.searchTrigger !== 'enter') {
                return true;
            }
            if (this.externalSearchQuery != null && this.searchTrigger !== 'enter') {
                return true;
            }
            if (this.forceSearch) {
                this.forceSearch = false;
                return true;
            }
            return false;
        }
        // to create a filter row, we need to
        // make sure that there is atleast 1 column
        // that requires filtering

    }, {
        key: "hasFilterRow",
        get: function get() {
            if (!this.globalSearch) {
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = this.columns[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var _col2 = _step8.value;

                        if (_col2.filterable) {
                            return true;
                        }
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                            _iterator8.return();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }
            }
            return false;
        }
        // this is done everytime sortColumn
        // or sort type changes
        // ----------------------------------------

    }, {
        key: "processedRows",
        get: function get() {
            var _this4 = this;

            var computedRows = this.filteredRows;
            // take care of the global filter here also
            if (this.globalSearchAllowed) {
                var filteredRows = [];
                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    for (var _iterator9 = this.rows[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        var row = _step9.value;
                        var _iteratorNormalCompletion10 = true;
                        var _didIteratorError10 = false;
                        var _iteratorError10 = undefined;

                        try {
                            for (var _iterator10 = this.columns[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                var _col3 = _step10.value;

                                if (String(this.collectFormatted(row, _col3)).toLowerCase().search(this.searchTerm.toLowerCase()) > -1) {
                                    filteredRows.push(row);
                                    break;
                                }
                            }
                        } catch (err) {
                            _didIteratorError10 = true;
                            _iteratorError10 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                    _iterator10.return();
                                }
                            } finally {
                                if (_didIteratorError10) {
                                    throw _iteratorError10;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
                            _iterator9.return();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
                        }
                    }
                }

                computedRows = filteredRows;
            }
            // taking care of sort here only if sort has changed
            if (this.sortColumn !== -1 && this.isSortableColumn(this.sortColumn) && (
            // if search trigger is enter then we only sort
            // when enter is hit
            this.searchTrigger !== 'enter' || this.sortChanged)) {
                this.sortChanged = false;
                computedRows = computedRows.sort(function (x, y) {
                    if (!_this4.columns[_this4.sortColumn]) {
                        return 0;
                    }
                    var xvalue = _this4.collect(x, _this4.columns[_this4.sortColumn].field);
                    var yvalue = _this4.collect(y, _this4.columns[_this4.sortColumn].field);
                    var type = _this4.dataTypes[_this4.columns[_this4.sortColumn].type] || _default2.default;
                    return type.compare(xvalue, yvalue, _this4.columns[_this4.sortColumn]) * (_this4.sortType === 'desc' ? -1 : 1);
                });
            }
            // if the filtering is event based, we need to maintain filter
            // rows
            if (this.searchTrigger === 'enter') {
                this.filteredRows = computedRows;
            }
            return computedRows;
        }
    }, {
        key: "paginated",
        get: function get() {
            var paginatedRows = this.processedRows;
            if (this.paginate) {
                var pageStart = (this.currentPage - 1) * this.currentPerPage;
                // in case of filtering we might be on a page that is
                // not relevant anymore
                // also, if setting to all, current page will not be valid
                if (pageStart >= this.processedRows.length || this.currentPerPage === -1) {
                    this.currentPage = 1;
                    pageStart = 0;
                }
                // calculate page end now
                var pageEnd = paginatedRows.length + 1;
                // if the setting is set to 'all'
                if (this.currentPerPage !== -1) {
                    pageEnd = this.currentPage * this.currentPerPage;
                }
                paginatedRows = paginatedRows.slice(pageStart, pageEnd);
            }
            return paginatedRows;
        }
    }]);

    return VueTsTable;
}(_vue2.default);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: 'table table-bordered' })], VueTsTable.prototype, "styleClass", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "title", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "columns", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "customTypes", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "rows", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "onClick", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "perPage", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: true })], VueTsTable.prototype, "sortable", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: false })], VueTsTable.prototype, "paginate", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: false })], VueTsTable.prototype, "paginateOnTop", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: false })], VueTsTable.prototype, "lineNumbers", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "defaultSortBy", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: true })], VueTsTable.prototype, "responsive", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: false })], VueTsTable.prototype, "rtl", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "rowStyleClass", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: false })], VueTsTable.prototype, "globalSearch", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "searchTrigger", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "externalSearchQuery", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: 'Search Table' })], VueTsTable.prototype, "globalSearchPlaceholder", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "paginationNextText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "paginationPrevText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "paginationRowsPerPageText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "paginationOfText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsTable.prototype, "paginationAllText", void 0);
__decorate([(0, _vuePropertyDecorator.Watch)('columnFilters', { deep: true })], VueTsTable.prototype, "onColumnFilters", null);
__decorate([(0, _vuePropertyDecorator.Watch)('rows', { deep: true })], VueTsTable.prototype, "onRowsChange", null);
exports.VueTsTable = VueTsTable = __decorate([_style2.default, (0, _vueClassComponent2.default)({
    name: 'vue-ts-table',
    components: {
        VueTsPagination: _pagination.VueTsPagination
    }
})], VueTsTable);
exports.VueTsTable = VueTsTable;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VueTsPagination = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _vueClassComponent = __webpack_require__(1);

var _vueClassComponent2 = _interopRequireDefault(_vueClassComponent);

var _vuePropertyDecorator = __webpack_require__(2);

var _style = __webpack_require__(6);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VueTsPagination = function (_Vue) {
    _inherits(VueTsPagination, _Vue);

    function VueTsPagination() {
        _classCallCheck(this, VueTsPagination);

        var _this = _possibleConstructorReturn(this, (VueTsPagination.__proto__ || Object.getPrototypeOf(VueTsPagination)).apply(this, arguments));

        _this.currentPage = 1;
        _this.currentPerPage = 10;
        return _this;
    }

    _createClass(VueTsPagination, [{
        key: "nextPage",
        value: function nextPage() {
            if (this.currentPerPage === -1) return;
            if (this.nextIsPossible) {
                ++this.currentPage;
            }
            this.pageChanged();
        }
    }, {
        key: "previousPage",
        value: function previousPage() {
            if (this.currentPage > 1) {
                --this.currentPage;
            }
            this.pageChanged();
        }
    }, {
        key: "pageChanged",
        value: function pageChanged() {
            this.$emit('page-changed', { currentPage: this.currentPage });
        }
    }, {
        key: "perPageChanged",
        value: function perPageChanged(event) {
            if (event && event.target instanceof HTMLInputElement) {
                this.currentPerPage = parseInt(event.target.value, 10);
            }
            this.$emit('per-page-changed', { currentPerPage: this.currentPerPage });
        }
    }, {
        key: "onPerPageChange",
        value: function onPerPageChange() {
            if (this.perPage) {
                this.currentPerPage = this.perPage;
            } else {
                // reset to default
                this.currentPerPage = 10;
            }
            this.perPageChanged();
        }
    }, {
        key: "mounted",
        value: function mounted() {
            if (this.perPage) {
                this.currentPerPage = this.perPage;
            }
        }
    }, {
        key: "paginatedInfo",
        get: function get() {
            if (this.currentPerPage === -1) {
                return "1 - " + this.total + " " + this.ofText + " " + this.total;
            }
            var first = (this.currentPage - 1) * this.currentPerPage ? (this.currentPage - 1) * this.currentPerPage : 1;
            var last = Math.min(this.total, this.currentPerPage * this.currentPage);
            return first + " - " + last + " " + this.ofText + " " + this.total;
        }
    }, {
        key: "nextIsPossible",
        get: function get() {
            return this.total > this.currentPerPage * this.currentPage;
        }
    }, {
        key: "prevIsPossible",
        get: function get() {
            return this.currentPage > 1;
        }
    }]);

    return VueTsPagination;
}(_vue2.default);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: 'table table-bordered' })], VueTsPagination.prototype, "styleClass", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsPagination.prototype, "total", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)()], VueTsPagination.prototype, "perPage", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: false })], VueTsPagination.prototype, "rtl", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: 'Next' })], VueTsPagination.prototype, "nextText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: 'Prev' })], VueTsPagination.prototype, "prevText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: 'Rows per page:' })], VueTsPagination.prototype, "rowsPerPageText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: 'of' })], VueTsPagination.prototype, "ofText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ default: 'All' })], VueTsPagination.prototype, "allText", void 0);
__decorate([(0, _vuePropertyDecorator.Watch)('perPage', {})], VueTsPagination.prototype, "onPerPageChange", null);
exports.VueTsPagination = VueTsPagination = __decorate([_style2.default, (0, _vueClassComponent2.default)({
    name: 'vue-ts-pagination'
})], VueTsPagination);
exports.VueTsPagination = VueTsPagination;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var styles = __webpack_require__(7)
var render = function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"table-footer clearfix"},[_c('div',{staticClass:"datatable-length pull-left"},[_c('label',[_c('span',[_vm._v(_vm._s(_vm.rowsPerPageText))]),_vm._v(" "),_c('select',{staticClass:"browser-default",on:{"change":_vm.perPageChanged}},[(_vm.perPage)?_c('option',{domProps:{"value":_vm.perPage}},[_vm._v(_vm._s(_vm.perPage))]):_vm._e(),_vm._v(" "),_c('option',{attrs:{"value":"10"}},[_vm._v("10")]),_vm._v(" "),_c('option',{attrs:{"value":"20"}},[_vm._v("20")]),_vm._v(" "),_c('option',{attrs:{"value":"30"}},[_vm._v("30")]),_vm._v(" "),_c('option',{attrs:{"value":"40"}},[_vm._v("40")]),_vm._v(" "),_c('option',{attrs:{"value":"50"}},[_vm._v("50")]),_vm._v(" "),_c('option',{attrs:{"value":"-1"}},[_vm._v(_vm._s(_vm.allText))])])])]),_vm._v(" "),_c('div',{staticClass:"pagination-controls pull-right"},[_c('a',{staticClass:"page-btn",class:{ disabled: !_vm.prevIsPossible },attrs:{"href":"javascript:undefined","tabindex":"0"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.previousPage($event)}}},[_c('span',{staticClass:"chevron",class:{ 'left': !_vm.rtl, 'right': _vm.rtl }}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.prevText))])]),_vm._v(" "),_c('div',{staticClass:"info"},[_vm._v(_vm._s(_vm.paginatedInfo))]),_vm._v(" "),_c('a',{staticClass:"page-btn",class:{ disabled: !_vm.nextIsPossible },attrs:{"href":"javascript:undefined","tabindex":"0"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.nextPage($event)}}},[_c('span',[_vm._v(_vm._s(_vm.nextText))]),_vm._v(" "),_c('span',{staticClass:"chevron",class:{ 'right': !_vm.rtl, 'left': _vm.rtl }})])])])}
var staticRenderFns = []
module.exports = function (_exports) {
  var options = typeof _exports === 'function'
    ? _exports.options
    : _exports
  options.render = render
  options.staticRenderFns = staticRenderFns
  options._scopeId = 'data-v-5632a766'
  if (Object.keys(styles).length > 0) {
    if (!options.computed) options.computed = {}
    options.computed.$style = function () { return styles }
  }
  return _exports
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultType = exports.DefaultType = function () {
    function DefaultType() {
        _classCallCheck(this, DefaultType);
    }

    _createClass(DefaultType, [{
        key: "format",
        value: function format(value) {
            return value.toString();
        }
    }, {
        key: "compare",
        value: function compare(x, y) {
            function cook(d) {
                return d.toLowerCase();
            }
            x = cook(x);
            y = cook(y);
            return x < y ? -1 : x > y ? 1 : 0;
        }
    }, {
        key: "filterPredicate",
        value: function filterPredicate(rowval, filter) {
            var v = rowval.toLowerCase().startsWith(filter.toLowerCase());
            return v;
        }
    }]);

    return DefaultType;
}();

exports.default = new DefaultType();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var styles = __webpack_require__(10)
var render = function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"good-table",class:{'rtl': _vm.rtl}},[_c('div',{class:{'responsive': _vm.responsive}},[(_vm.title)?_c('div',{staticClass:"table-header clearfix"},[_c('h2',{staticClass:"table-title pull-left"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{staticClass:"actions pull-right"})]):_vm._e(),_vm._v(" "),(_vm.paginate && _vm.paginateOnTop)?_c('vue-ts-pagination',{attrs:{"perPage":_vm.perPage,"rtl":_vm.rtl,"total":_vm.processedRows.length,"nextText":_vm.paginationNextText,"prevText":_vm.paginationPrevText,"rowsPerPageText":_vm.paginationRowsPerPageText,"ofText":_vm.paginationOfText,"allText":_vm.paginationAllText},on:{"page-changed":_vm.pageChanged,"per-page-changed":_vm.perPageChanged}}):_vm._e(),_vm._v(" "),_c('table',{ref:"table",class:_vm.styleClass},[_c('thead',[(_vm.globalSearch && _vm.externalSearchQuery == null)?_c('tr',[_c('td',{attrs:{"colspan":_vm.lineNumbers ? _vm.columns.length + 1: _vm.columns.length}},[_c('div',{staticClass:"global-search"},[_vm._m(0,false,false),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.globalSearchTerm),expression:"globalSearchTerm"}],staticClass:"form-control global-search-input",attrs:{"type":"text","placeholder":_vm.globalSearchPlaceholder},domProps:{"value":(_vm.globalSearchTerm)},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.searchTable()},"input":function($event){if($event.target.composing){ return; }_vm.globalSearchTerm=$event.target.value}}})])])]):_vm._e(),_vm._v(" "),_c('tr',[(_vm.lineNumbers)?_c('th',{staticClass:"line-numbers"}):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,index){return (!column.hidden)?_c('th',{key:column.field,class:_vm.getHeaderClasses(column, index),style:({width: column.width ? column.width : 'auto'}),on:{"click":function($event){_vm.sort(index)}}},[_vm._t("table-column",[_c('span',[_vm._v(_vm._s(column.label))])],{column:column})],2):_vm._e()}),_vm._v(" "),_vm._t("thead-tr")],2),_vm._v(" "),(_vm.hasFilterRow)?_c('tr',[(_vm.lineNumbers)?_c('th'):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,index){return (!column.hidden)?_c('th',{key:column.field},[(column.filterable)?_c('div',{class:_vm.getHeaderClasses(column, index)},[(!column.filterDropdown)?_c('input',{attrs:{"type":"search","placeholder":_vm.getPlaceholder(column)},domProps:{"value":_vm.columnFilters[column.field]},on:{"input":function($event){_vm.updateFilters(column, $event.target.value)}}}):_vm._e(),_vm._v(" "),(column.filterDropdown && typeof(column.filterOptions[0]) !== 'object')?_c('select',{domProps:{"value":_vm.columnFilters[column.field]},on:{"input":function($event){_vm.updateFilters(column, $event.target.value)}}},[_c('option',{attrs:{"value":""}},[_vm._v(_vm._s(_vm.getPlaceholder(column)))]),_vm._v(" "),_vm._l((column.filterOptions),function(option){return _c('option',{key:option,domProps:{"value":option}},[_vm._v("\n                          "+_vm._s(option)+"\n                        ")])})],2):_vm._e(),_vm._v(" "),(column.filterDropdown && typeof(column.filterOptions[0]) === 'object')?_c('select',{domProps:{"value":_vm.columnFilters[column.field]},on:{"input":function($event){_vm.updateFilters(column, $event.target.value)}}},[_c('option',{attrs:{"value":""}},[_vm._v(_vm._s(_vm.getPlaceholder(column)))]),_vm._v(" "),_vm._l((column.filterOptions),function(option){return _c('option',{key:option,domProps:{"value":option.value}},[_vm._v(_vm._s(option.text))])})],2):_vm._e()]):_vm._e()]):_vm._e()})],2):_vm._e()]),_vm._v(" "),_c('tbody',[_vm._l((_vm.paginated),function(row,index){return _c('tr',{key:index,class:_vm.getRowStyleClass(row),on:{"click":function($event){_vm.click(row, index)}}},[(_vm.lineNumbers)?_c('th',{staticClass:"line-numbers"},[_vm._v(_vm._s(_vm.getCurrentIndex(index)))]):_vm._e(),_vm._v(" "),_vm._t("table-row-before",null,{row:row,index:index}),_vm._v(" "),_vm._t("table-row",_vm._l((_vm.columns),function(column,i){return (!column.hidden && column.field)?_c('td',{key:column.field,class:_vm.getClasses(i, 'td')},[(column.html)?_c('span',{domProps:{"innerHTML":_vm._s(_vm.collect(row, column.field))}}):_c('span',[_vm._v(_vm._s(_vm.collectFormatted(row, column)))])]):_vm._e()}),{row:row,formattedRow:_vm.formattedRow(row),index:index}),_vm._v(" "),_vm._t("table-row-after",null,{row:row,index:index})],2)}),_vm._v(" "),(_vm.processedRows.length === 0)?_c('tr',[_c('td',{attrs:{"colspan":_vm.columns.length}},[_vm._t("emptystate",[_c('div',{staticClass:"center-align text-disabled"},[_vm._v("\n                      No data for table.\n                    ")])])],2)]):_vm._e()],2)]),_vm._v(" "),(_vm.paginate && !_vm.paginateOnTop)?_c('vue-ts-pagination',{attrs:{"perPage":_vm.perPage,"rtl":_vm.rtl,"total":_vm.processedRows.length,"nextText":_vm.paginationNextText,"prevText":_vm.paginationPrevText,"rowsPerPageText":_vm.paginationRowsPerPageText,"ofText":_vm.paginationOfText,"allText":_vm.paginationAllText},on:{"page-changed":_vm.pageChanged,"per-page-changed":_vm.perPageChanged}}):_vm._e()],1)])}
var staticRenderFns = [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"global-search-icon"},[_c('img',{attrs:{"src":__webpack_require__(11),"alt":"Search Icon"}})])}]
module.exports = function (_exports) {
  var options = typeof _exports === 'function'
    ? _exports.options
    : _exports
  options.render = render
  options.staticRenderFns = staticRenderFns
  options._scopeId = 'data-v-28a18a02'
  if (Object.keys(styles).length > 0) {
    if (!options.computed) options.computed = {}
    options.computed.$style = function () { return styles }
  }
  return _exports
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/search_icon.6cf060d.png";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 12;

/***/ })
/******/ ]);
});
//# sourceMappingURL=vue-ts-table.js.map