// callbacks

// promises
// higher assurance of capturing and reporting errors
notes.read(req.query.key)
    .then(note => { return filterNote(note); })
    .then(note => { return swedishChefSpeak(note); })
    .then(note => {
        res.render('noteview', {
            title: note ? note.title : "",
            notekey: req.query.key,
            note: note
        });
    })
    // promise class automatically captures errors
    // one catch is enough, the promise sends the error down the chain of ops
    // skips over the .then functions and invokes the first catch func
    .catch(err => { next(err); });

// generators
function* gen() {
    yield 1;
    yield 2;
}
var geniter = gen();
console.log(geniter.next());
// { value: 1, done: false }

// async code with promises and generators
// the co library is a popular helper function for implementing async coding in generators
const fs = require('fs-extra');
const co = require('co');
const util = require('util');
co(function* () {
    var texts = [
        yield fs.readFile('hello.txt', 'utf8'),
        yield fs.readFile('goodbye.txt', 'utf8')
    ];
    console.log(util.inspect(texts));
});
// [ 'Hello, world!\n', 'Goodbye, world!\n' ]
// fs.read sends result to callback function, but fs-extra returns a promise
// co manages the dance of waiting for the Promise to be resolved
// and returns the value

// async/await
const fs = require('fs-extra');
const util = require('util');
async function twofiles() {
    var texts = [
        await fs.readFile('hello.txt', 'utf8'),
        await fs.readFile('goodbye.txt', 'utf8')
    ];
    console.log(util.inspect(texts));
}
twofiles().catch(err => { console.error(err); });

