var React = require('react/addons');
var ProfileNav = require('./views/ProfileNav.jsx');
var config = require('./config.js');
var SetupFlow = require('./views/SetupFlow.jsx');
var RouteView = require('./views/RouteView.jsx');
var Parks = require('./views/ParkProfile.jsx');
var MapView = require('./views/Map.jsx');
var Loader = require('./views/Loader.jsx');

var Body = React.createClass({
	getInitialState: function(){
		return {
			showLoader: false
		};
	},
	isLoading: function(loading){
		console.log("In isLoading - loading", loading);
		var _newState = {
			showLoader:loading
		};
		this.setState(_newState);
		console.log(this.state.showLoader);
		window.blatt = this.state.showLoader;
	},
	componentDidMount: function(){
		console.log("PARENT JUST MOUNTED");
		window.whyisthis = this.state;
	},
    render: function(){ 
      return (
      		<div id='containerRow' className="row">
      			<ProfileNav/>
            	<SetupFlow parentState={this.state} isLoading={this.isLoading} />
            	<MapView />
				<Loader stateClass={(this.state.showLoader) ? 'showLoader-tru' : 'hidden'} />
            </div>
      );
    }
});
 
 
React.render(<Body />, document.getElementById('content'));