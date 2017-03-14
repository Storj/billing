'use strict';

const graphql = require('graphql');
const graphqlService = require('../index');
const { PaymentProcessor } = graphqlService.models;
const paymentProcessorType = require('../types/payment-processor');
const stripe = require('../../vendor/stripe');
const STRIPE = require('../../../constants').PAYMENT_PROCESSORS.STRIPE;

// TODO: rename method to `removePaymentMethod` and replace implementation
//   with payment-processor-agnostic code
const removePaymentMethod = {
  type: paymentProcessorType,
  args: {
    paymentProcessorId: {type: graphql.GraphQLString},
    paymentMethodId: {type: graphql.GraphQLString}
  },
  resolve: function(_, args) {
    return PaymentProcessor.findOne({_id: args.paymentProcessorId})
      .then((paymentProcessor) => {
        return paymentProcessor.adapter.removePaymentMethod(args.paymentMethodId);
      })
      .then(() => {
        graphqlservice.currentUser.then((user) => {
          console.log('remove-payment-method user is: %j', user);
          user.isFreeTier = true;
          console.log('user should be freeTier:', user.isFreeTier);
          console.log('removePaymentMethod user: %j', user);
          return user.save();
        })
      })
      .catch((err) => {
        throw err;
      });
  }
};

module.exports = removePaymentMethod;
