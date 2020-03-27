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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/arjs/arjs.js":
/*!*****************************!*\
  !*** ./src/js/arjs/arjs.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_charsConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main/charsConfig */ \"./src/js/main/charsConfig.js\");\n\n\nwindow.onload = function () {\n  var body = document.getElementById('body');\n  var url = new URL(window.location.href);\n  var getChar = url.searchParams.get('char'); //set default display char to main char\n\n  var setChar = _main_charsConfig__WEBPACK_IMPORTED_MODULE_0__[\"charsConfig\"].main; //if a users go to the arjs website without the qrcode a default char has to be set\n\n  if (getChar !== null) {\n    //Loop through chars object and check if the char form the url exists, if it does not exist, setchar will not be changed\n    for (var i in _main_charsConfig__WEBPACK_IMPORTED_MODULE_0__[\"charsConfig\"]) {\n      if (_main_charsConfig__WEBPACK_IMPORTED_MODULE_0__[\"charsConfig\"][i].asset.toLowerCase() === getChar.toLowerCase()) {\n        setChar = _main_charsConfig__WEBPACK_IMPORTED_MODULE_0__[\"charsConfig\"][i];\n      }\n    }\n  }\n\n  insertHTML(setChar); //select parent elements\n\n  var buttonWrapper = document.getElementById('button_wrapper');\n  var directionaltarget = document.getElementById('directionaltarget'); //this function is needed to danymicaly load the chars\n\n  function insertHTML(assetData) {\n    console.log('inser: ', assetData); //load the gltf FIle\n    //jquery is used because its easy async load of the gltf file\n\n    $.getJSON('../assets/chars/' + assetData.asset + '/' + assetData.asset + '.gltf', function (json) {\n      //loop all animations\n      json.animations.forEach(function (element) {\n        //create button elements\n        var li = document.createElement('button');\n        li.setAttribute('class', 'animationBtn'); //append them to the dom element\n\n        li.appendChild(document.createTextNode(element.name)); //add devent listener to change the animation of the asset\n\n        li.addEventListener(\"click\", function () {\n          //animation-mixer defines the animation that is played\n          directionaltarget.setAttribute('animation-mixer', 'clip: ' + element.name);\n        }); //append all buttons to DOM\n\n        buttonWrapper.appendChild(li);\n      });\n    });\n    body.insertAdjacentHTML('beforeend', '<a-scene embedded\\n' + '         arjs=\"debugUIEnabled: false; sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960\"\\n' + '         vr-mode-ui=\"enabled: false\" device-orientation-permission-ui=\"enabled: false\"\\n' + '         artoolkit=\"sourceType: webcam;\"\\n' + '         outline\\n' + '         antialias=\"true\">\\n' + '    <a-assets>\\n' + '        <a-asset-item\\n' + '                id=\"asset\"\\n' + '                src=\"../assets/chars/' + assetData.asset + '/' + assetData.asset + '.gltf\"\\n' + '        ></a-asset-item>\\n' + '    </a-assets>\\n' + '    <a-marker type=\"pattern\" url=\"../assets/images/arjs/pattern/pattern-arjs.patt\">\\n' + '        <a-entity light=\"type: ambient;\\n' + '        color: #fff;\\n' + '        distance: 100;\\n' + '        intensity: ' + assetData.ar.lightIntensity + ';\"\\n' + '                  position=\"' + assetData.ar.lightPosition + '\"></a-entity>\\n' + '        <a-entity\\n' + '                id=\"directionaltarget\"\\n' + '                rotation=\"' + assetData.ar.rotation + '\"\\n' + '                scale=\"' + assetData.ar.scale + '\"\\n' + '                animation-mixer=\"clip: Neutral\"\\n' + '                position=\"' + assetData.ar.position + '\"\\n' + '                gltf-model=\"#asset\"\\n' + '        ></a-entity>\\n' + '\\n' + '    </a-marker>\\n' + '    <a-entity camera></a-entity>\\n' + '</a-scene>\\n');\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJqcy9hcmpzLmpzPzdjNTgiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiYm9keSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ1cmwiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJnZXRDaGFyIiwic2VhcmNoUGFyYW1zIiwiZ2V0Iiwic2V0Q2hhciIsImNoYXJzQ29uZmlnIiwibWFpbiIsImkiLCJhc3NldCIsInRvTG93ZXJDYXNlIiwiaW5zZXJ0SFRNTCIsImJ1dHRvbldyYXBwZXIiLCJkaXJlY3Rpb25hbHRhcmdldCIsImFzc2V0RGF0YSIsImNvbnNvbGUiLCJsb2ciLCIkIiwiZ2V0SlNPTiIsImpzb24iLCJhbmltYXRpb25zIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwibmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJhciIsImxpZ2h0SW50ZW5zaXR5IiwibGlnaHRQb3NpdGlvbiIsInJvdGF0aW9uIiwic2NhbGUiLCJwb3NpdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBOztBQUVBQSxNQUFNLENBQUNDLE1BQVAsR0FBZ0IsWUFBWTtBQUV4QixNQUFNQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBRUEsTUFBSUMsR0FBRyxHQUFHLElBQUlDLEdBQUosQ0FBUU4sTUFBTSxDQUFDTyxRQUFQLENBQWdCQyxJQUF4QixDQUFWO0FBQ0EsTUFBSUMsT0FBTyxHQUFHSixHQUFHLENBQUNLLFlBQUosQ0FBaUJDLEdBQWpCLENBQXFCLE1BQXJCLENBQWQsQ0FMd0IsQ0FPeEI7O0FBQ0EsTUFBSUMsT0FBTyxHQUFHQyw2REFBVyxDQUFDQyxJQUExQixDQVJ3QixDQVV4Qjs7QUFDQSxNQUFJTCxPQUFPLEtB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QmpDLElBMUJpQyxHQTJCakMsbUJBM0JpQyxHQTRCakMsb0NBNUJpQyxHQTZCakMsY0E3Qko7QUE4Qkg7QUFDSixDQWxGRCIsImZpbGUiOiIuL3NyYy9qcy9hcmpzL2FyanMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NoYXJzQ29uZmlnfSBmcm9tIFwiLi4vbWFpbi9jaGFyc0NvbmZpZ1wiO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5Jyk7XG5cbiAgICBsZXQgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgbGV0IGdldENoYXIgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnY2hhcicpO1xuXG4gICAgLy9zZXQgZGVmYXVsdCBkaXNwbGF5IGNoYXIgdG8gbWFpbiBjaGFyXG4gICAgbGV0IHNldENoYXIgPSBjaGFyc0NvbmZpZy5tYWluO1xuXG4gICAgLy9pZiBhIHVzZXJzIGdvIHRvIHRoZSBhcmpzIHdlYnNpdGUgd2l0aG91dCB0aGUgcXJjb2RlIGEgZGVmYXVsdCBjaGFyIGhhcyB0byBiZSBzZXRcbiAgICBpZiAoZ2V0Q2hhciAhPT0gbnVsbCkge1xuICAgICAgICAvL0xvb3AgdGhyb3VnaCBjaGFycyBvYmplY3QgYW5kIGNoZWNrIGlmIHRoZSBjaGFyIGZvcm0gdGhlIHVybCBleGlzdHMsIGlmIGl0IGRvZXMgbm90IGV4aXN0LCBzZXRjaGFyIHdpbGwgbm90IGJlIGNoYW5nZWRcbiAgICAgICAgZm9yIChsZXQgaSBpbiBjaGFyc0NvbmZpZykge1xuICAgICAgICAgICAgaWYgKGNoYXJzQ29uZmlnW2ldLmFzc2V0LnRvTG93ZXJDYXNlKCkgPT09IGdldENoYXIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHNldENoYXIgPSBjaGFyc0NvbmZpZ1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnNlcnRIVE1MKHNldENoYXIpO1xuXG4gICAgLy9zZWxlY3QgcGFyZW50IGVsZW1lbnRzXG4gICAgY29uc3QgYnV0dG9uV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b25fd3JhcHBlcicpO1xuICAgIGNvbnN0IGRpcmVjdGlvbmFsdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpcmVjdGlvbmFsdGFyZ2V0Jyk7XG5cbiAgICAvL3RoaXMgZnVuY3Rpb24gaXMgbmVlZGVkIHRvIGRhbnltaWNhbHkgbG9hZCB0aGUgY2hhcnNcbiAgICBmdW5jdGlvbiBpbnNlcnRIVE1MKGFzc2V0RGF0YSkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnNlcjogJywgYXNzZXREYXRhKVxuXG4gICAgICAgIC8vbG9hZCB0aGUgZ2x0ZiBGSWxlXG4gICAgICAgIC8vanF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBpdHMgZWFzeSBhc3luYyBsb2FkIG9mIHRoZSBnbHRmIGZpbGVcbiAgICAgICAgJC5nZXRKU09OKCcuLi9hc3NldHMvY2hhcnMvJyArIGFzc2V0RGF0YS5hc3NldCArICcvJyArIGFzc2V0RGF0YS5hc3NldCArICcuZ2x0ZicsIGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICAvL2xvb3AgYWxsIGFuaW1hdGlvbnNcbiAgICAgICAgICAgIGpzb24uYW5pbWF0aW9ucy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgYnV0dG9uIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdhbmltYXRpb25CdG4nKTtcbiAgICAgICAgICAgICAgICAvL2FwcGVuZCB0aGVtIHRvIHRoZSBkb20gZWxlbWVudFxuICAgICAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGVsZW1lbnQubmFtZSkpO1xuICAgICAgICAgICAgICAgIC8vYWRkIGRldmVudCBsaXN0ZW5lciB0byBjaGFuZ2UgdGhlIGFuaW1hdGlvbiBvZiB0aGUgYXNzZXRcbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvL2FuaW1hdGlvbi1taXhlciBkZWZpbmVzIHRoZSBhbmltYXRpb24gdGhhdCBpcyBwbGF5ZWRcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uYWx0YXJnZXQuc2V0QXR0cmlidXRlKCdhbmltYXRpb24tbWl4ZXInLCAnY2xpcDogJyArIGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy9hcHBlbmQgYWxsIGJ1dHRvbnMgdG8gRE9NXG4gICAgICAgICAgICAgICAgYnV0dG9uV3JhcHBlci5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIGJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCAnPGEtc2NlbmUgZW1iZWRkZWRcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBhcmpzPVwiZGVidWdVSUVuYWJsZWQ6IGZhbHNlOyBzb3VyY2VUeXBlOiB3ZWJjYW07IHNvdXJjZVdpZHRoOjEyODA7IHNvdXJjZUhlaWdodDo5NjA7IGRpc3BsYXlXaWR0aDogMTI4MDsgZGlzcGxheUhlaWdodDogOTYwXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICB2ci1tb2RlLXVpPVwiZW5hYmxlZDogZmFsc2VcIiBkZXZpY2Utb3JpZW50YXRpb24tcGVybWlzc2lvbi11aT1cImVuYWJsZWQ6IGZhbHNlXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBhcnRvb2xraXQ9XCJzb3VyY2VUeXBlOiB3ZWJjYW07XCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBvdXRsaW5lXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgYW50aWFsaWFzPVwidHJ1ZVwiPlxcbicgK1xuICAgICAgICAgICAgJyAgICA8YS1hc3NldHM+XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICA8YS1hc3NldC1pdGVtXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIGlkPVwiYXNzZXRcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBzcmM9XCIuLi9hc3NldHMvY2hhcnMvJyArIGFzc2V0RGF0YS5hc3NldCArICcvJyArIGFzc2V0RGF0YS5hc3NldCArICcuZ2x0ZlwiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICA+PC9hLWFzc2V0LWl0ZW0+XFxuJyArXG4gICAgICAgICAgICAnICAgIDwvYS1hc3NldHM+XFxuJyArXG4gICAgICAgICAgICAnICAgIDxhLW1hcmtlciB0eXBlPVwicGF0dGVyblwiIHVybD1cIi4uL2Fzc2V0cy9pbWFnZXMvYXJqcy9wYXR0ZXJuL3BhdHRlcm4tYXJqcy5wYXR0XCI+XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICA8YS1lbnRpdHkgbGlnaHQ9XCJ0eXBlOiBhbWJpZW50O1xcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgY29sb3I6ICNmZmY7XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICBkaXN0YW5jZTogMTAwO1xcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgaW50ZW5zaXR5OiAnKyBhc3NldERhdGEuYXIubGlnaHRJbnRlbnNpdHkgKyc7XCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgICBwb3NpdGlvbj1cIicrIGFzc2V0RGF0YS5hci5saWdodFBvc2l0aW9uICsgJ1wiPjwvYS1lbnRpdHk+XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICA8YS1lbnRpdHlcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgaWQ9XCJkaXJlY3Rpb25hbHRhcmdldFwiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIHJvdGF0aW9uPVwiJysgYXNzZXREYXRhLmFyLnJvdGF0aW9uICsgJ1wiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIHNjYWxlPVwiJysgYXNzZXREYXRhLmFyLnNjYWxlICsgJ1wiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIGFuaW1hdGlvbi1taXhlcj1cImNsaXA6IE5ldXRyYWxcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBwb3NpdGlvbj1cIicrIGFzc2V0RGF0YS5hci5wb3NpdGlvbiArICdcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBnbHRmLW1vZGVsPVwiI2Fzc2V0XCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgID48L2EtZW50aXR5PlxcbicgK1xuICAgICAgICAgICAgJ1xcbicgK1xuICAgICAgICAgICAgJyAgICA8L2EtbWFya2VyPlxcbicgK1xuICAgICAgICAgICAgJyAgICA8YS1lbnRpdHkgY2FtZXJhPjwvYS1lbnRpdHk+XFxuJyArXG4gICAgICAgICAgICAnPC9hLXNjZW5lPlxcbicpXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/arjs/arjs.js\n");

/***/ }),

/***/ "./src/js/main/charsConfig.js":
/*!************************************!*\
  !*** ./src/js/main/charsConfig.js ***!
  \************************************/
/*! exports provided: charsConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"charsConfig\", function() { return charsConfig; });\n//all needed data is stored in the file, to easily extend or change any asset\nvar charsConfig = {\n  babaYaga: {\n    loopCam: 'BabaYaga',\n    asset: 'BabaYaga',\n    setScale: true,\n    scale: 46,\n    setPosition: true,\n    xPosition: 3.6,\n    yPosition: 0.5,\n    zPosition: 3,\n    setRotation: true,\n    axis: 'Y',\n    rotation: -45 / Math.PI,\n    boxPosition: 'left',\n    ar: {\n      lightPosition: '0 15 0',\n      rotation: '45 90 -90',\n      scale: '40 40 40',\n      position: '0 0 1.5',\n      lightIntensity: 2.5\n    }\n  },\n  basilisk: {\n    loopCam: 'Basilisk',\n    asset: 'Basilisk',\n    setScale: true,\n    scale: 210,\n    setPosition: true,\n    xPosition: 2.9,\n    yPosition: -3,\n    zPosition: 2,\n    setRotation: true,\n    axis: 'Y',\n    rotation: 32 / Math.PI,\n    boxPosition: 'left',\n    ar: {\n      lightPosition: '0 10 -5',\n      rotation: '90 90 -90',\n      scale: '60 60 60',\n      position: '0 0 1',\n      lightIntensity: 2.5\n    }\n  },\n  baum: {\n    loopCam: 'Baum',\n    asset: 'Baum',\n    setScale: true,\n    scale: '0',\n    setPosition: false,\n    xPosition: '',\n    yPosition: '',\n    zPosition: '',\n    setRotation: false,\n    axis: '',\n    rotation: '',\n    boxPosition: 'left',\n    ar: {\n      lightPosition: '0 10 -5',\n      rotation: '90 90 -90',\n      scale: '0.2 0.2 0.2',\n      position: '0 0 1.5',\n      lightIntensity: 1.5\n    }\n  },\n  eier: {\n    loopCam: 'Eier',\n    asset: 'Eier',\n    setScale: true,\n    scale: 46,\n    setPosition: true,\n    xPosition: -4.8,\n    yPosition: -3,\n    zPosition: 3,\n    setRotation: true,\n    axis: 'Y',\n    rotation: 57 / Math.PI,\n    boxPosition: 'right',\n    ar: {\n      lightPosition: '0 10 -10',\n      rotation: '-90 90 -90',\n      scale: '20 20 20',\n      position: '0 0 1',\n      lightIntensity: 1\n    }\n  },\n  jobold: {\n    loopCam: 'Jobold',\n    asset: 'Jobold',\n    setScale: true,\n    scale: '35',\n    setPosition: true,\n    xPosition: '',\n    yPosition: '-2',\n    zPosition: '',\n    setRotation: false,\n    axis: '',\n    rotation: '',\n    boxPosition: 'left',\n    ar: {\n      lightPosition: '1 20 5',\n      rotation: '-90 90 -90',\n      scale: '15 15 15',\n      position: '0 0 1',\n      lightIntensity: 2\n    }\n  },\n  main: {\n    loopCam: 'Main',\n    asset: 'Chupacabra',\n    setScale: true,\n    scale: 3,\n    setPosition: true,\n    xPosition: 3,\n    yPosition: -2,\n    zPosition: 2,\n    setRotation: true,\n    axis: \"Y\",\n    rotation: 31.5 / Math.PI,\n    boxPosition: 'left',\n    ar: {\n      lightPosition: '0 5 0',\n      rotation: '90 90 -92',\n      scale: '1.5 1.5 1.5',\n      position: '0 0 1',\n      lightIntensity: \"2.5\"\n    }\n  },\n  nessie: {\n    loopCam: 'Nessie',\n    asset: 'Nessie',\n    setScale: true,\n    scale: 35,\n    setPosition: true,\n    xPosition: 0.5,\n    yPosition: -2.4,\n    zPosition: -1,\n    setRotation: true,\n    axis: \"Y\",\n    rotation: Math.PI / 3.5,\n    boxPosition: 'left',\n    ar: {\n      lightPosition: '0 5 0',\n      rotation: '-110 90 -90',\n      scale: '15 15 15',\n      position: '0 0 1',\n      lightIntensity: 2.5\n    }\n  },\n  wolpertinger: {\n    loopCam: 'Wolpertinger',\n    asset: 'Wolpertinger',\n    setScale: true,\n    scale: 46,\n    setPosition: true,\n    xPosition: -0.2,\n    yPosition: -1.2,\n    zPosition: -1,\n    setRotation: false,\n    axis: '',\n    rotation: '',\n    boxPosition: 'left',\n    ar: {\n      lightPosition: '0 5 0',\n      rotation: '-90 90 -90',\n      scale: '20 20 20',\n      position: '0 0 1',\n      lightIntensity: 1\n    }\n  },\n  yeti: {\n    loopCam: 'Yeti',\n    asset: 'Yeti',\n    setScale: true,\n    scale: 50,\n    setPosition: true,\n    xPosition: 0.5,\n    yPosition: -2.4,\n    zPosition: -1,\n    setRotation: false,\n    axis: '',\n    rotation: '',\n    boxPosition: 'left',\n    ar: {\n      lightPosition: '0 10 -5',\n      rotation: '-90 90 -90',\n      scale: '20 20 20',\n      position: '0 0 1',\n      lightIntensity: 1.2\n    }\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi9jaGFyc0NvbmZpZy5qcz8zN2M4Il0sIm5hbWVzIjpbImNoYXJzQ29uZmlnIiwiYmFiYVlhZ2EiLCJsb29wQ2FtIiwiYXNzZXQiLCJzZXRTY2FsZSIsInNjYWxlIiwic2V0UG9zaXRpb24iLCJ4UG9zaXRpb24iLCJ5UG9zaXRpb24iLCJ6UG9zaXRpb24iLCJzZXRSb3RhdGlvbiIsImF4aXMiLCJyb3RhdGlvbiIsIk1hdGgiLCJQSSIsImJveFBvc2l0aW9uIiwiYXIiLCJsaWdodFBvc2l0aW9uIiwicG9zaXRpb24iLCJsaWdodEludGVuc2l0eSIsImJhc2lsaXNrIiwiYmF1bSIsImVpZXIiLCJqb2JvbGQiLCJtYWluIiwibmVzc2llIiwid29scGVydGluZ2VyIiwieWV0aSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ08sSUFBTUEsV0FBVyxHQUFHO0FBQ3ZCQyxVQUFRLEVBQUU7QUFDTkMsV0FBTyxFQUFFLFVBREg7QUFFTkMsU0FBSyxFQUFFLFVBRkQ7QUFHTkMsWUFBUSxFQUFFLElBSEo7QUFJTkMsU0FBSyxFQUFFLEVBSkQ7QUFLTkMsZUFBVyxFQUFFLElBTFA7QUFNTkMsYUFBUyxFQUFFLEdBTkw7QUFPTkMsYUFBUyxFQUFFLEdBUEw7QUFRTkMsYUFBUyxFQUFFLENBUkw7QUFTTkMsZUFBVyxFQUFFLElBVFA7QUFVTkMsUUFBSSxFQUFFLEdBVkE7QUFXTkMsWUFBUSxFQUFFLENBQUMsRUFBRCxHQUFNQyxJQUFJLENBQUNDLEVBWGY7QUFZTkMsZUFBVyxFQUFFLE1BWlA7QUFhTkMsTUFBRSxFQUFFO0FBQ0FDLG1CQUFhLEVBQUUsUUFEZjtBQUVBTCxjQUFRLEVBQUUsV0FGVjtBQUdBUCxXQUFLLEVBQUUsVUFIUDtBQUlBYSxjQUFRLEVBQUUsU0FKVjtBQUtBQyxvQkFBYyxFQUFFO0FBTGhCO0FBYkUsR0FEYTtBQXNCdkJDLFVBQVEsRUFBRTtBQUNObEIsV0FBTyxFQUFFLFVBREg7QUFFTkMsU0FB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U1ZDLGVBQVcsRUFBRSxLQVRIO0FBVVZDLFFBQUksRUFBRSxFQVZJO0FBV1ZDLFlBQVEsRUFBRSxFQVhBO0FBWVZHLGVBQVcsRUFBRSxNQVpIO0FBYVZDLE1BQUUsRUFBRTtBQUNBQyxtQkFBYSxFQUFFLE9BRGY7QUFFQUwsY0FBUSxFQUFFLFlBRlY7QUFHQVAsV0FBSyxFQUFFLFVBSFA7QUFJQWEsY0FBUSxFQUFFLE9BSlY7QUFLQUMsb0JBQWMsRUFBRTtBQUxoQjtBQWJNLEdBcEpTO0FBeUt2QlEsTUFBSSxFQUFFO0FBQ0Z6QixXQUFPLEVBQUUsTUFEUDtBQUVGQyxTQUFLLEVBQUUsTUFGTDtBQUdGQyxZQUFRLEVBQUUsSUFIUjtBQUlGQyxTQUFLLEVBQUUsRUFKTDtBQUtGQyxlQUFXLEVBQUUsSUFMWDtBQU1GQyxhQUFTLEVBQUUsR0FOVDtBQU9GQyxhQUFTLEVBQUUsQ0FBQyxHQVBWO0FBUUZDLGFBQVMsRUFBRSxDQUFDLENBUlY7QUFTRkMsZUFBVyxFQUFFLEtBVFg7QUFVRkMsUUFBSSxFQUFFLEVBVko7QUFXRkMsWUFBUSxFQUFFLEVBWFI7QUFZRkcsZUFBVyxFQUFFLE1BWlg7QUFhRkMsTUFBRSxFQUFFO0FBQ0FDLG1CQUFhLEVBQUUsU0FEZjtBQUVBTCxjQUFRLEVBQUUsWUFGVjtBQUdBUCxXQUFLLEVBQUUsVUFIUDtBQUlBYSxjQUFRLEVBQUUsT0FKVjtBQUtBQyxvQkFBYyxFQUFFO0FBTGhCO0FBYkY7QUF6S2lCLENBQXBCIiwiZmlsZSI6Ii4vc3JjL2pzL21haW4vY2hhcnNDb25maWcuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2FsbCBuZWVkZWQgZGF0YSBpcyBzdG9yZWQgaW4gdGhlIGZpbGUsIHRvIGVhc2lseSBleHRlbmQgb3IgY2hhbmdlIGFueSBhc3NldFxuZXhwb3J0IGNvbnN0IGNoYXJzQ29uZmlnID0ge1xuICAgIGJhYmFZYWdhOiB7XG4gICAgICAgIGxvb3BDYW06ICdCYWJhWWFnYScsXG4gICAgICAgIGFzc2V0OiAnQmFiYVlhZ2EnLFxuICAgICAgICBzZXRTY2FsZTogdHJ1ZSxcbiAgICAgICAgc2NhbGU6IDQ2LFxuICAgICAgICBzZXRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgeFBvc2l0aW9uOiAzLjYsXG4gICAgICAgIHlQb3NpdGlvbjogMC41LFxuICAgICAgICB6UG9zaXRpb246IDMsXG4gICAgICAgIHNldFJvdGF0aW9uOiB0cnVlLFxuICAgICAgICBheGlzOiAnWScsXG4gICAgICAgIHJvdGF0aW9uOiAtNDUgLyBNYXRoLlBJLFxuICAgICAgICBib3hQb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICBhcjoge1xuICAgICAgICAgICAgbGlnaHRQb3NpdGlvbjogJzAgMTUgMCcsXG4gICAgICAgICAgICByb3RhdGlvbjogJzQ1IDkwIC05MCcsXG4gICAgICAgICAgICBzY2FsZTogJzQwIDQwIDQwJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnMCAwIDEuNScsXG4gICAgICAgICAgICBsaWdodEludGVuc2l0eTogMi41LFxuICAgICAgICB9XG4gICAgfSxcbiAgICBiYXNpbGlzazoge1xuICAgICAgICBsb29wQ2FtOiAnQmFzaWxpc2snLFxuICAgICAgICBhc3NldDogJ0Jhc2lsaXNrJyxcbiAgICAgICAgc2V0U2NhbGU6IHRydWUsXG4gICAgICAgIHNjYWxlOiAyMTAsXG4gICAgICAgIHNldFBvc2l0aW9uOiB0cnVlLFxuICAgICAgICB4UG9zaXRpb246IDIuOSxcbiAgICAgICAgeVBvc2l0aW9uOiAtMyxcbiAgICAgICAgelBvc2l0aW9uOiAyLFxuICAgICAgICBzZXRSb3RhdGlvbjogdHJ1ZSxcbiAgICAgICAgYXhpczogJ1knLFxuICAgICAgICByb3RhdGlvbjogMzIgLyBNYXRoLlBJLFxuICAgICAgICBib3hQb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICBhcjoge1xuICAgICAgICAgICAgbGlnaHRQb3NpdGlvbjogJzAgMTAgLTUnLFxuICAgICAgICAgICAgcm90YXRpb246ICc5MCA5MCAtOTAnLFxuICAgICAgICAgICAgc2NhbGU6ICc2MCA2MCA2MCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJzAgMCAxJyxcbiAgICAgICAgICAgIGxpZ2h0SW50ZW5zaXR5OiAyLjUsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJhdW06IHtcbiAgICAgICAgbG9vcENhbTogJ0JhdW0nLFxuICAgICAgICBhc3NldDogJ0JhdW0nLFxuICAgICAgICBzZXRTY2FsZTogdHJ1ZSxcbiAgICAgICAgc2NhbGU6ICcwJyxcbiAgICAgICAgc2V0UG9zaXRpb246IGZhbHNlLFxuICAgICAgICB4UG9zaXRpb246ICcnLFxuICAgICAgICB5UG9zaXRpb246ICcnLFxuICAgICAgICB6UG9zaXRpb246ICcnLFxuICAgICAgICBzZXRSb3RhdGlvbjogZmFsc2UsXG4gICAgICAgIGF4aXM6ICcnLFxuICAgICAgICByb3RhdGlvbjogJycsXG4gICAgICAgIGJveFBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgIGFyOiB7XG4gICAgICAgICAgICBsaWdodFBvc2l0aW9uOiAnMCAxMCAtNScsXG4gICAgICAgICAgICByb3RhdGlvbjogJzkwIDkwIC05MCcsXG4gICAgICAgICAgICBzY2FsZTogJzAuMiAwLjIgMC4yJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnMCAwIDEuNScsXG4gICAgICAgICAgICBsaWdodEludGVuc2l0eTogMS41LFxuICAgICAgICB9XG4gICAgfSxcbiAgICBlaWVyOiB7XG4gICAgICAgIGxvb3BDYW06ICdFaWVyJyxcbiAgICAgICAgYXNzZXQ6ICdFaWVyJyxcbiAgICAgICAgc2V0U2NhbGU6IHRydWUsXG4gICAgICAgIHNjYWxlOiA0NixcbiAgICAgICAgc2V0UG9zaXRpb246IHRydWUsXG4gICAgICAgIHhQb3NpdGlvbjogLTQuOCxcbiAgICAgICAgeVBvc2l0aW9uOiAtMyxcbiAgICAgICAgelBvc2l0aW9uOiAzLFxuICAgICAgICBzZXRSb3RhdGlvbjogdHJ1ZSxcbiAgICAgICAgYXhpczogJ1knLFxuICAgICAgICByb3RhdGlvbjogNTcgLyBNYXRoLlBJLFxuICAgICAgICBib3hQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgYXI6IHtcbiAgICAgICAgICAgIGxpZ2h0UG9zaXRpb246ICcwIDEwIC0xMCcsXG4gICAgICAgICAgICByb3RhdGlvbjogJy05MCA5MCAtOTAnLFxuICAgICAgICAgICAgc2NhbGU6ICcyMCAyMCAyMCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJzAgMCAxJyxcbiAgICAgICAgICAgIGxpZ2h0SW50ZW5zaXR5OiAxLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBqb2JvbGQ6IHtcbiAgICAgICAgbG9vcENhbTogJ0pvYm9sZCcsXG4gICAgICAgIGFzc2V0OiAnSm9ib2xkJyxcbiAgICAgICAgc2V0U2NhbGU6IHRydWUsXG4gICAgICAgIHNjYWxlOiAnMzUnLFxuICAgICAgICBzZXRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgeFBvc2l0aW9uOiAnJyxcbiAgICAgICAgeVBvc2l0aW9uOiAnLTInLFxuICAgICAgICB6UG9zaXRpb246ICcnLFxuICAgICAgICBzZXRSb3RhdGlvbjogZmFsc2UsXG4gICAgICAgIGF4aXM6ICcnLFxuICAgICAgICByb3RhdGlvbjogJycsXG4gICAgICAgIGJveFBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgIGFyOiB7XG4gICAgICAgICAgICBsaWdodFBvc2l0aW9uOiAnMSAyMCA1JyxcbiAgICAgICAgICAgIHJvdGF0aW9uOiAnLTkwIDkwIC05MCcsXG4gICAgICAgICAgICBzY2FsZTogJzE1IDE1IDE1JyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnMCAwIDEnLFxuICAgICAgICAgICAgbGlnaHRJbnRlbnNpdHk6IDIsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1haW46IHtcbiAgICAgICAgbG9vcENhbTogJ01haW4nLFxuICAgICAgICBhc3NldDogJ0NodXBhY2FicmEnLFxuICAgICAgICBzZXRTY2FsZTogdHJ1ZSxcbiAgICAgICAgc2NhbGU6IDMsXG4gICAgICAgIHNldFBvc2l0aW9uOiB0cnVlLFxuICAgICAgICB4UG9zaXRpb246IDMsXG4gICAgICAgIHlQb3NpdGlvbjogLTIsXG4gICAgICAgIHpQb3NpdGlvbjogMixcbiAgICAgICAgc2V0Um90YXRpb246IHRydWUsXG4gICAgICAgIGF4aXM6IFwiWVwiLFxuICAgICAgICByb3RhdGlvbjogMzEuNSAvIE1hdGguUEksXG4gICAgICAgIGJveFBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgIGFyOiB7XG4gICAgICAgICAgICBsaWdodFBvc2l0aW9uOiAnMCA1IDAnLFxuICAgICAgICAgICAgcm90YXRpb246ICc5MCA5MCAtOTInLFxuICAgICAgICAgICAgc2NhbGU6ICcxLjUgMS41IDEuNScsXG4gICAgICAgICAgICBwb3NpdGlvbjogJzAgMCAxJyxcbiAgICAgICAgICAgIGxpZ2h0SW50ZW5zaXR5OiBcIjIuNVwiLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBuZXNzaWU6IHtcbiAgICAgICAgbG9vcENhbTogJ05lc3NpZScsXG4gICAgICAgIGFzc2V0OiAnTmVzc2llJyxcbiAgICAgICAgc2V0U2NhbGU6IHRydWUsXG4gICAgICAgIHNjYWxlOiAzNSxcbiAgICAgICAgc2V0UG9zaXRpb246IHRydWUsXG4gICAgICAgIHhQb3NpdGlvbjogMC41LFxuICAgICAgICB5UG9zaXRpb246IC0yLjQsXG4gICAgICAgIHpQb3NpdGlvbjogLTEsXG4gICAgICAgIHNldFJvdGF0aW9uOiB0cnVlLFxuICAgICAgICBheGlzOiBcIllcIixcbiAgICAgICAgcm90YXRpb246IE1hdGguUEkgLyAzLjUsXG4gICAgICAgIGJveFBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgIGFyOiB7XG4gICAgICAgICAgICBsaWdodFBvc2l0aW9uOiAnMCA1IDAnLFxuICAgICAgICAgICAgcm90YXRpb246ICctMTEwIDkwIC05MCcsXG4gICAgICAgICAgICBzY2FsZTogJzE1IDE1IDE1JyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnMCAwIDEnLFxuICAgICAgICAgICAgbGlnaHRJbnRlbnNpdHk6IDIuNSxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgd29scGVydGluZ2VyOiB7XG4gICAgICAgIGxvb3BDYW06ICdXb2xwZXJ0aW5nZXInLFxuICAgICAgICBhc3NldDogJ1dvbHBlcnRpbmdlcicsXG4gICAgICAgIHNldFNjYWxlOiB0cnVlLFxuICAgICAgICBzY2FsZTogNDYsXG4gICAgICAgIHNldFBvc2l0aW9uOiB0cnVlLFxuICAgICAgICB4UG9zaXRpb246IC0wLjIsXG4gICAgICAgIHlQb3NpdGlvbjogLTEuMixcbiAgICAgICAgelBvc2l0aW9uOiAtMSxcbiAgICAgICAgc2V0Um90YXRpb246IGZhbHNlLFxuICAgICAgICBheGlzOiAnJyxcbiAgICAgICAgcm90YXRpb246ICcnLFxuICAgICAgICBib3hQb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICBhcjoge1xuICAgICAgICAgICAgbGlnaHRQb3NpdGlvbjogJzAgNSAwJyxcbiAgICAgICAgICAgIHJvdGF0aW9uOiAnLTkwIDkwIC05MCcsXG4gICAgICAgICAgICBzY2FsZTogJzIwIDIwIDIwJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnMCAwIDEnLFxuICAgICAgICAgICAgbGlnaHRJbnRlbnNpdHk6IDEsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHlldGk6IHtcbiAgICAgICAgbG9vcENhbTogJ1lldGknLFxuICAgICAgICBhc3NldDogJ1lldGknLFxuICAgICAgICBzZXRTY2FsZTogdHJ1ZSxcbiAgICAgICAgc2NhbGU6IDUwLFxuICAgICAgICBzZXRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgeFBvc2l0aW9uOiAwLjUsXG4gICAgICAgIHlQb3NpdGlvbjogLTIuNCxcbiAgICAgICAgelBvc2l0aW9uOiAtMSxcbiAgICAgICAgc2V0Um90YXRpb246IGZhbHNlLFxuICAgICAgICBheGlzOiAnJyxcbiAgICAgICAgcm90YXRpb246ICcnLFxuICAgICAgICBib3hQb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICBhcjoge1xuICAgICAgICAgICAgbGlnaHRQb3NpdGlvbjogJzAgMTAgLTUnLFxuICAgICAgICAgICAgcm90YXRpb246ICctOTAgOTAgLTkwJyxcbiAgICAgICAgICAgIHNjYWxlOiAnMjAgMjAgMjAnLFxuICAgICAgICAgICAgcG9zaXRpb246ICcwIDAgMScsXG4gICAgICAgICAgICBsaWdodEludGVuc2l0eTogMS4yLFxuICAgICAgICB9XG4gICAgfVxufTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/main/charsConfig.js\n");

/***/ }),

/***/ 1:
/*!***********************************!*\
  !*** multi ./src/js/arjs/arjs.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/marcpeternell/code/asp/src/js/arjs/arjs.js */"./src/js/arjs/arjs.js");


/***/ })

/******/ });