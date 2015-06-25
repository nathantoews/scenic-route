var React = require('react');

var SetupFlow = React.createClass({
  componentDidMount: function(){
    localStorage.getItem('view') ?  localStorage.getItem('view') : localStorage.setItem('view', 0);
    console.dir(this);
    console.log(this);
    window.reactobj = this;
  },
  routes: function(){
    return{
    transBtns: function(){
      return(
        <form action="#">
          <p><input type="radio" id="test5"/></p>
          <p><input type="radio" id="test6" value="1"/></p>
        </form>
      )
    },
    travelType: function(){
      return(
        <form action="#">
          <p><input type="radio" id="test5"/></p>
          <p><input type="radio" id="test6" value="1"/></p>
        </form>
      )
    },
    destSel: function(){
      return(
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
      )
    },
    timeSel: function(){
      return(
        <form action="#">
          <p class="range-field"><input type="range" id="test5" min="0" max="100" /></p>
        </form>
      )
    }
  }
}

  ,
  nextState: function(){


  }
,
  render: function() {
    return (
      <nav>
        <ul className="side-nav fixed left">
            <button onClick={this.nextState()}>Next</button>
        </ul>
        <a className="button-collapse show-on-large left">
          <i className="large material-icons">search</i>
        </a>
      </nav>
    );
  }
});

module.exports = SetupFlow;