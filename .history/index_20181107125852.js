function StopWatch() {
  this.duration = 5;
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {
    return (this.duration = 0);
  };
}

const sw = new StopWatch();
