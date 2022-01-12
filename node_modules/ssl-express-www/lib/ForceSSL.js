'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  var local = req.url;
  var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  var www = req.headers.host.replace(/www\./gi, '');
  var fullUrl = 'https://' + www + local;
  var removeSlash = function removeSlash(site) {
    return site.replace(/\/$/, '');
  };

  var notLocalHost = function notLocalHost() {
    return www.indexOf('localhost') < 0;
  };

  if (notLocalHost() && schema !== 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (notLocalHost() && /^www\./i.test(req.headers.host) && schema === 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (notLocalHost() && /\/$/.test(fullUrl) && fullUrl !== 'https://' + www + '/') {
    res.redirect(removeSlash(fullUrl));
  }

  return next();
};

module.exports = exports['default'];