var React = require('react');
var ProfileNav = require('./views/ProfileNav.jsx');
var config = require('./config.js');
var SetupFlow = require('./views/SetupFlow.jsx');
var RouteView = require('./views/RouteView.jsx');
var Parks = require('./views/ParkProfile.jsx');
var MapView = require('./views/Map.jsx');
 
var Body = React.createClass({
    render: function(){
      return (
      		<div className="row">
              <SetupFlow/>
              <MapView/>
            </div>
      );
    }
});
 
 
React.render(<Body />, document.getElementById('content'));