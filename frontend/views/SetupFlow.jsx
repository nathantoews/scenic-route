var React = require('react');
var React = require('react/addons');

var SetupFlow = React.createClass({
  getInitialState: function(){
    return this.routes.transBtns;
    
    console.log(this.state);
    console.dir(this);
     
    window.reactobj = this;
  },
  routes: 
  {
    transBtns:{
      reactBlob:
      (
        <div className="buttonSize">
          <a className="waves-effect waves-light btn-large"><i className="fa fa-male"></i></a>
          <a className="waves-effect waves-light btn-large"><i className="fa fa-bicycle"></i></a>
        </div>
      ),
      linkTo: 'travelType'       
    }
    ,
    travelType: {
      reactBlob:(
        <div className="buttonSize">
          <a className="waves-effect waves-light btn-large"><i className="fa fa-location-arrow"></i></a>
          <a className="waves-effect waves-light btn-large"><i className="fa fa-refresh"></i></a>
        </div>
      ),
      linkTo: 'destSel'
    }
    ,
    destSel: {
      reactBlob:(
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="yourLoc" type="text" className="validate" />
                <label for="yourLoc">Location</label>
              </div>
              <div className="input-field col s12">
                <input id="dest" type="text" class="validate" />
                <label for="dest">Destination</label>
              </div>
            </div>
          </form>
        </div>
      ),
      linkTo: 'timeSel'      
    }
    ,
    timeSel: {
      reactBlob:(
        <form action="#">
          <p className="range-field"><input type="range" id="test5" min="0" max="100" />start</p>
          <p className="range-field"><input type="range" id="test5" min="0" max="100" />end</p>

        </form>
      ),
      linkTo: 'transBtns'
    }
  }
  , 
  nextState: function(){
    // Gets the linkTo value
    var nextView = this.state.linkTo;
    // Sets the state object identified by the above property.
    this.setState(this.routes[nextView])

  },

  transBtns: function() {
    this.setState(this.routes.transBtns);

  },
    travelType: function() {
    this.setState(this.routes.travelType);
  },

  destSel: function() {
    this.setState(this.routes.destSel);
  },

  timeSel: function() {
    this.setState(this.routes.timeSel);
  },

  render: function() {
    return (
        <ul className="row routeSel left col l3">
          <div className="col s4">
            <nav className="formSteps step1">
            <span className="current"></span>
              <ul>
              <li><a onClick={this.transBtns} href="#step-1">walk/bike</a></li>
              <li><a onClick={this.travelType} href="#step-2">route/loop</a></li>
              <li><a onClick={this.destSel} href="#step-3">to & from</a></li>
              <li><a onClick={this.timeSel} href="#step-4">range</a></li>
              </ul>
            </nav>
          </div>
          <div className="col s8">
            <div className="heightFix">{this.state.reactBlob}
            <div className="nxtBtn"><a className="waves-effect waves-light btn-large" onClick={this.nextState}>Next</a></div>
            </div>
          </div>


        </ul>
    );
  }
});

module.exports = SetupFlow;