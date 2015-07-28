var Analytics = {
  /**
   * @param  {string} query
   * @param  {fn} cb
   */
   locationError: function(_type){
      // transform to uppercase
      _type = _type.toUpperCase()
      dataLayer.push({
          'event':'locationError',
          'locationErrorType': _type
      });
   },
   greenLevel: function(_level){
    dataLayer.push({
      'greenLevel': _level
    })
   },
   transitMode: function(_mode){
    // where _mode is either BIKE or WALK
    dataLayer.push({
      'transportationType' : _mode
    })
   },
   travelType: function(_type){
    // where type is either ROUTE or LOOP
    dataLayer.push({
      'travelType': _type
    })
   }
};



module.exports = Analytics;