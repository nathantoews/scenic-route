var React = require('react');
var $ = require('jquery');
     
var ProfileNav = React.createClass({displayName: "ProfileNav",
  validPassport: function(){ 
    return (this.props.passport && Object.keys(this.props.passport).length); 
  },  
  logoutButton: function(){  
    console.log($);
    // $.get(this.props.session, function(result) {
    //     this.setState({
    //       name: result.displayName,
    //     });
    // }.bind(this));
    return([
        React.createElement("li", null, 
          React.createElement("a", {className: "waves-effect waves-light btn-flat"}
          )
        ),
        React.createElement("li", null, 
          React.createElement("a", {href: "/logout", className: "waves-effect waves-light btn-flat"}, 
          React.createElement("i", {className: "material-icons right"}, "settings"), "logout")
        )
      ]
    )
  },
  loginButtons: function(){
    return ([
        React.createElement("li", null, 
          React.createElement("a", {href: "/auth/google", className: "waves-effect waves-light btn-flat"}, 
            React.createElement("i", {className: "fa fa-google right"}), "google"
          )
        ),
        React.createElement("li", null, 
          React.createElement("a", {href: "auth/facebook", className: "waves-effect waves-light btn-flat"}, 
            React.createElement("i", {className: "fa fa-facebook-official right"}), "facebook"
          )
        )
    ])
  },
  authButtons: function(){
    return ( this.validPassport() ? this.logoutButton() : this.loginButtons() );
  },
  render: function() {
    return (
      React.createElement("nav", null, 
        React.createElement("ul", {id: "slide-out", className: "side-nav"}, 
          this.authButtons()
        ), 
        React.createElement("a", {"data-activates": "slide-out", className: "button-collapse show-on-large right"}, 
          React.createElement("i", {className: "large material-icons"}, "supervisor_account")
        )
      )
    );
  }
});

module.exports = ProfileNav;
