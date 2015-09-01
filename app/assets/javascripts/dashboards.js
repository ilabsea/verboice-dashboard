$(function(){
  var $projectId = $("#project_id");
  projectChanged($projectId);

  $('#fromDate').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true
  }).on('changeDate', function(ev){
    var fromDate = $(this).val().split("/");
    $('#toDate').data('datepicker').setStartDate(new Date(fromDate[2], fromDate[1] - 1, fromDate[0]));

    setDateRange($(this).val(), $("#toDate").val());
  });

  $('#toDate').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true
  }).on('changeDate', function(ev){
    setDateRange($("#fromDate").val(), $(this).val());
  });

  $('.calendar').on('focus', function() {
    var customRange = $("#custom_range");
    setActive(customRange);
  });

  $('.daterange-confirm').on('click', function() {
    $('.bs-example-modal-sm').modal('hide')
  });

  $("#date_range").on("focus",function() {
    $(".modal").modal("show")
  });

  $("#this_week").on('click', function() {
    setActive(this);

    var curr = new Date(); // get current date
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay())); // First day is the day of the month - the day of the week
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6)); // last day is the first day + 6

    setDateRange(firstday.toLocaleFormat('%d/%m/%Y'), lastday.toLocaleFormat('%d/%m/%Y'));
  });

  $("#this_month").on('click', function() {
    setActive(this);

    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);

    setDateRange(firstday.toLocaleFormat('%d/%m/%Y'), lastday.toLocaleFormat('%d/%m/%Y'));
  });

  $("#previous_month").on('click', function() {
    setActive(this);

    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth(), 0);

    setDateRange(firstday.toLocaleFormat('%d/%m/%Y'), lastday.toLocaleFormat('%d/%m/%Y'));
  });

  $("#btn_apply").on("click", function() {
    // date range format: dd/mm/yyyy to dd/mm/yyyy
    var dateRange = $("#date_range").val().split("to");
    if (dateRange.length < 2) {
      showErrorMessage();
      return;
    }

    var fromDate = Date.fromKhFormat(dateRange[0]);
    var toDate = Date.fromKhFormat(dateRange[1]);

    var projectId = $("#project_id option:selected").val();
    var callFlowId = $("#call_flow_id option:selected").val();
    var channelId = $("#channel_id option:selected").val();
    if(channelId == "") {
      showErrorMessage();
      return;
    }

    // line chart traffics
    $.ajax({
      method: 'GET',
      url: config['host'] + "api/traffics.json",
      data: {
        project_id: projectId,
        call_flow_id: callFlowId,
        channel_id: channelId,
        start_date: dateRange[0].trim(),
        end_date: dateRange[1].trim()
      },
      success: function(records){
        var chart = new Chart.Line(fromDate, toDate, records);
        chart.draw(document.getElementById('linechart'));
        showChartPanel();
      }
    });

    // pie chart call flow summary
    $.ajax({
      method: 'GET',
      url: config['host'] + "api/call_flow_traces.json",
      data: {
        project_id: projectId,
        call_flow_id: callFlowId,
        channel_id: channelId,
        start_date: dateRange[0].trim(),
        end_date: dateRange[1].trim()
      },
      success: function(records){
        var chart = new Chart.Pie.CallFlow.Graph(records, fromDate, toDate);
        chart.draw(document.getElementById('piechart-call-flow-summary'));
        var table = new Chart.Pie.CallFlow.Table(records, fromDate, toDate);
        table.clear($("#table-call-flow-summary"));
        table.draw($('#table-call-flow-summary'));
        showChartPanel();
      }
    });

    // pie chart call status summary
    $.ajax({
      method: 'GET',
      url: config['host'] + "api/traffic_details.json",
      data: {
        project_id: projectId,
        call_flow_id: callFlowId,
        channel_id: channelId,
        start_date: dateRange[0].trim(),
        end_date: dateRange[1].trim()
      },
      success: function(records){
        var chart = new Chart.Pie.Call.Graph(records, fromDate, toDate);
        chart.draw(document.getElementById('piechart-call-summary'));
        var table = new Chart.Pie.Call.Table(records, fromDate, toDate);
        table.clear($("#table-call-summary"));
        table.draw($('#table-call-summary'));
        showChartPanel();
      }
    })
  });

  $(".alert button.close").click(function (e) {
    $(this).parent().fadeOut('slow');
  });

  function setActive(element) {
    $(".list-group-item").removeClass('active');
    $(element).addClass('active');
  }

  function setDateRange(fromDate, toDate) {
    $("#date_range").val(fromDate + " to " + toDate);
  }

  function showErrorMessage() {
    $(".alert-dismissable").fadeIn("slow");
    window.setTimeout(function() {
      $(".alert").fadeOut('slow');
    }, 5000);
  }

  function showChartPanel() {
    $(".panel-info").removeClass("hide");
  }

});
