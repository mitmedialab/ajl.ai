/**
 * Recursive deep freeze
 *
 * @param {Object} obj An object to deep-freeze
 * @returns {Object} A frozen object
 */
export default function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach((name) => {
    const prop = obj[name];
    // Freeze props (when they're objects),
    // eslint-disable-next-line eqeqeq
    if (typeof prop == 'object' && prop != null) {
      deepFreeze(prop);
    }
  });

  // then freeze self
  return Object.freeze(obj);
}
