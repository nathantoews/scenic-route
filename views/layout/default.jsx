var React = require('react');

var Default = React.createClass({
  render: function() {
    return (
      <html>
      <head>
          <meta charSet="utf-8" />
          <title>DETOUR</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
          <link rel="stylesheet" type="text/css" href="/material/sass/materialize.css"/>
          <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>


      </head>
      <body>
        {this.props.children}
      </body>
      <script src="http://fb.me/react-with-addons-0.13.1.js"></script>
          <script src="http://fb.me/JSXTransformer-0.13.1.js"></script>
          <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
          <script src="/material/js/bin/materialize.js" type="text/javascript"></script>
          <script src="/material/js/sideNav.js" type="text/javascript"></script>
          <script src="/material/js/matJavascript.js" type="text/javascript"></script>

          <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
      </html>
    );
  }
});

module.exports = Default;