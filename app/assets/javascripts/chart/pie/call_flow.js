PieChart.CallFlow = {};

PieChart.CallFlow.totalRecords = function(records) {
  var totalCalls = 0;
  records.forEach(function(record) {
    totalCalls += record["total"];
  });
  return totalCalls;
}

PieChart.CallFlow.Graph = function(records, fromDate, toDate) {
  this.records = records;
  this.fromDate = fromDate;
  this.toDate = toDate;
}

PieChart.CallFlow.Graph.prototype.draw = function(element) {
  var chart = new google.visualization.PieChart(element);

  var options = {
    title: "Total calls: " + PieChart.CallFlow.totalRecords(this.records),
    colors: PieChart.colors,
    legend: { position: 'labeled' },
    pieHole: 0.4,
    height: 500
  };

  chart.draw(this.data(), options);
}

PieChart.CallFlow.Graph.prototype.data = function() {
  var rows = [];

  this.records.forEach(function(record) {
    rows.push([record["step_name"], record["total"]]);
  });

  var dt = new google.visualization.DataTable();
  dt.addColumn("string", "Calls");
  dt.addColumn("number", "Number of calls");
  dt.addRows(rows);

  return dt;
}

PieChart.CallFlow.Table = function(records, fromDate, toDate) {
  this.records = records;
  this.fromDate = fromDate;
  this.toDate = toDate;
}

PieChart.CallFlow.Table.prototype.draw = function(element) {
  if(this.records.length == 0) { return; }

  var totalCalls = PieChart.CallFlow.totalRecords(this.records);

  for(var i = 0; i < this.records.length; i++) {
    var record = this.records[i];
    var html = '<tr>' +
      "<td><i class='glyphicon glyphicon-stop' style='color:" +PieChart.colors[i] + "' />" + record["step_name"] + "</td>" +
      '<td>' + record["total"] + '</td>' +
      '<td>' + ((record["total"] / totalCalls) * 100).toFixed(1) + "%" + '</td>' + '</tr>';

    element.children('tbody').append(html);
  }
}

PieChart.CallFlow.Table.prototype.clear = function(element) {
  element.children('tbody').children().remove();
}
