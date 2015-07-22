var React = require('react/addons');
var Carousel = require('nuka-carousel');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');



var ParkTab = React.createClass({
	mixins: [Carousel.ControllerMixin],

	componentDidMount: function(){
		    ScenicStore.addChangeListener(this._onChange);
	    console.log(ScenicStore.getSessionState().activePath);
	    window.myParkState = this.state;
  	},


getInitialState: function(){
	var parkList = {
		parkName: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.parks : [],
		parkFac: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.facilities : [],
		parkPic: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.pictures : [],

	};
	return parkList;
 },


 	createParkList: function() {
 	var Parks = this.state.parkName;
 	var updatedStateProp = {
 		parkName: Parks.map(function(row, i){
                      return (
                        <h3 dangerouslySetInnerHTML={{__html:row.info.parks}}>
                        </h3>
                      )
                  }
              ),
 		}
	this.setState(updatedStateProp);
    },

	_onChange: function(){
		this.setState({
			parkName: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.parks : [],
			parkFac: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.facilities : [],
			parkPic: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.pictures : [],             
		      });  
		console.log('Invoking createList to update the list.');
		this.createParkList();
	},




  render: function() {
    return (

      <div className="google-expando--wrap">
        <div className="google-expando">
          <div className="google-expando__icon parkBtn">
          	<span className="visuallyhidden" aria-hidden="true">Expand Card</span>
          </div>

          <div className="google-expando__card" aria-hidden="true">

			<Carousel className="parkMenu">
				<h3>HEY</h3>
								<h3>HEY</h3>

				<h3>HEY</h3>


			</Carousel>

          	<div className="openInfo"></div>
          	<div className="expandedInfo">
          		<ul>
          			<h4>Im going to see</h4>
          			<li>picnic area</li>
          			<li>rec center</li>
          			<li>off leash areas</li>
          			<li>ice rink</li>
          			<li>tennis courts</li>
          			<li>paved paths</li>
          		</ul>
          		<h4>photos taken here</h4>
          		<div className="row imgGrid">
          			<div className="img1 square "></div>
          			<div className="img2 square "></div>
          			<div className="img3 square "></div>
          			<div className="img4 square "></div>
          			<div className="img5 square "></div>
          			<div className="img6 square "></div>
          		</div>
          	</div>
          </div>

        </div>
      </div>
    );
  }
});
module.exports = ParkTab;
