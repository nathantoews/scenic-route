var React = require('react/addons');

 var cx = React.addons.classSet;
  var inputClasses = cx({
    'validate': true,
    'typeahead': true
  });

function getSuggestions(query, cb) {
    var TorontoBbox = new google.maps.LatLngBounds(
        new google.maps.LatLng(43.574896,-79.601904),
        new google.maps.LatLng(43.856788, -79.167944)
    );
    var service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query, bounds: TorontoBbox, componentRestrictions: { country: 'CA' } }, function(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log("Autocomplete status: " + status);
            return;
        }
        return cb(predictions);
    });
}

var Endpoints = React.createClass({
  componentDidMount: function(){
    $('.typeahead').typeahead(null, {
      displayKey: 'description',
      source: getSuggestions
    });
  }, 
  render: function() {
    return (
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input placeholder="Origin" id="origin" type="text" className={inputClasses} />
            </div>
            <div className="input-field col s12">
              <input placeholder="Destination" id="destination" type="text" className={inputClasses} />
            </div>            
          </div>
        </form>
    );
  }
});

module.exports = Endpoints;