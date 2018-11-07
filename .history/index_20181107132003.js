function StopWatch() {
  let startTime,
    endTime,
    running,
    duration = 0;
  this.start = function() {
    if (running == false) {
      startTime = Date.now();
      running = true;
    } else {
      console.log("Stopwatch Already Running");
    }
  };
  this.stop = function() {
    if (running !== true) {
      startTime = Date.now();
      running = true;
    } else {
      console.log("Stopwatch Not started");
    }
  };
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
