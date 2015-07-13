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
  isLoading: function(_isLoading){
    Dispatcher.dispatch({
      actionType: 'isLoading',
      isLoading: _isLoading
    });
  }
};

module.exports = ScenicActions;