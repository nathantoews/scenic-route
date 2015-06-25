var React = require('react');
var ProfileNav = require('./views/ProfileNav.jsx');
var config = require('./config.js');
 
var Body = React.createClass({
    render: function(){
      return (
              	<ProfileNav />   
      );
    }
});
 
 
React.render(<Body />, document.getElementById('content'));