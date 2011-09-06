var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
!(function(timeout) {
  var _timeouts;
  _timeouts = {};
  return timeout.timeout = function(name, delay, fn) {
    var args, data, resetTimeout;
    if (typeof name === 'string') {
      args = Array.prototype.slice.call(arguments, 3);
      if (name in _timeouts) {
        data = _timeouts[name];
        clearTimeout(data.id);
      } else {
        _timeouts[name] = data = {};
      }
    } else {
      fn = delay;
      delay = name;
      name = null;
      args = Array.prototype.slice.call(arguments, 2);
      data = {};
    }
    if (fn) {
      resetTimeout = function() {
        return data.id = setTimeout(data.fn, delay);
      };
      data.fn = __bind(function() {
        if (fn.apply(this, args) === true) {
          return resetTimeout();
        } else {
          return delete _timeouts[name];
        }
      }, this);
      return resetTimeout();
    } else {
      if (delay != null) {
        return data.fn();
      } else {
        return delete _timeouts[name];
      }
    }
  };
})(typeof exports !== "undefined" && exports !== null ? exports : (this['timeout'] = {}));