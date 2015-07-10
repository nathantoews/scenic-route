var React = require('react/addons');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');

var cx = React.addons.classSet;
var inputClasses = cx({
  'validate': true,
  'typeahead': true
});

// Builds autocomplete suggestions using the Google Directions API
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
  getInitialState: function(){
    console.log("In Endpoints");
    console.log(this.props.bodyState);
    return {
      "origin": {},
      "destination": {},
      "greenpoints": []
    };
  },
  // Sample query: http://104.131.189.81/greenify?origin=-79.380658,43.645388&dest=-79.391974,43.647957  
  buildGreenifyURL: function(){
    var api = "http://104.131.189.81/greenify?";
    api += "origin=" + this.state.origin.latLng.lng + ',' + this.state.origin.latLng.lat;
    api += "&";
    api += "dest=" + this.state.destination.latLng.lng + ',' + this.state.destination.latLng.lat;
    return api;
  },
  // Should invoke the previous method within a GET.
  getGreenpoints: function(){

  },
  buildMapboxDirectionsURL: function(){
    var api = "https://api.tiles.mapbox.com/v4/directions/";
    api += 'mapbox.walking';
    api += '/';
    api += this.state.origin.latLng.lng + ',' + this.state.origin.latLng.lat + ';';

    // Affix green waypoints here!
    console.log("In build", this.state.greenpoints);

    // Only viewing fastest green route right now.
    var testpoints = JSON.parse(this.state.greenpoints.results[0].scenic_route);
    
    testpoints.map(function(it){
      var lng = it[0];
      var lat = it[1];
      api += lng + ',' + lat + ';';
    });

    window.blah = JSON.parse(this.state.greenpoints.results[0].scenic_route);


    api += this.state.destination.latLng.lng + ',' + this.state.destination.latLng.lat;
    api += '.json?instructions=html&access_token=';
    api += 'pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
    return api;
  },
  generateRoute: function(evt){
    evt.preventDefault();
    evt.stopPropagation();



    // Setup directions Mapbox Directions object.
    var directionsSetup = L.mapbox.directions({
        profile: 'mapbox.walking',
    });
    directionsSetup.setOrigin(this.state.origin.latLng);
    directionsSetup.setDestination(this.state.destination.latLng);
    
    // Get green waypoints, before you request for directions.
    Actions.isLoading(true);
    console.log("In generateRoute", this.props.bodyState);

    $.get(this.buildGreenifyURL(), function(results,err){
        console.log("Hit Greenify API", results);

        this.setState({'greenpoints': results});

        // Sends a GET request to the Mapbox API.
        $.get(this.buildMapboxDirectionsURL(), function(routesInfo, err){
          console.log("IN THE GET REQUEST");
          console.log(routesInfo);

          // Grabbing map and directions
          var poly_raw = routesInfo.routes[0].geometry.coordinates;
          var steps = routesInfo.routes[0].steps;
          // Route coordinates formatted as (lng,lat), and
          // must be inverted to (lat,lng) for plotting
          poly_raw = poly_raw.map(function(e){
            return e.reverse();
          });
          // Draw polyline to the map
          var path = L.polyline(poly_raw);
          path.addTo(window.map)
          // Pan to the path
          var bounds = path.getBounds();
          window.map.fitBounds(bounds);
          Actions.isLoading(false);          
        }.bind(this));
    }.bind(this));
    // In case the GET request above hangs.
    // this.props.isLoading(false);
    return false;
  },
  componentDidMount: function(){
    var geocoder = new google.maps.Geocoder();
    $('.typeahead').typeahead(null, {
      displayKey: 'description',
      source: getSuggestions
    });
    $('.typeahead').on('typeahead:selected', function(evt, obj){
      console.log(obj);
      console.log("capturing event");

      var _stateChange = {};
      geocoder.geocode({'placeId': obj.place_id}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // Grab the most likely candidate for the reverse geocode lookup.
            if (results[0]){
              // Modify the state value to represent the updated values.
              // x.geometry.location returns a google.map.LatLng object
              _stateChange[evt.target.id] = {
                // Convert to a Mapbox latLng object to pass into directions.
                "latLng": L.latLng(results[0].geometry.location.lat(),results[0].geometry.location.lng())
              };
              this.setState(_stateChange);
              window.travelState = this.state;

            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        }.bind(this));
    }.bind(this));
  },
  render: function() {
    return (
        <form onSubmit={this.generateRoute}>
          <div className="row">
            <div className="input-field">
              <input id="origin" type="text" placeholder="I'm Starting Here" className={inputClasses} />
            </div>
            <div className="input-field">
              <input id="destination" type="text" placeholder="I'm Going To" className={inputClasses} />
            </div>            
          </div>
          <button id='submitRoute' className="btn waves-effect waves-light">
            <i className="material-icons">send</i>
          </button>          
        </form>
    );
  }
});

module.exports = Endpoints;