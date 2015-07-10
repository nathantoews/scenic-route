var React = require('react/addons');

var Map = React.createClass({
	componentWillMount: function(){
		this.updateDimensions();
	},
	componentDidMount: function(){
	    L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
	    window.map = L.mapbox.map('map', 'mapbox.streets')
	      			.setView([43.64, -79.39], 9);
	    window.addEventListener("resize", this.updateDimensions);	      			

	    console.log("PARENT STATE:", this.props.parentState);
	    // this.props.setParentState({test:'YOU PASSED PROPS SONN'});
	    // Parent mounts only after all children elements mount!
	    // console.log("CHANGING PARENT STATE...", this.props.parentState);
	},
	// Invoked to keep the map consistent on screen
	updateDimensions: function(){
		console.log("In update dimensions");
		if (window && window.map){
			window.map.invalidateSize();
			console.log("map invalidated");
		}
		this.setState({width: $(window).width(), height: $(window).height()});
	},
	routeNav: function(evt) {
		if ($(".routeSel").hasClass('hide')) {
			$(".routeSel").removeClass('hide');
			$(".row").find('.l12').removeClass('l12').addClass('l9');
		} 
		else {
			$(".routeSel").addClass('hide');
			$(".row").find('.l9').removeClass('l9').addClass('l12');
		}
		$(".progress-point").first().addClass('active');
		// Resize the map following state changes.
		console.log("This is clicked.");
		this.updateDimensions();
		evt.stopPropagation();
		evt.preventDefault();		
		return false;
    },
    componentWillUnmount: function(){
		window.removeEventListener("resize", this.updateDimensions);
    },
	render: function(){
		return (
			<div id="map" className="col l12 s12">
				<div id="map-container">
					<a onClick={this.routeNav} className="col s8 m4 l2 waves-effect waves-light btn map-start-btn">
						<i className="material-icons right">search</i>find my route
					</a>
				</div>
			</div>);
	}
});
module.exports = Map;