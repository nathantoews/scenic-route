var React = require('react/addons');

var Loader = React.createClass({


	loadText: function() {
	var quotes= new Array();
	quotes.push("mapping your greenlane");
	quotes.push("soaking in the sun");
	quotes.push("turning over a new leaf");
	quotes.push("smelling the roses");
	quotes.push("mingling with mother nature");

	return quotes[Math.round(Math.random()*(quotes.length))];
},


	render: function(){
		return (
			<div id="green_loader" className={this.props.stateClass}>
				<div className="loading_content s4 m4 l4">
					<div className="logoWhite"></div>
					<div className="preloader-wrapper big active">
					<div className="spinner-layer spinner-white-only">
					<div className="circle-clipper left">
					<div className="circle"></div>
					</div>
					</div>
					</div>

						<h2 className="flow-text">{this.loadText()}</h2>
				</div>
			</div>
		);
	}
});
module.exports = Loader;