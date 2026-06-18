"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethodSchema = exports.HttpMethod = exports.configurePermissionChecker = exports.declareRoute = void 0;
var declare_route_1 = require("./declare-route");
Object.defineProperty(exports, "declareRoute", { enumerable: true, get: function () { return declare_route_1.declareRoute; } });
Object.defineProperty(exports, "configurePermissionChecker", { enumerable: true, get: function () { return declare_route_1.configurePermissionChecker; } });
var http_method_1 = require("./http-method");
Object.defineProperty(exports, "HttpMethod", { enumerable: true, get: function () { return http_method_1.HttpMethod; } });
Object.defineProperty(exports, "HttpMethodSchema", { enumerable: true, get: function () { return http_method_1.HttpMethodSchema; } });
