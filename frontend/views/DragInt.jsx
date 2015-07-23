var React = require('react');
var Navigate = require('../stores/Navigate.jsx');



var TimeDrag = React.createClass({
componentDidMount: function(){
  var _height = $('#resizer').height()/2;
  var _height_Cont = $('#resize-cont').height();

  $('#resizer').draggable({
      drag: function() {
          var adjustTo = $(this).parent().height() - $(this).position().top - _height;
          // $('#resizable-element-two').css('height',  adjustTo ); 
          $('#resizable-element').css('height',  adjustTo ); 
      },
      axis: 'y',
      containment: '#resize-cont',
      stop: function(e, ui) {
        var grid_x = 0;
        var grid_y = _height_Cont/3;
        var elem = $( this );
        var sliderHeight = parseInt($('#resize-cont').css('height')); 
        var top = parseInt(elem.css('top'));
        var cy = (top % grid_y);
        var new_top = (Math.abs(cy)+0.5*grid_y >= grid_y) ? (top - cy + (top/Math.abs(top))*grid_y) : (top - cy);
        ui.helper.stop(true).animate({
            top: new_top,
            opacity: 1,
        }, 200);

        var adjustTo = sliderHeight - new_top;
        $("#resizable-element").animate({height:adjustTo},200);
      },
  });
},  
render: function() {
    return (
      <div className="row" id="timeSlider">
        <p className="introTag">I have</p>
      
        <div className="row">                 
          <div id="resize-cont" className="col s10 offset-s2 m10 offset-m2 l10 offset-l2">
            <div id="resizable-element">
            </div>
          </div>
          <div id="drag-cont" className="col s2 m2 l2">
            <div id="resizer" className="greenBoob">
          </div>
          </div>                     
        </div>
      
        <div id="minRange"></div>
        <button className="btn-primary waves-effect waves-light col s4">skip</button> 
        <button onClick={Navigate.generateRoute} className="btn-secondary waves-effect waves-light col s4">map it</button>       
      </div>
    );
  }
});


module.exports = TimeDrag;








