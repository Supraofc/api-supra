"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosRequestInterceptor = void 0;
var axios_1 = __importDefault(require("axios"));
var constants_1 = require("../constants");
var axiosInstance = axios_1.default.create();
var axiosRequestInterceptor = function (config) {
    var _a, _b;
    if (((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === "POST") {
        config.params = __assign({ key: constants_1.INNERTUBE_API_KEY }, config.params);
        config.data = __assign({ context: {
                client: {
                    clientName: "WEB",
                    clientVersion: constants_1.INNERTUBE_CLIENT_VERSION,
                },
            } }, config.data);
    }
    else if (((_b = config.method) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === "GET") {
        config.headers = {
            "x-youtube-client-version": constants_1.INNERTUBE_CLIENT_VERSION,
            "x-youtube-client-name": 1,
        };
        config.params = __assign({}, config.params);
    }
    return config;
};
exports.axiosRequestInterceptor = axiosRequestInterceptor;
axiosInstance.interceptors.request.use(exports.axiosRequestInterceptor);
axiosInstance.defaults.validateStatus = function () { return true; };
exports.default = axiosInstance;
