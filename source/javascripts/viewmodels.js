function MainViewModel() {
  var self = this;

  self.searchText = ko.observable('');
  self.hasSearchText = ko.computed(function() {
    return self.searchText().length > 0;
  });

  self.allRepresentatives = ko.observableArray();

  self.representatives = ko.computed(function() {
    if(self.hasSearchText()) {
      return self.allRepresentatives().filter(function(rep) { return rep.name.toLowerCase().indexOf(self.searchText().toLowerCase()) != -1; });
    }

    return self.allRepresentatives();
  });

  self.selectedRepresentative = ko.observable(null);
  self.hasRepresentative = ko.computed(function() {
    return self.selectedRepresentative() != null;
  });

  self.selectRepresentative = function(rep) {
    self.searchText('');

    self.selectedRepresentative(rep);

    rep.retrieveDetailedInfo();
  };

  self.backToMenu = function() {
    self.selectedRepresentative().clearAllTheThings();

    self.selectedRepresentative(null);
  };
}
  

function RepresentativeViewModel(rep) {
  var self = this;

  self.person_id = rep.person_id;

  self.member_id = rep.member_id;

  self.name = rep.full_name;

  self.image_url = rep.image_url;

  self.electorate = rep.electorate;

  self.speeches = ko.observable([]);
  self.speechCount = ko.computed(function() {
    return self.speeches().length;
  });

  self.interjections = ko.observable([]);
  self.interjectionCount = ko.computed(function() {
    return self.interjections().length;
  });

  self.warnings = ko.observable([]);
  self.warningCount = ko.computed(function() {
    return self.warnings().length;
  });

  self.removals = ko.observable([]);
  self.removalCount = ko.computed(function() {
    return self.removals().length;
  });

  self.clearAllTheThings = function() {
    self.speeches([]);
    self.interjections([]);
    self.warnings([]);
    self.removals([]);
  };

  self.party = rep.party;
  self.partyClass = ko.computed(function() {
    if (self.party == 'Australian Labor Party') {
      return 'labor';
    }
    
    if (self.party == 'Liberal Party') {
      return 'liberal';
    }
    
    return 'other';
  });

  self.retrieveDetailedInfo = function() {
    $.getJSON('http://govhack.dev/api/representatives/' + self.member_id + '/speeches', function(data) {
      self.speeches(data);
    });
    $.getJSON('http://govhack.dev/api/representatives/' + self.member_id + '/interjections', function(data) {
      self.interjections(data);
    });
    $.getJSON('http://govhack.dev/api/representatives/' + self.member_id + '/warnings', function(data) {
      self.warnings(data);
    });
    $.getJSON('http://govhack.dev/api/representatives/' + self.member_id + '/removals', function(data) {
      self.removals(data);
    });
  };
}