//= require 'jquery-1.10.1'
//= require_tree .

$(function() {
  var mainViewModel = new MainViewModel();
  ko.applyBindings(mainViewModel, document.getElementById('main'));

  window.vm = mainViewModel;

  $.getJSON('http://govhack.dev/api/representatives', function(data) {
    $.each(data, function(_, rep) {
      mainViewModel.allRepresentatives.push(new RepresentativeViewModel(rep));
    });
  });

  var setupSearch = function() {
    $('body').keydown(function(e) {
      var current = mainViewModel.searchText();

      if (e.keyCode == 8) {
        mainViewModel.searchText(current.substring(0,current.length-1));
        e.preventDefault();
      }
      else {
        if ((e.keyCode > 64 && e.keyCode < 91) || e.keyCode == 32) {
          var keyPressed = String.fromCharCode(e.keyCode);
          mainViewModel.searchText(mainViewModel.searchText() + keyPressed);
        }
      }
    });
  };

  var setupOFace = function() {
    var julia = $('[data-id=10257]');
    var originalImage = julia.attr('src');
    julia.mouseenter(function() {
      $(this).attr('src', './images/julia-oface.jpg');
    });
    julia.mouseleave(function() {
      $(this).attr('src', originalImage);
    });
  };

  window.setTimeout(setupOFace, 500);

  window.setTimeout(setupSearch, 500);
});