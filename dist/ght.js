(function () {
  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Create a safe reference to the ght object for use below.
  var ght = function (obj) {
    if (obj instanceof ght) return obj;
    if (!(this instanceof ght)) return new ght(obj);
    this._wrapped = obj;
  };

  // Export the ght object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `ght` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = ght;
    }
    exports.ght = ght;
  } else {
    root.ght = ght;
  }

  // Current version.
  ght.VERSION = '2.1.1';

  //English and Persian characters
  var enChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    faChars = ['ا', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی'];

  var isSpace = function (char) {
    return char === ' ';
  };

  ght.decode = function (input) {
    var decodeStr = [];

    for (var i in input) {
      var char = input[i];
      if (isSpace(char)) {
        decodeStr.push(' ');
      } else if (isNaN(char)) {//char is string
        var index = enChars.indexOf(char);

        var ConvertChar = faChars[index];
        decodeStr.push(ConvertChar);
      } else { //char is number
        var index = parseInt(char);
        var faIndex = 25 + index;

        var ConvertChar = faChars[faIndex];
        decodeStr.push(ConvertChar);
      }
    }

    return decodeStr.join('');
  };

  ght.encode = function (input) {
    var encodeStr = [];

    for (var i in input) {
      var char = input[i];
      if (isSpace(char)) {
        encodeStr.push(' ');
      } else {//char is string
        var index = faChars.indexOf(char);
        if (index < 25) {
          encodeStr.push(enChars[index]);
        } else {
          encodeStr.push((index - 25));
        }
      }
    }

    return encodeStr.join('');
  };

  // Register ght angular module
  // ght service avilable
  if (typeof angular === 'object') {
    angular.module('ght', [])
      .service('ght', function () {
        return ght;
      });
  }

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, ght registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('ght', [], function() {
      return ght;
    });
  }
}.call(this));
