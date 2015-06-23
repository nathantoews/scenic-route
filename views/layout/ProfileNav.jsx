var React = require('react');


var ProfileNav = React.createClass({
  render: function() {
    return (
      <nav>
        <ul id="slide-out" className="side-nav">
          <li><a href="#!">First Sidebar Link</a></li>
          <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i className="mdi-navigation-menu" /></a>
      </nav>
    );
  }
});

module.exports = ProfileNav;
