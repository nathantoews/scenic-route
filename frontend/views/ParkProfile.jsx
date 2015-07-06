var React = require('react');

var Parks = React.createClass({
  render: function() {
    return (
      <div>
        <a className="btn-floating btn-large waves-effect waves-light modal-trigger modal-close toggle" href="#modal1"><i className="fa fa-tree"></i></a>
        <div id="modal1" className="modalPark">
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3"><a href="#test1">Park A</a></li>
                <li className="tab col s3"><a href="#test2">Park B</a></li>
                <li className="tab col s3"><a href="#test3">Park C</a></li>
                <li className="tab col s3"><a href="#test4">Park D</a></li>
              </ul>
            </div>
              <div id="test1" className="col s12">
                <ul>
                  <li><h4>Nick Cage Park</h4></li>
                  <li><h5>Park Features</h5></li>
                  <li>Feature One</li>
                  <li>Feature Two</li>
                  <li>Feature Three</li>
                  <li>Feature Four</li>
                </ul>
                  <div className="slider">
                    <ul className="slides">
                      <li><img src="http://www.placecage.com/c/500/400"/></li>
                      <li><img src="http://www.placecage.com/c/300/500"/></li>
                      <li><img src="http://www.placecage.com/c/700/600"/></li>
                      <li><img src="http://www.placecage.com/c/600/400"/></li>
                    </ul>
                  </div>
                </div>
              <div id="test2" className="col s12">
                  <ul>
                    <li><h4>Fil Murray Park</h4></li>
                    <li><h5>Park Features</h5></li>
                    <li>Feature One</li>
                    <li>Feature Two</li>
                    <li>Feature Three</li>
                    <li>Feature Four</li>
                  </ul>
                  <div className="slider">
                    <ul className="slides">
                      <li><img src="http://www.fillmurray.com/500/200"/></li>
                      <li><img src="http://www.fillmurray.com/500/800"/></li>
                      <li><img src="http://www.fillmurray.com/300/500"/></li>
                      <li><img src="http://www.fillmurray.com/700/400"/></li>
                    </ul>
                  </div>
              </div>
              <div id="test3" className="col s12">
                  <ul>
                    <li><h4>Steven Segalery Park</h4></li>
                    <li><h5>Park Features</h5></li>
                    <li>Feature One</li>
                    <li>Feature Two</li>
                    <li>Feature Three</li>
                    <li>Feature Four</li>
                  </ul>
                  <div className="slider">
                    <ul className="slides">
                      <li><img src="http://www.stevensegallery.com/500/300"/></li>
                      <li><img src="http://www.stevensegallery.com/800/500"/></li>
                      <li><img src="http://www.stevensegallery.com/500/600"/></li>
                      <li><img src="http://www.stevensegallery.com/400/200"/></li>
                    </ul>
                  </div>
              </div>
              <div id="test4" className="col s12">
                <ul>
                  <li><h4>Queens Park</h4></li>
                  <li><h5>Park Features</h5></li>
                  <li>Feature One</li>
                  <li>Feature Two</li>
                  <li>Feature Three</li>
                  <li>Feature Four</li>
                </ul>
                  <div className="slider">
                    <ul className="slides">
                      <li><img src="https://placekitten.com/g/300/500"/></li>
                      <li><img src="https://placekitten.com/g/400/600"/></li>
                      <li><img src="https://placekitten.com/g/500/200"/></li>
                      <li><img src="https://placekitten.com/g/300/800"/></li>
                    </ul>
                  </div>
              </div>
          </div>
          <div className="modal-footer">
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = Parks;

// <ul className="parkList">
//               <li><a className="btn-floating btn-small waves-effect waves-light"><i className="fa fa-tree"></i></a>Park A</li>
//               <li><a className="btn-floating btn-small waves-effect waves-light"><i className="fa fa-tree"></i></a>Park B</li>
//               <li><a className="btn-floating btn-small waves-effect waves-light"><i className="fa fa-tree"></i></a>Park C</li>
//               <li><a className="btn-floating btn-small waves-effect waves-light"><i className="fa fa-tree"></i></a>Park D</li>
//             </ul>