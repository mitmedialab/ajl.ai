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

  describe('demographics', () => {
    const { demographics } = selectors;

    it('is a function', () => {
      expect(demographics).toBeDefined();
      expect(demographics).toBeInstanceOf(Function);
    });

    it('returns the demographics dictionary object', () => {
      const demoDict = {
        a: 'Demographic Question 1',
        b: 'Demographic Question 2',
        c: 'Demographic Question 3',
      };
      const result = demographics({
        demographics: {
          questions: demoDict,
        },
      });
      expect(result).toBe(demoDict);
    });

  });

  describe('demographicsOrder', () => {
    const { demographicsOrder } = selectors;

    it('is a function', () => {
      expect(demographicsOrder).toBeDefined();
      expect(demographicsOrder).toBeInstanceOf(Function);
    });

    it('returns the demographics order list', () => {
      const demoOrder = ['a', 'b', 'c'];
      const result = demographicsOrder({
        demographics: {
          order: demoOrder,
        },
      });
      expect(result).toBe(demoOrder);
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

});
