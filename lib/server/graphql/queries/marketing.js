'use strict';

const graphql = require('graphql');
const graphqlService = require('../index');
const MarketingType = require('../types/marketing');

const MarketingQuery = {
  type: MarketingType,
  resolve: function() {
    console.log('MARKETING QUERY HIT');
    return graphqlService.currentUserId
      .then((userId) => {
        const Marketing = graphqlService.models.Marketing
        return Marketing.findOne({ user: userId })
          .then((marketing) => {
            if (marketing) {
              console.log('MARKETING FOUND: ', marketing);
              return marketing;
            }

            return Marketing.create(userId, function(err, marketing) {
              if (err) {
                return err;
              }
              console.log('marketing doc create: ', marketing)
              return marketing;
            })
          })
          .catch((err) => err)
      })
  }
};

module.exports = MarketingQuery;
