var React = require('react');


var ProfileNav = React.createClass({
  render: function() {
    return (
      <nav>
        <ul id="slide-out" className="side-nav">
          <li>
            <a className="waves-effect waves-light btn-flat">
            <i className="fa fa-google right"></i>google</a>
          </li>
          
          <li>
            <a className="waves-effect waves-light btn-flat">
            <i className="fa fa-facebook-official right"></i>facebook</a>
          </li>

          <li>
            <a className="waves-effect waves-light btn-flat">
            <i className="material-icons right">settings</i>logout</a>
          </li>

        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse show-on-large right">
          <i className="large material-icons">supervisor_account</i>
        </a>
      </nav>
    );
  }
});

module.exports = ProfileNav;
