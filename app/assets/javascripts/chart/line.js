var Chart = Chart || {};
Chart.Line = function(fromDate, toDate, records) {
  this.fromDate = fromDate;
  this.toDate = toDate;
  this.records = records;
};

Chart.Line.prototype.draw = function(element) {
  var chart = new google.charts.Line(element);
  chart.draw(this.data(), this.options());
}

Chart.Line.prototype.data = function() {
  var rows = [];

  var dayDiff = ((this.toDate - this.fromDate) / 1000 / 60 / 60 / 24);

  for(var i = 0; i <= dayDiff; i++) {
    var diff = i * 24 * 60 * 60 * 1000;
    var currentDate = new Date(this.fromDate.getTime() + diff);
    var totalCall = 0;
    this.records.forEach(function(record){
      var values = record["date"].split("-");
      var date = new Date(values[0], values[1], values[2]);
      if (date.getTime() == currentDate.getTime()) {
        totalCall = record["total_call"];
        return;
      }
    });
    rows.push([currentDate, totalCall]);
  }

  var dt = new google.visualization.DataTable();
  dt.addColumn('date', '');
  dt.addColumn('number', 'Number of call');
  dt.addRows(rows);

  return dt;
}

Chart.Line.prototype.options = function() {
  return {
    chart: {
      title: 'Call traffic from ' + this.fromDate.toKhFormat() + " to " + this.toDate.toKhFormat()
    },
    width: 920,
    height: 240,
    legend: { position: 'none' },
    hAxis: {format:'MMM d, y'}
  };
}
