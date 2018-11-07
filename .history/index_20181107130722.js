function StopWatch() {
  let startTime,
    endTime,
    running,
    duration = 0;
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {};

  Object.defineProperty(this, "duration");
}

const sw = new StopWatch();
