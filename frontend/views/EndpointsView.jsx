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
    var geocoder = new google.maps.Geocoder();
    $('.typeahead').typeahead(null, {
      displayKey: 'description',
      source: getSuggestions
    });
    $('.typeahead').on('typeahead:selected', function(evt, obj){
      console.log(evt);
      console.log(obj);
      window.sel = obj;

      geocoder.geocode({'placeId': obj.place_id}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              console.log("RESULT FOUND!")
              // Do something with the results[0].geometry object.
              console.log(results[0]);
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
    });
  }, 
  handleSubmit: function(e){
    return false;
  },
  render: function() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field">
              <input placeholder="Origin" id="origin" type="text" className={inputClasses} />
            </div>
            <div className="input-field">
              <input placeholder="Destination" id="destination" type="text" className={inputClasses} />
            </div>            
          </div>
          <button id='submitRoute' className="btn waves-effect waves-light" type="submit">
            <i className="material-icons">send</i>
          </button>          
        </form>
    );
  }
});

module.exports = Endpoints;