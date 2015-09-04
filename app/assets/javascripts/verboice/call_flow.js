var CallFlow = function CallFlow(steps, traffic, element) {
  this.steps = CallFlow.arrayToDict(steps);
  this.traffic = traffic;
}

CallFlow.arrayToDict = function(steps) {
  var dict = {};

  for(var i = 0; i < steps.length; i++) {
    if(steps[i].root) {
      dict.root = steps[i];
      continue;
    }
    dict[steps[i].id] = steps[i];
  }

  return dict;
}

CallFlow.prototype.nextStep = function(step) {
  return this.steps[step.next];
}

CallFlow.prototype.draw = function(step, element, isNested) {
  this.drawStepTo(step, element, isNested);

  if(!step.root) {
    this.drawLinkOf(step);
  }

  var nextStep = this.nextStep(step);

  if(!isNull(nextStep)) {
    this.draw(nextStep, element, false);
  }
}

CallFlow.prototype.drawTo = function(element) {
  var step = this.steps.root;

  if (isNull(step)) return;

  this.draw(step, element, false);
}

CallFlow.prototype.drawStepTo = function(step, element, isNested) {
  var nodeStep = this.nodeOf(step, isNested ? 'va' : 'ha');
  nodeStep.appendTo(element);

  this.drawChildrenTo(step.options, element);
}

CallFlow.prototype.drawChildrenTo = function(children, element) {
  if(!children || children.length <= 0) return;

  var ul = $("<ul class='step children'>");
  ul.appendTo(element);

  for(var i = 0; i < children.length; i++) {
    var isLastChild = true;
    if(i == 0) {
      isLastChild = false;
    }

    var li = $("<li class='item'>");
    li.appendTo(ul);

    if(children[i].next) {
      var childStep = this.steps[children[i].next];
      this.draw(childStep, li, isLastChild);
    }
  }
}

CallFlow.prototype.drawLinkOf = function(step) {
  var span = $("<span>");
  var parent = $("#" +step.id);
  span.appendTo(parent);
}

CallFlow.prototype.nodeOf = function(step, clazz) {
  var div = $("<div id='" + step.id + "' class='" + clazz + "'>");
  var p = $("<p class='step " + step.type + "'>");
  p.appendTo(div);

  return div;
}
