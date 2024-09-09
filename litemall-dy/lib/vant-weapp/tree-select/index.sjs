/* eslint-disable */
var array = require("../wxs/array.sjs");
function isActive(activeList, itemId) {
  if (array.isArray(activeList)) {
    return activeList.indexOf(itemId) > -1;
  }
  return activeList === itemId;
}
module.exports.isActive = isActive;