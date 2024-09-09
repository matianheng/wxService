var bem = require("./bem.sjs").bem;
var memoize = require("./memoize.sjs").memoize;
module.exports = {
  bem: memoize(bem),
  memoize: memoize
};