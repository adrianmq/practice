/* 
References:
https://codeburst.io/js-essentials-the-javascript-engine-302ff38e8465
*/


// Closure Example == Currying = the process that involves partial application of functions
function exponent (x) {
  // returns a new function to be called later
  // this function remembers the x argument
  return function (y) {
    // ** is the exponentiation operator
    // same thing as Math.pow() or x to the power of y
    return y ** x
  }
}
// creates a function that squares a number
// it *remembers* that x is 2
// or in other words, it still has access to the
// lexical environment that it was created in
const square = exponent(2)
console.log(square(2), square(3)) // 4, 9
// cubed
console.log(exponent(3)(2)) // 8


// blocking code example
function blockingCode() {
  const startTime = new Date().getSeconds()
  // delay this function for 250 ms
  setTimeout(function() {
    const calledAt = new Date().getSeconds()
    const diff = calledAt - startTime
    // logs how long it took to call this function
    console.log(`Callback called after: ${diff} seconds`)
  }, 250)
  // block the stack with a loop for 2 seconds
  while(true) {
    const currentTime = new Date().getSeconds()
    // if 2 seconds have passed exit
    if(currentTime - startTime >= 2) break
  }
}
blockingCode() // 'Callback called after: 2 seconds'


function defer () {
  setTimeout(() => console.log('timeout with 0 delay!'), 0)
  console.log('after timeout')
  console.log('last log')
}
defer()


/* 
    Memoization = optimization technique
    https://medium.com/@mike_wong/what-is-memoization-in-javascript-5c6cdef49ad2
    https://codeburst.io/js-essentials-the-javascript-engine-302ff38e8465
*/
// takes in a function to create a memoized version of
const memoize = (func) => {
  // cache object
  // keys are the arguments, values are results
  const cache = {}
  // returns a new function
  // it remembers the cache object & func (closure)
  // ...args is any number of arguments
  return (...args) => {
    // turn the arguments into a string so we can store it
    const argStr = JSON.stringify(args)
    // log the cache object and if the args exist
    console.log('cache', cache, !!cache[argStr])
    // if there's a key that matches the arguments
    // inside the cache the do nothing
    // otherwise call the passed in function
    cache[argStr] = cache[argStr] || func(...args)
    return cache[argStr]
  }
}
// creates a memoized function for adding
const add = memoize((a, b) => a + b)
// calculates and stores data in cache
console.log('first add call: ', add(1, 2))
// returns cached value
console.log('second add call', add(1, 2))


const memoizeUtil = func => {
  const cache = {};
  return (input) => {
    return cache[input] || (cache[input] = func(input));
  };
};
const findFactorial = memoizeUtil(factorial)
function factorial(num) {
  // termination case
  if (num < 0) {
    throw new Error("Number must be positive.");
  };
  // base case
  if (num === 0 || num === 1) {
    return 1;
  };
  // recursive case
  return num * findFactorial(num - 1);
}

findFactorial(2) // 2
findFactorial(3) // 6
console.time('factorial test no memo');
findFactorial(6) // 720
console.timeEnd('factorial test no memo');
findFactorial(5) // 120
console.time('factorial test memo');
findFactorial(6) // 720
console.timeEnd('factorial test memo');



