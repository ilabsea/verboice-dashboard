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
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    setDateRange(firstday.toLocaleFormat('%d/%m/%Y'), lastday.toLocaleFormat('%d/%m/%Y'));
  });

  $("#this_month").on('click', function() {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);

    setDateRange(firstday.toLocaleFormat('%d/%m/%Y'), lastday.toLocaleFormat('%d/%m/%Y'));
  });

  $("#previous_month").on('click', function() {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth(), 0);

    setDateRange(firstday.toLocaleFormat('%d/%m/%Y'), lastday.toLocaleFormat('%d/%m/%Y'));
  });

  $(".list-group-item").on("click", function() {
    setActive(this);
  });

  function setActive(element) {
    $(".list-group-item").removeClass('active');
    $(element).addClass('active');
  }

  function setDateRange(fromDate, toDate) {
    $("#date_range").val(fromDate + " to " + toDate);
  }

});
