"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = Response;
exports.generateToken = generateToken;
exports.hash = hash;
exports.verifyHash = verifyHash;
exports.verifyToken = verifyToken;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Response(statusCode, message, data = null) {
  return {
    statusCode,
    message,
    data
  };
}

async function hash(value) {
  return await _bcryptjs.default.hash(value, 12);
}

async function verifyHash(plain, hashed) {
  return await _bcryptjs.default.compare(plain, hashed);
}

function generateToken(payload) {
  return _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '5d'
  });
}

function verifyToken(token) {
  return _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
}