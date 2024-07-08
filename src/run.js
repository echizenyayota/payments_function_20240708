// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
*/

/**
* @type {FunctionRunResult}
*/
const NO_CHANGES = {
  operations: [],
};

// The configured entrypoint for the 'purchase.payment-customization.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  // Get the cart total from the function input, and return early if it's below 100
  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0");
  if (cartTotal >= 12000) {
    return NO_CHANGES;
  } else {
    console.error("Cart total is not high enough, and you don't need to hide the payment method.");
  }

  // Find the payment method to hide
  const hidePaymentMethod = input.paymentMethods
    .find(method => method.name.includes("Cash on Delivery"));

  if (!hidePaymentMethod) {
    return NO_CHANGES;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: [{
      hide: {
        paymentMethodId: hidePaymentMethod.id
      }
    }]
  };
};
