// https://hackernoon.com/async-await-generators-promises-51f1a6ceede2
// https://blog.benestudio.co/async-await-vs-coroutines-vs-promises-eaedee4e0829

// An async function (ES2017)
async function foo() {
  await bar();
}

// transformed by Babel to ES2016
let foo = (() => {
  var _ref = _asyncTogenerator(function*() {
    console.log("gen yield");
    yield "gen value";
    // yield bar()
  });

  return function foo() {
    console.log("_ref and ref.apply function", _ref, arguments);
    return _ref.apply(this, arguments);
  };
})();

function _asyncTogenerator(fn) {
  return function() {
    console.log("_asyncTogenerator, fn", fn, arguments);
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      console.log("promise callback body, calls next");
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

// Implementation using generator function
function* init() {
  const r1 = yield (() => {
    console.log("r1 called");
    return "r1";
  })();
  console.log("r1 return", r1);

  const r2 = yield (() => {
    console.log("r2 called");
    return "r2";
  })();
  console.log("r2 return", r2);

  const r3 = yield (() => {
    console.log("r3 called");
    return "r3";
  })();
  console.log("r3 return", r3);

  return r3;
}

// Function which takes a generator function
// and executes its body to completion
function runner(genFn) {
  // Iterator for the generator function
  const itr = genFn();

  // Function called recursively once current promise is resolved
  function run(arg) {
    const result = itr.next(arg);

    if (result.done) {
      return result.value;
    } else {
      return Promise.resolve(result.value).then(run);
    }
  }

  return run();
}

runner(init);

async function asyncInit() {
  const r1 = await (() => {
    console.log("r1 called");
    return "r1";
  })();
  console.log("r1 return", r1);

  const r2 = await (() => {
    console.log("r2 called");
    return "r2";
  })();
  console.log("r2 return", r2);

  const r3 = await (() => {
    console.log("r3 called");
    return "r3";
  })();
  console.log("r3 return", r3);

  return r3;
}

let delay = (ms, result) =>
  new Promise(resolve => setTimeout(() => resolve(result), ms));

/* 
  Async code with promise chaning
*/

async function delays() {
  let a = await delay(800, "Hello, I'm in an");
  console.log(a);

  let b = await delay(400, "async function!");
  console.log(b);
}

delays();

/* 
  Async code with promise chaining
*/
function delays() {
  console.log(performance.now());
  return delay(800, "Hello, I'm in an")
    .then(a => {
      console.log(a, performance.now());
      return delay(400, "Promise!");
    })
    .then(b => {
      console.log(b, performance.now());
    });
}

delays();

/* 
  Async code with callbacks
*/
delay_ = (ms, result, cb) => {
  setTimeout(() => {
    cb(result);
  }, ms);
};

function delays() {
  delay_(800, "Hello, I'm in a", a => {
    console.log(a);
    delay_(400, "callback!", b => {
      console.log(b);
    });
  });
}

/* 
  Async code with Coroutines
*/
function* delays() {
  let a = yield delay(800, "Hello, I'm an");
  console.log(a);

  let b = yield delay(400, "async coroutine!");
  console.log(b);
}

// coroutine runner simplified implementation
const coroutine = nextValue => iterator => {
  const { done, value } = iterator.next(nextValue);

  if (done) {
    return;
  }

  if (value.constructor === Promise) {
    value.then(promiseValue => {
      coroutine(promiseValue)(iterator);
    });
  } else {
    coroutine(value)(iterator);
  }
};

// call with iterator
coroutine()(delays());

/* 
  Asynchronous handling from Promise to using async/await
*/
const fetchSomething = () =>
  new Promise(resolve => {
    setTimeout(() => resolve("future value"), 500);
  });

const promiseFunc = () =>
  new Promise(resolve => {
    fetchSomething().then(result => {
      resolve(result + " 2");
    });
  });

promiseFunc().then(res => console.log(res));

async function asyncFunction() {
  const result = await fetchSomething(); // returns promise
  // waits for promise and uses promise result
  return result + " 2";
}

asyncFunction().then(res => console.log(res));

/* 
  Asynchronous handling using Generators and Promises
*/
const isPromise = obj => Boolean(obj) && typeof obj.then === "function";
const next = (iter, callback, prev = undefined) => {
  const item = iter.next(prev);
  const value = item.value;

  if (item.done) return callback(prev);

  if (isPromise(value)) {
    value.then(val => {
      setImmediate(() => next(iter, callback, val));
    });
  } else {
    setImmediate(() => next(iter, callback, value));
  }
};
const gensync = fn => (...args) =>
  new Promise(resolve => {
    next(fn(...args), val => resolve(val));
  });
const asyncFunc = gensync(function*() {
  const result = yield fetchSomething(); // returns promise
  // waits for promise and uses promise result
  yield result + " 2";
});

// Call the async function and pass params.
asyncFunc("param1", "param2", "param3").then(val => console.log(val)); // 'future value 2'



/* 
  https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435

  Observable: 
    subscribe<Function>
    onNext<Function>
    onError<Function>
    onCompleted<Function>
*/
const isPromise = obj => Boolean(obj) && typeof obj.then === 'function';
const next = (iter, callbacks, prev = undefined) => {
  const { onNext, onCompleted } = callbacks;
  const item = iter.next(prev);
  const value = item.value;

  if (item.done) {
    return onCompleted();
  }

  if (isPromise(value)) {
    value.then(val => {
      onNext(val);
      setImmediate(() => next(iter, callbacks , val));
    });
  } else {
    onNext(value);
    setImmediate(() => next(iter, callbacks, value));
  }
};

const gensync = (fn) => (...args) => ({
  subscribe: (onNext, onError, onCompleted) => {
    next(fn(...args), { onNext, onError, onCompleted });
  }
});

const fetchSomething = () => new Promise((resolve) => {
  setTimeout(() => resolve('future value'), 500);
});

const myFunc = function* (param1, param2, param3) {
  const result = yield fetchSomething(); // returns promise

  // waits for promise and uses promise result
  yield result + ' 2';
  yield param1;
  yield param2;
  yield param3;
}

const onNext = val => console.log(val);
const onError = err => console.log(err);
const onCompleted = () => console.log('done.');

const asyncFunc = gensync(myFunc);

// Call the async function and pass params.
asyncFunc('a param', 'another param', 'more params!')
  .subscribe(onNext, onError, onCompleted);
// future value
// future value 2
// a param
// another param
// more params!
// done.