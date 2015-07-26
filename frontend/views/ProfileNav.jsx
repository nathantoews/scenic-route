var React = require('react');
var Classnames = require('classnames');
var config = require('../config.js');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');


function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    console.log('cookie value', value);
    return (value == null) ? false : decodeURIComponent(value);
}

var ProfileNav = React.createClass({
  validPassport: function(){ 
    return (this.props.passport && Object.keys(this.props.passport).length); 
  },
  componentDidMount: function(){

    var auth = readCookie('authenticated');
    console.log(auth);

    if (auth){
      this.setState({
        auth: true,
        authId: readCookie('authId'),
        type: readCookie('type'),
        displayName: readCookie('displayName'),
        profileUrl: readCookie('profileUrl'), // returns false if no picture
      })
    }else{
      this.setState({ auth : false });
    }
  }, 
  clearCookies: function(){
    document.cookie = 'authenticated' + '=; Max-Age=0';
    this.setState({auth: false});
    return false;
  },
  logoutButton: function(){  
    return([
        <li>
          <a className="waves-effect waves-light btn-flat">
          {this.state.displayName}
          </a>
        </li>,
        <li>
          <a onClick={this.clearCookies} className="waves-effect waves-light btn-flat">
            <i className="material-icons right">settings</i>logout
          </a>
        </li>
      ]
    )
  },
  loginButtons: function(){
    // $ syntax: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
    return ([
      <div className="menuStyles">

        <div className="loginSection">
          <li>
            <a href={`${config.api_url}/auth/facebook`} className="btn-facebook">
              <i className="fa fa-facebook left"></i>sign in with facebook</a>
          </li>
          <li>
            <a href={`${config.api_url}/auth/google`} className="btn-google">
              <i className="fa fa-google left"></i>sign in with google</a>
          </li>
        </div>
        <hr></hr>
        </div>
    ])
  },

  profileButtons: function(){
    return ([

      <div className="menuStyles">
      <div className="profileOpt">
          <li><a><i className="restart left"></i>restart route</a></li>
          <li><a onClick={Actions.setActivePage.bind(this,'savedRoutes')}><i className="star left"></i>favourited routes</a></li>
          <li><a><i className="share left"></i>share</a></li>
        </div>

        <hr></hr>

        <div className="footer">
          <li><a>faq</a></li>
          <li><a onClick={Actions.setActivePage.bind(this,'aboutUs')}>about</a></li>
          <li><a>tutorial</a></li>
          <li><a>privacy</a></li>
        </div>
      </div>
    ])
  },

  authButtons: function(){
    return ( ( this.state && this.state.auth )? this.logoutButton() : this.loginButtons() );
  },
  render: function() {
    return (
      <nav id='top-nav'>    
        <ul id="slide-out" className="side-nav">
          {this.authButtons()}
          {this.profileButtons()}
        </ul>
        <a data-activates="slide-out" className="button-collapse show-on-large right ">
          <div className="hamburger"></div>
        </a>
      </nav>
    );
  }
});

module.exports = ProfileNav;