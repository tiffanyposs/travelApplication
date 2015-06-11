	//autocomplete
  var autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),
      {
      	//this is for counties or regions
        // types: ['(regions)'],
        types: ['(cities)']
        // componentRestrictions: countryRestrict
  });

  