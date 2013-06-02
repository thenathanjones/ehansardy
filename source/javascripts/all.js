//= require 'jquery-1.10.1'
//= require_tree .

$(function() {
  var mainViewModel = new MainViewModel();
  ko.applyBindings(mainViewModel, document.getElementById('main'));

  window.vm = mainViewModel;

  $.getJSON('http://govhack.dev/api/representatives', function(data) {
    $.each(data, function(_, rep) {
      mainViewModel.representatives.push(new RepresentativeViewModel(rep));
    });
  });
});