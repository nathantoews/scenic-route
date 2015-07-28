	  $(document).ready(function() {
		  $('.button-collapse').sideNav({
		      edge: 'right', // Choose the horizontal origin
		    }
		  );
	  }); 

      $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion: true,
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
      $(".progress-points").data('current', $(".progress-points").data('current') + 1 ); 
      $(".progress-point.active").next().click();    
    };

    function addBike(_Actions, clickEvent){
      _Actions.setTransitMode('cycling');
      dataLayer.push({
        'transportationType': 'BIKE',
      });
      console.log("Mode set to cycling");
      $(".progress-point.active").addClass('bikeProg').removeClass('walkProg');
      $("#travelType").removeClass("disabled");
      nextPage();
    };

    function addWalk(_Actions){
      _Actions.setTransitMode('walking');
      dataLayer.push({
        'transportationType': 'WALK',
      });
      $(".progress-point.active").addClass('walkProg').removeClass('bikeProg');
      $("#travelType").removeClass("disabled");
      nextPage();
    };

    function addRoute(_Actions){
      _Actions.setRoute();
      dataLayer.push({
        'travelType': 'ROUTE',
      });      
      $(".progress-point.active").addClass('routeProg').removeClass('loopProg');
      $("#destSel").removeClass("disabled");
      nextPage();
    };

    function addLoop(_Actions){
      _Actions.setLoop();
      dataLayer.push({
        'travelType': 'LOOP',
      });            
      $(".progress-point.active").addClass('loopProg').removeClass('routeProg');
      $("#destSel").removeClass("disabled");
      nextPage();
    };

    function addLoc(){
      $(".progress-point.active").addClass('navProg');
      $("#timeSel").removeClass("disabled");
      nextPage();
    };
    // ACTIVE STATE PROGRESS METER 

          $(function() {  
      var $point_arr, $current, $points, $progress, $trigger, active, max, tracker, val, $current, index;

      $trigger   = $('.trigger').first();
      $points    = $('.progress-points').first();
      $point_arr = $('.progress-point');
      $current   = $('.current').first();
      $progress  = $('.progress').first();

      // The following is only for initialization.
      val     = $points.data('current') - 1;
      max     = $point_arr.length - 1;
      tracker = active = 0;
      $point_arr.first().addClass('active');

      function activate(index) {
        // Updating the current data attribute to show current state
        val = $points.data('current') - 1;
        // console.log("In active", val, index);
      if (index !== active) {
        active = index;
        window._id = index;
        var $_active = $point_arr.eq(active)
        
        $point_arr
          .removeClass('completed active')
          .slice(0, active).addClass('completed')
        
        // console.log("modified val");
        // console.log(val);
        $(".progress-point").eq(val).addClass("active");

        return  $current.css('top', (index / 3 * 92) + "%"),
                $progress.css('height', (index / 3 * 100)+ "%");
        }
      };

      $points.on('click', 'li', function(event) {
        // Updating the current data attribute to show current state
        $points.data('current', $(this).index() + 1);
        // Mark all elements that we haven't visited yet as disabled.
        if ($(this).hasClass("disabled"))
          return false;

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
