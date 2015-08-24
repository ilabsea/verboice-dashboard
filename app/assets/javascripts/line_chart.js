function drawChart(fromDate, toDate, records) {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date (MMM d, yyyy)');
  data.addColumn('number', 'Number of call');

  var datas = chartData(fromDate, toDate, records);
  data.addRows(datas);

  var options = {
    chart: {
      title: 'Call traffic from ' + fromDate.toKhFormat() + " to " + toDate.toKhFormat()
    },
    width: 920,
    height: 240,
    legend: { position: 'none' },
    hAxis: {format:'MMM d, y'}
  };

  var chart = new google.charts.Line(document.getElementById('linechart'));

  chart.draw(data, options);
}

function chartData(fromDate, toDate, records) {
  var datas = [];

  var dayDiff = ((toDate - fromDate) / 1000 / 60 / 60 / 24);

  for(var i = 0; i <= dayDiff; i++) {
    var diff = i * 24 * 60 * 60 * 1000;
    var currentDate = new Date(fromDate.getTime() + diff);
    var totalCall = 0;
    records.forEach(function(record){
      var values = record["date"].split("-");
      var date = new Date(values[0], values[1], values[2]);
      if (date.getTime() == currentDate.getTime()) {
        totalCall = record["total_call"];
        return;
      }
    });
    datas.push([currentDate, totalCall]);
  }

  return datas;
}
