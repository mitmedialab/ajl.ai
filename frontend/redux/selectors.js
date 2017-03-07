// Selectors should always return the same reference if called multiple
// times with the same state! If a selector creates a new object or array,
// it will lead to unnecessary component re-renders every time the Redux
// store gets updated.
//
// As such, avoid reducers that resolve to objects that are compared by
// reference, such as objects and arrays; returning objects as-is from the
// state, or returning comparable-by-value types like booleans, strings and
// numbers, is best.

export const selectedFace = state => state.faces.list[state.faces.selected];

export const selectedFaceIndex = (state) => {
  if (state.faces.selected === null) {
    return 0;
  }
  // Convert 0-indexed value to human readable
  return state.faces.selected + 1;
};

export const totalFaceCount = state => state.faces.list.length;

export const isLoading = state => Object
  .keys(state.loading)
  .reduce((anyLoading, key) => (anyLoading || state.loading[key]), false);

export const demographics = state => state.annotations.demographics;
export const demographicsOrder = state => state.annotations.demographicsOrder;
