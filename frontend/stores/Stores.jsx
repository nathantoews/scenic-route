
var Dispatcher = require('./Dispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var dataText = "Test A";

// These are the parameters that should be
// Easily accessible to React components in every state.
var sessionState = {
  'isLoading': false,
  'transit': null,
  'origin': null,
  'destination': null,
  'loop': false,
  'greenpoints': null,
  'steps': null,
  'routeTime':null,
  'routeDist':null,
  'routeDest':null,
  'originName': null, 
  'destinationName': null,
  'activePath': null,
  // Default the "greenLevel" to 1.
  // Should be sent as 3*(1,2,3,4)
  'greenness': 1,
  'activeCarousel': 0,
};



/*
 * Toggling CSS classes based on whether
 * the side-menu is active.
 */
var layout = {
  map: "s12 m12 l12",
  nav: "hide",
  // `state` corresponds to menu state
  state: "inactive",
  directions: "hide",
  // logoState is added to the
  // start button as well as the logo
  logoState: "",
  backBtn: "",
  containerMask: "",
  menuDeactivate: function(){
    this.map = "s12 m12 l12";
    this.nav = "hide";
    this.state = "inactive";
    /* Not sure about this? */
    this.directions = "";
    this.backBtn = "";
    this.containerMask = "";    
  },
  menuActivate: function(){
    this.map = "hide-on-small-and-down m7 l8";
    this.nav = "l4 m12 s12";
    this.state = "active";
    
    this.logoState = "hide";
    
    this.directions = "hide";    
    this.backBtn = "pushRight";
    this.containerMask = "containerMask";
  },
  menuToggle: function(){
    if (this.state == "active"){ 
      this.menuDeactivate();
    }
    else if (this.state == "inactive"){
      this.menuActivate();  
    }
  },
  // Once you have directions, lock behaviour
  // such that you either see the side menu tab or 
  // the directions tab.
  directionsActivate: function(){
    if (this.state == "active"){
      this.menuDeactivate();
      this.directions = "";
    }
  },
  directionsDeactivate: function(){
    if (this.state == "inactive"){
      this.menuActivate();
      this.directions = "hide";
    }
  }, 
  initialized: function(){
      console.log("IN INITIALIZED");
      this.logoState = "hide";
      this.state = "active";
      this.directionsActivate();
      console.log("DIRECTIONS ACTIVATED");
  },
};

/*
 * Contains the activePage prop
 * associated with the StaticPages
 */
var activePage = null;
var backBtn = {
   css : "hide",
   states: [],
   //_page can either be static 
   // another type of back button
   // navigation
   pushState: function(_page){
    if (this.states.indexOf(_page) == -1)
      this.states.push(_page);
    this.css = "";

    if (_page == 'parkview'){
      // Google Analytics to only capture 
      // when you go back to the map.
      this.css = "Back_Map_Edit";
    }
   },
   popState: function(){
    var popped = this.states.pop();
    if (popped && (popped=='static')){
      activePage = null;  
    }
    else if (popped && (popped =='parkview')){
      console.log("Popped Parkview!");
      layout.directionsDeactivate();
    }
    if (this.states.length == 0){
      this.css = "hide"
    }
   }
}


var ScenicStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getData: function() {
    return dataText;
  },
  getSessionState: function(){
    return sessionState;
  },
  getActivePage: function(){
    return activePage;
  },
  getBackBtnState: function(){
    return backBtn;
  },
  getLayout: function(){
    return layout;
  },
  emitChange: function() {
    console.log("Change Emitted");
    this.emit(CHANGE_EVENT);
  },
  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function(payload) {   
    console.log(payload.actionType) ;
    var action = payload.actionType;
    switch(payload.actionType) {
      case 'test':
        console.log("Change Sent");
        dataText = "Test B";
        ScenicStore.emitChange();
        break;
      case 'setTransitMode':
        console.log("Changing Transit", payload.transit);
        sessionState.transit = payload.transit;
        ScenicStore.emitChange();
        break;
      // for toggling the loop flag.
      case 'setMode': 
        console.log("Changing loop or route mode", payload.loop);
        sessionState.loop = payload.loop;
        ScenicStore.emitChange();
        break;
      case 'setGreenpoints':
        console.log("In Stores, setGreenpoints");
        sessionState.greenpoints = payload.greenpoints;
        ScenicStore.emitChange();
        break;
      case 'isLoading':
        console.log("isLoading Store is now", payload.isLoading)
        sessionState.isLoading = payload.isLoading;
        ScenicStore.emitChange();
        break;
      case 'setSessionState':
        console.log("Setting Session State");
        console.log("prop", payload.prop);
        console.log("value", payload.value);
        sessionState[payload.prop] = payload.value;
        ScenicStore.emitChange();
        break;
      case 'setGreenness':
        console.log('setting greenness');
        sessionState.greenness = payload.greenness;
        ScenicStore.emitChange();
        break;
      case 'updateMenu':
        console.log("Layout is being updated to", payload.menuState);
        // Update internal layout state
        if (payload.menuState == 'active'){
          layout.menuActivate();
        }
        else if (payload.menuState == 'inactive'){
          layout.menuDeactivate();
        }
        else if (payload.menuState == 'toggle'){
          layout.menuToggle();
        }
        ScenicStore.emitChange();
        break;
      case 'setDirectionsState':
        console.log("Directions tab state is being updated");
        if (payload.directionsState)
          layout.directionsActivate();
        else
          layout.directionsDeactivate();
        ScenicStore.emitChange();
        break;
      case 'updateActivePath':
        sessionState.activePath = payload.activePath;
        ScenicStore.emitChange();
        console.log("Updated Active Path.");
        break;
      case 'setActivePage':
        activePage = payload.activePage;
        backBtn.pushState('static');
        ScenicStore.emitChange();
        break;
      case 'setParkMode':
        backBtn.pushState('parkview');
        ScenicStore.emitChange();
        break;
      case 'goBack':
        backBtn.popState();
        ScenicStore.emitChange();
        break;
      case 'initialized': 
        layout.initialized();
        ScenicStore.emitChange();
        break;
      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }
    return true; // No errors. Needed by promise in Dispatcher.
});


module.exports = ScenicStore;