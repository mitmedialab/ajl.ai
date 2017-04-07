import * as selectors from '../selectors';

describe('selector functions', () => {

  describe('currentWorkloadItem', () => {
    const { currentWorkloadItem } = selectors;

    it('is a function', () => {
      expect(currentWorkloadItem).toBeDefined();
      expect(currentWorkloadItem).toBeInstanceOf(Function);
    });

    it('returns null if no item is found', () => {
      expect(currentWorkloadItem({
        workload: {
          todo: [],
          byId: {
            A: 1,
            B: 2,
            C: 3,
            D: 4,
          },
        },
      })).toBeNull();
    });

    it('returns the first workload item in the to-do array', () => {
      expect(currentWorkloadItem({
        workload: {
          todo: ['C', 'D'],
          byId: {
            A: 1,
            B: 2,
            C: 3,
            D: 4,
          },
        },
      })).toBe(3);
    });

  });

  describe('selectedWorkloadItemIndex', () => {
    const { selectedWorkloadItemIndex } = selectors;

    it('is a function', () => {
      expect(selectedWorkloadItemIndex).toBeDefined();
      expect(selectedWorkloadItemIndex).toBeInstanceOf(Function);
    });

    it('returns the human-oriented index of the selected face in the set', () => {
      expect(selectedWorkloadItemIndex({
        workload: {
          complete: ['C', 'D'],
        },
      })).toBe(3);
      expect(selectedWorkloadItemIndex({
        workload: {
          complete: ['A', 'B', 'C', 'D', 'E'],
        },
      })).toBe(6);
    });

    it('returns 1 when no workload items have been completed', () => {
      expect(selectedWorkloadItemIndex({
        workload: {
          complete: [],
        },
      })).toBe(1);
    });

  });

  describe('totalWorkloadItemCount', () => {
    const { totalWorkloadItemCount } = selectors;

    it('is a function', () => {
      expect(totalWorkloadItemCount).toBeDefined();
      expect(totalWorkloadItemCount).toBeInstanceOf(Function);
    });

    it('returns 0 if no workload items are loaded', () => {
      expect(totalWorkloadItemCount({
        workload: {
          todo: [],
          complete: [],
        },
      })).toBe(0);
    });

    it('returns the total number of workload items currently loaded', () => {
      expect(totalWorkloadItemCount({
        workload: {
          todo: [1, 2, 3],
          complete: [4, 5],
        },
      })).toBe(5);
    });

    it('returns the total number of workload items even if all are complete', () => {
      expect(totalWorkloadItemCount({
        workload: {
          todo: [],
          complete: [1, 2, 3, 4, 5],
        },
      })).toBe(5);
    });

  });

  describe('isLoading', () => {
    const { isLoading } = selectors;

    it('is a function', () => {
      expect(isLoading).toBeDefined();
      expect(isLoading).toBeInstanceOf(Function);
    });

    it('returns true when any property is loading', () => {
      expect(isLoading({
        loading: {
          faces: true,
          annotations: false,
        },
      })).toBe(true);
    });

    it('returns true when all properties are loading', () => {
      expect(isLoading({
        loading: {
          faces: true,
          annotations: true,
        },
      })).toBe(true);
    });

    it('returns false when no properties are loading', () => {
      expect(isLoading({
        loading: {
          faces: false,
          annotations: false,
        },
      })).toBe(false);
    });

  });

  describe('demographicAttributes', () => {
    const { demographicAttributes } = selectors;

    it('is a function', () => {
      expect(demographicAttributes).toBeDefined();
      expect(demographicAttributes).toBeInstanceOf(Function);
    });

    it('returns the perceived demographic annotations dictionary object', () => {
      const demoDict = {
        a: 'Demographic Question 1',
        b: 'Demographic Question 2',
        c: 'Demographic Question 3',
      };
      const result = demographicAttributes({
        demographicAttributes: {
          byName: demoDict,
        },
      });
      expect(result).toBe(demoDict);
    });

  });

  describe('demographicAttributesOrder', () => {
    const { demographicAttributesOrder } = selectors;

    it('is a function', () => {
      expect(demographicAttributesOrder).toBeDefined();
      expect(demographicAttributesOrder).toBeInstanceOf(Function);
    });

    it('returns the perceived demographic annotations order list', () => {
      const demoOrder = ['a', 'b', 'c'];
      const result = demographicAttributesOrder({
        demographicAttributes: {
          order: demoOrder,
        },
      });
      expect(result).toBe(demoOrder);
    });

  });

  describe('flagAttribute', () => {
    const { flagAttribute } = selectors;

    it('is a function', () => {
      expect(flagAttribute).toBeDefined();
      expect(flagAttribute).toBeInstanceOf(Function);
    });

    it('returns the flag attribute key string', () => {
      const result = flagAttribute({
        demographicAttributes: {
          flagAttribute: 'Report Image',
        },
      });
      expect(result).toBe('Report Image');
    });

  });

  describe('imageAnnotations', () => {
    const { imageAnnotations } = selectors;

    it('is a function', () => {
      expect(imageAnnotations).toBeDefined();
      expect(imageAnnotations).toBeInstanceOf(Function);
    });

    it('returns the annotations property from the state', () => {
      const annotations = { foo: true };
      const result = imageAnnotations({
        annotations,
      });
      expect(result).toBe(annotations);
    });

  });

  describe('appErrors', () => {
    const { appErrors } = selectors;

    it('is a function', () => {
      expect(appErrors).toBeDefined();
      expect(appErrors).toBeInstanceOf(Function);
    });

    it('returns the annotations property from the state', () => {
      const errorsState = [{ error: 'hi', retryAction: {} }];
      const result = appErrors({
        errors: errorsState,
      });
      expect(result).toBe(errorsState);
    });
  });

  describe('completedWorkloadCount', () => {
    const { completedWorkloadCount } = selectors;

    it('is a function', () => {
      expect(completedWorkloadCount).toBeDefined();
      expect(completedWorkloadCount).toBeInstanceOf(Function);
    });

    it('returns a count of workloads a user has completed in their session', () => {
      expect(completedWorkloadCount({
        workload: {
          faces: true,
          completeCount: 4,
        },
      })).toBe(4);
    });

  });

  describe('onFirstImage', () => {
    const { onFirstImage } = selectors;

    it('is a function', () => {
      expect(onFirstImage).toBeDefined();
      expect(onFirstImage).toBeInstanceOf(Function);
    });

    it('returns true when on the first image in a workload', () => {
      expect(onFirstImage({
        workload: {
          todo: [1, 2],
          complete: [],
        },
      })).toBe(true);
    });

    it('returns false on subsequent workload steps', () => {
      expect(onFirstImage({
        workload: {
          todo: [2],
          complete: [1],
        },
      })).toBe(false);
    });

  });

  describe('showFAQModal', () => {
    const { showFAQModal } = selectors;

    it('is a function', () => {
      expect(showFAQModal).toBeDefined();
      expect(showFAQModal).toBeInstanceOf(Function);
    });

    it('returns true when the FAQ modal flag is true', () => {
      expect(showFAQModal({
        ui: {
          FAQModal: true,
        },
      })).toBe(true);
    });

    it('returns false when the FAQ modal flag is false', () => {
      expect(showFAQModal({
        ui: {
          FAQModal: false,
        },
      })).toBe(false);
    });

  });

});
