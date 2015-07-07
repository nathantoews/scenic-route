	  $(document).ready(function() {
		  $('.button-collapse').sideNav({
		      edge: 'right', // Choose the horizontal origin
		    }
		  );
	  }); 

      $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    });

    $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
    });

    $(document).ready(function(){
    $('ul.tabs').tabs();
    });
        
     $(document).ready(function(){
      $('.slider').slider({
        full_width: true,
        height: '40vh'


      });

    });


    // ACTIVE STATE PROGRESS METER 

      $(function() {  
      var $point_arr, $points, $progress, $trigger, active, max, tracker, val;

      $trigger   = $('.trigger').first();
      $points    = $('.progress-points').first();
      $point_arr = $('.progress-point');
      $progress  = $('.progress').first();

      val     = +$points.data('current') - 1;
      max     = $point_arr.length - 1;
      tracker = active = 0;

      function activate(index) {
      if (index !== active) {
        active       = index;
        var $_active = $point_arr.eq(active)
        
        $point_arr
          .removeClass('completed active')
          .slice(0, active).addClass('completed')
        
        $_active.addClass('active');
        
        return $progress.css('height', (index / 3 * 100) + "%");
      }
      };

      $(".progress-point").first().addClass('active');


      $points.on('click', 'li', function(event) {
      var _index;
      _index  = $point_arr.index(this);
      tracker = _index === 0 ? 1 : _index === val ? 0 : tracker;

      return activate(_index);
      });

      $trigger.on('click', function() {
      return activate(tracker++ % 2 === 0 ? 0 : val);
      });

      setTimeout((function() {
      return activate(val);
      }), 1000);

      });

    //TOGGLE TIMELINE ICON!!!!! ----------------------------
    
//     $(function() {
//     $('a').click(function() {
//         $(this).find('i').addClass('fa-minus-circle fa-plus-circle');
//     });
// });


    // range slider ----------------------->