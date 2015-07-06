var React = require('react');

var RouteView = React.createClass({
  render: function() {
    return (

      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <div className="mapBox"/>
        </div>
        <div className=" activator card-content">
          <span className="card-title grey-text text-darken-4">10 kms / 1:35
            <a className="card-title grey-text text-darken-4 btn-floating btn-large waves-effect waves-light right">
              <i className="material-icons">navigation</i>
            </a>
          </span>
        </div>
        <div className="card-reveal">
          <span className="activator card-title grey-text text-darken-4">10 kms / 1:35
            <a className="card-title grey-text text-darken-4 btn-floating btn-large waves-effect waves-light right">
              <i className="material-icons">navigation</i>
            </a>
          </span>
            <ul className="collapsible" data-collapsible="accordion">
              <li>
                <div className="collapsible-header"><i className="material-icons">repeat</i>First</div>
                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
              </li>
              <li>
                <div className="collapsible-header"><i className="material-icons">trending_up</i>Second</div>
                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
              </li>
              <li>
                <div className="collapsible-header"><i className="material-icons">room</i>Queens Park</div>
                <div className="collapsible-body">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                  </p>
                </div>
              </li>
              <li>
                <div className="collapsible-header"><i className="material-icons">trending_down</i>Third</div>
                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
              </li>
              <li>
                <div className="collapsible-header"><i className="material-icons">trending_flat</i>Third</div>
                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
              </li>
               <li>
                <div className="collapsible-header"><i className="material-icons">room</i>Awesome Park</div>
                <div className="collapsible-body">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                  </p>
                </div>
              </li>
              <li>
                <div className="collapsible-header"><i className="material-icons">trending_up</i>Third</div>
                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
              </li>
            </ul>
        </div>
      </div>
    );
  }
});

module.exports = RouteView;