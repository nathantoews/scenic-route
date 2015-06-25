var React = require('react');
var ProfileNav = require('./views/ProfileNav.jsx');
var config = require('./config.js');
var SetupFlow = require('./views/SetupFlow.jsx');
 
var Body = React.createClass({
    render: function(){
      return (
              	<SetupFlow/>   
      );
    }
});
 
 
React.render(<Body />, document.getElementById('content'));