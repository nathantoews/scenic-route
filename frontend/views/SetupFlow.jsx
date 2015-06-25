var React = require('react');

var SetupFlow = React.createClass({
  getInitialState: function(){
    return this.routes.timeSel;
    
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
          <p><input type="radio" id="test5"/></p>
          <p><input type="radio" id="test6" value="1"/></p>
        </form>
      ),
      linkTo: 'destSel'
    }
    ,
    destSel: {
      reactBlob:(
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                <label for="first_name">First Name</label>
              </div>
              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate" />
                <label for="last_name">Last Name</label>
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
          <p class="range-field"><input type="range" id="test5" min="0" max="100" /></p>
        </form>
      ),
      linkTo: 'travelType'
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
      <nav>
        <ul className="side-nav fixed left">
            <button onClick={this.nextState}>Next</button>
        </ul>


        {this.state.reactBlob}


        <a className="button-collapse show-on-large left">
          <i className="large material-icons">search</i>
        </a>
      </nav>
    );
  }
});

module.exports = SetupFlow;