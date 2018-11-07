function StopWatch() {
  this.duration = 5;
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {
    return (duration = 0);
  };
}

const sw = new StopWatch();
