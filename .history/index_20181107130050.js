function StopWatch() {
  this.duration = { value: 5 };
  this.start = function() {};
  this.stop = function() {};
  this.reset = function() {
    duration.value = 0;
  };
}

const sw = new StopWatch();
