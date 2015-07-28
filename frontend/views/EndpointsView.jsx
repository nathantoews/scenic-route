var React = require('react/addons');
var inputClassnames = require('classnames');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');
var Navigate = require('../stores/Navigate.jsx');
var Analytics = require('../stores/Analytics.jsx');

var inputClasses = inputClassnames('typeahead');

var Endpoints = React.createClass({
  getInitialState: function(){
    console.log("In Endpoints");
    return {
      "origin": {},
      "destination": {},
      "greenpoints": [],
    };
  },
  componentDidMount: function(){
    var geocoder = new google.maps.Geocoder();
    $('.typeahead').typeahead(null, {
      displayKey: 'description',
      source: Navigate.getSuggestions
    });
  }, 
  // Looks at the store state and decides whether
  // to show one or two inputs.
  routeInputs: function(){
      console.log("Returning Route Inputs");
      if (this.props.loop){
        // Show looping inputs!
        console.log("I'M LOOPING");
        return [
              <div className="input-field">
                <input id="origin" type="text" placeholder="Looping From" className={inputClasses} required/>
              </div>
        ];
      }
      else{
        // Show routing inputs
        console.log("I'M ROUTING!");
        return [
              <div className="input-field">
                <div className="yourLoc"></div>
                <input id="origin" type="text" placeholder="Home" className={inputClasses} required/>
                <label className="active" htmlFor="origin">Im starting here</label>
              </div>,
              <div className="input-field">
                <input id="destination" type="text" placeholder="Critical Mass" className={inputClasses} required/>
                <label className="active" htmlFor="origin">Im going there</label>
              </div>
        ];        
      }
  },
  validate: function(){
    var geocoder = new google.maps.Geocoder();    

    var TorontoBbox = new google.maps.LatLngBounds(
        new google.maps.LatLng(43.574896,-79.601904),
        new google.maps.LatLng(43.856788, -79.167944)
    );

    var validated = true;
    $('.distContainer input[required]').map(function(){
        if (!this.value){
          validated = false;
        }
        else{
            var _value = this.value;
            var _id = this.id;

            geocoder.geocode({
                address: this.value, 
                bounds:  new google.maps.LatLngBounds(
                      new google.maps.LatLng(43.574896,-79.601904),
                      new google.maps.LatLng(43.856788, -79.167944)
            )}, function(results, status){
                        if (status == google.maps.GeocoderStatus.OK) {
                          // Grab the most likely candidate for the reverse geocode lookup.
                          if (results[0]){
                            //setting store with destination sessions state////////////////
                            var _Name = _value;
                            _Name = _Name.split(',', 1).join("");
                            Actions.setSessionState(_id + 'Name', _Name );
                            // Modify the state value to represent the updated values.
                            // x.geometry.location returns a google.map.LatLng object
                            Actions.setSessionState(_id, {
                              "latLng": L.latLng(
                                            results[0].geometry.location.lat(),
                                            results[0].geometry.location.lng()
                                        )
                            });
                          } else {
                            validated = false;
                            Analytics.locationError(_id);
                            alert('No results found for ' + _id);
                          }
                        }
                })        
            }
    });
    
    if (validated)
      addLoc(); 
    else
      alert('Form remains incomplete');

    return false;
  },
  render: function() {
    return (
        <div className="distContainer row">
            {
              this.routeInputs().map(function(reactComponent){
                return reactComponent;
              })
            }
          <button id='submitRoute' onClick={this.validate} className="btn-secondary waves-effect waves-light col s8 offset-s2">continue
          </button>          
        </div>
    );
  }
});

module.exports = Endpoints;