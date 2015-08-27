function padding(number, length) {
  var result = number.toString();
  for(var i = number.toString().length; i < length; i++) {
    result = "0" + result;
  }
  return result;
}

function isNull(value) {
  return (isNaN(value) || value == undefined || value == 'null');
}
