# Event-loop

## Microtaks and Macrotaks (tasks)

### Microtasks
- process.nextTick
- promises
- Object.observe

### Macrotasks (tasks)
- setTimeout
- setInterval
- setImmediate
- I/O

### Flow
- setTimeout callbacks are queued as tasks
- promise callbacks are queued as microtasks
- at the end of a task, the microtasks are processed
- promises that do not return another promise, queues the chained (then) callback as a microtask
- promises that do return another promise ...
- when a microtask is done, it moves to the next one in the queue
- once the current task is complete, another one is picked from the tasks (macrotaks) queue (eg. timer callback)


# JSNSD exam

## Web protocols



# References
https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/
https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/ (js)
