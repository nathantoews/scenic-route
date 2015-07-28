var React = require('react/addons');
var Classnames = require('classnames');
var Endpoints = require('./EndpointsView.jsx');
var TimeDrag = require('./DragInt.jsx')

var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');

var SetupFlow = React.createClass({
  getInitialState: function(){    
    var _seed = this.routes().transBtns;
    var _initState = {};
    
    _initState['reactBlob'] = _seed.reactBlob;
    _initState['linkTo'] = _seed.linkTo;
    _initState['sessionState'] = ScenicStore.getSessionState();
    _initState['layout'] = Classnames('row','routeSel','left','col', this.props.layout);

    return _initState;
  },
  componentDidMount: function(){
    ScenicStore.addChangeListener(this.updateState);
  },
  updateState: function(){
    this.state.sessionState = ScenicStore.getSessionState();
    this.state.layout = Classnames('row','routeSel','left','col', ScenicStore.getLayout().nav);
  },
  routes: function(){
     return {
        transBtns:{
          reactBlob:
          (
            <div className="optSwitch">
              <p className="introTag">I have</p>
              <a className="waves-effect waves-light">
                <div onClick={addBike.bind(this, Actions)} className="svg svg-bike-switch"></div>
              </a>
              <a className="waves-effect waves-light">
                <div onClick={addWalk.bind(this, Actions)} className="svg svg-walk-switch"></div>
              </a>
            </div>
          ),
          linkTo: 'travelType'
        }
        ,
        travelType: {
          reactBlob:(
            <div className="optSwitch">
              <p className="introTag">I have</p>
              <a className="waves-effect waves-light">
                <div onClick={addRoute.bind(this, Actions)} className="svg routeBtn"></div>
              </a>
              <a className="waves-effect waves-light">
                <div onClick={addLoop.bind(this, Actions)} className="svg loopBtn"></div>
              </a>
            </div>
          ),
          linkTo: 'destSel'
        }
        ,
        destSel: {
          reactBlob: (<Endpoints loop={this.state && this.state.sessionState.loop} isLoading={this.props.isLoading}/>),
          linkTo: 'timeSel'
        }
        ,
        timeSel: {
          reactBlob:(
            (<TimeDrag/>)
          ),
          linkTo: 'transBtns'
        }
      }
    }
  , 
  nextState: function(){
    // Gets the linkTo value
    var nextView = this.state.linkTo;
    // Sets the state object identified by the above property.
    this.setState(this.routes()[nextView]);
    $(".progress-point.active").next().trigger('click');
  },

  transBtns: function() {
    this.setState(this.routes().transBtns);

  },
    travelType: function() {
    this.setState(this.routes().travelType);
  },

  destSel: function() {
    this.setState(this.routes().destSel);
  },

  timeSel: function() {
    this.setState(this.routes().timeSel);
  },

  render: function() {
    return (
        <div className={this.state.layout}>
          <div className="heightFix col s2">
            <div className="progress-meter">
              <div className="track">
                <span className="progress"></span>
              </div>
              <ol className="progress-points" data-current="1">
                <li id="transBtns" className="progress-point active Back_Progress_Trans" onClick={this.transBtns} href="#step-1">
                </li>
                <li id="travelType" className="progress-point disabled Back_Progress_Travel" onClick={this.travelType} href="#step-2">
                </li>
               <li id="destSel" className="progress-point disabled Back_Progress_Dest" onClick={this.destSel} href="#step-3">
                </li>
                <li id="timeSel" className="progress-point disabled" onClick={this.timeSel} href="#step-4">
                </li>
              </ol>
              <span className="current">
                  <svg height="50" width="50">
                    <circle cx="26" cy="18" r="8" stroke="rgba(56,208,149,0.5)" strokeWidth="8" fill='rgb(88,189,152)'/>
                  </svg>
              </span>
            </div>
          </div>
          <div className="heightFix col s9">
            {this.state.reactBlob}
          </div>
        </div>
    );
  }
});

module.exports = SetupFlow;


// <div className="nxtBtn">
//   <a className="waves-effect waves-light btn-large" onClick={this.nextState}>Next</a>
// </div>


// <nav className="formSteps step1">
//             <span className="current"></span>
//               <ul>
//               <li><a onClick={this.transBtns} href="#step-1">walk/bike</a></li>
//               <li><a onClick={this.travelType} href="#step-2">route/loop</a></li>
//               <li><a onClick={this.destSel} href="#step-3">to & from</a></li>
//               <li><a onClick={this.timeSel} href="#step-4">range</a></li>
//               </ul>
//             </nav>