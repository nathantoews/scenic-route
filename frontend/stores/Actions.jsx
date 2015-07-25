var Dispatcher = require('./Dispatcher.jsx');
var Store = require('./Stores.jsx');

var ScenicActions = {
  /**
   * @param  {string} text
   */
  test: function(text) {
    Dispatcher.dispatch({
      actionType: 'test',
    });
  },
  setTransitMode: function(_mode){
    Dispatcher.dispatch({
      actionType: 'setTransitMode',
      transit: _mode
    });
  },
  setLoop: function(){
    Dispatcher.dispatch({
      actionType: 'setMode',
      loop: true
    });
  },
  setRoute: function(){
    Dispatcher.dispatch({
      actionType: 'setMode',
      loop: false
    });
  },
  setGreenpoints: function(_results){
    Dispatcher.dispatch({
      actionType: 'setGreenpoints',
      greenpoints: _results
    });
  },
  setSessionState: function(_prop, _value){
    Dispatcher.dispatch({
      actionType: 'setSessionState',
      prop: _prop,
      value: _value
    });
  },
  setGreenness: function(_greenness){
    Dispatcher.dispatch({
      actionType: 'setGreenness',
      greenness: _greenness
    })
  },
  updateMenu: function(_menuState){
    Dispatcher.dispatch({
      actionType: 'updateMenu',
      menuState: _menuState
    });
  },
  // Takes in true or false
  setDirectionsState: function(_directionsState){
    Dispatcher.dispatch({
      actionType: 'setDirectionsState',
      directionsState: _directionsState
    });
  },
  updateActivePath: function(_activePath){
    Dispatcher.dispatch({
      actionType: 'updateActivePath',
      activePath: _activePath
    });
  },
  isLoading: function(_isLoading){
    Dispatcher.dispatch({
      actionType: 'isLoading',
      isLoading: _isLoading
    });
  },
  setActivePage: function(_activePage){
    console.log('setActivePage');
    console.log(_activePage);
    Dispatcher.dispatch({
      actionType: 'setActivePage',
      activePage: _activePage
    })
    $('#sidenav-overlay').trigger('click');
  },
  goBack: function(){
    Dispatcher.dispatch({
      actionType: 'goBack'
    })
  }
};

module.exports = ScenicActions;