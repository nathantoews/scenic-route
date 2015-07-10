var React = require('react');



var TimeDrag = React.createClass({
componentDidMount: function(){
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
    target.textContent = event.rect.width + '×' + event.rect.height;
  });
},  
render: function() {
    return (
      <div className="timeSlider">
        <div className="timeRange">
          <p className="introTag">I have</p>
        </div>
        <div className="resize-container">
          <div className="resize-drag">
        </div>
        </div>
      </div>
    );
  }
});

module.exports = TimeDrag;









