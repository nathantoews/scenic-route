var React = require('react/addons');
var ProfileNav = require('./views/ProfileNav.jsx');
var config = require('./config.js');
var SetupFlow = require('./views/SetupFlow.jsx');
var RouteView = require('./views/RouteView.jsx');
var Parks = require('./views/ParkProfile.jsx');
var MapView = require('./views/Map.jsx');
var Loader = require('./views/Loader.jsx');
var ScenicStore = require('./stores/Stores.jsx');
var Actions = require('./stores/Actions.jsx');

var Body = React.createClass({

	getInitialState: function(){
		console.log(ScenicStore);
		window.blargh = Actions;
		return {
			hideLoader: ScenicStore.getSessionState().isLoading,
			test: ScenicStore.getData()
		};
	},
	isLoading: function(loading){
		// Actions.isLoading()
		// var _newState = {
		// 	showLoader:loading
		// };
		// this.setState(_newState);
		// console.log(this.state.showLoader);
		// window.blatt = this.state.showLoader;
	},
	componentDidMount: function(){
		window.mystate = this.state;
		ScenicStore.addChangeListener(this._onChange);
	},
	changeData: function(){
	    Actions.test();
	},
    render: function(){ 
      return (
      		<div id='containerRow' className="row">
				<ProfileNav/>
				<SetupFlow parentState={this.state} isLoading={Actions.isLoading} />
				<MapView />
				<Loader stateClass={ (this.state.hideLoader) ? '' : 'hidden'} />
            </div>
      );
    },
    componentWillUnmount: function(){
    	ScenicStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
    	console.log("Change Receeived");
    	// this.setState({test: ScenicStore.getData()});
    	console.log(ScenicStore.getSessionState());
    	this.setState({hideLoader: ScenicStore.getSessionState().isLoading})
    }
});
 
 
React.render(<Body />, document.getElementById('content'));