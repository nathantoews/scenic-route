var React = require('react/addons');

var Loader = React.createClass({
	render: function(){
		return (
			<div id="green_loader" className={this.props.stateClass}>
				<div className="loading_content s4 m4 l4">
						<img src="public/assets/loading.gif" alt="Building your personalized green route..." />					
						<h2 className="flow-text">Bear with us while we build your green route.</h2>
				</div>
			</div>
		);
	}
});
module.exports = Loader;