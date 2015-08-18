function projectChanged(element){
  element.on('change',function(){
    var elementId = element.attr("id");

    if(element.val()) {
      var project = $("#" +elementId +" option:selected").text();
      $("#project_field").val(project);

      $.ajax({
        method: 'GET',
        url: config['host'] + "api/call_flows.json",
        data: {project_id: element.val()},
        success: function(callFlows){
          addOptionsTo(callFlows, 'call_flow_id');
        }
      });
    } else {
      addOptionsTo([], 'call_flow_id');
    }
  });
};

function addOptionsTo(callFlows, elementId){
  callFlows.unshift(defaultOptionText());

  options = $.map(callFlows, function(item){
    return "<option value='" + item.id + "' >" + item.name + "</options>";
  });

  $("#" +elementId).html(options);
};

function defaultOptionText(){
  return {id: '', name: '--- Select call flow ---'};
}
