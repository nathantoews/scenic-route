var React = require('react/addons');

var Map = React.createClass({
	componentDidMount: function(){
      L.mapbox.accessToken = 'pk.eyJ1IjoiYW5kcmV3bG91aXMiLCJhIjoiZTFmMTFiNDI0MGM1M2I4OTUxZWVjNmM3ZTIzODZiNmMifQ._dhInriKHZsQLE0qX6u-KA';
      var map = L.mapbox.map('map', 'mapbox.streets')
      			.setView([43.64, -79.39], 9);
	},


	routeNav: function() {
		if ( $(".routeSel").hasClass('hide')) {
			$(".routeSel").removeClass('hide');
			$(".row").find('.l12').removeClass('l12').addClass('l9');

			} else {
			$(".routeSel").addClass('hide');
			$(".row").find('.l9').removeClass('l9').addClass('l12');


			}
			$(".progress-point").first().addClass('active');
			return false;
        },


	render: function(){
		return (
			<div id="map" className="col l12 s12">
				<div id="map-container">
					<a onClick={this.routeNav} className="waves-effect waves-light btn map-start-btn">
						<i className="material-icons right">search</i>find my route
					</a>
				</div>
			</div>);
	}
});
module.exports = Map;