import * as selectors from '../selectors';

describe('selector functions', () => {

  describe('selectedFace', () => {
    const { selectedFace } = selectors;

    it('is a function', () => {
      expect(selectedFace).toBeDefined();
      expect(selectedFace).toBeInstanceOf(Function);
    });

    it('returns the currently-selected face object', () => {
      expect(selectedFace({
        faces: {
          list: ['A', 'B', 'C', 'D'],
          selected: 1,
        },
      })).toBe('B');
    });

  });

  describe('selectedFaceIndex', () => {
    const { selectedFaceIndex } = selectors;

    it('is a function', () => {
      expect(selectedFaceIndex).toBeDefined();
      expect(selectedFaceIndex).toBeInstanceOf(Function);
    });

    it('returns the human-oriented index of the selected face in the set', () => {
      expect(selectedFaceIndex({
        faces: {
          selected: 0,
        },
      })).toBe(1);
      expect(selectedFaceIndex({
        faces: {
          selected: 10,
        },
      })).toBe(11);
    });

    it('returns 0 when no face is selected', () => {
      expect(selectedFaceIndex({
        faces: {
          selected: null,
        },
      })).toBe(0);
    });

  });

  describe('totalFaceCount', () => {
    const { totalFaceCount } = selectors;

    it('is a function', () => {
      expect(totalFaceCount).toBeDefined();
      expect(totalFaceCount).toBeInstanceOf(Function);
    });

    it('returns 0 when the data has not loaded', () => {
      const count = totalFaceCount({
        faces: {
          list: [],
        },
      });
      expect(count).toBe(0);
    });

    it('returns the number of total faces in the set', () => {
      const count = totalFaceCount({
        faces: {
          list: [1, 2, 3, 4, 5, 6, 7],
        },
      });
      expect(count).toBe(7);
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
        annotations: {
          demographics: demoDict,
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
        annotations: {
          demographicsOrder: demoOrder,
        },
      });
      expect(result).toBe(demoOrder);
    });

  });

});
