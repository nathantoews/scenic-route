var React = require('react/addons');
var Classnames = require('classnames');
var ProfileNav = require('./views/ProfileNav.jsx');
var config = require('./config.js');
var SetupFlow = require('./views/SetupFlow.jsx');
var RouteView = require('./views/RouteView.jsx');
var ParkInfo = require('./views/ParkInfo.jsx');
var MapView = require('./views/Map.jsx');
var StaticPages = require('./views/StaticPages.jsx');
var Loader = require('./views/Loader.jsx');

var ScenicStore = require('./stores/Stores.jsx');
var Actions = require('./stores/Actions.jsx');

var Body = React.createClass({
	getInitialState: function(){
		console.log(ScenicStore);
		window._Actions = Actions;
		window._Store = ScenicStore;
		return {
			hideLoader: ScenicStore.getSessionState().isLoading,
			layout: ScenicStore.getLayout(),
			test: ScenicStore.getData(),
			backBtn: Classnames(ScenicStore.getBackBtnState().css),
			lockHeight: {}
		};
	},
	componentDidMount: function(){
		// only occurs once once the rest of the site has loaded!
		window.mystate = this.state;
		ScenicStore.addChangeListener(this._onChange);
		$("body").css({
			'min-height': window.innerHeight
		})
	},
	changeData: function(){
	    Actions.test();
	},
    render: function(){ 
      return (
			<div id='containerRow' style={this.state.lockHeight} className="row">
		        <div id='backBtn' onClick={Actions.goBack} className={this.state.backBtn}></div>  			
				<ProfileNav />
				<SetupFlow layout={this.state.layout.nav} parentState={this.state} isLoading={Actions.isLoading} />
				<MapView layout={this.state.layout.map} />
				<Loader stateClass={ (this.state.hideLoader) ? '' : 'hidden'} /> 
				<RouteView />
				<StaticPages />
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
    	// Set Loader State
    	this.setState({hideLoader: ScenicStore.getSessionState().isLoading});
    	// Set Updated Layouts State
    	this.setState({layout: ScenicStore.getLayout()});
	    this.setState({
	      // layout prop deails with right padding, 
	      // backBtnState deals with visibility of the button.
	      backBtn: Classnames(
	      	ScenicStore.getLayout().backBtn, 
	      	ScenicStore.getBackBtnState().css
	      )
	    })    	
    }
});
 
 
React.render(<Body />, document.getElementById('content'));