function StopWatch() {
  let startTime,
    endTime,
    duration = 0;
  let running = false;
  this.start = function() {
    if (running != true) {
      startTime = Date.now();
      running = true;
    } else {
      console.log("Stopwatch Already Running");
    }
  };
  this.stop = function() {
    if (running != true) {
      endTime = Date.now();
      running = false;
    } else {
      console.log("Stopwatch Not started");
    }
  };
  this.reset = function() {
    duration = 0;
  };

  Object.defineProperty(this, "duration", {
    get: function() {
      duration = (endTime - startTime) / 1000;
      return duration;
    }
  });
}

const sw = new StopWatch();
