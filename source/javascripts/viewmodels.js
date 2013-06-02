function MainViewModel() {
  var self = this;

  self.representatives = ko.observableArray();

  self.selectedRepresentative = ko.observable(null);
  self.hasRepresentative = ko.computed(function() {
    return self.selectedRepresentative != null;
  });

  self.selectRepresentative = function() {
    
  };
}

function RepresentativeViewModel(rep) {
  var self = this;

  self.person_id = rep.person_id;

  self.member_id = rep.member_id;

  self.name = rep.full_name;

  self.image_url = rep.image_url;

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
}