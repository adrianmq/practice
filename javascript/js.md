<!-- ### Javascript ###  -->
<!-- ### Javascript ###  -->
<!-- ### Javascript ###  -->

# Javascript

<!-- ### Javascript ###  -->

## Engine

    - program that interprets the code, decide's if it's valid and runs it
    - each browser / run-time environment has its own engine (i.e Google V8 https://github.com/v8/v8)

    https://codeburst.io/js-essentials-the-javascript-engine-302ff38e8465

## Iterator consumption protocol
    - defines a data structure called and "iterator" that has reference to an underlying data source (e.g. sql query rows), which exposes a method like next(), which returns a piesce of data ("record" or "row")
    - the pattern indicates completion by some special value or exception, once the iteration went over the entire data set and go past the end
    - adheres to a standard way of processing data iteratively -> cleaner and easier to understand code (oposed to DS having each it's own way)
    - ES6 protocol in language, with next() method whose return is an object ('iterator result'), that has value/done props
    - mechanisms for consuming iterators: for..of, ... (spread only, not rest)
    - #iterables = value that can be iterated over
    - automatically creates an iterator instance from an iterable, which means that a single iterable could be consumed more than once (new iterator instance would be created)
    - iterables: string, array, map, set ...
    - shallow-copy an array using iterator consumption, via spread (...)
    - map has different default iteration, loops over entries (tuples =2-elem array)
    - specific iteration using methods (entries, values, etc.)
    - ensure own data structures adheres to the iteration protocol
    - new iterator from existing one, returns itself

## Scope

    - the 'area' you can access a variable from
    - is static and contains a fixed set of variables available at the moment and location you define a function
    - when a function is defined, it is attached to its enclosing scope via closure. Scope is the set of rules that controls how references to variables are resolved
    - the scope object is hidden inside the JS engine, it's always the same for that function, and its properties take the form of identifier variables available inside the function
    - ??? environment (~frame) created by JS when a function is added to the call stack

    # lexical scope = physical location of piece of code in its source-code
    # block scope = created using curly bracces {}
    # global = not inside a function, available anywhere
    # scope chain = a function can go up to its outer environment (lexically) to search for a variable, it can keep going until it reaches the global environment.

    - ex:
    ```
      var r = [];
      var a = [1,2,3];
      for (var i of a.entries()) r.push(function ex() { console.log(`${i} Scopes: [Global]`); })
      for (let i of a.entries()) r.push(function ex() { console.log(`${i} Scopes: [Block, Global]`); })
      function fClosure() {
        for (var i of a.entries()) r.push(function ex() { console.log(`${i} Scopes: [Closure, Global]`); })
      }
      console.log(`Analyze available scopes for each function ${r}`);
    ```


## Execution Context (this)

    - one way to think about the execution context is that it's a tangible object whose properties are made available to a function while it executes.
    - is rather a dynamic characteristic that's determined each time the function is called
    - functions that reference 'this' are dependent on their execution context
    - the benefit of this-aware functions—and their dynamic context—is the ability to more flexibly re-use a single function with data from different objects

## Closure

    - function created inside another function, which 'remembers' the environment it was created in when called later
    - "is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope"

## Prototypes

    - a prototype is a characteristic of an object, an specifically resolution of a property access
    - the purpose of this prototype linkage (i.e., from an object B to another object A) is so that accesses against B for properties/methods that B does not have, are delegated to A to handle
    - delegation of property/method access allows two (or more!) objects to cooperate with each other to perform a task

    ```
      function myclass() {}
      
      Object.defineProperty(myclass.prototype, "x", {
        get() {
          return this.stored_x;
        },
        set(x) {
          this.stored_x = x;
        }
      });
      
      var a = new myclass();
      var b = new myclass();
      a.x = 1;
      console.log(b.x); // undefined
    ```















## Synchronous / Asynchronous

    - javascript is synchronous and executes code line by line, starting at the top of the file
    - async = javascript emulates asynchronous behaviour via browser APIs

## Call Stack (Stack)

    - the place for function calls
    - calling a function puches it onto the stack and returning from a function pops it off the stack
    - function calls form a stack of frames. When a function is invoked a frame is created containing the function's arguments and local variables

## Event / Callback Queue

    - events handled after the call stack is empty
    - callback functions are pushed here when using an external browser API

## Event Loop

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

## Web API

    - setTimeout - is a web API implemented by the browser or other environments

## Garbage collected

    - when a variable in memory is deleted automatically (as it's no longer used, the engine gets rid of it)

## Hoisting

    - the process of moving a value to the top of the code block where it is used, regardless of where it is defined.
    ## Variable
    - all variable declarations are automatically hoisted to the top of a function's scope, as if they were defined at the start of the function
    - assignment is not hoisted, which means that a variable assigned at the end of the function will have a value of undefined until the assignment is made
    ## Function
    - functions are also hoisted, but they behave differently depending on how they are defined:
        - function declaration => whole functon is hoisted to the top of the function, meaning it can be invoked before it has been defined
        - function expressions, where an anonymous function is assigned to a variable, is hoisted in a similar way to variables

## Callbacks

    - functions in JS are first-class objects, meaning they behave the same way as any other value
    - a function that is passed as an argument to another function is known as a callback

## Classes

    - ES2015
    - built on existing prototype-based inheritance model

## this

    - a variable/keyword created automatically by JS for each execution context

## Currying

    - the process that involves partial application of functions, named after he logician Haskell Curry

## Web worker

    TODO

## Cross-origin iframe

    TODO

## Memoization

    https://en.wikipedia.org/wiki/Memoization
    - the process of caching the result of function calls

## Package manager [npm, yarn]

## Bundler [webpack, parcel, browserify]

    - lets you write modular code and bundle it together into small packages to optimize load time

Webpack - Build front-end js (bundle). Involves building a piece of javascript code and all its dependencies into a single file that can be served as a static javascript and referenced from a html page - Both front-end and back-end - For front-end all dependencies need to be bundled since the js file has to be a stand-alone unit as it will be loaded and run on the user’s browser - For back-end all the dependency libraries are installed in ‘./node_modules’ (npm/yarn install) during build time, thus there’s no need to include them in the back-end bundle

## Compiler (Transpiler) [Babel]

    - modern Javascript code that still works in old browsers

## View / Data serialization

JSON

- acronym of 'javascript object notation'
- serialize an object as a string so that it can be transported between services

## Client side storage

Cookies - store small (4 to 16kB) amount of data on the client device - the client reads and send them with each request - set validity/expiry time - server sets a cookie using 'Set-Cookie' header - client includes it with future requests using the Cookie request header - obsolete, assorted security problems, small amount of data, EU regulation

Web Storage - simple syntax for storing and retrieving smaller, data items consisting of name and a corresponding value - useful for simple data - object-like structures - separate storage for each domain # sesstionStorage: persists data as long as the browser is open # localStorage: long term persistance

IndexedDB API - complete database system for storing complex data

Cache API - designed for storing HTTP responses to specific requests, storing website assets offline

Service Worker API - javascript file registered against a particular origin - when registered, it controls pages available at that origin - sits between a loaded page and the network and intercepts network requests aimed at that origin - support for offline usage

## Resources

https://github.com/getify/You-Dont-Know-JS
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference


<!-- ### Architectural Patterns ###  -->
<!-- ### Architectural Patterns ###  -->
<!-- ### Architectural Patterns ###  -->

# Architectural Patterns

<!-- ### Architectural Patterns ###  -->

## MVVM, 2-way binding [Angular, Vue]

- Model View View-Model
  - View <= data biding => View-Model <- read, write -> Model
  - Each DOM node is interested in a certain part of the model (only part of the app state). By binding each element to its responsible part of the model (View-Model layer), it can directly listen to change of (read) / update (write) its part of the model
  - In context of SPA, we could say Model=App State, V=Html template
- Advantages:
  - separation of concerns: business logic (Model) from presentational layer (View)
  - allows fast model manipulation of data model, which is ideal for CRUD based apps
- Task based apps, should have read-only / write-only UI-Components; while it is possible to create 2-way binding for each of these components, the excess 'pathways' for mutating the same part of a data model leads to chaos of state management (CQRS pattern is recommended)

## CQRS (Command Query Responsibility Segregation) [Angular Service]

- query (read), command (write) should be done separately
- Angular service is good example of applying CQRS pattern:
  - private variables storing the items in question
  - public getters (query) and setters (command) as separate methods

## Event bus, 1-way binding, middleman like pattern [React]

- react flow: view (emit event) -> state handler (write) -> state / data model (subscribe) -> view (read)
- components can send messages to the event bus when an event occurs
- components can subscribe to the event bus for events they concern
- the event bus will send messages to subscribers whenever it receives one
- the component is not directly read-write bound to the model, instead it subscribes to part of the model to read and emits to 'state handler' to write rather than writing by itself
- separated read-write concerns are satisfying in terms of maintainability for simple task based apps, but could be a nightmare for large scale e-commerce apps due to multiple 'state-handling functions' mutating the same piece of state

## Flux pattern [Redux]

- explicit state mutation achieved by the following:
  - state can only be mutated through dispatcher, instead of arbitrary 'state-handlers'
  - dispatcher mutates the state only by emitting an action
  - conclusively, the view mutates a piece of state, only by emitting an action
- monitoring actions and the information they contain, data mutation of the whole app is under control
- typical data flow:
  1. VIEW reads its interested part of the model from store
  2. User click button, VIEW emits an 'ACTION' with information such as {type: BUTTON_CLICKED}
  3. This ACTION is then being sent to a place called 'DISPATCHER'
  4. DISPATCHER will take this action and apply business logic for updating the model in the STORE
  5. VIEW will update itself if its reading part of the model, is changed

## Resources

https://blog.cloudboost.io/the-state-of-web-applications-3f789a18b810

<!-- ### React ###  -->
<!-- ### React ###  -->
<!-- ### React ###  -->

# React

<!-- ### React ###  -->

'declarative API' - you tell it what the UI should look like

## Component patterns:

Component APIs: [render, state, props, context, lifecycle events]

Container:

- does data fetching and then renders its coresponding sub-component
- are data or logic layer and utilize stateful API's
- should be a class component, as opposed to functional ones, in order to have access to all stateful API's

Presentational:

- utilize props, render, context (stateless API's)
- can be syntatically-pretty functional

HOC:

- is a function that takes a component as an argument and returns a new component
- powerful pattern for providing fetching and data to any number of components

Render callback

- or knows as render props
- used to share or reuse component logic
- provide the luxury of reducing namespace collision and better illustrate where the logic is comming from

## Resources

https://reactjs.org/docs/getting-started.html
https://medium.com/teamsubchannel/react-component-patterns-e7fb75be7bb0
https://www.robinwieruch.de/react-fetching-data/
https://www.robinwieruch.de/react-hooks-fetch-data/

<!-- ### Redux ###  -->
<!-- ### Redux ###  -->
<!-- ### Redux ###  -->

# Redux

<!-- ### Redux ###  -->

Boilerplate = sections of code that have to be included in many places with little or no alteration

Payload = the conventional name used for the property that holds tha actual data in a Redux action object.
A payload isn't necessary, but it's fairly common to see actions defined like this:
`const ADD_USER = { type: "ADD_USER", payload: {name: "John", age: 45} }`
Middleware = in general, clues together clietn-side and server-side code, allowing (back-end) developers
to implement logic upon the request made from the client . In Redux, middleware provides a way to interact with actions that have been dispatched to the store before they reach the store's reducer.

File structure:
src:
actions
actionTypes.js
actionGroup1.js
actionGroup2.js
components
Component1.js
Component2.js
reducers
index.js
reducerGroup1.js
reducerGroup2.js
store.js
index.js
App.js
App.css

## Resources

https://medium.com/@bretcameron/a-beginners-guide-to-redux-with-react-50309ae09a14
https://medium.com/@bretcameron/a-beginners-guide-to-redux-with-react-50309ae09a14

<!-- ### CSS ###  -->
<!-- ### CSS ###  -->
<!-- ### CSS ###  -->

# CSS

<!-- ### CSS ###  -->

- load html -> parse html -> create DOM tree -> display
  -> load css -> parse css />
- about DOM
- external / internal / inline
- css rule = ruleset = declaration = selector + declaration block ( property + value )
- css US spelling standard
- statement types:
  - rules
  - at-rules:
    - @charset + @import (metadata)
    - @font-face (descriptive information)
  - nested:
    - subset of at-rules
    - @media or @document (conditional information, nested statements)
- shorthand: font, background, padding, border, margin
- selector matches html elements on the page, associated declarations will be appplied to those elements only
- selectors:
  - match multiple elements by including multiple selectors separated by comma
  - an element may be matched by several selectors, therefore several rules may set a given property multiple times
  - selector precedence and order of application (cascade algorithm) is defined by following factors:
    - importance
      - !important
      - to override another declaration should be included later with the same specificity
    - specificity
      - how specific a selector is and is measured using 4 different values
        - thousands: inline style
        - hundreds: ID selector
        - tens: class selector, attribute selector, or pseudo-class selector
        - ones: one in this column for each element selector or pseudo-element selector
      - universal selector (\*), combinators (+, >, ~, ' ') and negation pseudo-class (:not) have no effect on specificity
    - source order
      - later rule wins over earlier rules
  - precendece rules apply at property level
  - inheritance (inherit, initial, unset, revert)
  - types:
    - simple: element, class, id
    - attribute selector:
      - presence and value: [attr], [attr=val], [attr~=val]
      - substring value: [attr^=val], [attr$=val], [attr*=val]
    - pseudo-classes: elements in certain state
      - :active, :hover, etc.
      - https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Pseudo-classes_and_pseudo-elements
    - pseudo-elements: certain position in relation to an element
      - ::after, ::before, etc.
    - combinators:
      - list / descendant / child / adjacent sibling / general sibling
      - https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Combinators_and_multiple_selectors
    - mutiple selectors
- values:
  - pixels: absolute units
  - relative units (font-size or viewport): em, rem
  - percentages
  - https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units
- box model: content(width+height) + padding + border + margin
  - overflow: auto, hidden, visible
- layout: positioning, etc
  https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction

## Resources

https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/How_CSS_works
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox
