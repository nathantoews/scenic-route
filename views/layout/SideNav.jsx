var React = require('react');


var SideNav = React.createClass({
  render: function() {
    return (

      <ul id="slide-out" classname="side-nav">
        <li><a href="#!">First Sidebar Link</a></li>
        <li><a href="#!">Second Sidebar Link</a></li>
      </ul>
    );
  }
});

module.exports = SideNav;