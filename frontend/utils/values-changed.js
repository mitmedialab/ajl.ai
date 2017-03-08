/**
 * Return a boolean indicating whether any of the specified properties differ
 * (by ===) between the two provided objects (This can be useful for methods
 * like shouldComponentUpdate)
 *
 * Returns true if values DID change, or false if values are the same
 *
 * @returns {Boolean} Whether or not all of the specified props are !==
 */
export default (obj1, obj2, props) => {
  // Support a string or an array
  const propsArr = Array.isArray(props) ? props : [props];

  for (let i = 0; i < propsArr.length; i += 1) {
    if (obj1[propsArr[i]] !== obj2[propsArr[i]]) {
      return true;
    }
  }

  return false;
};
