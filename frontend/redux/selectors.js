// Selectors should always return the same reference if called multiple
// times with the same state! If a selector creates a new object or array,
// it will lead to unnecessary component re-renders every time the Redux
// store gets updated.
//
// As such, avoid reducers that resolve to objects that are compared by
// reference, such as objects and arrays; returning objects as-is from the
// state, or returning comparable-by-value types like booleans, strings and
// numbers, is best.

export const currentWorkloadItem = state => state.workload.byId[state.workload.todo[0]] || null;

export const selectedWorkloadItemIndex = state => state.workload.complete.length + 1;

export const totalWorkloadItemCount = state =>
  state.workload.todo.length + state.workload.complete.length;

export const isLoading = state => Object
  .keys(state.loading)
  .reduce((anyLoading, key) => (anyLoading || state.loading[key]), false);

export const demographicAttributes = state => state.demographicAttributes.byName;
export const demographicAttributesOrder = state => state.demographicAttributes.order;

export const imageAnnotations = state => state.annotations;

export const appErrors = state => state.errors;

export const completedWorkloadCount = state => state.workload.completeCount;

export const onFirstImage = state =>
  state.workload.todo.length && ! state.workload.complete.length;

export const overallAnnotated = state => Number(state.overallStats.annotated_count);
export const overallImages = state => Number(state.overallStats.total_count);

export const showFeedbackModal = state => state.ui.feedbackModal;
