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
  return axios.get('/sample-data.json')
    // Axios exposes JSON response body as .data property
    .then(result => result.data.map(transformFace));
}
