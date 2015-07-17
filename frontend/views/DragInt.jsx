var React = require('react');
var Navigate = require('../stores/Navigate.jsx');



var TimeDrag = React.createClass({
componentDidMount: function(){
  var _height = $(".resize-container").height();
  var valueSnap = [1,2,3,4];

    $('.resize-drag').attr("data-y",(_height - 40));
    $('.resize-drag').css('transform', 'translateY('+ (_height - 40) +'px)'),
                         ('-webkit-transform', 'translateY('+ (_height - 40) +'px)'),
                         ('-ms-transform', 'translateY('+ (_height - 40) +')'),
                         ('-moz-transform', 'translateY('+ (_height - 40) +'px)'),
                         ('-o-transform', 'translateY('+ (_height - 40) +'px)');

interact('.resize-drag')
  .resizable({
    restrict: {
      restriction: 'parent',
    },
    edges: { top: true },
      snap: {
      targets: [
        // snap to the point (0, 450)
        { y: (_height/0), range: 25, value:1 },
        { y: (_height/3), range: 25, value:2 },
        { y: (_height/1.5), range: 25, value:3},
        { y: (_height/1), range: 25, value:4},

      ]
    }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

      // display range in other div ---////////////////////////////

    // var maxRange = Math.round(((120/_height) * (_height - y))) + ' m';
    // var minRange = Math.round(((120/_height) * (_height - (y + event.rect.height)))) +' m';
    // var range =  minRange + ' - ' + maxRange;
    // document.getElementById('timeRange').textContent = range;
  });

},  
render: function() {
    return (
      <div className="row" id="timeSlider">
        <p className="introTag">I have</p>
        <div className="resize-container">
          <div className="resize-drag"></div>
        </div>
        <div id="minRange"></div>
        <button className="btn-secondary waves-effect waves-light col s4">skip</button>  
        <button onClick={Navigate.generateRoute} className="btn-primary waves-effect waves-light col s4">continue</button>      
      </div>
    );
  }
});


module.exports = TimeDrag;








