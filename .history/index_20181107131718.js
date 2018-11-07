function StopWatch() {
  let startTime,
    endTime,
    running,
    duration = 0;
  this.start = function() {
    startTime = Date.now();
    running = true;
  };
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
