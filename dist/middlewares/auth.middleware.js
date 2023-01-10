"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = isAdmin;
exports.isAuthenticated = isAuthenticated;
exports.isFaculty = isFaculty;
exports.isPanelHead = isPanelHead;
exports.isStudent = isStudent;

var _utils = require("../utils");

async function isAuthenticated(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json((0, _utils.Response)(401, "Unauthorized"));
    }

    const user = (0, _utils.verifyToken)(token);

    if (!user) {
      return res.status(401).json((0, _utils.Response)(401, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
  }
}

async function isFaculty(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json((0, _utils.Response)(401, "Unauthorized"));
    }

    const user = (0, _utils.verifyToken)(token);

    if (!user || !(user.role === "faculty" || user.role === "panel_head" || user.role === "admin")) {
      return res.status(401).json((0, _utils.Response)(401, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
  }
}

async function isPanelHead(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json((0, _utils.Response)(401, "Unauthorized"));
    }

    const user = (0, _utils.verifyToken)(token);

    if (!user || !(user.role === "panel_head" || user.role === "admin")) {
      return res.status(401).json((0, _utils.Response)(401, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
  }
}

async function isAdmin(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json((0, _utils.Response)(401, "Unauthorized"));
    }

    const user = (0, _utils.verifyToken)(token);

    if (!user || user.role !== "admin") {
      return res.status(401).json((0, _utils.Response)(401, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
  }
}

async function isStudent(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json((0, _utils.Response)(401, "Unauthorized"));
    }

    const user = (0, _utils.verifyToken)(token);

    if (!user || user.role !== "student") {
      return res.status(401).json((0, _utils.Response)(401, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json((0, _utils.Response)(500, "Internal Server Error", error));
  }
}