#
# Javascript

### Engine
    - program that interprets the code, decide's if it's valid and runs it
    - each browser / run-time environment has its own engine (i.e Google V8 https://github.com/v8/v8)

    https://codeburst.io/js-essentials-the-javascript-engine-302ff38e8465

### Scope
    - the 'area' you can access a variable from

    # lexical scope = physical location of piece of code in its source-code
    # block scope = created using curly bracces {}
    # global = not inside a function, available anywhere
    # scope chain = a function can go up to its outer environment (lexically) to search for a variable, it can keep going until it reaches the global environment.

### Synchronous / Asynchronous
    - javascript is synchronous and executes code line by line, starting at the top of the file
    - async = javascript emulates asynchronous behaviour via browser APIs

### Call Stack (Stack)
    - the place for function calls
    - calling a function puches it onto the stack and returning from a function pops it off the stack
    - function calls form a stack of frames. When a function is invoked a frame is created containing the function's arguments and local variables

### Event / Callback Queue
    - events handled after the call stack is empty
    - callback functions are pushed here when using an external browser API

### Event Loop
    - the process of a browser API finishing a function call, pushing a callback function onto the callback queue, and then when the stack is clear it pushes the callback function onto the call stack

        while (queue.waitForMessage()) {
            queue.processNextMessage();
        }

    - javascript concurrency model based on an 'event loop'
    - never blocks
    - I/O is performed using events and callbacks, so when the application is waiting for an IndexDB query to return or an XHR request to return, it can still process other things like user input


    - distinct runtimes: web worker or cross-origin iframe
        - have thier own stack, heap, message queue
        - the distinct runtime can only communicate through sending messages via the `postMessage` method, which adds a message to another runtime if the latter listens to message events

    https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop

### WEb API
    - setTimeout - is a web API implemented by the browser or other environments

### Execution Context
    - environment(~frame) created by JS when a function is addd to the call stack

### Closure
    - function created inside another function, which 'remembers' the environment it was created in when called later

### Garbage collected
    - when a variable in memory is deleted automatically (as it's no longer used, the engine gets rid of it)

### Hoisting
    - the process of moving a value to the top of the code block where it is used, regardless of where it is defined.
    ## Variable
    - all variable declarations are automatically hoisted to the top of a function's scope, as if they were defined at the start of the function
    - assignment is not hoisted, which means that a variable assigned at the end of the function will have a value of undefined until the assignment is made
    ## Function
    - functions are also hoisted, but they behave differently depending on how they are defined:
        - function declaration => whole functon is hoisted to the top of the function, meaning it can be invoked before it has been defined
        - function expressions, where an anonymous function is assigned to a variable, is hoisted in a similar way to variables

### Callbacks
    - functions in JS are first-class objects, meaning they behave the same way as any other value
    - a function that is passed as an argument to another function is known as a callback

### this
    - a variable/keyword created automatically by JS for each execution context

### Currying
    - the process that involves partial application of functions, named after he logician Haskell Curry

### Web worker
    TODO

### Cross-origin iframe
    TODO

### Memoization
    https://en.wikipedia.org/wiki/Memoization
    - the process of caching the result of function calls