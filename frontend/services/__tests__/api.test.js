import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as api from '../api';

describe('API', () => {
  let mock;

  beforeEach(() => {
    // Mock out Axios' internal request behavior
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('getWorkload', () => {
    const { getWorkload } = api;

    it('is a function', () => {
      expect(getWorkload).toBeDefined();
      expect(getWorkload).toBeInstanceOf(Function);
    });

    it('requests an annotations API workload', () => {
      const mockResponse = [{
        id: 121,
        images: [
          { id: 1594, url: '0001.jpg', width: 250, height: 250 },
          { id: 28, url: '0002.jpg', width: 250, height: 250 },
          { id: 1998, url: '0003.jpg', width: 250, height: 250 },
          { id: 991, url: '0004.jpg', width: 250, height: 250 },
        ],
      }];
      mock.onGet('/api/annotations/workload').reply(200, mockResponse);
      return getWorkload()
        .then(result => expect(result).toEqual(mockResponse));
    });

  });

  describe('postWorkload', () => {
    const { postWorkload } = api;

    it('is a function', () => {
      expect(postWorkload).toBeDefined();
      expect(postWorkload).toBeInstanceOf(Function);
    });

    it('sends an annotations list to the server', () => {
      const mockPostData = {
        id: 121,
        images: [{
          id: 1,
          annotations: [{ name: 'A', value: '1' }],
        }],
      };
      const mockResponse = [{
        id: 122,
        images: [
          { id: 1594, url: '0001.jpg', width: 250, height: 250 },
          { id: 28, url: '0002.jpg', width: 250, height: 250 },
          { id: 1998, url: '0003.jpg', width: 250, height: 250 },
          { id: 991, url: '0004.jpg', width: 250, height: 250 },
        ],
      }];
      mock.onPost('/api/annotations').reply(200, mockResponse);
      return postWorkload(mockPostData)
        .then(result => expect(result).toEqual(mockResponse));
    });

  });

  describe('getAttributes', () => {
    const { getAttributes } = api;

    it('is a function', () => {
      expect(getAttributes).toBeDefined();
      expect(getAttributes).toBeInstanceOf(Function);
    });

    it('requests an annotations list', () => {
      const mockResponse = [
        { name: 'a', options: [1, 2, 3] },
        { name: 'b', options: [4, 5, 7] },
      ];
      mock.onGet('/api/annotations/attributes').reply(200, mockResponse);
      return getAttributes()
        .then(result => expect(result).toEqual(mockResponse));
    });

  });

});
