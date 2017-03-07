import axios from 'axios';

/**
 * Convert the face data object returned from the API into a form that is
 * easier to work with inside the store
 *
 *     // From:
 *     {
 *       name: "Barry Bonds",
 *       perceivedGender: "male",
 *       age: 51,
 *       perceivedEthnicity: "black",
 *       imgUri: "lfw_subjects/Barry_Bonds_0001.jpg",
 *       landmarks: [104.250000, 141.750000, 131.250000, 113.750000, ...]
 *     }
 *
 *     // To:
 *     {
 *       id: '201fccbc-91d8-444f-b726-b966d1aa7623',
 *       perceivedGender: 'male',
 *       perceivedAge: 51,
 *       perceivedEthnicity: 'black',
 *       imgUri: 'http://localhost:8181/images/lfw_subjects/Barry_Bonds_0001.jpg',
 *       landmarks: [
 *         { x: 104.250000, y: 141.750000 },
 *         { x: 131.250000, y: 113.750000},
 *         // ...
 *       ]
 *     }
 *
 * @param {object} face A face record from the API response
 * @returns {object} A face record with the proper property shape
 */
export function transformFace(face) {
  return {
    id: face.imgUri,
    perceivedGender: face.perceivedGender,
    perceivedAge: face.age,
    perceivedEthnicity: face.perceivedEthnicity,
    // TODO: Drive server URL from configuration
    image: `http://www.code4rights.com/${face.imgUri}`,
    landmarks: face.landmarks.reduce((pairs, coordinate) => {
      const lastCoordinatePair = pairs[pairs.length - 1];
      if (typeof coordinate === 'string') {
        // ignore mysterious strings like '1 2 2 3' at the end of the data
        return pairs;
      }
      if (pairs.length && ! lastCoordinatePair.y) {
        lastCoordinatePair.y = coordinate;
      } else {
        pairs.push({
          x: coordinate,
        });
      }
      return pairs;
    }, []),
  };
}

export function getAllFaces() {
  return axios.get('/api/sample-data.json')
    // Axios exposes JSON response body as .data property
    // Returned object is an array of image entries
    .then(result => result.data.map(transformFace));
}

const mockWorkload = {
  id: 121,
  images: [
    { id: 1594, url: 'http://www.code4rights.com/lfw_subjects/Hwang_Doo-yun_0001.jpg', width: 250, height: 250 },
    { id: 28, url: 'http://www.code4rights.com/lfw_subjects/Adrianna_Zuzic_0001.jpg', width: 250, height: 250 },
    { id: 1998, url: 'http://www.code4rights.com/lfw_subjects/John_Malkovich_0001.jpg', width: 250, height: 250 },
    { id: 991, url: 'http://www.code4rights.com/lfw_subjects/Dimitri_Perricos_0001.jpg', width: 250, height: 250 },
    { id: 2801, url: 'http://www.code4rights.com/lfw_subjects/Mike_Smith_0001.jpg', width: 250, height: 250 },
    { id: 3944, url: 'http://www.code4rights.com/lfw_subjects/Tom_Tunney_0001.jpg', width: 250, height: 250 },
    { id: 3637, url: 'http://www.code4rights.com/lfw_subjects/Shigeru_Ishiba_0001.jpg', width: 250, height: 250 },
    { id: 14, url: 'http://www.code4rights.com/lfw_subjects/Abdullatif_Sener_0001.jpg', width: 250, height: 250 },
    { id: 4060, url: 'http://www.code4rights.com/lfw_subjects/William_Cocksedge_0001.jpg', width: 250, height: 250 },
    { id: 2841, url: 'http://www.code4rights.com/lfw_subjects/Mitt_Romney_0001.jpg', width: 250, height: 250 },
    { id: 184, url: 'http://www.code4rights.com/lfw_subjects/Andrea_Kiser_0001.jpg', width: 250, height: 250 },
    { id: 858, url: 'http://www.code4rights.com/lfw_subjects/Darrell_Royal_0001.jpg', width: 250, height: 250 },
  ],
};

export function getWorkload() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockWorkload }), 250);
  })
    // Axios exposes JSON response body as .data property
    // Returned object is an array of image entries
    .then(result => result.data);
}

export function getAnnotations() {
  return axios.get('/api/annotations/types')
    // Axios exposes JSON response body as .data property
    .then(result => ({
      demographics: result.data,
    }));
}
