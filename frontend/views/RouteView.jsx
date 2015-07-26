var React = require('react/addons');
var Classnames = require('classnames');
var MapView = require('./Map.jsx');
var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');
var ParkInfo = require('./ParkInfo.jsx');


function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    console.log('cookie value', value);
    return (value == null) ? false : decodeURIComponent(value);
}


var RouteView = React.createClass({
  componentDidMount: function(){
    console.log("Route View has Mounted!");
    ScenicStore.addChangeListener(this._onChange);
    console.log(ScenicStore.getSessionState().activePath);

    window.nateState = this.state;

  },
  // takes in an array of mapbox latLng objects and 
  // converts to regular objects.
  serializeLatLng: function(arrayLatLng){
    var serialized = arrayLatLng.map(function(latLng){
        return {lat: latLng.lat, lng: latLng.lng};
    })
    return serialized;
  },
  favouriteRoute: function(){
    if (readCookie('authenticated') == false){
      alert('must be logged in to favourite!');
      return;
    }

    var pkg = {
      authId: parseFloat(readCookie('authId')),
      type: readCookie('type'),
      route: {
        destinationName: ScenicStore.getSessionState().destinationName,
        latLngs: this.serializeLatLng(ScenicStore.getSessionState().activePath._latlngs),
        formatted: ScenicStore.getSessionState().activePath.formatted, 
        transit: ScenicStore.getSessionState().activePath.transit,
        info: ScenicStore.getSessionState().activePath.info
      }
    };  
    console.log("this is my shit");
    console.log(pkg);
   $.ajax
    ({
        type: "POST",
        url: 'http://localhost:3000/save-route',
        dataType: 'json',
        //json object to sent to the authentication url
        data: pkg,
        success: function () {
          alert("Thanks!"); 
        }
    })    
  },
  getInitialState: function(){
    var listItem = {
          list: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.steps : [],
          travelTime: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.formatted.duration : null,
          travelDist: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.formatted.distance : null,
          travelDest: null,
          turns: null,
          directionsState: Classnames('card','col','l3','m12','s12',ScenicStore.getLayout().directions)
        };
        return listItem;
  },

  // shortenDestination: function() {
  //       var destShort = ScenicStore.getSessionState().destinationName;
  //       var shortenDest = destShort.indexOf('Toronto');
  //       destShort = destShort.substring(0, n != -1 ? n : s.length);
  // },


  createList: function(){
    var Directions = this.state.list;
  
    var updatedStateProp = {
      turns: (<ul tabIndex="-1">
                  {Directions.map(function(row, i){
                    var rightTurn = "right";
                    var leftTurn = "left";
                    var straight = "Continue";
                    var waypoint = "waypoint";
                    var rExp = new RegExp('\\b' + rightTurn + '\\b');
                    var lExp = new RegExp('\\b' + leftTurn + '\\b');
                    var sExp = new RegExp('\\b' + straight + '\\b');
                    var pExp = new RegExp('\\b' + waypoint + '\\b');
                    if (rExp.test(row.maneuver.instruction)){
                      return (
                        <div className="ui-menu-item"><li className="rightTurn"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (lExp.test(row.maneuver.instruction)){
                      return(
                        <div className="ui-menu-item"><li className="leftTurn"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (sExp.test(row.maneuver.instruction)){
                      return(
                        <div className="ui-menu-item"><li className="straight"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (pExp.test(row.maneuver.instruction)){
                      return(
                        <div className="ui-menu-item"><li className="parkIcon"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else {
                      return (
                        <div className="ui-menu-item">
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}} className="menuitem">
                        </li></div>
                      )
                    }
                  }
              )}
            </ul>),
    }
    this.setState(updatedStateProp);

  },

    _onChange: function(){
    console.log("in directions view, the following is the updated directions list.");
    console.log(ScenicStore.getLayout().directions);

    this.setState({
                     list: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.steps : [],
                     travelTime: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.formatted.duration : null,
                     travelDist: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.formatted.distance : null,
                     travelDest: ScenicStore.getSessionState().destinationName,
                     directionsState: Classnames('card','col','l3','m12','s12',ScenicStore.getLayout().directions)                   
                  });  
    console.log('Invoking createList to update the list.');
    this.createList();
  },

  render: function() {
    return (

    <div id="directionsContainer" className={this.state.directionsState}>
      <ParkInfo/>
      <div className="card-image">
      </div>
        <div className="HeaderRoute card-content">
          <div className="routeChoice"></div>
          <div id="routeInfo">
              <ul onClick={this.createList}>
                <li className="destLbl">
                  <span className="activator">{this.state.travelDest}</span>
                </li>
                <li className="distLbl centerLine">
                  <span className="activator">{this.state.travelDist}</span>
                </li>
                <li className="timeLbl left">
                  <span className="activator">{this.state.travelTime}</span>
                </li>
              </ul>
          </div>
          <div onClick={this.favouriteRoute} className="favorite"></div>
        </div>

        <div id="turnList" className='card-reveal'>
          <div id="listTop">
          <div className="routeChoice"></div>
          <div id="routeInfo">
              <ul>
                <li className="destLbl">
                  <span className="card-title">{this.state.travelDest}</span>
                </li>
                <li className="distLbl centerLine">
                  <span className="card-title">{this.state.travelDist}</span>
                </li>
                <li className="timeLbl left">
                  <span className="card-title">{this.state.travelTime}</span>
                </li>
              </ul>
          </div>
          <div onClick={this.favouriteRoute} className="favorite"></div>
          </div>
          <div className="turnDirect">
          {this.state.turns}
          </div>
        </div>
    </div>
    );
  }
});

module.exports = RouteView;

