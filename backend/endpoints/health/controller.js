export function healthCheck(req, res) {
  res.status(200).send('Ok we are healthy!');
};
