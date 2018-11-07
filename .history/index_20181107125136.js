function StopWatch() {
  this.duration = 0;
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {
    duration = 0;
  };
}

const sw = new StopWatch();
