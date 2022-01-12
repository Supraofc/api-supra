"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryParameter = exports.getDuration = void 0;
var url_1 = require("url");
var getDuration = function (s) {
    s = s.replace(/:/g, ".");
    var spl = s.split(".");
    if (spl.length === 0)
        return +spl;
    else {
        var sumStr = spl.pop();
        if (sumStr !== undefined) {
            var sum = +sumStr;
            if (spl.length === 1)
                sum += +spl[0] * 60;
            if (spl.length === 2) {
                sum += +spl[1] * 60;
                sum += +spl[0] * 3600;
            }
            return sum;
        }
        else {
            return 0;
        }
    }
};
exports.getDuration = getDuration;
var getQueryParameter = function (url, queryName) {
    try {
        return new url_1.URL(url).searchParams.get(queryName) || url;
    }
    catch (err) {
        /* not an URL */
        return url;
    }
};
exports.getQueryParameter = getQueryParameter;
