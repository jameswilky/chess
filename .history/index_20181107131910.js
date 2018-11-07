function StopWatch() {
  let startTime,
    endTime,
    running,
    duration = 0;
  this.start = function() {
    if (running == false) {
      startTime = Date.now();
      running = true;
    }
    els{
      console.log()
    }
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
