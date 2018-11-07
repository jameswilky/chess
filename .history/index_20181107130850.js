function StopWatch() {
  let startTime,
    endTime,
    running,
    duration = 5;
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {
    duration = 5;
  };

  Object.defineProperty(this, "duration", {
    get: function() {
      return duration;
    };
    set: function(){

    }
  });
}

const sw = new StopWatch();
