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
