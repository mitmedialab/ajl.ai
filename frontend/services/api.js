import axios from 'axios';

export function getWorkload() {
  return axios.get('/api/annotations/workload')
    // Axios exposes JSON response body as .data property
    .then(result => result.data);
}

export function postWorkload(workload) {
  return axios.post('/api/annotations', workload)
    // Axios exposes JSON response body as .data property
    .then(result => result.data);
}

export function getAnnotations() {
  return axios.get('/api/annotations/types')
    // Axios exposes JSON response body as .data property
    .then(result => result.data);
}
