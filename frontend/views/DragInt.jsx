var React = require('react');
var Navigate = require('../stores/Navigate.jsx');



var TimeDrag = React.createClass({
componentDidMount: function(){
  var _height = $(".resize-container").height();

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
    edges: { bottom: true, top: true }
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

    var maxRange = Math.round(((120/_height) * (_height - y))) + ' m';
    var minRange = Math.round(((120/_height) * (_height - (y + event.rect.height)))) +' m';
    var range =  minRange + ' - ' + maxRange;
    document.getElementById('timeRange').textContent = range;
  });

},  
render: function() {
    return (
      <div className="row" id="timeSlider">
        <p className="introTag">I have</p>
        <div id="timeRange"></div>
        <div className="resize-container rangeBox">
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








