(function ()
{
  'use strict';


  module.exports = function(async) {
    var executeWaterfall = function() {
    async.waterfall([

      function (watson, text) {
        watson.extract(text, callback);
      },

      function (info, callback) {
        var entities = storyinfo.entities.filter(function (entity) {
          return entity.type === 'PERSON' &&
          entity.level === 'NAM' &&
          // add a threshold so we ignore entities
          //  with a very low confidence score
          entity.score >= 0.5;
        });


        var names = entities.map(function (entity)
        {

          var entitynames = [];

          // Look through each mention of this person
          //   as some of the mentions could refer to their occupation or job title
          //   and some of the mentions will be 'he', 'she', 'they', etc.
          // We're just interested in the names
          entity.mentions.forEach(function (mention)
          {
            if (mention.role === 'PERSON' && mention.mtype === 'NAM')
            {
              entitynames.push(mention.text);
            }
          });

          return personnames;
        });

        callback(null, names);

      }
      ], function(err, result){
        // print out the names we found
        console.log(result);
      });

  }


})();
