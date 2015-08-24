Date.prototype.toKhFormat = function() {
  return padding(this.getDate(), 2) + "/" + padding(this.getMonth() + 1, 2) + "/" + this.getFullYear();
}

Date.fromKhFormat = function(dateString) {
  var date = null;
  var values = dateString.split("/");
  if (values.length == 3) {
    var date = new Date(values[2], values[1] - 1, values[0])
  }
  return date;
}
