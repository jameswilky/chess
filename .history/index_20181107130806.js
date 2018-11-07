function StopWatch() {
  let startTime,
    endTime,
    running,
    duration = 5;
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {};

  Object.defineProperty(this, "duration", {
    get: function() {
      return duration;
    }
  });
}

const sw = new StopWatch();
