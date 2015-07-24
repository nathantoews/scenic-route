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
      <div className="menuStyles">

        <div className="loginSection">
          <li>
            <a href={`${config.api_url}/auth/google`} className="btn-facebook">
              <i className="fa fa-facebook-official left"></i>sign in with facebook</a>
          </li>
          <li>
            <a href={`${config.api_url}/auth/facebook`} className="btn-google">
              <i className="fa fa-google left"></i>sign in with google</a>
          </li>
        </div>

        <div className="profileOpt">
          <li><a><i className="restart left"></i>restart route</a></li>
          <li><a><i className="star left"></i>favourited routes</a></li>
          <li><a><i className="share left"></i>share</a></li>
        </div>

        <div className="footer">
          <li><a>faq's</a></li>
          <li><a>about</a></li>
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
        </ul>
        <a data-activates="slide-out" className="button-collapse show-on-large right ">
          <div className="hamburger"></div>
        </a>
      </nav>
    );
  }
});

module.exports = ProfileNav;