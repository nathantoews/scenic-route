var React = require('react/addons');
var Classnames = require('classnames');
var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');


function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    console.log('cookie value', value);
    return (value == null) ? false : decodeURIComponent(value);
}

var PageController = React.createClass({
	getInitialState: function(){
		return {
			'activePage': null,
			'saved': [],
			'containerCSS': Classnames(
								'staticPageContainer',
								'hide', 
								ScenicStore.getLayout().containerMask
							)
		};
	},	
	aboutUs: function(){
		return (
			<div className="viewContainer">
				<h1>About Us</h1>
				<hr />
			</div>
		);
	},	
	savedRoutes: function(){
		return (
			<div className="viewContainer">
			<h1>Saved Routes</h1>
			{
			    this.state.saved.map(function(route) {
			    	console.log('ROUTE', route.originName)
			        return  <div className='favouritedRoute'>
								<div>{route.originName}</div>
								<div>{route.destinationName}</div>
								<div>{route.formatted.duration}</div>
								<div>{route.formatted.distance}</div>
								<button onClick={Navigate.generateSingleton.bind(this, route)}>Go!</button>
							</div>
				})
			}	
			</div>
		);
	},		
	componentDidMount: function(){
		window.hrr = this;
		ScenicStore.addChangeListener(this.updateState);
	},
	updateState: function(){
		var containerCSS; 
		if (!ScenicStore.getActivePage()){
			containerCSS = Classnames(
								'staticPageContainer',
								'hide', 
								ScenicStore.getLayout().containerMask
							);
		}
		else{
			containerCSS = Classnames(
								'staticPageContainer', 
								ScenicStore.getLayout().containerMask
							);
		}
		

		console.log(ScenicStore.getActivePage());
		console.log(readCookie('authenticated'));
		if ((ScenicStore.getActivePage() == 'savedRoutes') && readCookie('authenticated')){
			$.get("http://localhost:3000/favourite-routes", {
				authId: parseFloat(readCookie('authId')), 
				type: readCookie('type')
			}, 
			function(res, err){
				console.log(res);
				console.log(err);
				this.setState({
					'activePage': ScenicStore.getActivePage(),
					'containerCSS': containerCSS,
					'saved': res
				})
			}.bind(this));					
		}
		else{
			this.setState({
				'activePage': ScenicStore.getActivePage(),
				'containerCSS': containerCSS,
			})			
		}
	},		
	render: function() {
		return (
		    <div className={this.state.containerCSS}>
		    	{this.state.activePage ? this[this.state.activePage]() : null}
		    </div>
		);
	}
});

module.exports = PageController;

