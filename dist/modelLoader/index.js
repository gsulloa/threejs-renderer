"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _three = require("three");

var _threeObjMtlLoader = require("three-obj-mtl-loader");

var _jszip = _interopRequireDefault(require("jszip"));

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("../config"));

var ModelLoader =
/*#__PURE__*/
function () {
  function ModelLoader(_ref) {
    var _this = this;

    var loading = _ref.loading;
    (0, _classCallCheck2.default)(this, ModelLoader);
    (0, _defineProperty2.default)(this, "readContent",
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(name, file) {
        var doti, ext;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                doti = name.lastIndexOf(".");

                if (!(doti === -1)) {
                  _context.next = 3;
                  break;
                }

                throw new Error("file ".concat(name, " without extension"));

              case 3:
                ext = name.substring(doti + 1);
                _context.t0 = name;
                _context.t1 = ext;
                _context.next = 8;
                return file.async(ext === "mtl" || ext === "obj" ? "text" : "uint8array");

              case 8:
                _context.t2 = _context.sent;
                return _context.abrupt("return", {
                  name: _context.t0,
                  ext: _context.t1,
                  content: _context.t2
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "loadMTL", function (_ref3) {
      var textureFiles = _ref3.textureFiles,
          mtl = _ref3.mtl;
      var loadingManager = new _three.LoadingManager();
      loadingManager.setURLModifier(function (url) {
        var blob = new Blob([textureFiles[url].buffer]);
        var NewUrl = URL.createObjectURL(blob);
        return NewUrl;
      });
      var mtlLoader = new _threeObjMtlLoader.MTLLoader(loadingManager);
      var materials = mtlLoader.parse(mtl);
      materials.preload();
      _this.materials = Object.values(materials.materials);

      _this.materials.forEach(function (material) {
        material.opacity = _config.default.object.opacityMode ? 0.7 : 1;
        material.transparent = true;
      });

      return materials;
    });
    (0, _defineProperty2.default)(this, "loadOBJ", function (_ref4) {
      var materials = _ref4.materials,
          obj = _ref4.obj;
      var objLoader = new _threeObjMtlLoader.OBJLoader();
      objLoader.setMaterials(materials);
      return objLoader.parse(obj);
    });
    this.loading = loading;

    _config.default.object._opacityMode.subscribe(function (opacityMode) {
      if (_this.materials) _this.materials.forEach(function (material) {
        return material.opacity = opacityMode ? 0.7 : 1;
      });
    });
  }

  (0, _createClass2.default)(ModelLoader, [{
    key: "load",
    value: function () {
      var _load = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_ref5) {
        var url, files, groupedFiles, materials, object, pivotObject;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = _ref5.url;
                this.loading.onStart({
                  title: "Cargando..."
                });
                _context2.next = 4;
                return this.getFiles({
                  url: url
                });

              case 4:
                files = _context2.sent;
                groupedFiles = files.reduce(function (all, file) {
                  if (file.ext !== "mtl" && file.ext !== "obj") {
                    all.textureFiles = (0, _objectSpread3.default)({}, all.textureFiles, (0, _defineProperty2.default)({}, file.name, file.content));
                  } else {
                    all[file.ext] = file.content;
                  }

                  return all;
                }, {});
                _context2.next = 8;
                return this.loadMTL(groupedFiles);

              case 8:
                materials = _context2.sent;
                _context2.next = 11;
                return this.loadOBJ((0, _objectSpread3.default)({
                  materials: materials
                }, groupedFiles));

              case 11:
                object = _context2.sent;
                pivotObject = this.createPivot({
                  object: object
                });
                this.loading.onLoad();
                return _context2.abrupt("return", pivotObject);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function load(_x3) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "getFiles",
    value: function () {
      var _getFiles = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(_ref6) {
        var _this2 = this;

        var url, file, blob, _ref7, files, readedFiles;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = _ref6.url;
                _context3.next = 3;
                return (0, _axios.default)(url, {
                  responseType: "blob",
                  onDownloadProgress: this.loading.onProgress
                });

              case 3:
                file = _context3.sent;
                blob = file.data;
                _context3.next = 7;
                return new _jszip.default().loadAsync(blob, {
                  type: "blob"
                });

              case 7:
                _ref7 = _context3.sent;
                files = _ref7.files;
                _context3.next = 11;
                return Promise.all(Object.entries(files).map(function (_ref8) {
                  var _ref9 = (0, _slicedToArray2.default)(_ref8, 2),
                      name = _ref9[0],
                      zipObject = _ref9[1];

                  return _this2.readContent(name, zipObject);
                }));

              case 11:
                readedFiles = _context3.sent;
                return _context3.abrupt("return", readedFiles);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getFiles(_x4) {
        return _getFiles.apply(this, arguments);
      }

      return getFiles;
    }()
  }, {
    key: "createPivot",
    value: function createPivot(_ref10) {
      var object = _ref10.object;

      var _setFromObject = new _three.Box3().setFromObject(object),
          max = _setFromObject.max,
          min = _setFromObject.min;

      var middleY = (max.y - min.y) / 2;
      var middleZ = (max.z - min.z) / 2;
      var pivot = new _three.Object3D();
      object.position.y = middleY;
      object.position.z = -middleZ;
      pivot.add(object);
      return pivot;
    }
  }]);
  return ModelLoader;
}();

var _default = ModelLoader;
exports.default = _default;