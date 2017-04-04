export const location = '/api/session';
export const routes = {
  // this route is in place purely to let the front end be aware of who
  // is logged in via basic auth, to pre-fill a feedback form. if we are
  // out of private beta and you are reading this, it is likely we no
  // longer need the `/me` route.
  get: {
    '/me': (req, res) => {
      res.send({
        remote_user: req.headers.remote_user,
      });
    },
  },
};
