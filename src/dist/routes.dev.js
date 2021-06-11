"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _LoginPage = _interopRequireDefault(require("./pages/LoginPage"));

var _RegisterPage = _interopRequireDefault(require("./pages/RegisterPage"));

var _HomePage = _interopRequireDefault(require("./pages/HomePage"));

var _ChatPage = _interopRequireDefault(require("./pages/ChatPage"));

var _EditProfilePage = _interopRequireDefault(require("./pages/EditProfilePage"));

var _Error = _interopRequireDefault(require("./pages/Error"));

var _Profile = _interopRequireDefault(require("./pages/Profile"));

var _OtherProfile = _interopRequireDefault(require("./components/OtherProfile/OtherProfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ROUTES = [{
  path: "/",
  exact: true,
  main: _HomePage["default"]
}, {
  path: "/chat",
  exact: true,
  main: _ChatPage["default"]
}, {
  path: "/edit",
  exact: true,
  main: _EditProfilePage["default"]
}, {
  path: "/login",
  exact: true,
  main: _LoginPage["default"]
}, {
  path: "/register",
  exact: true,
  main: _RegisterPage["default"]
}, {
  path: "/error-404",
  exact: true,
  main: _Error["default"]
}, {
  path: "/myProfile",
  exact: true,
  main: _Profile["default"]
}, {
  path: "/profile/:username",
  exact: true,
  main: _OtherProfile["default"]
}];
var _default = ROUTES;
exports["default"] = _default;