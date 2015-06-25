var React = require('react');
var config = require('../config.js');

function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    console.log('cookie value', value);
    return (value == null) ? false : decodeURI(value);
}

var ProfileNav = React.createClass({
  validPassport: function(){ 
    return (this.props.passport && Object.keys(this.props.passport).length); 
  },
  componentDidMount: function(){
    console.log("Mounted");
    var auth = readCookie('authenticated');
    console.log(auth);
    var authState = (auth) ? { auth : true } : { auth : false };
    this.setState(authState);
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
        <li>
          <a href={`${config.api_url}/auth/google`} className="waves-effect waves-light btn-flat">
            <i className="fa fa-google right"></i>google
          </a>
        </li>,
        <li>
          <a href={`${config.api_url}/auth/facebook`} className="waves-effect waves-light btn-flat">
            <i className="fa fa-facebook-official right"></i>facebook
          </a>
        </li>
    ])
  },
  authButtons: function(){
    return ( ( this.state && this.state.auth )? this.logoutButton() : this.loginButtons() );
  },
  render: function() {
    return (
      <nav>
        <ul id="slide-out" className="side-nav">
          {this.authButtons()}
        </ul>
        <a data-activates="slide-out" className="button-collapse show-on-large right">
          <i className="large material-icons">supervisor_account</i>
        </a>
      </nav>
    );
  }
});

module.exports = ProfileNav;