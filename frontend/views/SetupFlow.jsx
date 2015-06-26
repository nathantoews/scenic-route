var React = require('react');

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
        <form action="#">
        <h1>transBtns</h1>

          <p><input type="radio" id="test5"/></p>
          <p><input type="radio" id="test6" value="1"/></p>
        </form>
      ),
      linkTo: 'travelType'       
    }
    ,
    travelType: {
      reactBlob:(
        <form action="#">
        <h1>travelType</h1>        
          <p><input type="radio" id="test5"/></p>
          <p><input type="radio" id="test6" value="1"/></p>
        </form>
      ),
      linkTo: 'destSel'
    }
    ,
    destSel: {
      reactBlob:(
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input placeholder="Placeholder" id="yourLoc" type="text" className="validate" />
                <label for="yourLoc">Location</label>
              </div>
              <div className="input-field col s6">
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
          <p className="range-field"><input type="range" id="test5" min="0" max="100" /></p>
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
  }
  ,
  render: function() {
    return (
        <ul className="fixed-nav fixed left s12">
            <div>{this.state.reactBlob}</div>
            <button onClick={this.nextState}>Next</button>
        </ul>
    );
  }
});

module.exports = SetupFlow;