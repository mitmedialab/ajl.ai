import { transformFace } from '../face-api';

describe('Faces API', () => {
  describe('transformFace data utility', () => {
    const input = {
      name: 'Barry Bonds',
      perceivedGender: 'male',
      age: 51,
      perceivedEthnicity: 'black',
      imgUri: 'lfw_subjects/Barry_Bonds_0001.jpg',
      landmarks: [104.250000, 141.750000, 131.250000, 113.750000, 145.250000, 113.250000, 110.750000, 130.750000, 156.250000, 152.750000, '1 2 2 3'],
    };

    it('should set the perceivedGender property from a record', () => {
      expect(transformFace(input).perceivedGender).toBe('male');
    });

    it('should set the perceivedAge property from a record', () => {
      expect(transformFace(input).perceivedAge).toBe(51);
    });

    it('should set the perceivedEthnicity property from a record', () => {
      expect(transformFace(input).perceivedEthnicity).toBe('black');
    });

    it('should populate the full URL for the record image', () => {
      expect(transformFace(input).image).toBe('http://www.code4rights.com/lfw_subjects/Barry_Bonds_0001.jpg');
    });

    it('should strip the name property from a record', () => {
      expect(transformFace(input).name).toBeUndefined();
    });

    it('should register a string ID property for a record', () => {
      const result = transformFace(input);
      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('string');
    });

    it('should parse landmarks into x/y pairs', () => {
      expect(transformFace(input).landmarks).toEqual([
        { x: 104.250000, y: 141.750000 },
        { x: 131.250000, y: 113.750000 },
        { x: 145.250000, y: 113.250000 },
        { x: 110.750000, y: 130.750000 },
        { x: 156.250000, y: 152.750000 },
      ]);
    });
  });
});
