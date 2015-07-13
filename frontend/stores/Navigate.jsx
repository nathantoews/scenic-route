var Dispatcher = require('./Dispatcher.jsx');
var ScenicStore = require('./Stores.jsx');
var Actions = require('./Actions.jsx');


var Navigate = {
  /**
   * @param  {string} text
   */
  getSuggestions: function(query, cb) {
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
  },
  // Sample query: http://104.131.189.81/greenify?origin=-79.380658,43.645388&dest=-79.391974,43.647957   
  buildGreenifyURL: function(){
    var origin = ScenicStore.getSessionState().origin;
    var destination = ScenicStore.getSessionState().destination;
    var api = "http://104.131.189.81/greenify?";
    api += "origin=" + origin.latLng.lng + ',' + origin.latLng.lat;
    api += "&";
    api += "dest=" + destination.latLng.lng + ',' + destination.latLng.lat;
    return api;    
  },
  buildMapboxDirectionsURL: function(){
    var origin = ScenicStore.getSessionState().origin;
    var destination = ScenicStore.getSessionState().destination;
    var greenpoints = ScenicStore.getSessionState().greenpoints;

    var api = "https://api.tiles.mapbox.com/v4/directions/";
    api += 'mapbox.walking';
    api += '/';
    api += origin.latLng.lng + ',' + origin.latLng.lat + ';';
    // Affix green waypoints here!
    console.log("In build", greenpoints);
    // Only viewing fastest green route right now.
    var testpoints = JSON.parse(greenpoints.results[0].scenic_route);
    testpoints.map(function(it){
      var lng = it[0];
      var lat = it[1];
      api += lng + ',' + lat + ';';
    });
    window.blah = JSON.parse(greenpoints.results[0].scenic_route);
    api += destination.latLng.lng + ',' + destination.latLng.lat;
    api += '.json?instructions=html&access_token=';
    api += 'pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
    return api;    
  },
  generateRoute: function(event){
    event.preventDefault();
    event.stopPropagation();

    var origin = ScenicStore.getSessionState().origin;
    var destination = ScenicStore.getSessionState().destination;

    // Setup directions Mapbox Directions object.
    var directionsSetup = L.mapbox.directions({
        profile: 'mapbox.walking',
    });
    directionsSetup.setOrigin(origin.latLng);
    directionsSetup.setDestination(destination.latLng);
    
    // Get green waypoints, before you request for directions.
    Actions.isLoading(true);

    $.get(Navigate.buildGreenifyURL(), function(results,err){
        console.log("Hit Greenify API", results);
        Actions.setGreenpoints(results);
        // Sends a GET request to the Mapbox API.
        $.get(Navigate.buildMapboxDirectionsURL(), function(routesInfo, err){
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
        });
    });
  
  return false;
}  
};

module.exports = Navigate;