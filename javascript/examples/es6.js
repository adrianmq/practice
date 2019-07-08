/* 
    Es6 features

    Sources:
        http://es6-features.org
*/

/* 
    Constants = immutable variables, variables cannot be re-assigned new content
    Notice: this only makes the variable itself immutable, not its assigned content (for instance, in case the content is an object, this means the object itself can still be altered).
*/
const PI_1 = 3.141593;
console.log(PI_1 > 3);

//  only in ES5 through the help of object properties
//  and only in global context and not in a block scope
Object.defineProperty(typeof global === "object" ? global : window, "PI_2", {
  value: 3.141593,
  enumerable: true,
  writable: false,
  configurable: false
});
console.log(PI_2 > 3);

/* Scoping

    Block scoped variables (and constants) without hoisting
 */
// EcmaScript 6
var a,
  b = [1, 2, 3];
for (let i = 0; i < a.length; i++) {
  let x = a[i];
}
for (let i = 0; i < b.length; i++) {
  let y = b[i];
}

let callbacks = [];
for (let i = 0; i <= 2; i++) {
  callbacks[i] = function() {
    return i * 2;
  };
}
callbacks[0]() === 0;
callbacks[1]() === 2;
callbacks[2]() === 4;

// EcmaScript 5
var a,
  b = [1, 2, 3];
var i, x, y;
for (i = 0; i < a.length; i++) {
  x = a[i];
}
for (i = 0; i < b.length; i++) {
  y = b[i];
}

var callbacks = [];
for (var i = 0; i <= 2; i++) {
  (function(i) {
    callbacks[i] = function() {
      return i * 2;
    };
  })(i);
}
callbacks[0]() === 0;
callbacks[1]() === 2;
callbacks[2]() === 4;

/* Scoping

    Block-Scoped Functions
*/
// EcmaScript 6
{
  function foo() {
    return 1;
  }
  foo() === 1;
  {
    function foo() {
      return 2; 
    }
    foo() === 2;
  }
  foo() === 1;
}

// EcmaScript 5
//  only in ES5 with the help of block-scope emulating function scopes and function expressions using IIFEs
(function() {
  var foo = function() {
    return 1;
  };
  foo() === 1;
  (function() {
    var foo = function() {
      return 2;
    };
    foo() === 2;
  })();
  foo() === 1;
})();

/* Arrow Functions

*/
/* Expression bodies -> More expressive closure syntax*/
// EcmaScript 6
var odds = evens.map(v => v + 1);
var pairs = evens.map(v => ({ even: v, odd: v + 1 }));
var nums = evens.map((v, i) => v + i);
// EcmaScript 5
var odds = evens.map(function(v) {
  return v + 1;
});
var pairs = evens.map(function(v) {
  return { even: v, odd: v + 1 };
});
var nums = evens.map(function(v, i) {
  return v + i;
});

/* Statement Bodies -> More expressive closure syntax*/
// EcmaScript 6
nums.forEach(v => {
  if (v % 5 === 0) fives.push(v);
});
// EcmaScript 5
nums.forEach(function(v) {
  if (v % 5 === 0) fives.push(v);
});

/* Lexical 'this' = more intuitive handling of current object context */
// EcmaScript 6
this.nums.forEach(v => {
  if (v % 5 === 0) this.fives.push(v);
});
// EcmaScript 5
//  variant 1
var self = this;
this.nums.forEach(function(v) {
  if (v % 5 === 0) self.fives.push(v);
});
//  variant 2
this.nums.forEach(function(v) {
  if (v % 5 === 0) this.fives.push(v);
}, this);
//  variant 3 (since ECMAScript 5.1 only)
this.nums.forEach(
  function(v) {
    if (v % 5 === 0) this.fives.push(v);
  }.bind(this)
);

/* Extended Parameter Handling

*/
/* Default parameter values
    Simple and intuitive default values for function parameters.
*/
// ES6
function f(x, y = 7, z = 42) {
  return x + y + z;
}
f(1) === 50;
// ES5
function f(x, y, z) {
  if (y === undefined) y = 7;
  if (z === undefined) z = 42;
  return x + y + z;
}
f(1) === 50;

/* Rest parameter
    Aggregation of remaining arguments into single parameter of variadic functions
*/
// ES6
function f(x, y, ...a) {
  return (x + y) * a.length;
}
f(1, 2, "hello", true, 7) === 9;
// ES5
function f(x, y) {
  var a = Array.prototype.slice.call(arguments, 2);
  return (x + y) * a.length;
}
f(1, 2, "hello", true, 7) === 9;

/* Spread operator
    Spreading of elements of an iterable collection (like an array or over a string) into both literal elements and individual function parameters
*/
// ES6
var params = ["hello", true, 7];
var other = [1, 2, ...params]; // [ 1, 2, "hello", true, 7 ]
function f(x, y, ...a) {
  return (x + y) * a.length;
}
f(1, 2, ...params) === 9;
var str = "foo";
var chars = [...str]; // [ "f", "o", "o" ]
// ES5
var params = ["hello", true, 7];
var other = [1, 2].concat(params); // [ 1, 2, "hello", true, 7 ]
function f(x, y) {
  var a = Array.prototype.slice.call(arguments, 2);
  return (x + y) * a.length;
}
f.apply(undefined, [1, 2].concat(params)) === 9;
var str = "foo";
var chars = str.split(""); // [ "f", "o", "o" ]

/* Template literals

*/
/* String interpolation
    Intuitive expression interpolation for single-line and multi-line strings
    Notice: don't be confused, Template Literals were originally named "Template Strings" in the drafts of the ECMAScript 6 language specification
*/
// ES6
var customer = { name: "Foo" };
var card = { amount: 7, product: "Bar", unitprice: 42 };
var message = `Hello ${customer},
wnat to buy ${card.amount} ${card.product} for
a total of ${card.amount * card.unitprice} bucks?`;
// ES5
var customer = { name: "Foo" };
var card = { amount: 7, product: "Bar", unitprice: 42 };
var message =
  "Hello " +
  customer.name +
  ",\n" +
  "want to buy " +
  card.amount +
  " " +
  card.product +
  " for\n" +
  "a total of " +
  card.amount * card.unitprice +
  " bucks?";

/* Custom interpolation
    Flexible expression interpolation for arbitrary methods
*/
// ES6
get`http://example.com/foo?bar=${bar + baz}&quux=${quux}`;
// ES5
get(["http://example.com/foo?bar=", "&quux=", ""], bar + baz, quux);

/* Raw string access
    Access the raw template string content (backslashes are not interpreted)
*/
// ES6
function quux(strings, ...values) {
  strings[0] === "foo\n";
  strings[1] === "bar";
  strings.raw[0] === "foo\\n";
  strings.raw[1] === "bar";
  values[0] === 42;
}
quux`foo\n${42}bar`;
String.raw`foo\n${42}bar` === "foo\\n42bar";
// ES5
// no equivalent

/* Extended literals

*/
/* Binary & Octal Literal
    Direct support for safe binary and octal literals
*/
// ES6
0b111110111 === 503;
0o767 === 503;
// ES5
parseInt("111110111", 2) === 503;
parseInt("767", 8) === 503;
0767 === 503; // only in non-strict, backward compatibility mode

/* Unicode String & RegExp Literal
    Extended support using Unicode strings and regular expressions
*/
// ES6
"𠮷".length === 2;
"𠮷".match(/./u)[0].length === 2;
"𠮷" === "\uD842\uDFB7";
"𠮷" === "\u{20BB7}";
"𠮷".codePointAt(0) == 0x20bb7;
for (let codepoint of "𠮷") console.log(codepoint);
// ES5
"𠮷".length === 2;
"𠮷".match(
  /(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF][\uD800-\uDBFF][\uDC00-\uDFFF][\uD800-\uDBFF](?![\uDC00-\uDFFF])(?:[^\uD800-\uDBFF]^)[\uDC00-\uDFFF])/
)[0].length === 2;
"𠮷" === "\uD842\uDFB7";
//  no equivalent in ES5
//  no equivalent in ES5
//  no equivalent in ES5

/* Enhanced regular expressions

*/
/* Regular Expression Sticky Matching
    Keep the matching position sticky between matches and this way suppot efficient parsing of arbitrary long input strings,
    even with an arbitrary number of distinct regular expressions.
*/
// ES6
let parser = (input, match) => {
  for (let pos = 0, lastPos = input.length; pos < lastPos; ) {
    for (let i = 0; i < match.length; i++) {
      match[i].pattern.lastIndex = pos;
      let found;
      if ((found = match[i].pattern.exec(input)) !== null) {
        match[i].action(found);
        pos = match[i].pattern.lastIndex;
        break;
      }
    }
  }
};

let report = match => {
  console.log(JSON.stringify(match));
};
parser("Foo 1 Bar 7 Baz 42", [
  { pattern: /Foo\s+(\d+)/y, action: match => report(match) },
  { pattern: /Bar\s+(\d+)/y, action: match => report(match) },
  { pattern: /Baz\s+(\d+)/y, action: match => report(match) },
  { pattern: /\s*/y, action: match => {} }
]);

// ES5
var parser = function(input, match) {
  for (var i, found, inputTmp = input; inputTmp !== ""; ) {
    for (i = 0; i < match.length; i++) {
      if ((found = match[i].pattern.exec(inputTmp)) !== null) {
        match[i].action(found);
        inputTmp = inputTmp.substr(found[0].length);
        break;
      }
    }
  }
};

var report = function(match) {
  console.log(JSON.stringify(match));
};
parser("Foo 1 Bar 7 Baz 42", [
  {
    pattern: /^Foo\s+(\d+)/,
    action: function(match) {
      report(match);
    }
  },
  {
    pattern: /^Bar\s+(\d+)/,
    action: function(match) {
      report(match);
    }
  },
  {
    pattern: /^Baz\s+(\d+)/,
    action: function(match) {
      report(match);
    }
  },
  { pattern: /^\s*/, action: function(match) {} }
]);

/* Enhanced Object Properties

*/
/* Property shorthand
    Shorter syntax for common object property definition idiom
*/
// ES6
var x = 0,
  y = 0;
var obj = { x, y };
// ES5
var x = 0,
  y = 0;
var obj = { x: x, y: y };

/* Computed property names
    Support for computed names in object property definitions.
*/
// ES6
let obj = {
  foo: "bar",
  ["baz" + quux()]: 42
};
// ES5
var obj = {
  foo: "bar"
};
obj["baz" + quux()] = 42;

/* Method properties
    Support for method notation in object property definitions, for both regular functions and generators
*/
// ES6
obj = {
  foo(a, b) {},
  bar(x, y) {},
  *quux(x, y) {
    yield "pass";
  }
};
// ES5
obj = {
  foo: function(a, b) {},
  bar: function(x, y) {}
  // quux: no equivalent in ES5
};

/* Destructuring assignment

*/
/* Array Matching
    Intuitive and flexible destructuring of Arrays into individual variables during assignment
*/
// ES6
var list = [1, 2, 3];
var [a, b] = (list[(b, a)] = [a, b]);
// ES5
var list = [1, 2, 3];
var a = list[0],
  b = list[2];
var tmp = a;
a = b;
b = tmp;

/* Object Matching, Shorthand Notation
    Intuitive and flexible destructuring of Objects into individual variables during assignment
*/
// ES6
var { op, lhs, rhs } = getASTNode();
// ES5
var tmp = getASTNode();
var op = tmp.op;
var lhs = tmp.lhs;
var rhs = tmp.rhs;

/* Object Matching, Deep Matching
    Intuitive and flexible destructuring of Objects into individual variables during assignment
*/
// ES6
var {
  op: a,
  lhs: { op: b },
  rhs: c
} = getASTNode();
// ES5
var tmp = getASTNode();
var a = tmp.op;
var b = tmp.lhs.op;
var c = tmp.rhs;

/* Object and Array Mathching , Default Values
    Simple and intuitive default values for destructuring of Objects and Arrays
*/
// ES6
var obj = { a: 1 };
var list = [1];
var { a, b = 2 } = obj;
var [x, y = 2] = list;
// ES5
var obj = { a: 1 };
var list = [1];
var a = obj.a;
var b = obj.b === undefined ? 2 : obj.b;
var x = list[0];
var y = list[1] === undefined ? 2 : list[1];

/* Parameter Context Matching
    Intuitive and flexible destructuring of Arrays and Objects into individual parameters during function calls
*/
// ES6
function f([name, val]) {
  console.log(name, val);
}
function g({ name: n, val: v }) {
  console.log(n, v);
}
function h({ name, val }) {
  console.log(name, val);
}
f(["bar", 42]);
g({ name: "foo", val: 7 });
h({ name: "bar", val: 42 });
// ES5
function f(arg) {
  var name = arg[0];
  var val = arg[1];
  console.log(name, val);
}
function g(arg) {
  var n = arg.name;
  var v = arg.val;
  console.log(n, v);
}
function h(arg) {
  var name = arg.name;
  var val = arg.val;
  console.log(name, val);
}
f(["bar", 42]);
g({ name: "foo", val: 7 });
h({ name: "bar", val: 42 });

/* Fail-Soft Destructuring
    Fail-Soft destructuring, optionally with defaults
*/
// ES6
var list = [7, 42];
var [a = 1, b = 2, c = 3, d] = list;
a === 7;
b === 42;
c === 3;
d === undefined;
// ES5
var list = [7, 42];
var a = typeof list[0] !== "undefined" ? list[0] : 1;
var b = typeof list[1] !== "undefined" ? list[1] : 2;
var c = typeof list[2] !== "undefined" ? list[2] : 3;
var d = typeof list[3] !== "undefined" ? list[3] : undefined;
a === 7;
b === 42;
c === 3;
d === undefined;

/* Modules

*/
/* Value Export/Import
  Support for exporting/importing values form/to modules without global namespace pollution
*/
// ES6
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
// someApp.js
import * as math from "lib/math";
console.log("2pi = " + math.sum(math.pi, math.pi));
// otherApp.js
import { sum, pi } from "lib/math";
console.log("2pi = " + sum(pi, pi));
// ES5
//  lib/math.js
LibMath = {};
LibMath.sum = function(x, y) {
  return x + y;
};
LibMath.pi = 3.141593;
//  someApp.js
var math = LibMath;
console.log("2π = " + math.sum(math.pi, math.pi));
//  otherApp.js
var sum = LibMath.sum,
  pi = LibMath.pi;
console.log("2π = " + sum(pi, pi));

/* Default and wildcard
  Marking a value as the default exported value and mass-mixin of values
*/
// ES6
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71;
export default x => Math.exp(x);
// someApp.js
import exp, { pi, e } from "lib/mathplusplus";
console.log("e^{pi} = " + exp(pi));
// ES5
//  lib/mathplusplus.js
LibMathPP = {};
for (symbol in LibMath)
  if (LibMath.hasOwnProperty(symbol)) LibMathPP[symbol] = LibMath[symbol];
LibMathPP.e = 2.71828182846;
LibMathPP.exp = function(x) {
  return Math.exp(x);
};
//  someApp.js
var exp = LibMathPP.exp,
  pi = LibMathPP.pi,
  e = LibMathPP.e;
console.log("e^{π} = " + exp(pi));

/* Classes

*/
/* Class definition
    More intuitive, OOP-style and boilerplate-free classes
*/
class Shape {
  constructor(id, x, y) {
    this.id = id;
    this.move(x, y);
  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}
// ES5
var Shape = function(id, x, y) {
  this.id = id;
  this.move(x, y);
};
Shape.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;
};

/* Class inheritance
    More intuitive, OOP-style and boilerplate-free inheritance
*/
class Rectangle extends Shape {
  constructor(id, x, y, width, height) {
    super(id, x, y);
    this.width = width;
    this.height = height;
  }
}
class Circle extends Shape {
  constructor(id, x, y, radius) {
    super(id, x, y);
    this.radius = radius;
  }
}
// ES5
var Rectangle = function(id, x, y, width, height) {
  Shape.call(this, id, x, y);
  this.width = width;
  this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
var Circle = function(id, x, y, radius) {
  Shape.call(this, id, x, y);
  this.radius = radius;
};
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

/* Class inheritance, From Expressions
  Support for mixin-style inheritance by extending from expressions yielding function objects
  Notice: the generic aggregation function is usually provided by a library like this one, of course
*/
var aggregation = (baseClass, ...mixins) => {
  let base = class _Combined extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach(mixin => {
        mixin.prototype.initializer.call(this);
      });
    }
  };
  let copyProps = (target, source) => {
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach(prop => {
        if (
          prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          return;
        Object.defineProperty(
          target,
          prop,
          Object.getOwnPropertyDescriptor(source, prop)
        );
      });
  };
  mixins.forEach(mixin => {
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};
class Colored {
  initializer() {
    this._color = "white";
  }
  get color() {
    return this._color;
  }
  set color(v) {
    this._color = v;
  }
}
class ZCoord {
  initializer() {
    this._z = 0;
  }
  get z() {
    return this._z;
  }
  set z(v) {
    this._z = v;
  }
}
class Shape {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  get x() {
    return this._x;
  }
  set x(v) {
    this._x = v;
  }
  get y() {
    return this._y;
  }
  set y(v) {
    this._y = v;
  }
}
class Rectangle extends aggregation(Shape, Colored, ZCoord) {}
var rect = new Rectangle(7, 42);
rect.z = 1000;
rect.color = "red";
console.log(rect.x, rect.y, rect.z, rect.color);
// ES5
var aggregation = function(baseClass, mixins) {
  var base = function() {
    baseClass.apply(this, arguments);
    mixins.forEach(
      function(mixin) {
        mixin.prototype.initializer.call(this);
      }.bind(this)
    );
  };
  base.prototype = Object.create(baseClass.prototype);
  base.prototype.constructor = base;
  var copyProps = function(target, source) {
    Object.getOwnPropertyNames(source).forEach(function(prop) {
      if (
        prop.match(
          /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
        )
      )
        return;
      Object.defineProperty(
        target,
        prop,
        Object.getOwnPropertyDescriptor(source, prop)
      );
    });
  };
  mixins.forEach(function(mixin) {
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};
var Colored = function() {};
Colored.prototype = {
  initializer: function() {
    this._color = "white";
  },
  getColor: function() {
    return this._color;
  },
  setColor: function(v) {
    this._color = v;
  }
};
var ZCoord = function() {};
ZCoord.prototype = {
  initializer: function() {
    this._z = 0;
  },
  getZ: function() {
    return this._z;
  },
  setZ: function(v) {
    this._z = v;
  }
};
var Shape = function(x, y) {
  this._x = x;
  this._y = y;
};
Shape.prototype = {
  getX: function() {
    return this._x;
  },
  setX: function(v) {
    this._x = v;
  },
  getY: function() {
    return this._y;
  },
  setY: function(v) {
    this._y = v;
  }
};
var _Combined = aggregation(Shape, [Colored, ZCoord]);
var Rectangle = function(x, y) {
  _Combined.call(this, x, y);
};
Rectangle.prototype = Object.create(_Combined.prototype);
Rectangle.prototype.constructor = Rectangle;
var rect = new Rectangle(7, 42);
rect.setZ(1000);
rect.setColor("red");
console.log(rect.getX(), rect.getY(), rect.getZ(), rect.getColor());

/* Base Class Access
    Intuitive access to base class constructor and methods
*/
class Shape {
  toString() {
    return `Shape(${this.id})`;
  }
}
class Rectangle extends Shape {
  constructor(id, x, y, width, height) {
    super(id, x, y);
    // other
  }
  toString() {
    return "Rectangle > " + super.toString();
  }
}
// ES5
var Shape = function(id, x, y) {
  //
};
Shape.prototype.toString = function(x, y) {
  return "Shape(" + this.id + ")";
};
var Rectangle = function(id, x, y, width, height) {
  Shape.call(this, id, x, y);
  //
};
Rectangle.prototype.toString = function() {
  return "Rectangle > " + Shape.prototype.toString.call(this);
};

/* Static Members
    Simple support for static class members
*/
class Rectangle extends Shape {
  //
  static defaultRectangle() {
    return new Rectangle("default", 0, 0, 100, 100);
  }
}
var defRectangle = Rectangle.defaultRectangle();
// ES5
var Rectangle = function(id, x, y, width, height) {
  //
};
Rectangle.defaultRectangle = function() {
  return new Rectangle("default", 0, 0, 100, 100);
};
var defRectangle = Rectangle.defaultRectangle();

/* Classes Getter/Setters
  Getter/Setter also directly within classes (and not just within object initializers, as it is possible since ECMAScript 5.1)
*/
class Rectangle {
    constructor (width, height) {
        this._width  = width
        this._height = height
    }
    set width  (width)  { this._width = width               }
    get width  ()       { return this._width                }
    set height (height) { this._height = height             }
    get height ()       { return this._height               }
    get area   ()       { return this._width * this._height }
}
var r = new Rectangle(50, 20)
r.area === 1000
// ES5
var Rectangle = function (width, height) {
    this._width  = width;
    this._height = height;
};
Rectangle.prototype = {
    set width  (width)  { this._width = width;               },
    get width  ()       { return this._width;                },
    set height (height) { this._height = height;             },
    get height ()       { return this._height;               },
    get area   ()       { return this._width * this._height; }
};
var r = new Rectangle(50, 20);
r.area === 1000;

/* Symbol Type

*/
/* Symbol Type
    Unique and immutable data type to be used as an identifier for object properties. Symbol can have an optional description, but for debugging purposes only.
*/
Symbol("foo") !== Symbol("foo")
const foo = Symbol()
const bar = Symbol()
typeof foo === "symbol"
typeof bar === "symbol"
let obj = {}
obj[foo] = "foo"
obj[bar] = "bar"
JSON.stringify(obj) // {}
Object.keys(obj) // []
Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [ foo, bar ]
// no equivalent in ES5

/*  Global Symbols
  Global symbols, indexed through unique keys.
*/
Symbol.for("app.foo") === Symbol.for("app.foo")
const foo = Symbol.for("app.foo")
const bar = Symbol.for("app.bar")
Symbol.keyFor(foo) === "app.foo"
Symbol.keyFor(bar) === "app.bar"
typeof foo === "symbol"
typeof bar === "symbol"
let obj = {}
obj[foo] = "foo"
obj[bar] = "bar"
JSON.stringify(obj) // {}
Object.keys(obj) // []
Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [ foo, bar ]
// no equivalent in ES5

/* Iterators

*/
/* Iterator & For-Of Operator
  Support "iterable" protocol to allow objects to customize their iteration behaviour.
  Additionally, support "iterator" protocol to produce sequence of values (either finite or infinite).
  Finally, provide convenient of operator to iterate over all values of an iterable object.
*/
// ES6
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0,
      cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur };
      }
    };
  }
};
for (let n of fibonacci) {
  if (n > 1000) break;
  console.log(n);
}
// ES5
var fibonacci = {
  next: (function() {
    var pre = 0,
      cur = 1;
    return function() {
      tmp = pre;
      pre = cur;
      cur += tmp;
      return cur;
    };
  })()
};
var n;
for (;;) {
  n = fibonacci.next();
  if (n > 1000) break;
  console.log(n);
}

/* Generators

*/
/* Generator Function, Iterator Protocol
    Support for generators, a special case of iterators containing a generator function, where the control flow can be paused and resumed, in order to produce sequence of values (either finite or infinite)
*/
let fibonacci = {
    *[Symbol.iterator]() {
        let pre = 0, cur = 1
        for (;;) {
            [ pre, cur ] = [ cur, pre + cur ]
            yield cur
        }
    }
}
for (let n of fibonacci) {
    if (n > 1000)
        break
    console.log(n)
}
// ES5 = same as interator

/* Generator Function, Direct Use
    Support for generator functions, a special variant of functions where the control flow can be paused and resumed, in order to produce sequence of values (either finite or infinite)
*/
function* range (start, end, step) {
  while (start < end) {
    yield start
    start += step
  }
}
for (let i of range(0, 10, 2)) {
  console.log(i) // 0, 2, 4, 6, 8
}
// ES5
function range (start, end, step) {
    var list = [];
    while (start < end) {
        list.push(start);
        start += step;
    }
    return list;
}
var r = range(0, 10, 2);
for (var i = 0; i < r.length; i++) {
    console.log(r[i]); // 0, 2, 4, 6, 8
}

/* Generator Matching
    Support for generator functions, i.e. functions where the control flow can be paused and resumed, in order to produce and spred sequence of values (either finite or infinite)
*/
let fibonacci = function* (numbers) {
    let pre = 0, cur = 1
    while (numbers-- > 0) {
        [ pre, cur ] = [ cur, pre + cur ]
        yield cur
    }
}
for (let n of fibonacci(1000))
    console.log(n)
let numbers = [ ...fibonacci(1000) ]
let [ n1, n2, n3, ...others ] = fibonacci(1000)

/* Generator Methods
    Support for generator methods, i.e., methods in classes and on objects, based on generator functions.
*/
class Clz {
    * bar () {
        // 
    }
}
let Obj = {
    * foo () {
        //
    }
}

/* Generator Control-Flow
    Support for generators, a special case of Iterators where the control flow can be paused and resumed, in order to support asynchronous programming in the style of "co-routines" in combination with Promises (see below).
    [Notice: the generic async function usually is provided by a reusable library and given here just for better understanding. See co or Bluebird's coroutine in practice.]
*/
//  generic asynchronous control-flow driver
function async (proc, ...params) {
    let iterator = proc(...params)
    return new Promise((resolve, reject) => {
        let loop = (value) => {
            let result
            try {
                result = iterator.next(value)
            }
            catch (err) {
                reject(err)
            }
            if (result.done)
                resolve(result.value)
            else if (   typeof result.value      === "object"
                     && typeof result.value.then === "function")
                result.value.then((value) => {
                    loop(value)
                }, (err) => {
                    reject(err)
                })
            else
                loop(result.value)
        }
        loop()
    })
}
//  application-specific asynchronous builder
function makeAsync (text, after) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(text), after)
    })
}
//  application-specific asynchronous procedure
async(function* (greeting) {
    let foo = yield makeAsync("foo", 300)
    let bar = yield makeAsync("bar", 200)
    let baz = yield makeAsync("baz", 100)
    return `${greeting} ${foo} ${bar} ${baz}`
}, "Hello").then((msg) => {
    console.log("RESULT:", msg) // "Hello foo bar baz"
})

/* Promises

*/
/* Promises Usage
  First class representation of a value that may be made asynchronously an be available in the future
*/
// ES6
function msgAfterTimeout(msg, who, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout);
  });
}
msgAfterTimeout("", "Foo", 100)
  .then(msg => msgAfterTimeout(msg, "Bar", 200))
  .then(msg => {
    console.log(`done after 300ms:${msg}`);
  });
// ES5
function msgAfterTimeout(msg, who, timeout, onDone) {
  setTimeout(function() {
    onDone(msg + " Hello " + who + "!");
  }, timeout);
}
msgAfterTimeout("", "Foo", 100, function(msg) {
  msgAfterTimeout(msg, "Bar", 200, function(msg) {
    console.log("done after 300ms:" + msg);
  });
});
// try
setTimeout(function() {
  (function(msg) {
    setTimeout(function() {
      console.log("done after 300ms:" + msg + " Hello Bar!");
    }, 200);
  })(" Hello Foo!");
}, 100);

/* Promise Combination
  Combine one or more promises into new promises without having to take care of ordering of the underlying asynchronous operations yourself
*/
// ES6
function fetchAsync(url, timeout, onData, onError) {}
let fetchPromised = (url, timeout) => {
  return new Promise((resolve, reject) => {
    fetchAsync(url, timeout, resolve, reject);
  });
};
Promise.all([
  fetchPromised("http://backend/foo.txt", 500),
  fetchPromised("http://backend/bar.txt", 500),
  fetchPromised("http://backend/baz.txt", 500)
]).then(
  data => {
    let [foo, bar, baz] = data;
    console.log(`success: foo=${foo} bar=${bar} baz=${baz}`);
  },
  err => {
    console.log(`error: ${err}`);
  }
);
// ES5
function fetchAsync(url, timeout, onData, onError) {}
function fetchAll(request, onData, onError) {
  var result = [],
    results = 0;
  for (var i = 0; i < request.length; i++) {
    result[i] = null;
    (function(i) {
      fetchAsync(
        request[i].url,
        request[i].timeout,
        function(data) {
          result[i] = data;
          if (++results === request.length) onData(result);
        },
        onError
      );
    })(i);
  }
}
fetchAll(
  [
    { url: "http://backend/foo.txt", timeout: 500 },
    { url: "http://backend/bar.txt", timeout: 500 },
    { url: "http://backend/baz.txt", timeout: 500 }
  ],
  function(data) {
    var foo = data[0],
      bar = data[1],
      baz = data[2];
    console.log("success: foo=" + foo + " bar=" + bar + " baz=" + baz);
  },
  function(err) {
    console.log("error: " + err);
  }
);
