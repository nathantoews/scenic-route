var React = require('react/addons');
var Classnames = require('classnames');
var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');

var PageController = React.createClass({
	getInitialState: function(){
		return {
			'activePage': null,
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
	componentDidMount: function(){
		window.hrr = this;
		ScenicStore.addChangeListener(this.updateActivePage);
	},
	updateActivePage: function(){
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
		
		this.setState({
			'activePage': ScenicStore.getActivePage(),
			'containerCSS': containerCSS
		})
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

