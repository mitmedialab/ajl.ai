export const location = '/api/session';
export const routes = {
  get: {
    '/me': (req, res) => {
      res.send({
        remote_user: req.headers.remote_user,
      });
    },
  },
};
