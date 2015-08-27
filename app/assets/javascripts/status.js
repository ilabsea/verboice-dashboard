var Status = Status || { }

Status.Record = function Record(status, calls, duration, color, desc) {
  this.status = status;
  this.calls = calls;
  this.duration = duration;
  this.color = color;
  this.desc = desc;
}

Status.Record.prototype.addCalls = function(calls) {
  this.calls += calls;
}

Status.Record.prototype.addDuration = function(duration) {
  this.duration += duration;
}

Status.Record.prototype.percentageOf = function(totalCalls, precisionLength) {
  return ((this.calls / totalCalls) * 100).toFixed(precisionLength);
}
