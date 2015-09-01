PieChart.Call = {
  initStatuses: function() {
    return {
      "total_calls": 0,
      "completed":   new Status.Record("completed", 0, 0, "green", "Number of complete"),
      "incompleted": new Status.Record("incompleted", 0, 0, "orange", "Number of hangup before call flow completed"),
      "busy":        new Status.Record("busy", 0, 0, "blue", "Number of immediate hangup"),
      "no_answer":   new Status.Record("no_answer", 0, 0, "grey", "No answer"),
      "failed":      new Status.Record("failed", 0, 0, "red", "Fails(cause by connection or system)")
    };
  },
  statusOf: function(status, reason) {
    if(status == "active") {
      return "failed"
    } else if(status == "failed") {
      if(reason == "error" || reason == "timeout") { return "failed" }
      if(reason == "hangup") { return "incompleted" }
      return reason;
    }
    return status;
  },
  groupBy: function(records) {
    var _self = this;

    var statuses = this.initStatuses();

    if (records.length == 0) { return statuses; }

    records.forEach(function(record) {
      statuses["total_calls"] += record["total_call"];

      var status = _self.statusOf(record["state"], record["fail_reason"]);

      var newRecord = statuses[status];
      newRecord.addCalls(parseInt(!isNull(record["total_call"]) ? record["total_call"] : 0));
      newRecord.addDuration(parseInt(!isNull(record["total_duration"]) ? record["total_duration"] : 0));

      statuses[status] = newRecord;
    });

    return statuses;
  }
};

PieChart.Call.Graph = function(records, fromDate, toDate) {
  this.records = records;
  this.fromDate = fromDate;
  this.toDate = toDate;
}

PieChart.Call.Graph.prototype.draw = function(element) {
  var chart = new google.visualization.PieChart(element);

  var options = {
    title: "Calls status summary ( " + this.fromDate.toKhFormat() + " - " + this.toDate.toKhFormat() + ")",
    colors: PieChart.colors,
    legend: { position: 'none' },
    pieHole: 0.4
  };

  chart.draw(this.data(), options);
}

PieChart.Call.Graph.prototype.data = function() {
  var rows = [];

  var statuses = Chart.Pie.Call.groupBy(this.records);
  for(var status in statuses) {
    if(status == "total_calls") continue;
    var record = statuses[status];
    rows.push([status, record["calls"]]);
  }

  var dt = new google.visualization.DataTable();
  dt.addColumn("string", "Calls");
  dt.addColumn({type: "number", label: "Number of calls", pattern: "#,###.00"});
  dt.addRows(rows);

  return dt;
}

PieChart.Call.Table = function(records, fromDate, toDate) {
  this.records = records;
  this.fromDate = fromDate;
  this.toDate = toDate;
}

PieChart.Call.Table.prototype.draw = function(element) {
  if(this.records.length == 0) { return; }

  var statuses = Chart.Pie.Call.groupBy(this.records);
  for(var status in statuses) {
    if(status == 'total_calls') continue;
    var record = statuses[status];
    var html = '<tr>' +
      "<td><i class='glyphicon glyphicon-stop' style='color:" +record["color"] + "' />" + record["desc"] + "</td>" +
      '<td>' + record["calls"] + '</td>' +
      '<td>' + record.percentageOf(statuses["total_calls"], 1) + "%" + '</td>' +
      '<td>' + record["duration"] + '</td>' + '</tr>';

    element.children('tbody').append(html);
  }
}

PieChart.Call.Table.prototype.clear = function(element) {
  element.children('tbody').children().remove();
}
