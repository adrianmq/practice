// https://medium.com/javascript-scene/7-surprising-things-i-learned-writing-a-fibonacci-generator-4886a5c87710
// https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435

// avoid recursion for infinite generators
function* fib(n, current = 0, next = 1) {
  if (n === 0) {
    return 0;
  }

  yield current;
  yield* fib(n - 1, next, current + next);
}

// iterative solution
function* fib (n) {
  const isInfinite = n === undefined;
  let current = 0;
  let next = 1;

  while (isInfinite || n--) {
    yield current;
    [current, next] = [next, current + next];
  }
}

// memoized iterative form generator
const memo = []
const fib = (n) => {
  if (memo[n] !== undefined) return memo[n]

  let current = 0
  let next = 1

  for (let i = 0, i <n, i++) {
    memo[i] = current
    [current, next] = [next, current + next]
  }

  return current
}

function* gen(n = 79) {
  fib(n)
  yield* memo.slice(0, n+1)
}

// export default gen

// `yield*` is a special form of `yield` that will delegate to another generator or iterable
const a = [1, 2, 3];
const b = [4, 5, 6];

function* c () {
  yield 7;
  yield 8;
  yield 9;
}

function* gen () {
  yield* a;
  yield* b;
  yield* c();
  yield 10;
}

const [...sequence] = gen();
console.log(sequence); // [1,2,3,4,5,6,7,8,9,10]


// Using the Symbol.iterator
// built-in functions implement the iterator protocol (String, Array, TypedArray, Map, Set)
// Accesing the array iterator
let arr = [1, 2, 3]
let foo = arr[Symbol.iterator]()

arr.forEach(() => console.log( foo.next() ))
console.log(foo.next());
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }


// Custom iterable
const countToThree = { a: 1, b: 2, c: 3 }
countToThree[Symbol.iterator] = function* () {
  // const keys = Object.keys(this)
  // const length = keys.length

  for (const key in this) {
    yield this[key]
  }
}

let [...three] = countToThree
console.log(three) // [ 1, 2, 3 ]


/* 
  Talking back to generators
*/
function* crossBridge() {
  const reply = yield 'What is your favorite color?';
  console.log(reply);
  if (reply !== 'yellow') return 'Wrong!'
  return 'You may pass.';
}

{
  const iter = crossBridge();
  const q = iter.next().value; // Iterator yields question
  console.log(q);
  const a = iter.next('blue').value; // Pass reply back into generator
  console.log(a);
}
// What is your favorite color?
// blue
// Wrong!

{
  const iter = crossBridge();
  const q = iter.next().value;
  console.log(q);
  const a = iter.next('yellow').value;
  console.log(a);
}
 // What is your favorite color?
// yellow
// You may pass.