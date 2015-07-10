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
  isLoading: function(_isLoading){
    Dispatcher.dispatch({
      actionType: 'isLoading',
      isLoading: _isLoading
    });
  }
};

module.exports = ScenicActions;