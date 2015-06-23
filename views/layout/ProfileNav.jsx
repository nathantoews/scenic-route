var React = require('react');

     
var ProfileNav = React.createClass({
  validPassport: function(){ 
    return (this.props.passport && Object.keys(this.props.passport).length); 
  },  
  logoutButton: function(){
    return([
        <li>
          <a className="waves-effect waves-light btn-flat">
            {this.props.passport.user.displayName}
          </a>
        </li>,
        <li>
          <a href="/logout" className="waves-effect waves-light btn-flat">
          <i className="material-icons right">settings</i>logout</a>
        </li>
      ]
    )
  },
  loginButtons: function(){
    return ([
        <li>
          <a href="/auth/google" className="waves-effect waves-light btn-flat">
            <i className="fa fa-google right"></i>google
          </a>
        </li>,
        <li>
          <a href="auth/facebook" className="waves-effect waves-light btn-flat">
            <i className="fa fa-facebook-official right"></i>facebook
          </a>
        </li>
    ])
  },
  authButtons: function(){
    return ( this.validPassport() ? this.logoutButton() : this.loginButtons() );
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
