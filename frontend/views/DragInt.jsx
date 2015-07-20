var React = require('react');
var Navigate = require('../stores/Navigate.jsx');



var TimeDrag = React.createClass({
componentDidMount: function(){
  interact('#resizable-element')
  .styleCursor(false)
  .resizable({
    edges: {top: true }
  })
  .on('resizemove', function (event) {
  
  console.log(event.rect);
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
  
    moveHandler(event, document.getElementById('resize-handle'));
  });


interact('#resize-handle').on('down', function (event) {
  var interaction = event.interaction,
      handle = event.currentTarget;

  interaction.start({
      name: 'resize',
      edges: {
        top   : handle.dataset.top,
      }   
    },  
    interact('#resizable-element'),               // target Interactable
    document.getElementById('resizable-element'));   // target Element
});


  function moveHandler (event, handlerElement) {
    var target = handlerElement,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || $("#resizable-element").height());

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + event.rect.right + 'px, ' + event.rect.top + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    console.log(event);
  }
},  
render: function() {
    return (
      <div className="row" id="timeSlider">
        <p className="introTag">I have</p>
        <div className="resize-container">
          <div id="resizable-element"></div>
        </div>
        <div id="resize-handle" data-top="false"></div>
        <div id="minRange"></div>
        <button className="btn-primary waves-effect waves-light col s4">skip</button> 
        <button onClick={Navigate.generateRoute} className="btn-secondary waves-effect waves-light col s4">map it</button>       
      </div>
    );
  }
});


module.exports = TimeDrag;








