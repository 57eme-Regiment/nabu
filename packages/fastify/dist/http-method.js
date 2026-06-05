"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethodSchema = exports.HttpMethod = void 0;
const zod_1 = require("zod");
exports.HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
};
exports.HttpMethodSchema = zod_1.z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
