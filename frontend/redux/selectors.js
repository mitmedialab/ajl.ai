// Selectors should always return the same reference if called multiple
// times with the same state! If a selector creates a new object or array,
// it will lead to unnecessary component re-renders every time the Redux
// store gets updated.
//
// As such, avoid reducers that resolve to objects that are compared by
// reference, such as objects and arrays; returning objects as-is from the
// state, or returning comparable-by-value types like booleans, strings and
// numbers, is best.

/** @deprecated use currentWorkloadItem */
export const selectedFace = state => state.faces.list[state.faces.selected];

export const currentWorkloadItem = state => state.workload.byId[state.workload.todo[0]] || null;

export const selectedWorkloadItemIndex = state => state.workload.complete.length + 1;

export const totalWorkloadItemCount = state =>
  state.workload.todo.length + state.workload.complete.length;

export const isLoading = state => Object
  .keys(state.loading)
  .reduce((anyLoading, key) => (anyLoading || state.loading[key]), false);

export const demographics = state => state.demographics.questions;
export const demographicsOrder = state => state.demographics.order;

export const selectWorkload = function(state) {
  const images = [];
  const answers = state.demographics.answers;

  Object.keys(answers).map((i) => {
    images.push({
      id: Number(i),
      demographics: answers[i],
    });
  });

  const response = {
    workloadId: state.workload.id,
    images,
  };

  return response;
};
