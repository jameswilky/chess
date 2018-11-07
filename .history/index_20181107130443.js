function StopWatch() {
  let x = 10;
  this.duration = x;
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {
    x = 0;
  };
}

const sw = new StopWatch();
