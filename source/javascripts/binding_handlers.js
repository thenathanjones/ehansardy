$(function() {
  ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
      // Initially set the element to be instantly visible/hidden depending on the value
      var value = valueAccessor();
      $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
      // Whenever the value subsequently changes, slowly fade the element in or out
      var value = valueAccessor();
      ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).hide();
    }
  };

  ko.bindingHandlers.expando = {
    update: function(element, valueAccessor) {
      var value = valueAccessor();
      if (ko.utils.unwrapObservable(value)) {
        $(element).autosize();
      }
    }
  };

  ko.bindingHandlers.stopBindings = {
    init: function() {
      return { controlsDescendantBindings: true };
    }
  };
});