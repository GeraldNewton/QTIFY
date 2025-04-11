/**
 * A higher-order function that wraps an asynchronous function with error handling.
 *
 * @param {Function} fn - The asynchronous function to wrap.
 * @param {string} func_name - The name of the function, used for logging errors.
 * @returns {Function} A new function that executes the original function and catches any errors,
 * logging them and sending an error response with the message.
 */

const error_handler = (fn, func_name) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (e) {
      console.log(`error in ${func_name}`, e);
      res.status(400).send(e);
    }
  };
};
module.exports = error_handler;
