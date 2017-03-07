export function healthCheck(req, res) {
  res.status(200).send('Ok we are healthy!');
}

// eslint wants two exports or exports default, remove this if you add a second
// endpoint to this file!
export default {};
