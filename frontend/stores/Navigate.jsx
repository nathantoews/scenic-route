var Dispatcher = require('./Dispatcher.jsx');
var ScenicStore = require('./Stores.jsx');
var Actions = require('./Actions.jsx');

// Will be "saved" to sessionState.activePath.
var paths = [];

// Used only when re-draw routes
function liteClearDrawnRoutes(){
  if ($("path").length){
    paths.map(function(path){
      // Keep popup, delete polyline path.
      window.map.removeLayer(path);
    });
  }
  return;  
}

// Should draw and re-draw.
function drawRoutes(){
  var activeIndex = null;
  paths.map(function(path, index){
    if (path.active)
        activeIndex = index;
    else{ 
        path.addTo(window.map);
        path._path.setAttribute('route', index);
    }
  });
  // Now draw active map so it's on stacked on top.
  paths[activeIndex].addTo(window.map);
  paths[activeIndex]._path.setAttribute('route', activeIndex);  
  return;
}

function syncActivePath(){
  paths.map(function(path){
    if (path.active)
      Actions.updateActivePath(path);
  })
}

// Takes an index of the new active path
// updates paths[]
function updateActivePath(activeIndex){
  // Check if already the active path!
  if (paths[activeIndex] && paths[activeIndex].active)
    return;
  else if(paths[activeIndex]){
    // Turn off current active flag.
    paths.map(function(path, p_index){
      if (path.active){
        path.active = false;
      }
      else if (p_index == activeIndex){
        path.active = true;
      }
    }); 
    
    // Update CSS attributes to reflect
    // this.
    var oldActive = document.querySelector('path.activePath');
    if (oldActive){
      oldActive.setAttribute('class','inactivePath leaflet-clickable');
      paths[activeIndex]._path.setAttribute('class','activePath leaflet-clickable');
      liteClearDrawnRoutes();
      drawRoutes();
      syncActivePath();
    }
    else{
      console.log("Routes haven't been drawn yet...")
    }    

  }
  else{
    console.error("undefined behaviour - how'd you get here?");
  }
}

window.updateActivePath = updateActivePath;

// Activates on route click.
function onPathClick(){
  console.log(this.duration);
  console.log(this.distance);
  
  var pathIndex = paths.indexOf(this);
  updateActivePath(pathIndex);
  
  return;
}

// Clears drawn routes and associated popups
function clearDrawnRoutes(){
  if ($("path").length){
    paths.map(function(path){
      // Remove popup and polyline path.
      window.map.removeLayer(path._popup);
      window.map.removeLayer(path);
    });
  }
  return [];
}

// Refactor this ugly af function.
function drawMarkers(){
    for (var i = 0; i < paths.length; i++){
      var formattedRouteInfo = formatRouteInfo(paths[i].duration,paths[i].distance);
      console.log("INDEX IS :", i);
      console.log("LENGTH IS :", paths[i]._latlngs.length);
      var popupLocation = Math.round( (1/3) * (i) * (paths[i]._latlngs.length-1) );
      console.log("POPUP LOCATION IS :", popupLocation);
      paths[i]._popup = L.popup().setLatLng(paths[i]._latlngs[popupLocation]).setContent(formattedRouteInfo);
      console.dir(paths[i]._popup);
      console.log("BOUND");
      try {
        window.map.addLayer(paths[i]._popup);
        paths[i]._popup._container.setAttribute('route', i);
      }
      catch(err){
        console.error(err);
      }
    }  
}


// Takes in seconds and returns 
// a nicely formatted time string.
function formatDuration(_seconds){
  var sec_num = parseInt(_seconds, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  var result = new String();
  if (hours > 0){
    var plural = (hours == 1) ? '' : 's'; 
    result += '<b>' + hours + '</b>'+ ' hour' + plural;
  }
  if (minutes > 0){
    var plural = (minutes == 1) ? '' : 's'; 
    var spacing = (hours > 0) ? ' ' : '';
    result += spacing + '<b>' + minutes + '</b>'+ ' minute' + plural;
  }
  // Only show seconds if no minutes value.
  if ( (seconds>0) && (minutes<1) ){
    var plural = (seconds == 1) ? '' : 's';
    result += '<b>' + seconds + '</b>' + ' second' + plural;
  }
  return result;
}

// Takes in distance in metre, 
// outputs either km or metres 
function formatDistance(_distance){
  var km = (parseInt(_distance)/1000);
  if (Math.floor(km) == 0){
    // Distance is in metres!
    return '<b>' + _distance + '</b>' + ' metres';
  }
  else{
    return '<b>' + km.toFixed(2) + '</b>' + ' km';
  }
}

 function formatDurationRaw(_seconds){
  var sec_num = parseInt(_seconds, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  var result = new String();
  if (hours > 0){
    var plural = (hours == 1) ? '' : 's'; 
    result += hours + ' hr' + plural;
  }
  if (minutes > 0){
    var plural = (minutes == 1) ? '' : 's'; 
    var spacing = (hours > 0) ? ' ' : '';
    result += spacing + minutes + ' min';
  }
  // Only show seconds if no minutes value.
  if ( (seconds>0) && (minutes<1) ){
    var plural = (seconds == 1) ? '' : 's';
    result += seconds + ' s';
  }
  return result;
}

function formatDistanceRaw(_distance){
  var km = (parseInt(_distance)/1000);
  if (Math.floor(km) == 0){
    // Distance is in metres!
    return _distance + ' metres';
  }
  else{
    return km.toFixed(2) + ' km';
  }
}

function formatRouteInfo(_duration, _distance){
  var durationInfo = formatDuration(_duration);
  var distanceInfo = formatDistance(_distance);
  return durationInfo + ' | ' + distanceInfo;
}

function fetchData(callback) {
    var requests = [];
    // Prepare paths for re-use.
    paths = clearDrawnRoutes();
    for (var i = 0; i < 3; i++) {
        // JavaScript Closures: http://www.mennovanslooten.nl/blog/post/62
        (function(index){
            var mapboxCallback = function(routesInfo, err){
                // Grabbing map and directions

                routesInfo = JSON.parse(routesInfo.responseText);

                console.log(routesInfo);


                var poly_raw = routesInfo.routes[0].geometry.coordinates;

                // Route coordinates received as (lng,lat), and
                // must be inverted to (lat,lng) for plotting
                poly_raw = poly_raw.map(function(e){
                  return e.reverse();
                });
                // Assign default path classes, and pushing it to our paths
                // array where we will draw from in the callback.
                var _pathStyles = {
                  className: (index == 0) ? 'activePath':'inactivePath'
                };
                var path = L.polyline(poly_raw,_pathStyles);
                // Assign path traversal time, distance, directions
                // as a property that can 
                // can be referenced in the handler handleRouteSelection
                path.active = (index == 0) ? true : false;
                path.duration = routesInfo.routes[0].duration;
                path.distance = routesInfo.routes[0].distance;
                path.formatted= {
                  duration: formatDurationRaw(path.duration),
                  distance: formatDistanceRaw(path.distance)
                };
                path.steps = routesInfo.routes[0].steps;
                path.info = ScenicStore.getSessionState().greenpoints.results[index];
                
                /* REFACTOR */
                Actions.setSessionState('steps', path.steps);      
                Actions.setSessionState('routeTime',path.duration);
                Actions.setSessionState('routeDist',path.distance);

                // Adding path click handler.
                path.addEventListener('click', onPathClick);
                // Plug it into the local-global variable paths.
                paths.push(path);
                return; 
            };

            requests.push($.ajax({
              url: Navigate.buildMapboxDirectionsURL(index),
              async: false,
              complete: mapboxCallback
            }));

            // requests.push( $.get(Navigate.buildMapboxDirectionsURL(index),mapboxCallback) );
        })(i);
    }

    $.when.apply($, requests).then(function () {
        var array = $.map(arguments, function (arg) {
            return arg[0];
        });
        callback(array);
    })
}


var Navigate = {
  /**
   * @param  {string} query
   * @param  {fn} cb
   */
  getSuggestions: function(query, cb) {
    var TorontoBbox = new google.maps.LatLngBounds(
        new google.maps.LatLng(43.574896,-79.601904),
        new google.maps.LatLng(43.856788, -79.167944)
    );
    var service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query, bounds: TorontoBbox, componentRestrictions: { country: 'CA' } }, function(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log("Autocomplete status: " + status);
            return;
        }
        return cb(predictions);
    });
  },
  // Sample query: http://104.131.189.81/greenify?origin=-79.380658,43.645388&dest=-79.391974,43.647957   
  buildGreenifyURL: function(){
    var origin = ScenicStore.getSessionState().origin;

    var destination;
    if (ScenicStore.getSessionState().loop){
      destination = ScenicStore.getSessionState().origin;
    }
    else{
      destination = ScenicStore.getSessionState().destination;
    }
    var greenness = ScenicStore.getSessionState().greenness;

    var api = "http://104.131.189.81/greenify?";
    api += "origin=" + origin.latLng.lng + ',' + origin.latLng.lat;
    api += "&";
    api += "dest=" + destination.latLng.lng + ',' + destination.latLng.lat;
    api += "&";
    api += "greenness=" + (greenness*3);
    return api;    
  },
  buildMapboxDirectionsURL: function(item){
    var origin = ScenicStore.getSessionState().origin;

    var destination;
    if (ScenicStore.getSessionState().loop)
      destination = ScenicStore.getSessionState().origin;
    else
      destination = ScenicStore.getSessionState().destination;
    
    var greenpoints = ScenicStore.getSessionState().greenpoints;

    var api = "https://api.tiles.mapbox.com/v4/directions/";
    api += 'mapbox.walking';
    api += '/';
    api += origin.latLng.lng + ',' + origin.latLng.lat + ';';
    // Affix green waypoints here!
    console.log("GREENPOINTS", greenpoints);
    console.log("ITEM", item);
    // Only viewing fastest green route right now.
    var coords = greenpoints.results[item].scenic_route;
    console.log("COORDS", coords);
    coords.map(function(it){
      window._it = it;
      console.log("IT", it);
      var lng = it[0];
      var lat = it[1];
      api += lng + ',' + lat + ';';
    });
    api += destination.latLng.lng + ',' + destination.latLng.lat;
    api += '.json?instructions=html&access_token=';
    api += 'pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
    return api;    
  },
  generateRoute: function(event){
    event.preventDefault();
    event.stopPropagation();

    var origin = ScenicStore.getSessionState().origin;

    var destination;
    if (ScenicStore.getSessionState().loop){
      console.log("im in generate route and im looping");
      destination = ScenicStore.getSessionState().origin;
      console.log(destination);
    }
    else{
      destination = ScenicStore.getSessionState().destination;
    }

    // Setup directions Mapbox Directions object.
    var directionsSetup = L.mapbox.directions({
        profile: 'mapbox.walking',
    });
    directionsSetup.setOrigin(origin.latLng);
    directionsSetup.setDestination(destination.latLng);
    
    // Get green waypoints, before you request for directions.
    Actions.isLoading(true);

    $.get(Navigate.buildGreenifyURL(), function(results,err){
        console.log("Hit Greenify API", results);

        // Do the click handler stuff here...
        results.results = results.results.slice(-3);
        Actions.setGreenpoints(results);
        // console.log("Inspect _routesInfo");
        // window._routesInfo = routesInfo;   
        fetchData(function(array){
            // Debugging variable below.
            console.log("Finished getting everything");
            window._paths = paths;
            console.log(array);
            console.log(paths);
            Actions.setDirectionsState(true);

            window.map.invalidateSize();
            // Get the bounds of the longest route.
            var bounds = paths[2].getBounds();
            window.map.fitBounds(bounds);          
            drawRoutes();
            drawMarkers();
            // Only for initialization.
            syncActivePath();
            
            // Handle the state change. 
            // Find a better place to put this?

            Actions.isLoading(false);           
        })
    });
    return false;
  }  
};


// Similar to the onPathClick, but for when you click the
// popup associated with a path.
$(document).on('click','.leaflet-popup',function(){
  console.log("Clicked popup");
  
  var routeId = $(this).attr('route');
  var relatedRoute = $("path[route='"+routeId+"']");

  if (relatedRoute.hasClass("activePath")){
    return;
  }
  else{
    updateActivePath(routeId);
    return;
  }
});



module.exports = Navigate;