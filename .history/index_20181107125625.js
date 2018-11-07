function StopWatch() {
  let duration = 5;
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {
    this.duration = 0;
  };
}

const sw = new StopWatch();
