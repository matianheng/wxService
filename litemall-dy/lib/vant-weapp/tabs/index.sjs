/* eslint-disable */
function tabClass(active, ellipsis) {
  var classes = ['tab-class'];
  if (active) {
    classes.push('tab-active-class');
  }
  if (ellipsis) {
    classes.push('van-ellipsis');
  }
  return classes.join(' ');
}
function tabStyle(active, ellipsis, color, type, disabled, activeColor, inactiveColor, swipeThreshold, scrollable) {
  var styles = [];
  var isCard = type === 'card';
  // card theme color
  if (color && isCard) {
    styles.push('border-color:' + color);
    if (!disabled) {
      if (active) {
        styles.push('background-color:' + color);
      } else {
        styles.push('color:' + color);
      }
    }
  }
  var titleColor = active ? activeColor : inactiveColor;
  if (titleColor) {
    styles.push('color:' + titleColor);
  }
  if (scrollable && ellipsis) {
    styles.push('flex-basis:' + 88 / swipeThreshold + '%');
  }
  return styles.join(';');
}
module.exports.tabClass = tabClass;
module.exports.tabStyle = tabStyle;