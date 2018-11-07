function StopWatch() {
  let startTime,
    endTime,
    running,
    duration = 5;
  this.poo = 10;
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {
    duration = 0;
  };

  Object.defineProperty(this, "duration", {
    get: function() {
      return duration;
    }
  });
}

const sw = new StopWatch();
