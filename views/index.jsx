var React = require('react');
var Layout = require('./layout/default');
var ProfileNav = require('./layout/ProfileNav');


var Body = React.createClass({
    render: function(){
      return (
        <Layout>
          <ProfileNav session='http://127.0.0.1:3000/user' passport={this.props.user}>
          </ProfileNav>         
        </Layout>

      );
    }
});

module.exports = Body;
