'use strict';

var baseHelper = function () {};

baseHelper.prototype.error = function(message) {
	return  {
        status : 'error',
        error  : message,
        data   : null
    }
}

baseHelper.prototype.response = function (res, obj, status) {
  res.format({
    json: () => {
      if (status) return res.status(status).json(obj);
      res.json(obj);
    }
  });
}

baseHelper.prototype.success = function(data) {
	return  {
        status : 'ok',
        data   : data
    }
}

module.exports = new baseHelper();
