const EventEmitter = require("events");

class Pulser extends EventEmitter {
  start() {
    setInterval(() => {
      console.log(`${new Date().toISOString()} >>>> pulse`);
      this.emit("pulse");
    }, 1000);
  }
}

// function over arrow function (preserve `this`)
class PulserOther extends EventEmitter {
  start() {
    var self = this;
    setInterval(function() {
      self.emit("...");
    });
  }
}

class HeartBeat extends EventEmitter {}
const beatMaker = new HeartBeat();

module.exports = Pulser;
