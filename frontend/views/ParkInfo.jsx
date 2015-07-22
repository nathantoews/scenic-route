var React = require('react/addons');
var Carousel = require('nuka-carousel');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');



var ParkCarousel = React.createClass({
  getInitialState: function(){
    console.log("MOUNTING PARK CAROUSEL");
    return {
      parks: ScenicStore.getSessionState().activePath.info.parks
    }
  },
  componentWillMount: function(){
    console.log("in componet will mount");
    console.log(this.state.parks);
  },
  componentDidMount: function(){
    ScenicStore.addChangeListener(this.updateParkList);
    $(document).on('click','.slider-decorator-0,.slider-decorator-1', this.updateActiveCarousel);    
  },
  updateParkList: function(){
      this.setState({parks: ScenicStore.getSessionState().activePath.info.parks});
  },
  updateActiveCarousel: function(){
    setTimeout(function(){
      console.log("IN UPDATE ACTIVE CAROUSEL", this.state.carousels.parkCarousel.state.currentSlide);
      Actions.setSessionState('activeCarousel', this.state.carousels.parkCarousel.state.currentSlide);      
    }.bind(this),0);
  },
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
        <Carousel ref='parkCarousel' 
                  className="parkMenu" 

                  data={this.setCarouselData.bind(this, 'parkCarousel')}>
          {
            this.state.parks.map(function(park){
              return <h3>{park}</h3>
            })
          }
        </Carousel>
    )
  }
});


var ParkTab = React.createClass({

	componentDidMount: function(){
		    ScenicStore.addChangeListener(this._onChange);
	    console.log(ScenicStore.getSessionState().activePath);
  	},


getInitialState: function(){
	var parkList = {
    activeCarousel: 0, 
		parkName: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info : [],
		parkFac: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.facilities : [],
		parkPic: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.pictures : [],
    currentFac: (ScenicStore.getSessionState().activePath) ? this.state.parkFac[this.state.activeCarousel] : [],
    currentPic: (ScenicStore.getSessionState().activePath) ? this.state.parkPic[this.state.activeCarousel] : []
	};
	return parkList;
 },
 updateActiveCarousel: function(current){
  console.log("updated active carousel");
  this.setState({'activeCarousel': current});
 },

 	createParkList: function() {
 	var ParkState = this.state.parkName;
 	var updatedStateProp = {
 		parkName: ParkState.map(function(row, i){
                      return (
                        <h3 dangerouslySetInnerHTML={{__html:row.parks}}>
                        </h3>
                      )
                  }
              ),
 		}
	this.setState(updatedStateProp);
    },

	_onChange: function(){
		this.setState({
      activeCarousel: ScenicStore.getSessionState().activeCarousel,
			parkName: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.parks : [],
			parkFac: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.facilities : [],
			parkPic: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.pictures : [], 
      currentFac: (ScenicStore.getSessionState().activePath) ? this.state.parkFac[this.state.activeCarousel] : [],
      currentPic: (ScenicStore.getSessionState().activePath) ? this.state.parkPic[this.state.activeCarousel] : []
		      });  
		console.log(ScenicStore.getSessionState().activePath);
		this.createParkList();
    window.myParkState = this.state;
	},




  render: function() {
    return (

      <div className="google-expando--wrap">
        <div className="google-expando">
          <div className="google-expando__icon parkBtn">
          	<span className="visuallyhidden" aria-hidden="true">Expand Card</span>
          </div>

          <div className="google-expando__card" aria-hidden="true">
            
            {this.state.parkName.length ? <ParkCarousel updateActiveCarousel={this.updateActiveCarousel}/> : false}

          	<div className="openInfo"></div>
          	<div className="expandedInfo">
          		<ul>
          			<h4>Im going to see</h4>
                {
                  (this.state.parkFac && this.state.parkFac[this.state.activeCarousel]) ? 
                  this.state.parkFac[this.state.activeCarousel].map(function(it){
                    if (it == "NULL"){
                      return <li>No facilities here!</li>  
                    }
                    else{
                      return <li>{it}</li>  
                    }
                  })
                : 
                  false
                }
          		</ul>
          		<h4>photos taken here</h4>
          		<div className="row imgGrid">
                {
                  (this.state.parkPic && this.state.parkPic[this.state.activeCarousel]) ? 
                  this.state.parkPic[this.state.activeCarousel].map(function(it){
                    if (it == "NULL"){
                      return <div className="square">No images here!</div>  
                    }
                    else{
                      var divStyle = {
                        backgroundImage: 'url(' + it + ')',
                      };                      
                      return <div style={divStyle} className="square"></div>  
                    }
                  })
                : 
                  false
                }
          		</div>
          	</div>
          </div>

        </div>
      </div>
    );
  }
});
module.exports = ParkTab;
