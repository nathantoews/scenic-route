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

    // INSERTING IMAGE AS PROGRESS MOVES ON ----------------------------------------

        function nextPage() {
        $(".progress-point.active").next().trigger('click');
        };

        function addBike(){
        $(".progress-point.active").addClass('bikeProg');
        nextPage();
        };

        function addWalk(){
        $(".progress-point.active").addClass('walkProg');
        nextPage();
        };

        function addRoute(){
        $(".progress-point.active").addClass('routeProg');
        nextPage();
        };

        function addLoop(){
        $(".progress-point.active").addClass('loopProg');
        nextPage();
        };

        function addTime(){
        $(".progress-point.active").addClass('timeProg');
        nextPage();
        }
    // ACTIVE STATE PROGRESS METER 

          $(function() {  
      var $point_arr, $current, $points, $progress, $trigger, active, max, tracker, val, $current;

      $trigger   = $('.trigger').first();
      $points    = $('.progress-points').first();
      $point_arr = $('.progress-point');
      $current   = $('.current').first();
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
        
        return  $current.css('top', (index / 3.3333333 * 100) + "%"),
                $progress.css('height', (index / 3 * 100)+ "%");
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