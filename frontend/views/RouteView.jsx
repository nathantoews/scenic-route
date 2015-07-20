var React = require('react/addons');
var Classnames = require('classnames');
var MapView = require('./Map.jsx');
var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');


var RouteView = React.createClass({
  componentDidMount: function(){
    console.log("Route View has Mounted!");
    ScenicStore.addChangeListener(this._onChange);
    window.nateState = this.state;

  },
  getInitialState: function(){
    var listItem = {
          list: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.steps : [],
          travelTime: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.formatted.duration : null,
          travelDist: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.formatted.distance : null,
          travelDest: null,
          turns: null,
          directionsState: Classnames('card','col','l3','m5','s12',ScenicStore.getLayout().directions)
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
                     directionsState: Classnames('card','col','l3','m5','s12',ScenicStore.getLayout().directions)                   
                  });  
    console.log('Invoking createList to update the list.');
    this.createList();
  },

  render: function() {
    return (

    <div id="directionsContainer" className={this.state.directionsState}>
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
          <div className="favorite"></div>
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
          <div className="favorite"></div>
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



// else if (row.direction == "S"){
//                       return(
//                         <div><li className="favorite"></li>
//                         <li className="ui-menu-item" dangerouslySetInnerHTML={{__html:row.maneuver.instruction}} role="menuitem">
//                         </li></div>
//                       )
//                     } else if (row.direction == "W"){
//                       return(
//                         <div><li className="routeChoice"></li>
//                         <li className="ui-menu-item" dangerouslySetInnerHTML={{__html:row.maneuver.instruction}} role="menuitem">
//                         </li></div>
//                       )
//                     }

 // <div className="card">
 //        <div className="card-image waves-effect waves-block waves-light">
 //          <div className="mapBox"/>
 //        </div>
 //        <div className=" activator card-content">
 //          <span className="card-title grey-text text-darken-4">10 kms / 1:35
 //            <a className="card-title grey-text text-darken-4 btn-floating btn-large waves-effect waves-light right">
 //              <i className="material-icons">navigation</i>
 //            </a>
 //          </span>
 //        </div>
 //        <div className="card-reveal">
 //          <span className="activator card-title grey-text text-darken-4">10 kms / 1:35
 //            <a className="card-title grey-text text-darken-4 btn-floating btn-large waves-effect waves-light right">
 //              <i className="material-icons">navigation</i>
 //            </a>
 //          </span>
 //            <ul className="collapsible" data-collapsible="accordion">
 //              <li>
 //                <div className="collapsible-header"><i className="material-icons">repeat</i>First</div>
 //                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
 //              </li>
 //              <li>
 //                <div className="collapsible-header"><i className="material-icons">trending_up</i>Second</div>
 //                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
 //              </li>
 //              <li>
 //                <div className="collapsible-header"><i className="material-icons">room</i>Queens Park</div>
 //                <div className="collapsible-body">
 //                  <p>
 //                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
 //                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
 //                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
 //                      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
 //                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
 //                  </p>
 //                </div>
 //              </li>
 //              <li>
 //                <div className="collapsible-header"><i className="material-icons">trending_down</i>Third</div>
 //                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
 //              </li>
 //              <li>
 //                <div className="collapsible-header"><i className="material-icons">trending_flat</i>Third</div>
 //                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
 //              </li>
 //               <li>
 //                <div className="collapsible-header"><i className="material-icons">room</i>Awesome Park</div>
 //                <div className="collapsible-body">
 //                  <p>
 //                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
 //                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
 //                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
 //                      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
 //                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
 //                  </p>
 //                </div>
 //              </li>
 //              <li>
 //                <div className="collapsible-header"><i className="material-icons">trending_up</i>Third</div>
 //                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
 //              </li>
 //            </ul>
 //        </div>


