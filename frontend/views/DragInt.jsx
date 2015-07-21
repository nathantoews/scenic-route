var React = require('react');
var Navigate = require('../stores/Navigate.jsx');



var TimeDrag = React.createClass({
componentDidMount: function(){
  var _height = $('#resizer').height()/2;
  var _height_Cont = $('#resize-cont').height();

  $('#resizer').draggable({
      drag: function() {
          var adjustTo = $(this).parent().height() - $(this).position().top - _height;
          $('#resizable-element').css('height',  adjustTo ); 
          $('#resizable-element-two').css('height',  adjustTo ); 

      },
      snap:true,
      grid: [0, (_height_Cont/3)],
      axis: 'y',
      containment: '#resize-cont',
      stop: function(){
            var adjustTo = $(this).parent().height() - $(this).position().top - _height;        
            $('#resizable-element').css('height', adjustTo);
            $('#resizable-element-two').css('height', adjustTo);
      }
  });
},  
render: function() {
    return (
      <div className="row" id="timeSlider">
        <p className="introTag">I have</p>
      
        <div className="row">                 
          <div id="resize-cont" className="col s10 offset-s2 m10 l10">
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








